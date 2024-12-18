'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Document, Page, pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/PrimaryButton';

interface PDFExportProps {
  templateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

export function PDFExport({ templateRef, fileName }: PDFExportProps) {
  const handleDownload = async () => {
    if (templateRef.current) {
      try {
        // Convert template to image
        const dataUrl = await toPng(templateRef.current, {
          quality: 1,
          pixelRatio: 2,
        });

        // Create PDF document
        const MyDocument = () => (
          <Document>
            <Page size="A4">
              <img src={dataUrl} style={{ width: '100%' }} />
            </Page>
          </Document>
        );

        // Generate PDF blob
        const blob = await pdf(<MyDocument />).toBlob();
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  return (
    <Button onClick={handleDownload}>
      Télécharger PDF
    </Button>
  );
}
