'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';
import { exportCV, generateShareLink, ExportOptions, ShareOptions } from '@/lib/export';
import { QRCodeSVG } from 'qrcode.react';

interface ShareCVProps {
  cv: CVData;
  theme: Theme;
}

export function ShareCV({ cv, theme }: ShareCVProps) {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'png' | 'json'>('pdf');
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    expiresIn: 7 * 24 * 60, // 7 jours
    allowDownload: true,
    allowPrint: true,
  });
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeQR: true,
    watermark: 'PerfectCV',
    compress: true,
  });

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const blob = await exportCV(cv, theme, {
        ...exportOptions,
        format: exportFormat,
      });

      // Créer un lien de téléchargement
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_${cv.personalInfo.firstName}_${cv.personalInfo.lastName}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Erreur lors de l\'export. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateShareLink(cv, shareOptions);
      setShareUrl(url);
    } catch (err) {
      setError('Erreur lors de la génération du lien. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Exporter le CV</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              className="w-full p-2 border rounded"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
            >
              <option value="pdf">PDF</option>
              <option value="png">Image (PNG)</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeQR}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  includeQR: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <span>Inclure QR Code</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.compress}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  compress: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <span>Compression</span>
            </label>
          </div>

          {exportFormat === 'pdf' && (
            <div>
              <label className="block text-sm font-medium mb-2">Filigrane</label>
              <input
                type="text"
                value={exportOptions.watermark || ''}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  watermark: e.target.value
                })}
                className="w-full p-2 border rounded"
                placeholder="Texte du filigrane"
              />
            </div>
          )}

          <Button
            onClick={handleExport}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Export en cours...' : 'Exporter'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Partager le CV</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expire dans</label>
            <select
              className="w-full p-2 border rounded"
              value={shareOptions.expiresIn}
              onChange={(e) => setShareOptions({
                ...shareOptions,
                expiresIn: Number(e.target.value)
              })}
            >
              <option value={60}>1 heure</option>
              <option value={24 * 60}>1 jour</option>
              <option value={7 * 24 * 60}>1 semaine</option>
              <option value={30 * 24 * 60}>1 mois</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={shareOptions.allowDownload}
                onChange={(e) => setShareOptions({
                  ...shareOptions,
                  allowDownload: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <span>Autoriser le téléchargement</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={shareOptions.allowPrint}
                onChange={(e) => setShareOptions({
                  ...shareOptions,
                  allowPrint: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <span>Autoriser l&apos;impression</span>
            </label>
          </div>

          <Button
            onClick={handleShare}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Génération du lien...' : 'Générer un lien de partage'}
          </Button>

          {shareUrl && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-50"
                />
                <Button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  variant="outline"
                >
                  Copier
                </Button>
              </div>

              <div className="flex justify-center">
                <QRCodeSVG
                  value={shareUrl}
                  size={128}
                  level="M"
                  includeMargin
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
