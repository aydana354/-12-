import React, { useEffect, useRef } from 'react';
import type { ElementId } from '../types/chemistry';

interface Props {
  elementId: ElementId;
}

export const ElementThematicBackdrop: React.FC<Props> = ({ elementId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pre-allocate particles for Au / Hg / Tl / Pb motifs
    const particles = Array.from({ length: 36 }, (_, i) => ({
      x: ((i * 197) % 1000) / 1000,
      y: ((i * 313) % 1000) / 1000,
      r: 1.2 + (i % 4) * 0.75,
      speed: 0.00018 + (i % 5) * 0.00007,
      phase: i * 0.6,
    }));

    let startTime = performance.now();

    const draw = (now: number) => {
      const t = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      if (elementId === 'au') {
        // Shining floating golden dust particles + warm radial aura
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.25, 20, width * 0.5, height * 0.25, width * 0.65);
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.10)');
        grad.addColorStop(1, 'rgba(9, 7, 5, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        for (const p of particles) {
          const px = (p.x * width + Math.sin(t * 0.4 + p.phase) * 18) % width;
          const py = ((p.y - t * p.speed * 0.5 + 10) % 1) * height;
          const alpha = 0.2 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.phase));
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      } else if (elementId === 'hg') {
        // Liquid metal silvery-blue wave ripples
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.2, 20, width * 0.5, height * 0.2, width * 0.6);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
        grad.addColorStop(1, 'rgba(6, 10, 16, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 1;
        for (let row = 0; row < 5; row++) {
          ctx.beginPath();
          const baseY = height * (0.18 + row * 0.16);
          ctx.strokeStyle = `rgba(148, 163, 184, ${0.07 - row * 0.01})`;
          for (let x = 0; x <= width; x += 28) {
            const y = baseY + Math.sin(x * 0.005 + t * 0.8 + row) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (elementId === 'tl') {
        // Glowing emerald 535nm spectral lines + deep violet aura
        const grad = ctx.createRadialGradient(width * 0.72, height * 0.2, 10, width * 0.72, height * 0.2, width * 0.55);
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.11)');
        grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
        grad.addColorStop(1, 'rgba(7, 6, 16, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Spectral vertical lines reminiscent of emission spectrum
        const spectralOffsets = [0.12, 0.28, 0.535, 0.69, 0.84];
        spectralOffsets.forEach((pos, idx) => {
          const x = width * pos;
          const pulse = 0.05 + 0.04 * Math.sin(t * 1.2 + idx);
          ctx.strokeStyle =
            idx === 2
              ? `rgba(16, 185, 129, ${(pulse + 0.07).toFixed(3)})`
              : `rgba(168, 85, 247, ${pulse.toFixed(3)})`;
          ctx.lineWidth = idx === 2 ? 2 : 1;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        });
      } else {
        // Pb: Geometric crystalline FCC isometric lattice pattern
        const grad = ctx.createRadialGradient(width * 0.4, height * 0.25, 20, width * 0.4, height * 0.25, width * 0.6);
        grad.addColorStop(0, 'rgba(96, 165, 250, 0.09)');
        grad.addColorStop(1, 'rgba(7, 9, 14, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(148, 163, 184, 0.055)';
        ctx.lineWidth = 1;
        const step = 72;
        for (let x = -height; x < width + height; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + height * 0.55, height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x - height * 0.55, height);
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    draw(performance.now());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [elementId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};
