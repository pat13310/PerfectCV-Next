'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Award, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Mail,
  Phone,
  Link2,
  Globe
} from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Type pour structurer les données du CV
interface CVData {
  personalBranding: {
    accroche: string;
    profilProfessionnel: string;
  };
  personalInfo: {
    civilite: string;
    nomComplet: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    pays: string;
    reseauxPro: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
    };
  };
  experiencesProfessionnelles: {
    experiencesPrecedentes: Array<{
      entreprise: string;
      secteurActivite: string;
      poste: string;
      dateDebut: string;
      dateFin: string;
      duree: string;
      localisation: string;
      missions: string[];
      competencesUtilisees: string[];
    }>;
  };
  formations: {
    diplomesprincipaux: Array<{
      intitule: string;
      specialite: string;
      etablissement: string;
      anneeObtention: string;
    }>;
    formationsContinues: Array<{
      intitule: string;
      organisme: string;
      annee: string;
    }>;
  };
  competences: {
    techniquesMetier: string[];
    langages: string[];
    methodologiesOutils: string[];
    softSkills: string[];
  };
}

export default function CVDetailsPage() {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        console.log('Tentative de récupération des données du CV');
        const response = await fetch('/api/cv/current', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Réponse du serveur:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Données du CV récupérées:', data);
          setCvData(data);
        } else {
          const errorData = await response.json();
          console.error('Erreur lors de la récupération des données:', errorData);
          toast.error('Impossible de charger les données du CV', {
            description: errorData.message || 'Erreur de récupération'
          });
        }
      } catch (error) {
        console.error('Erreur de requête:', error);
        toast.error('Erreur de connexion', {
          description: 'Impossible de se connecter au serveur'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCvData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!cvData) {
    return <div>Aucune donnée de CV disponible</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-4xl text-gray-800">
      {/* Informations Personnelles */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-700 font-semibold mb-4">
            <User className="mr-2" /> Informations Personnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h2 className="text-xl font-medium mb-2">{cvData.personalInfo.nomComplet}</h2>
              <p className="text-sm text-muted-foreground">{cvData.personalBranding.accroche}</p>
              
              <div className="text-sm mt-4 space-y-3">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{cvData.personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{cvData.personalInfo.telephone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{`${cvData.personalInfo.adresse}, ${cvData.personalInfo.ville}, ${cvData.personalInfo.pays}`}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-gray-700">
              <h3 className="font-medium">Profil Professionnel</h3>
              <p className="text-sm">{cvData.personalBranding.profilProfessionnel}</p>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Réseaux Professionnels</h3>
                <div className="space-y-1">
                  {cvData.personalInfo.reseauxPro.linkedin && (
                    <div className="flex items-center text-violet-600">
                      <Link2 className="mr-2 h-4 w-4" />
                      <a href={cvData.personalInfo.reseauxPro.linkedin} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  )}
                  {cvData.personalInfo.reseauxPro.portfolio && (
                    <div className="flex items-center text-violet-600">
                      <Globe className="mr-2 h-4 w-4" />
                      <a href={cvData.personalInfo.reseauxPro.portfolio} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                        Portfolio
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expériences Professionnelles */}
      <Card className="mb-5 ">
        <CardHeader>
          <CardTitle className="text-violet-700 flex items-center mb-4">
            <Briefcase className=" mr-2 " /> Expériences Professionnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cvData.experiencesProfessionnelles.experiencesPrecedentes.map((exp, index) => (
            <div key={index} className="text-gray-700  mb-4 pb-4 border-b last:border-b-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{exp.poste} - {exp.entreprise}</h3>
                <span className="text-sm text-muted-foreground">
                  {exp.dateDebut} - {exp.dateFin} ({exp.duree})
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{exp.secteurActivite} | {exp.localisation}</p>
              
              <ul className="text-gray-600 list-disc list-inside text-sm mb-2">
                {exp.missions.map((mission, missionIndex) => (
                  <li key={missionIndex}>{mission}</li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.competencesUtilisees.map((competence, compIndex) => (
                  <Badge key={compIndex} variant="secondary">{competence}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Formations */}
      <Card className="mb-5">
        <CardHeader >
          <CardTitle className="text-violet-700 flex items-center align-middle mb-2">
            <GraduationCap className="mr-2" /> Formations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-gray-900">
            <h3 className="font-semibold mt-2 mb-2">Diplômes Principaux</h3>
            {cvData.formations.diplomesprincipaux.map((formation, index) => (
              <div key={index} className="mb-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">{formation.intitule}</span>
                  <span className="text-sm text-muted-foreground">{formation.anneeObtention}</span>
                </div>
                <p className="text-xs text-muted-foreground">{formation.etablissement} | {formation.specialite}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Formations Continues</h3>
            {cvData.formations.formationsContinues.map((formation, index) => (
              <div key={index} className="mb-2 flex justify-between">
                <div>
                  <span className="font-medium text-gray-700">{formation.intitule}</span>
                  <p className="text-xs text-muted-foreground">{formation.organisme}</p>
                </div>
                <span className="text-sm text-muted-foreground">{formation.annee}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compétences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-violet-700 flex items-center mb-4">
            <Star className="mr-2" /> Compétences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Techniques Métier</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.techniquesMetier.map((technique, index) => (
                  <Badge className="text-gray-600 bg-gray-50" key={index} variant="outline">{technique}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Langages</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.langages.map((langage, index) => (
                  <Badge className="text-gray-600 bg-gray-50" key={index} variant="outline">{langage}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Méthodologies</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.methodologiesOutils.map((methode, index) => (
                  <Badge className='text-gray-600 bg-gray-50' key={index} variant="outline">{methode}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.softSkills.map((skill, index) => (
                  <Badge className='text-gray-600 bg-gray-50' key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
