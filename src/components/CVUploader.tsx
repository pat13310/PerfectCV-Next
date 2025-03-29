'use client';

import React, { useState, FormEvent } from 'react';
import { toast } from 'sonner';

interface CVData {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  experience?: Array<{
    position?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
  }>;
  template?: string;
}

export default function CVUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Vérifier l'extension du fichier
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        toast.error('Seuls les fichiers PDF sont autorisés');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Veuillez sélectionner un fichier PDF');
      return;
    }

    setIsLoading(true);
    setCvData(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parsepdf', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors du traitement du CV');
      }

      setCvData(result.data);
      toast.success('CV importé avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Importation de CV</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="dropzone-file" 
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg 
                className="w-10 h-10 mb-3 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                {file 
                  ? `Fichier sélectionné: ${file.name}` 
                  : 'Glissez et déposez un fichier PDF ou cliquez pour sélectionner'}
              </p>
              <p className="text-xs text-gray-500">PDF uniquement (max. 50MB)</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              className="hidden" 
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={!file || isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 ${
            file && !isLoading 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Traitement en cours...' : 'Importer le CV'}
        </button>
      </form>

      {cvData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Informations Extraites</h3>
          {cvData.personalInfo && (
            <div>
              <h4 className="font-medium">Informations Personnelles</h4>
              <p>Nom: {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</p>
              <p>Email: {cvData.personalInfo.email}</p>
            </div>
          )}
          {cvData.experience && cvData.experience.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Expériences</h4>
              {cvData.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p>{exp.position} @ {exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}
          {cvData.template && (
            <div className="mt-4">
              <h4 className="font-medium">Template</h4>
              <p>{cvData.template}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
