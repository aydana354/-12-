import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react';
import type { ElementData } from '../types/chemistry';
import { useApp } from '../context/AppContext';

interface Atom3DExplorerProps {
  element: ElementData;
  compact?: boolean;
}

const SHELL_LETTERS = ['K', 'L', 'M', 'N', 'O', 'P'];

// Reusable module-scope math objects (zero GC in animation loop)
const _dummy = new THREE.Object3D();
const _vec3 = new THREE.Vector3();

export const Atom3DExplorer: React.FC<Atom3DExplorerProps> = ({ element, compact = false }) => {
  const { language, t } = useApp();
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [explode, setExplode] = useState(0);
  const [selectedShell, setSelectedShell] = useState<number | null>(null);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglError, setWebglError] = useState(false);

  const stateRef = useRef({
    isPaused: false,
    speed: 1,
    explodeTarget: 0,
    explodeCurrent: 0,
    selectedShell: null as number | null,
    resetCameraFlag: false,
  });

  useEffect(() => {
    stateRef.current.isPaused = isPaused;
    stateRef.current.speed = speed;
    stateRef.current.explodeTarget = explode;
    stateRef.current.selectedShell = selectedShell;
  }, [isPaused, speed, explode, selectedShell]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect software WebGL via renderer string
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));

    const initWidth = Math.max(container.clientWidth, 300);
    const initHeight = Math.max(container.clientHeight, 300);
    renderer.setSize(initWidth, initHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    const onContextRestored = () => {
      setWebglError(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const scene = new THREE.Scene();

    // Procedural Studio Environment Map for crisp metallic & glass reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(44, initWidth / initHeight, 0.1, 150);
    const defaultCameraPos = new THREE.Vector3(0, 5.5, compact ? 17.5 : 19.5);
    camera.position.copy(defaultCameraPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 7;
    controls.maxDistance = 36;

    // 3-point warm/cool studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xcfe8ff, 0x0b1020, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(10, 14, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(element.theme.accentHex, 1.4);
    rimLight.position.set(-12, -8, -10);
    scene.add(rimLight);

    // Master Atom Group
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // 1. Composite 3D Nucleus (Fibonacci sphere packed protons + neutrons + inner energy core)
    const nucleusGroup = new THREE.Group();
    atomGroup.add(nucleusGroup);

    const totalNucleons = element.atomicStructure.protons + element.atomicStructure.neutrons;
    const nucleonGeo = new THREE.SphereGeometry(0.19, 14, 12);

    const protonMat = new THREE.MeshPhysicalMaterial({
      color: element.theme.nucleusProtonHex,
      metalness: 0.72,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      emissive: element.theme.nucleusProtonHex,
      emissiveIntensity: 0.18,
    });

    const neutronMat = new THREE.MeshStandardMaterial({
      color: element.theme.nucleusNeutronHex,
      metalness: 0.25,
      roughness: 0.58,
    });

    const protonCount = element.atomicStructure.protons;
    const neutronCount = element.atomicStructure.neutrons;
    const protonMesh = new THREE.InstancedMesh(nucleonGeo, protonMat, protonCount);
    const neutronMesh = new THREE.InstancedMesh(nucleonGeo, neutronMat, neutronCount);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    let pIdx = 0;
    let nIdx = 0;

    for (let i = 0; i < totalNucleons; i++) {
      // Distribute across concentric packed shells inside nucleus
      const layerFrac = Math.cbrt((i + 0.5) / totalNucleons);
      const radius = 0.22 + layerFrac * 0.92;
      const y = 1 - (i / (totalNucleons - 1)) * 2;
      const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      _dummy.position.set(
        Math.cos(theta) * rAtY * radius,
        y * radius,
        Math.sin(theta) * rAtY * radius
      );
      const scaleJitter = 0.92 + ((i * 17) % 10) * 0.016;
      _dummy.scale.setScalar(scaleJitter);
      _dummy.updateMatrix();

      // Interleave protons & neutrons evenly
      const isProton =
        pIdx < protonCount &&
        (nIdx >= neutronCount || (i * protonCount) % totalNucleons < protonCount);
      if (isProton) {
        protonMesh.setMatrixAt(pIdx++, _dummy.matrix);
      } else if (nIdx < neutronCount) {
        neutronMesh.setMatrixAt(nIdx++, _dummy.matrix);
      } else if (pIdx < protonCount) {
        protonMesh.setMatrixAt(pIdx++, _dummy.matrix);
      }
    }
    protonMesh.instanceMatrix.needsUpdate = true;
    neutronMesh.instanceMatrix.needsUpdate = true;
    protonMesh.computeBoundingSphere();
    neutronMesh.computeBoundingSphere();
    nucleusGroup.add(protonMesh);
    nucleusGroup.add(neutronMesh);

    // Subtle glowing core aura inside nucleus
    const coreGeo = new THREE.SphereGeometry(0.68, 20, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: element.theme.accentHex,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const coreGlow = new THREE.Mesh(coreGeo, coreMat);
    nucleusGroup.add(coreGlow);

    // 2. 6 Concentric Electron Shells & Orbiting Electrons
    const shells = element.atomicStructure.shells;
    const baseRadii = [2.2, 3.25, 4.35, 5.5, 6.65, 7.8];
    const shellTilts: [number, number, number][] = [
      [0.35, 0.2, 0.1],
      [-0.45, 0.55, 0.25],
      [0.75, -0.35, 0.4],
      [-0.25, -0.7, -0.3],
      [0.55, 0.65, -0.45],
      [-0.6, 0.15, 0.7],
    ];

    const electronGeo = new THREE.SphereGeometry(0.145, 14, 12);
    const electronMat = new THREE.MeshStandardMaterial({
      color: element.theme.electronHex,
      emissive: element.theme.accentHex,
      emissiveIntensity: 0.75,
      metalness: 0.4,
      roughness: 0.2,
    });

    interface ShellRuntime {
      group: THREE.Group;
      ringMesh: THREE.Mesh;
      ringMat: THREE.MeshStandardMaterial;
      electronsMesh: THREE.InstancedMesh;
      baseRadius: number;
      electronCount: number;
      angularSpeed: number;
      angleOffset: number;
    }

    const shellRuntimes: ShellRuntime[] = [];
    const disposableGeos: THREE.BufferGeometry[] = [nucleonGeo, coreGeo, electronGeo];
    const disposableMats: THREE.Material[] = [protonMat, neutronMat, coreMat, electronMat];

    shells.forEach((count, shellIdx) => {
      const shellGroup = new THREE.Group();
      const [rx, ry, rz] = shellTilts[shellIdx % shellTilts.length];
      shellGroup.rotation.set(rx, ry, rz);
      atomGroup.add(shellGroup);

      const baseR = baseRadii[shellIdx] ?? 2.2 + shellIdx * 1.1;
      const ringGeo = new THREE.TorusGeometry(baseR, 0.022, 10, 96);
      const ringMat = new THREE.MeshStandardMaterial({
        color: element.theme.ringHex,
        metalness: 0.75,
        roughness: 0.25,
        emissive: element.theme.ringHex,
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      shellGroup.add(ringMesh);

      const eMat = electronMat.clone();
      const electronsMesh = new THREE.InstancedMesh(electronGeo, eMat, count);
      electronsMesh.frustumCulled = false;
      shellGroup.add(electronsMesh);

      disposableGeos.push(ringGeo);
      disposableMats.push(ringMat, eMat);

      shellRuntimes.push({
        group: shellGroup,
        ringMesh,
        ringMat,
        electronsMesh,
        baseRadius: baseR,
        electronCount: count,
        angularSpeed: (1.35 / (1 + shellIdx * 0.35)) * (shellIdx % 2 === 0 ? 1 : -1),
        angleOffset: shellIdx * 0.7,
      });
    });

    // Ambient starry micro-field (InstancedMesh)
    const starCount = 90;
    const starGeo = new THREE.SphereGeometry(0.05, 6, 6);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.45,
    });
    const starsMesh = new THREE.InstancedMesh(starGeo, starMat, starCount);
    for (let i = 0; i < starCount; i++) {
      const theta = ((i * 137.5) * Math.PI) / 180;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / starCount);
      const r = 16 + (i % 7) * 2.4;
      _dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      _dummy.scale.setScalar(0.7 + (i % 3) * 0.4);
      _dummy.updateMatrix();
      starsMesh.setMatrixAt(i, _dummy.matrix);
    }
    starsMesh.instanceMatrix.needsUpdate = true;
    starsMesh.computeBoundingSphere();
    scene.add(starsMesh);
    disposableGeos.push(starGeo);
    disposableMats.push(starMat);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 280);
      const h = Math.max(container.clientHeight, 260);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const st = stateRef.current;

      // Reset camera smoothly if requested
      if (st.resetCameraFlag) {
        camera.position.lerp(defaultCameraPos, 0.18);
        controls.target.lerp(_vec3.set(0, 0, 0), 0.18);
        if (camera.position.distanceTo(defaultCameraPos) < 0.08) {
          camera.position.copy(defaultCameraPos);
          st.resetCameraFlag = false;
        }
      }

      // Smooth exponential damping on Exploded Shell separation
      st.explodeCurrent = THREE.MathUtils.damp(st.explodeCurrent, st.explodeTarget, 6, delta);

      const effectiveSpeed = prefersReducedMotion || st.isPaused ? 0 : st.speed;

      // Rotate nucleus gently
      nucleusGroup.rotation.y += delta * 0.25 * effectiveSpeed;
      nucleusGroup.rotation.x += delta * 0.12 * effectiveSpeed;

      // Update each shell
      shellRuntimes.forEach((shell, idx) => {
        shell.angleOffset += delta * shell.angularSpeed * effectiveSpeed;

        // Radial expansion when exploded view slider > 0
        const radiusScale = 1 + st.explodeCurrent * (0.14 + idx * 0.11);
        const r = shell.baseRadius * radiusScale;
        shell.ringMesh.scale.setScalar(radiusScale);

        const isSelected = st.selectedShell === null || st.selectedShell === idx;
        shell.ringMat.opacity = isSelected ? 0.78 : 0.12;
        shell.ringMat.emissiveIntensity = st.selectedShell === idx ? 0.75 : 0.22;

        const eMat = shell.electronsMesh.material as THREE.MeshStandardMaterial;
        eMat.opacity = isSelected ? 1 : 0.2;
        eMat.transparent = !isSelected;
        eMat.emissiveIntensity = st.selectedShell === idx ? 1.2 : 0.75;

        for (let e = 0; e < shell.electronCount; e++) {
          const angle = shell.angleOffset + (e / shell.electronCount) * Math.PI * 2;
          _dummy.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
          _dummy.scale.setScalar(st.selectedShell === idx ? 1.25 : 1);
          _dummy.updateMatrix();
          shell.electronsMesh.setMatrixAt(e, _dummy.matrix);
        }
        shell.electronsMesh.instanceMatrix.needsUpdate = true;
      });

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      disposableGeos.forEach((g) => g.dispose());
      disposableMats.forEach((m) => m.dispose());
      envRT.dispose();
      renderer.dispose();
    };
  }, [element, compact]);

  const handleResetCamera = () => {
    stateRef.current.resetCameraFlag = true;
    setExplode(0);
    setSelectedShell(null);
    setSpeed(1);
    setIsPaused(false);
  };

  if (webglError) {
    // Graceful 2D Bohr fallback when WebGL is unavailable
    return (
      <div className="relative flex h-[420px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#080b14] p-6 text-center">
        <svg viewBox="0 0 320 320" className="h-64 w-64">
          {element.atomicStructure.shells.map((count, i) => {
            const r = 34 + i * 21;
            return (
              <g key={i}>
                <circle
                  cx="160"
                  cy="160"
                  r={r}
                  fill="none"
                  stroke={element.theme.accentHex}
                  strokeOpacity={0.45}
                  strokeWidth="1.2"
                />
                {Array.from({ length: count }).map((_, j) => {
                  const angle = (j / count) * Math.PI * 2;
                  return (
                    <circle
                      key={j}
                      cx={160 + Math.cos(angle) * r}
                      cy={160 + Math.sin(angle) * r}
                      r="2.8"
                      fill={element.theme.secondaryHex}
                    />
                  );
                })}
              </g>
            );
          })}
          <circle cx="160" cy="160" r="14" fill={element.theme.accentHex} />
          <text
            x="160"
            y="165"
            textAnchor="middle"
            className="fill-slate-950 font-mono text-[11px] font-bold"
          >
            {element.symbol}
          </text>
        </svg>
        <p className="mt-2 text-xs text-slate-400">
          {element.names[language]} · {element.atomicStructure.electronConfiguration}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070e] ${
        compact ? 'h-[430px] sm:h-[480px]' : 'h-[520px] sm:h-[580px]'
      }`}
    >
      {/* Top-Left Minimal Spec Header */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] space-y-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="font-display text-sm font-bold text-white">
            {element.symbol} · {element.names[language]}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-slate-300">
            {element.atomicStructure.isotopeName}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-slate-400">
            {element.atomicStructure.shells.join(' · ')}
          </span>
        </div>
        <p className="text-[11px] text-slate-400">{t.atom3dHint}</p>
      </div>

      {/* Dedicated Isolated WebGL Canvas Mount */}
      <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

      {/* Collapsible Bottom Control Dock (Solid dark surface — no backdrop-blur over WebGL) */}
      <div className="absolute bottom-3 left-1/2 z-10 w-[min(780px,calc(100%-1.5rem))] -translate-x-1/2 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockCollapsed((v) => !v)}
          className="mb-1.5 inline-flex items-center gap-1.5 rounded-t-lg border border-b-0 border-white/15 bg-[#0a0f1d] px-3 py-1 text-[11px] font-medium text-slate-300 hover:text-white cursor-pointer"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              {t.atom3dShowControls}
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              {t.atom3dHideControls}
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="w-full rounded-xl border border-white/15 bg-[#0a0f1d]/95 p-3 shadow-2xl">
            <div className="flex flex-col gap-3">
              {/* Row 1: Shell selector tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedShell(null)}
                  className={`min-h-[32px] rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedShell === null
                      ? `${element.theme.accentBgClass} text-slate-950 font-semibold`
                      : 'bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  {t.atom3dAllShells}
                </button>
                {element.atomicStructure.shells.map((eCount, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedShell(selectedShell === idx ? null : idx)}
                    className={`min-h-[32px] rounded-md px-2.5 py-1 font-mono text-xs tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedShell === idx
                        ? `${element.theme.accentBgClass} text-slate-950 font-semibold`
                        : 'bg-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    {SHELL_LETTERS[idx]} ({eCount}e⁻)
                  </button>
                ))}
              </div>

              {/* Row 2: Sliders & Transport */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                <div className="flex flex-1 min-w-[160px] items-center gap-2.5">
                  <label
                    htmlFor={`explode-${element.id}`}
                    className="text-xs text-slate-300 whitespace-nowrap"
                  >
                    {t.atom3dExplodeLabel}
                  </label>
                  <input
                    id={`explode-${element.id}`}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={explode}
                    onChange={(e) => setExplode(parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer accent-cyan-400"
                  />
                  <span className="w-9 text-right font-mono text-xs tabular-nums text-slate-400">
                    {Math.round(explode * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md bg-slate-800/80 p-0.5">
                    {[0.5, 1, 2].map((mult) => (
                      <button
                        key={mult}
                        type="button"
                        onClick={() => setSpeed(mult)}
                        className={`min-h-[30px] rounded px-2 text-xs font-mono tabular-nums cursor-pointer ${
                          speed === mult
                            ? 'bg-slate-600 text-white font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mult}x
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-white/15 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer whitespace-nowrap"
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        {t.atom3dPlayBtn}
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        {t.atom3dPauseBtn}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetCamera}
                    title={t.atom3dResetBtn}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-white/15 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{t.atom3dResetBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
