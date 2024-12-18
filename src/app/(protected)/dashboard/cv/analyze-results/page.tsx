'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/PrimaryButton';
import { toast } from 'sonner';
import { CVData } from '@/types/cv';
import { CVAnalysis } from '@/types/cv';

export default function AnalyzeResultsPage() {
  const router = useRouter();
  const [rawText, setRawText] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<CVData | null>(null);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRawText = localStorage.getItem('rawCVText');

    if (!storedRawText) {
      toast.error('Aucun texte de CV disponible');
      router.push('/dashboard/cv/new/import');
      return;
    }

    setRawText(storedRawText);

    async function analyzeCV() {
      try {
        const response = await fetch('/api/cv/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rawText: storedRawText })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de l\'analyse du CV');
        }

        const data = await response.json();
        
        setExtractedData(data.extractedData);
        setAnalysis(data.analysis);
        setIsLoading(false);

        // Nettoyer le localStorage
        localStorage.removeItem('rawCVText');
      } catch (error) {
        console.error('Erreur lors de l\'analyse du CV:', error);
        toast.error(error instanceof Error ? error.message : 'Erreur inconnue');
        setIsLoading(false);
      }
    }

    analyzeCV();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
          <p className="text-gray-600">Analyse de votre CV en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* En-tête avec icône et badge */}
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6 text-violet-600" />
          <h1 className="ml-3 text-lg font-semibold leading-6 text-gray-900">
            Analyse de Votre CV
          </h1>
        </div>
        <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
          AI
        </span>
      </div>

      {/* Contenu de l'analyse */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Informations Personnelles - Toujours afficher */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-600">
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-600 mb-1">Identité</h4>
                <p>{extractedData?.personalInfo?.civilite} {extractedData?.personalInfo?.nomComplet}</p>
                <p>Email: {extractedData?.personalInfo?.email}</p>
                <p>Téléphone: {extractedData?.personalInfo?.telephone}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600 mb-1">Localisation</h4>
                <p>{extractedData?.personalInfo?.adresse}</p>
                <p>{extractedData?.personalInfo?.ville}, {extractedData?.personalInfo?.pays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Global */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-600">
              Score Global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-violet-600">
                  {analysis?.globalScore || 0}/100
                </div>
                <p className="text-sm text-gray-500">Score de votre CV</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points Forts et Axes d'Amélioration */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-600">
                Points Forts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {analysis?.strengths?.map((point, index) => (
                  <li key={index} className="text-green-600">{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-600">
                Axes d'Amélioration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {analysis?.pointsAmelioration?.map((point, index) => (
                  <li key={index} className="text-orange-600">{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Expériences Professionnelles */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-600">
              Expériences Professionnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis?.experiencesProfessionnelles?.details?.map((exp, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">{exp.poste}</h4>
                  <span className="text-sm text-gray-500">{exp.duree}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.entreprise}</p>
                {exp.impact && (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {exp.impact.map((mission, idx) => (
                      <li key={idx}>{mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Formations */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-600">
              Formations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis?.formations?.diplomes?.map((formation, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">{formation.intitule}</h4>
                  <span className="text-sm text-gray-500">{formation.annee}</span>
                </div>
                <p className="text-sm text-gray-600">{formation.etablissement}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compétences */}
        <Card className="shadow-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-600">
              Compétences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-600 mb-2">Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis?.competences?.techniques?.map((skill, index) => (
                    <span key={index} className="bg-violet-50 text-violet-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-600 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis?.competences?.soft_skills?.map((skill, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
