'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/PrimaryButton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { FileUp, FileText, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { extractRawText } from '@/lib/documentParser';
import { OpenAIErrorDetails } from '@/lib/openaiErrors';
import { handleOpenAIError } from '@/lib/openaiErrors';
import { CVFormData } from '@/types/cvForm';
import { CVData } from '@/types/cv';
import { Interest } from '@/types/cv';
import { v4 as uuidv4 } from 'uuid';

export default function ImportCVPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState<string | null>(null);
  const [openAIError, setOpenAIError] = useState<OpenAIErrorDetails | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        
        // Create a preview for the file
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Seuls les fichiers PDF et DOCX sont autorisés.');
        setSelectedFile(null);
        setFilePreview(null);
      }
    }
  };

  const handleScanCV = async () => {
    if (!selectedFile) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanStage('Préparation...');

    try {
      // Étape 1 : Extraction du texte brut
      setScanStage('Extraction du texte...');
      const rawText = await extractRawText(selectedFile);
      setScanProgress(30);

      // Log du fichier avant extraction
      console.log('Fichier à extraire:', selectedFile);
      console.log('Type de fichier:', selectedFile.type);
      console.log('Taille du fichier:', selectedFile.size, 'bytes');

      // Log du texte extrait
      console.log('Texte extrait:', rawText.substring(0, 500) + '...');
      console.log('Longueur du texte:', rawText.length, 'caractères');

      setScanProgress(40);

      // Étape 2 : Extraction structurée des données via API
      setScanStage('Analyse du CV...');
      const response = await fetch('/api/extract-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rawText }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Détails de l\'erreur:', errorDetails);
        throw new Error(`Impossible d'extraire les données du CV. Erreur: ${errorDetails}`);
      }

      const extractedData = await response.json();
      
      // Log des données extraites
      console.log('Données extraites:', extractedData);

      setScanProgress(60);

      // Étape 3 : Préparation des données pour le formulaire
      const cvFormData: CVFormData = {
        id: uuidv4(),
        personalBranding: {
          accroche: extractedData.personalBranding?.accroche || '',
          profilProfessionnel: extractedData.personalBranding?.profilProfessionnel || '',
        },
        personalInfo: {
          civilite: extractedData.personalInfo?.civilite || '',
          nomComplet: extractedData.personalInfo?.nomComplet || '',
          email: extractedData.personalInfo?.email || '',
          telephone: extractedData.personalInfo?.telephone || '',
          adresse: extractedData.personalInfo?.adresse || '',
          ville: extractedData.personalInfo?.ville || '',
          pays: extractedData.personalInfo?.pays || '',
          reseauxPro: {
            linkedin: extractedData.personalInfo?.reseauxPro?.linkedin || '',
            github: extractedData.personalInfo?.reseauxPro?.github || '',
            portfolio: extractedData.personalInfo?.reseauxPro?.portfolio || '',
          },
        },
        experiencesProfessionnelles: {
          experiencesActuelles: extractedData.experiencesProfessionnelles?.experiencesActuelles || [],
          experiencesPrecedentes: extractedData.experiencesProfessionnelles?.experiencesPrecedentes || [],
        },
        formations: {
          diplomesprincipaux: extractedData.formations?.diplomesprincipaux || [],
          formationsContinues: extractedData.formations?.formationsContinues || [],
        },
        certifications: extractedData.certifications || [],
        competences: {
          techniquesMetier: extractedData.competences?.techniquesMetier || [],
          outilsLogiciels: extractedData.competences?.outilsLogiciels || [],
          langages: extractedData.competences?.langages || [],
          methodologiesOutils: extractedData.competences?.methodologiesOutils || [],
          softSkills: extractedData.competences?.softSkills || [],
        },
        langues: {
          langue_maternelle: extractedData.langues?.langue_maternelle || '',
          languesEtrangeres: extractedData.langues?.languesEtrangeres || [],
        },
        centresInteret: extractedData.centresInteret || [],
        recommandations: extractedData.recommandations || { disponible: false, type: null },
        metadonnees: extractedData.metadonnees || { 
          longueurCV: 0, 
          derniereMiseAJour: new Date().toISOString(), 
          formatOriginal: selectedFile?.type || '' 
        },
        rawText: rawText,
        template: undefined,
      };

      setScanProgress(90);
      setScanStage('Finalisation...');

      // Envoi des données du CV via POST
      try {
        console.log('Tentative d\'envoi des données du CV', JSON.stringify(cvFormData, null, 2));
        
        const response = await fetch('/api/cv/current', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cvFormData),
        });

        console.log('Réponse du serveur (statut):', response.status);

        // Toujours essayer de parser la réponse, qu'elle soit ok ou non
        const responseData = await response.json();
        console.log('Données de réponse complètes:', responseData);

        if (response.ok) {
          console.log('CV envoyé avec succès', responseData);
          toast.success('CV importé avec succès');
          router.push('/dashboard/cv/new/details');
        } else {
          console.error('Erreur lors de l\'envoi des données:', responseData);
          toast.error('Erreur lors de l\'importation du CV', {
            description: responseData.message || 'Une erreur est survenue lors de l\'importation'
          });
        }
      } catch (error) {
        console.error('Erreur réseau ou de parsing:', error);
        toast.error('Erreur de connexion', {
          description: 'Impossible de se connecter au serveur'
        });
      }

      setScanProgress(100);
    } catch (error) {
      console.error('Erreur lors du scan du CV :', error);
      toast.error('Échec de l\'analyse du CV');
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleScanCV();
    }
  }, [selectedFile]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="shadow-2xl w-full max-w-sm mx-auto bg-violet-50 border border-violet-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl font-bold text-violet-800 mb-4">
            Importer votre CV
          </CardTitle>
          <div className="text-justify text-sm text-violet-600 mt-1">
            Téléchargez votre CV au format PDF ou DOCX. Notre expert IA l'analysera automatiquement pour extraire vos compétences et expériences.
          </div>
        </CardHeader>
        <CardContent>
          {!isScanning ? (
            <div className="space-y-6">
              <div 
                className={`
                  flex flex-col items-center justify-center w-full 
                  border-2 border-dashed rounded-lg p-6 
                  transition-all duration-300 
                  ${selectedFile 
                    ? 'border-violet-500 bg-violet-100' 
                    : 'border-violet-300 hover:border-violet-600'}
                `}
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-violet-600" />
                      <p className="mt-3 text-sm text-violet-800 text-center">
                        {selectedFile.name}
                        <br />
                        <span className="text-xs text-violet-600">
                          {(selectedFile.size / 1024).toFixed(2)} Ko</span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FileUp className="w-12 h-12 text-violet-400" />
                      <p className="mt-3 text-sm text-violet-600 text-center">
                        Cliquez pour choisir un fichier PDF ou DOCX
                        <br />
                        <span className="text-xs text-violet-500">
                          Taille maximale : 5 Mo</span>
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center bg-violet-50 p-6 rounded-lg">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-violet-600" />
              <div>
                <p className="text-sm text-violet-800 mb-2">{scanStage}</p>
                <Progress 
                  value={scanProgress} 
                  className="w-full bg-violet-200" 
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {openAIError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              {openAIError.message}
            </h2>
            {openAIError.details && (
              <p className="text-gray-600 mb-4">{openAIError.details}</p>
            )}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setOpenAIError(null)}
              >
                Fermer
              </Button>
              <Button 
                onClick={() => router.push('/parametres')}
              >
                Aller aux paramètres
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
