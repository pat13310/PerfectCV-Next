export interface CVFormData {
  id: string;
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
    experiencesActuelles: Array<{
      entreprise: string;
      secteurActivite: string;
      poste: string;
      dateDebut: string;
      dateFin: string | null;
      duree: string;
      localisation: string;
      missions: string[];
      realisationsClés: string[];
      competencesUtilisees: string[];
    }>;
    experiencesPrecedentes: Array<{
      entreprise: string;
      secteurActivite: string;
      poste: string;
      dateDebut: string;
      dateFin: string;
      duree: string;
      localisation: string;
      missions: string[];
      realisationsClés: string[];
      competencesUtilisees: string[];
    }>;
  };
  formations: {
    diplomesprincipaux: Array<{
      intitule: string;
      specialite: string;
      etablissement: string;
      ville: string;
      pays: string;
      anneeObtention: string;
      mention: string;
      competencesAcademiques: string[];
    }>;
    formationsContinues: Array<{
      intitule: string;
      organisme: string;
      annee: string;
      duree: string;
    }>;
  };
  certifications: Array<{
    nom: string;
    organisme: string;
    anneeObtention: string;
    validiteJusqua: string | null;
    competencesValidees: string[];
  }>;
  competences: {
    techniquesMetier: string[];
    outilsLogiciels: string[];
    langages: string[];
    methodologiesOutils: string[];
    softSkills: string[];
  };
  langues: {
    langue_maternelle: string;
    languesEtrangeres: Array<{
      langue: string;
      niveau: string;
      certification: string | null;
    }>;
  };
  centresInteret: string[];
  recommandations: {
    disponible: boolean;
    type: string | null;
  };
  metadonnees: {
    longueurCV: number;
    derniereMiseAJour: string;
    formatOriginal: string;
  };
  rawText: string;
  template?: string;
}
