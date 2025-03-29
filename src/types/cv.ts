export interface CVAnalysis {
  globalScore: number;
  personalBranding: {
    accroche: string;
    pertinence: number;
  };
  experiencesProfessionnelles: {
    score: number;
    details: Array<{
      poste: string;
      entreprise: string;
      duree: string;
      impact: string[];
      points_forts: string[];
    }>;
    progression: string;
  };
  formations: {
    score: number;
    diplomes: Array<{
      intitule: string;
      etablissement: string;
      annee: string;
      mention: string;
    }>;
    competencesAcquises: string[];
  };
  certifications: Array<{
    nom: string;
    organisme: string;
    annee: string;
    anneeObtention: string;
    validiteJusqua: string | null;
    competencesValidees: string[];
    id?: string;
    link?: string;
  }>;
  competences: {
    techniques: string[];
    soft_skills: string[];
  };
  recommandationsPro: string[];
  pointsAmelioration: string[];
  strengths: string[];
  pointsForts: string[];
}

export interface PersonalInfo {
  civilite: string;
  nomComplet: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;
  phone?: string;
  address?: string;
  summary?: string;
  jobTitle?: string;
  website?: string;
  photoUrl?: string;
  dateNaissance: string;
  reseauxPro?: string[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  id?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  secteurActivite?: string;
  missions?: string[];
  realisationsClés?: string[];
  competencesUtilisees?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Language {
  id: string;
  name: string;
  language: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Interest {
  id: string;
  name: string;
  description?: string;
}

export interface Certification {
  nom: string;
  organisme: string;
  annee: string;
  anneeObtention: string;
  validiteJusqua: string | null;
  competencesValidees: string[];
  id?: string;
  link?: string;
}

export interface CVData {
  id?: string;
  rawText?: string;
  title?: string;
  personalBranding: {
    accroche: string;
    profilProfessionnel: string;
  };
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  projects: Project[];
  certifications: Certification[];
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
  metadonnees?: {
    longueurCV?: number;
    derniereMiseAJour?: string;
    formatOriginal?: string;
  };
  experiencesProfessionnelles?: {
    experiencesActuelles: Experience[];
    experiencesPrecedentes: Experience[];
  };
  formations?: {
    diplomesprincipaux: Array<{
      intitule: string;
      etablissement?: string;
      annee?: string;
      mention?: string;
      ville?: string;
      pays?: string;
    }>;
    formationsContinues?: Array<{
      intitule: string;
      organisme: string;
      annee: string;
      duree: string;
    }>;
  };
}

export interface CV {
  id: string;
  userId: string;
  title: string;
  content: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export interface JobMatch {
  score: number;
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
}
