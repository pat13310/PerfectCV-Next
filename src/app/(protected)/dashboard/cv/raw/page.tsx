'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface CVData {
  personal?: {
    summary?: string;
  };
  skills?: Array<{ name: string; level: string }>;
  education?: Array<{
    degree: string;
    field: string;
    school: string;
    startDate: string;
    endDate: string;
  }>;
  experience?: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
  }>;
  hobbies?: string[];
}

export default function EditCVPage() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCVData() {
      try {
        const response = await fetch('/api/session/cv');
        
        console.log('Réponse du serveur:', response);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erreur de réponse:', errorData);
          throw new Error(errorData.error || 'Impossible de récupérer les données du CV');
        }

        const data = await response.json();
        console.log('Données CV récupérées:', data);
        
        setCvData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du CV:', error);
        toast.error(error instanceof Error ? error.message : 'Erreur inconnue lors du chargement du CV');
        setIsLoading(false);
      }
    }

    fetchCVData();
  }, []);

  const renderSection = (title: string, content: string | any) => {
    if (!content) return null;
    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-violet-800 mb-2">{title}</h3>
        <p className="text-gray-700">{typeof content === 'string' ? content : JSON.stringify(content, null, 2)}</p>
      </div>
    );
  };

  const renderFormattedCV = () => {
    if (!cvData) return <p>Aucune donnée disponible</p>;

    return (
      <div className="space-y-4">
        {renderSection('Informations Personnelles', cvData.personal?.summary || 'Non renseigné')}
        {renderSection('Résumé', cvData.personal?.summary || 'Aucun résumé')}
        {renderSection('Compétences', cvData.skills?.map(skill => `${skill.name} (${skill.level})`).join(', ') || 'Aucune compétence')}
        {renderSection('Formation', cvData.education?.map(edu => 
          `${edu.degree} en ${edu.field} de ${edu.school} (${edu.startDate} - ${edu.endDate})`
        ).join('\n') || 'Aucune formation')}
        {renderSection('Expériences Professionnelles', cvData.experience?.map(exp => 
          `${exp.position} chez ${exp.company} (${exp.startDate} - ${exp.endDate})`
        ).join('\n') || 'Aucune expérience')}
        {renderSection('Loisirs', cvData.hobbies?.join(', ') || 'Aucun loisir')}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-0">
        <Card className="shadow-2xl w-full max-w-4xl mx-auto bg-violet-50 border border-violet-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl font-bold text-violet-800 mb-4">
              Chargement des données du CV...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-violet-600">
              Veuillez patienter...
            </div>
          </CardContent>
        </Card>
      </div>
    ); 
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6 text-violet-600" />
          <h1 className="ml-3 text-lg font-semibold leading-6 text-gray-900">
            CV Brut
          </h1>
        </div>
        <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
          Aperçu
        </span>
      </div>

      <div className="flex-grow overflow-hidden p-4">
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Colonne 1: Texte brut */}
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-auto scrollbar-thin scrollbar-thumb-gradient-to-r from-violet-500 to-pink-500 scrollbar-track-violet-100">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {cvData ? JSON.stringify(cvData, null, 2) : 'Aucune donnée de CV disponible'}
            </pre>
          </div>

          {/* Colonne 2: CV formatté */}
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-auto scrollbar-thin scrollbar-thumb-gradient-to-r from-violet-500 to-pink-500 scrollbar-track-violet-100 text-gray-800">
            {renderFormattedCV()}
          </div>
        </div>
      </div>
    </div>
  );
}
