'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/PrimaryButton';
import { toast } from 'sonner';
import { Copy, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { extractCVData } from '@/lib/documentParser';

export default function RawCVPage() {
  const [rawText, setRawText] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Récupérer les données du localStorage
    const storedRawText = localStorage.getItem('rawCVText');
    const storedExtractedData = localStorage.getItem('extractedCVData');

    if (storedRawText) {
      setRawText(storedRawText);
    }

    if (storedExtractedData) {
      try {
        setExtractedData(JSON.parse(storedExtractedData));
      } catch (error) {
        console.error('Erreur de parsing des données extraites', error);
      }
    }

    // Nettoyer le localStorage après récupération
    localStorage.removeItem('rawCVText');
    localStorage.removeItem('extractedCVData');
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Texte copié dans le presse-papiers');
    }).catch(err => {
      console.error('Erreur de copie', err);
      toast.error('Impossible de copier le texte');
    });
  };

  const startAIAnalysis = async () => {
    if (!rawText) {
      toast.error('Aucun texte à analyser');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Extraction des données du CV
      const extractedData = await extractCVData(rawText);
      
      if (!extractedData) {
        toast.error('Impossible d\'extraire les données du CV');
        setIsAnalyzing(false);
        return;
      }

      // Stocker les données pour l'analyse côté serveur
      localStorage.setItem('cvDataForAnalysis', JSON.stringify(extractedData));
      
      // Rediriger vers la page de résultats
      router.push('/dashboard/cv/analyze-results');
    } catch (error) {
      console.error('Erreur lors de l\'analyse AI:', error);
      toast.error('Erreur lors de l\'analyse du CV');
      setIsAnalyzing(false);
    }
  };

  if (!rawText) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Aucune donnée disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">Veuillez importer un CV d'abord.</p>
            <Button 
              onClick={() => router.push('/dashboard/cv/new/import')} 
              className="mt-4"
            >
              Retour à l'import
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard/cv/new/import')}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'import
        </Button>
        <div className="flex space-x-4">
          <Button 
            onClick={() => copyToClipboard(rawText)}
            className="flex items-center"
          >
            <Copy className="mr-2 h-4 w-4" /> Copier le texte brut
          </Button>
          <Button 
            onClick={startAIAnalysis}
            disabled={isAnalyzing}
            className="flex items-center bg-purple-600 hover:bg-purple-700"
          >
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Lancer l'analyse AI
          </Button>
        </div>
      </div>

      <Card className="shadow-2xl bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Texte brut extrait
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea 
            readOnly 
            value={rawText} 
            className="w-full h-96 p-4 border rounded bg-gray-50 font-mono text-sm"
          />
        </CardContent>
      </Card>

      {extractedData && (
        <Card className="mt-6 shadow-2xl bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Données extraites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="w-full p-4 border rounded bg-gray-50 font-mono text-sm overflow-x-auto">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
