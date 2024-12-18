'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { PreviewContent, PreviewContentRef } from '@/components/cv/PreviewContent';
import { Button } from '@/components/ui/PrimaryButton';
import { ArrowLeftIcon, PrinterIcon, ShareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { TemplateList } from "@/components/cv/TemplateList";
import { TemplateColor } from "@/components/cv/TemplateColor";

interface CV {
  id: string;
  title: string;
  content: string;
  templateId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function CVPreviewPage() {
  const params = useParams();
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<PreviewContentRef>(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch(`/api/cv/${params.id}/preview`);
        if (!response.ok) {
          throw new Error('Failed to fetch CV');
        }
        const data = await response.json();
        setCv(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCV();
    }
  }, [params.id]);

  const handlePrint = () => {
    previewRef.current?.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/dashboard/resumes">
            <Button>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour aux CV
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">CV non trouvé</h2>
          <p className="text-gray-600 mb-4">Le CV que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link href="/dashboard/resumes">
            <Button>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour aux CV
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header avec actions */}
        <div className="bg-white border-b sticky top-0 z-10 print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/resumes">
                  <Button variant="primary" className='bg-gradient-to-r from-violet-600 to-pink-500
      hover:from-violet-500 hover:to-pink-400'>
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">{cv.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="xs" onClick={handlePrint}>
                  <PrinterIcon className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
                <Button variant="outline" size="xs">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Zone de prévisualisation */}
        <div className="flex-1 overflow-auto">
          <PreviewContent ref={previewRef} cv={cv} />
        </div>
      </div>

      {/* Panneau latéral des templates */}
      <div className="w-80 bg-gray-50 border border-l overflow-hidden print:hidden">
        <div className="border-b">
          <TemplateList />
        </div>
        <div className="">
          <TemplateColor />
        </div>
      </div>
    </div>
  );
}
