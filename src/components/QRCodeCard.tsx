import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { Download, ExternalLink } from 'lucide-react';
import type { ElementData } from '../types/chemistry';
import { useApp } from '../context/AppContext';

interface QRCodeCardProps {
  element: ElementData;
  showOpenButton?: boolean;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ element, showOpenButton = true }) => {
  const { language, t } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [targetUrl, setTargetUrl] = useState(`/element/${element.id}`);

  useEffect(() => {
    const fullUrl = `${window.location.origin}/element/${element.id}`;
    setTargetUrl(fullUrl);
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      fullUrl,
      {
        width: 196,
        margin: 2,
        color: {
          dark: '#090d16',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      },
      () => {
        // Rendered cleanly
      }
    );
  }, [element.id]);

  const handleDownload = async () => {
    const fullUrl = `${window.location.origin}/element/${element.id}`;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 520;
    exportCanvas.height = 640;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Dark museum card background
    ctx.fillStyle = '#070a12';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Subtle border
    ctx.strokeStyle = element.theme.accentHex;
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, exportCanvas.width - 32, exportCanvas.height - 32);

    // Header text
    ctx.fillStyle = element.theme.accentHex;
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${element.symbol} · №${element.atomicNumber}`, 260, 82);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${element.names[language]} (${element.names.en})`, 260, 122);

    // White QR square
    const qrCanvas = document.createElement('canvas');
    await QRCode.toCanvas(qrCanvas, fullUrl, {
      width: 320,
      margin: 2,
      color: { dark: '#090d16', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    });

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(92, 152, 336, 336);
    ctx.drawImage(qrCanvas, 100, 160, 320, 320);

    // URL and author footer
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    const shortUrl = fullUrl.length > 52 ? `${fullUrl.slice(0, 49)}...` : fullUrl;
    ctx.fillText(shortUrl, 260, 526);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`${t.brandTitle}`, 260, 566);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '14px sans-serif';
    ctx.fillText(`${t.authorLabel}: ${t.authorValue}`, 260, 594);

    const link = document.createElement('a');
    link.download = `qr-${element.id}-${element.atomicNumber}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0b101d]/90 p-5">
      <div>
        <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className={`font-mono text-xl font-bold ${element.theme.accentTextClass}`}>
              {element.symbol}
            </span>
            <span className="ml-2 font-display text-base font-semibold text-white">
              {element.names[language]}
            </span>
          </div>
          <span className="font-mono text-xs tabular-nums text-slate-400">
            №{element.atomicNumber}
          </span>
        </div>

        <div className="my-5 flex justify-center">
          <div className="rounded-xl bg-white p-2 shadow-lg">
            <canvas ref={canvasRef} className="block h-[168px] w-[168px]" />
          </div>
        </div>

        <p className="mb-1 text-[11px] text-slate-400">{t.qrDirectUrlLabel}</p>
        <p className="mb-4 truncate font-mono text-[11px] text-slate-300" title={targetUrl}>
          {targetUrl}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className={`inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-slate-950 transition-colors cursor-pointer whitespace-nowrap ${element.theme.accentBgClass} ${element.theme.accentHoverBgClass}`}
        >
          <Download className="h-4 w-4 shrink-0" />
          {t.qrDownloadBtn}
        </button>
        {showOpenButton && (
          <Link
            to={`/element/${element.id}`}
            className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {t.qrOpenPageBtn}
          </Link>
        )}
      </div>
    </div>
  );
};
