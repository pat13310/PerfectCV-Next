import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';
import { PDFDocument, rgb, PDFPage } from 'pdf-lib';
import QRCode from 'qrcode';
import { toPng } from 'html-to-image';

export interface ExportOptions {
  format: 'pdf' | 'png' | 'json';
  includeQR?: boolean;
  watermark?: string;
  compress?: boolean;
  password?: string;
}

export interface ShareOptions {
  expiresIn?: number; // minutes
  allowDownload?: boolean;
  allowPrint?: boolean;
  password?: string;
}

export interface ShareData {
  id: string;
  cvId: string;
  expiresAt: string | null;
  allowDownload?: boolean;
  allowPrint?: boolean;
  hasPassword: boolean;
}

export async function exportCV(
  cv: CVData,
  theme: Theme,
  options: ExportOptions
): Promise<Blob> {
  switch (options.format) {
    case 'pdf':
      return await exportToPDF(cv, theme, options);
    case 'png':
      return await exportToPNG(cv, theme, options);
    case 'json':
      return new Blob([JSON.stringify({ cv, theme }, null, 2)], {
        type: 'application/json'
      });
    default:
      throw new Error('Format non supporté');
  }
}

async function exportToPDF(
  cv: CVData,
  theme: Theme,
  options: ExportOptions
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.276, 841.890]); // A4

  // Ajouter le contenu du CV...
  if (options.watermark) {
    const { width, height } = page.getSize();
    const fontSize = Math.min(width, height) * 0.05; // Taille adaptative
    const degrees = -30; // Rotation en degrés
    
    // Répéter le filigrane plusieurs fois
    const positions = [
      { x: width * 0.25, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.75 },
      { x: width * 0.25, y: height * 0.75 },
      { x: width * 0.75, y: height * 0.25 },
    ];

    positions.forEach(pos => {
      page.drawText(options.watermark!, {
        x: pos.x,
        y: pos.y,
        size: fontSize,
        color: rgb(0.85, 0.85, 0.85),
        opacity: 0.2,
      });
    });
  }

  if (options.includeQR) {
    const qrCodeData = {
      type: 'cv' as const,
      name: `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`,
      version: '1.0' as const
    };
    
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData));
    
    // TODO: Implémenter l'ajout du QR code au PDF
    console.log('QR Code généré:', qrCode);
  }

  const pdfBytes = await pdfDoc.save();

  if (options.compress) {
    // TODO: Implémenter la compression du PDF
    console.warn('La compression PDF n\'est pas encore implémentée');
  }

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

async function exportToPNG(
  cv: CVData,
  theme: Theme,
  options: ExportOptions
): Promise<Blob> {
  const element = document.getElementById('cv-container');
  if (!element) throw new Error('Élément CV non trouvé');

  const dataUrl = await toPng(element, {
    quality: 0.95,
    width: 2480, // A4 @ 300dpi
    height: 3508,
    cacheBust: true,
  });

  const response = await fetch(dataUrl);
  return await response.blob();
}

export async function generateShareLink(
  cv: CVData,
  options: ShareOptions
): Promise<string> {
  const shareId = Math.random().toString(36).substring(7);
  const expiresAt = options.expiresIn 
    ? new Date(Date.now() + options.expiresIn * 60000).toISOString()
    : null;

  const shareData: ShareData = {
    id: shareId,
    cvId: cv.id,
    expiresAt,
    allowDownload: options.allowDownload,
    allowPrint: options.allowPrint,
    hasPassword: !!options.password
  };

  // En production, sauvegarder shareData dans la base de données
  console.log('Share data:', shareData);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/share/${shareId}`;
}

export async function validateShareLink(
  shareId: string,
  password?: string
): Promise<boolean> {
  // TODO: Implémenter la validation avec la base de données
  console.warn('La validation des liens de partage n\'est pas encore implémentée');
  return true;
}

export function generateCVMetadata(cv: CVData): Record<string, string> {
  return {
    'dc:title': `CV de ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`,
    'dc:creator': `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`,
    'dc:description': cv.personalInfo.summary || 'CV sans description',
    'dc:date': new Date().toISOString(),
    'dc:format': 'application/pdf',
    'dc:language': 'fr',
    'xmp:CreatorTool': 'PerfectCV',
    'pdf:Keywords': cv.skills?.map(skill => typeof skill === 'string' ? skill : skill.name).join(', ') || '',
  };
}
