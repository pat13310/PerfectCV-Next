import mammoth from 'mammoth';
import { Buffer } from 'buffer';
import { 
  CVData, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill, 
  Language, 
  Interest, 
  Project, 
  Certification 
} from '@/types/cv';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { extractPhone as extractTelephone } from './dataExtractor';

// Type pour l'objet window avec pdfjsLib
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

/**
 * Charge PDF.js depuis le CDN si nécessaire
 */
async function loadPdfJS(): Promise<void> {
  if (window.pdfjsLib) return;

  // Charger le script principal de PDF.js
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });

  // Configurer le worker
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

/**
 * Extraction du texte d'un fichier PDF
 */
async function extractPDFText(file: File): Promise<string> {
  try {
    console.log('Lecture du fichier PDF:', file.name, 'Taille:', file.size, 'bytes');
    
    // Charger PDF.js si nécessaire
    await loadPdfJS();
    
    // Convertir le fichier en ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Charger le document PDF
    console.log('Chargement du document PDF...');
    const loadingTask = window.pdfjsLib.getDocument(arrayBuffer);
    const pdf = await loadingTask.promise;
    
    console.log('Document chargé, nombre de pages:', pdf.numPages);
    
    // Extraire le texte de toutes les pages
    let fullText = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: { str: string }) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    console.log('Extraction terminée', {
      nombreCaracteres: fullText.length,
      nombrePages: pdf.numPages
    });
    
    return fullText.trim();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erreur lors de l\'extraction du texte PDF:', error.message);
      throw new Error(`Erreur lors de l'extraction du PDF : ${error.message}`);
    } else {
      console.error('Erreur lors de l\'extraction du texte PDF:', error);
      throw new Error(`Erreur lors de l'extraction du PDF : Une erreur inconnue s'est produite`);
    }
  }
}

// Extraction du texte d'un fichier Word (.docx) grâce à mammoth.
async function extractWordText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// Extraction du texte brut selon le type de fichier.
async function extractRawText(file: File): Promise<string> {
  const fileType = file.type;
  
  switch (fileType) {
    case 'application/pdf':
      return await extractPDFText(file);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return await extractWordText(file);
    default:
      throw new Error(`Type de fichier non supporté : ${fileType}`);
  }
}

// Extraction des données du CV.
export function extractDocumentData(text: string): CVData {
  // Implémentation de l'extraction des données du document
  return {
    personalBranding: {
      accroche: extractAccroche(text),
      profilProfessionnel: '' // À implémenter
    },
    personalInfo: extractPersonalInfo(text),
    experience: extractExperiences(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    languages: extractLanguages(text),
    interests: extractInterests(text),
    projects: extractProjects(text),
    certifications: extractCertifications(text),
    competences: {
      techniquesMetier: extractTechniquesMetier(text),
      outilsLogiciels: extractOutilsLogiciels(text),
      langages: [], // À implémenter si nécessaire
      methodologiesOutils: extractMethodologiesOutils(text),
      softSkills: extractSoftSkills(text)
    },
    langues: {
      langue_maternelle: extractLangueMaternelle(text),
      languesEtrangeres: extractLanguesEtrangeres(text)
    },
    centresInteret: extractCentresInteret(text),
    recommandations: extractRecommandations(text)
  };
}

// Nouvelles fonctions d'extraction à implémenter
function extractAccroche(text: string): string {
  // Logique pour extraire la phrase d'accroche
  return '';
}

function extractProfilProfessionnel(text: string): string {
  // Logique pour extraire le profil professionnel
  return '';
}

function extractCivilite(text: string): string {
  // Logique pour extraire la civilité
  return '';
}

function extractNomComplet(text: string): string {
  // Logique pour extraire le nom complet
  return '';
}

function extractAdresse(text: string): string {
  // Logique pour extraire l'adresse
  return '';
}

function extractVille(text: string): string {
  // Logique pour extraire la ville
  return '';
}

function extractPays(text: string): string {
  // Logique pour extraire le pays
  return '';
}

function extractLinkedin(text: string): string {
  // Logique pour extraire le lien LinkedIn
  return '';
}

function extractGithub(text: string): string {
  // Logique pour extraire le lien GitHub
  return '';
}

function extractPortfolio(text: string): string {
  // Logique pour extraire le lien du portfolio
  return '';
}

function extractExperiencesActuelles(text: string): any[] {
  // Logique pour extraire les expériences actuelles
  return [];
}

function extractExperiencesPrecedentes(text: string): any[] {
  // Logique pour extraire les expériences précédentes
  return [];
}

function extractDiplomesPrincipaux(text: string): any[] {
  // Logique pour extraire les diplômes principaux
  return [];
}

function extractFormationsContinues(text: string): any[] {
  // Logique pour extraire les formations continues
  return [];
}

function extractCertificationsDetaillees(text: string): any[] {
  // Logique pour extraire les certifications détaillées
  return [];
}

function extractTechniquesMetier(text: string): string[] {
  // Logique pour extraire les techniques métier
  return [];
}

function extractOutilsLogiciels(text: string): string[] {
  // Logique pour extraire les outils logiciels
  return [];
}

function extractMethodologiesOutils(text: string): string[] {
  // Logique pour extraire les méthodologies et outils
  return [];
}

function extractSoftSkills(text: string): string[] {
  // Logique pour extraire les soft skills
  return [];
}

function extractLangueMaternelle(text: string): string {
  // Logique pour extraire la langue maternelle
  return '';
}

function extractLanguesEtrangeres(text: string): any[] {
  // Logique pour extraire les langues étrangères
  return [];
}

function extractCentresInteret(text: string): string[] {
  // Logique pour extraire les centres d'intérêt
  return [];
}

function extractRecommandations(text: string): { disponible: boolean; type: string | null } {
  // Logique pour extraire les recommandations
  return { disponible: false, type: null };
}

function extractPersonalInfo(text: string): PersonalInfo {
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let address = '';

  // Extraction du civilité
  const civilite = extractCivilite(text);

  // Extraction du nom complet
  const nomComplet = extractNomComplet(text);

  // Extraction de l'adresse
  const adresse = extractAdresse(text);

  // Extraction de la ville
  const ville = extractVille(text);

  // Extraction du pays
  const pays = extractPays(text);

  // Extraction des réseaux pro
  const linkedin = extractLinkedin(text);
  const github = extractGithub(text);
  const portfolio = extractPortfolio(text);

  // Logique d'extraction existante
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    email = emailMatch[0];
  }

  const phoneRegex = /(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    phone = phoneMatch[0];
  }

  // Extraction du prénom et du nom
  const nameRegex = /([A-Z][a-z]+)\s+([A-Z][a-z]+)/;
  const nameMatch = text.match(nameRegex);
  if (nameMatch) {
    firstName = nameMatch[1];
    lastName = nameMatch[2];
  } else {
    firstName = 'Candidat';
    lastName = 'Non Spécifié';
  }

  console.log('Informations personnelles extraites:', {
    civilite,
    nomComplet,
    firstName,
    lastName,
    email,
    telephone: phone,
    adresse,
    ville,
    pays
  });

  return {
    civilite,
    nomComplet,
    firstName,
    lastName,
    email,
    telephone: phone,
    adresse,
    ville,
    pays,
    phone,
    address,
    reseauxPro: {
      linkedin,
      github,
      portfolio
    }
  };
}

function extractExperiences(text: string): Experience[] {
  const rawExperiences = extractExperiencesRaw(text);
  return rawExperiences.map((exp, index) => ({
    id: `exp_${index}`, // Générer un ID unique
    company: exp.company,
    position: exp.title, // Mapper title à position
    location: '', // Valeur par défaut si non trouvé
    startDate: extractStartDate(exp.period), // Nouvelle fonction pour extraire la date de début
    endDate: extractEndDate(exp.period), // Nouvelle fonction pour extraire la date de fin
    description: exp.description
  }));
}

// Fonctions utilitaires pour extraire les dates
function extractStartDate(period: string): string {
  // Logique pour extraire la date de début à partir de la période
  // Par exemple, si le format est "Jan 2020 - Dec 2022", retourner "Jan 2020"
  const match = period.split('-')[0].trim();
  return match || new Date().toISOString().split('T')[0]; // Date par défaut si non trouvé
}

function extractEndDate(period: string): string {
  // Logique pour extraire la date de fin à partir de la période
  // Si "Présent" ou "Actuel", utiliser la date actuelle
  const match = period.includes('Présent') || period.includes('Actuel') 
    ? new Date().toISOString().split('T')[0]
    : period.split('-')[1]?.trim() || new Date().toISOString().split('T')[0];
  return match;
}

// Fonction auxiliaire pour extraire les expériences brutes (à remplacer par votre logique existante)
function extractExperiencesRaw(text: string): { title: string; company: string; period: string; description: string; }[] {
  // Votre logique existante d'extraction d'expériences
  // Cette fonction doit retourner un tableau d'objets avec title, company, period, description
  const experiences: { title: string; company: string; period: string; description: string; }[] = [];
  
  // Regex pour détecter les expériences professionnelles
  const experienceRegex = /(?:Expérience|Expériences|Experience|Work\s*Experience)[\s\S]*?(?:\n\n|\n#|\Z)/i;
  const match = text.match(experienceRegex);
  
  if (match) {
    const experienceSection = match[0];
    const lines = experienceSection.split('\n');
    
    let currentExperience: Partial<{ title: string; company: string; period: string; description: string; }> | null = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Détection d'une nouvelle expérience
      const companyPositionMatch = trimmedLine.match(/^(.+?)\s*[|-]\s*(.+?)$/);
      if (companyPositionMatch) {
        // Sauvegarder l'expérience précédente si elle existe
        if (currentExperience && currentExperience.company && currentExperience.title) {
          experiences.push(currentExperience as { title: string; company: string; period: string; description: string; });
        }
        
        currentExperience = {
          company: companyPositionMatch[1],
          title: companyPositionMatch[2],
          period: '',
          description: ''
        };
      }
      
      // Extraction des dates
      const dateMatch = trimmedLine.match(/(\d{4})\s*-\s*(\d{4}|\s*Présent|\s*Present)/i);
      if (dateMatch && currentExperience) {
        currentExperience.period = `${dateMatch[1]} - ${dateMatch[2]}`;
      }
      
      // Ajout de la description
      if (currentExperience && !currentExperience.description && trimmedLine.length > 30) {
        currentExperience.description = trimmedLine;
      }
    }
    
    // Ajouter la dernière expérience
    if (currentExperience && currentExperience.company && currentExperience.title) {
      experiences.push(currentExperience as { title: string; company: string; period: string; description: string; });
    }
  }
  
  console.log(`Expériences extraites: ${experiences.length}`);
  return experiences;
}

function extractEducation(text: string): { degree: string; institution: string; year: string; }[] {
  console.log('Extraction des formations');
  
  const educationKeywords = [
    'diplôme', 'formation', 'école', 'université', 
    'master', 'licence', 'bac', 'études'
  ];

  const educations: { degree: string; institution: string; year: string; }[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    
    if (educationKeywords.some(keyword => lowerLine.includes(keyword))) {
      educations.push({
        degree: line.trim(),
        institution: lines[index + 1]?.trim() || '',
        year: ''
      });
    }
  });

  console.log(`Formations extraites: ${educations.length}`);
  return educations;
}

function extractSkills(text: string): Skill[] {
  console.log('Extraction des compétences');
  
  const skillKeywords = [
    'compétence', 'skill', 'competence', 'savoir-faire', 
    'technique', 'technologie', 'logiciel', 'langue'
  ];

  const skills: Skill[] = [];
  const lines = text.split('\n');

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    
    if (skillKeywords.some(keyword => lowerLine.includes(keyword))) {
      skills.push({
        id: uuidv4(),
        name: line.trim(),
        level: 'Intermédiaire'
      });
    }
  });

  console.log(`Compétences extraites: ${skills.length}`);
  return skills;
}

function extractLanguages(text: string): Language[] {
  const languesRaw = extractLanguagesRaw(text);
  return languesRaw.map((langue) => ({
    id: uuidv4(), // Générer un ID unique
    name: langue.language, // Utiliser language comme name
    language: langue.language,
    level: langue.level,
    certification: null,
    description: ''
  }));
}

function extractLanguagesRaw(text: string): { language: string; level: string; }[] {
  // Recherche de sections de langues dans le texte
  const languageKeywords = [
    'langues', 'languages', 'langue', 'language', 
    'compétences linguistiques', 'linguistic skills'
  ];

  const languages: { language: string; level: string; }[] = [];
  const lines = text.split('\n');

  const languageSectionIndex = lines.findIndex(line => 
    languageKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    )
  );

  if (languageSectionIndex !== -1) {
    const languageLines = lines.slice(languageSectionIndex + 1);
    
    languageLines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Exemple de détection simple : "Français - Langue maternelle"
      const languageMatch = trimmedLine.match(/^([^-]+)\s*-\s*(.+)$/);
      
      if (languageMatch) {
        languages.push({
          language: languageMatch[1].trim(),
          level: languageMatch[2].trim()
        });
      }
    });
  }

  // Fallback si aucune langue n'est trouvée
  if (languages.length === 0) {
    languages.push({
      language: 'Français',
      level: 'Langue maternelle'
    });
  }

  return languages;
}

function extractInterests(text: string): Interest[] {
  console.log('Extraction des intérêts');
  const interestKeywords = [
    'intérêts', 'interests', 'hobbies', 'passions', 
    'loisirs', 'centres d\'intérêt'
  ];

  const interests: Interest[] = [];
  const lines = text.split('\n');

  const interestSectionIndex = lines.findIndex(line => 
    interestKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    )
  );

  if (interestSectionIndex !== -1) {
    const interestLines = lines.slice(interestSectionIndex + 1);
    
    interestLines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !interestKeywords.some(keyword => trimmedLine.toLowerCase().includes(keyword))) {
        interests.push({
          id: uuidv4(),
          name: trimmedLine,
          description: ''
        });
      }

      // Stop if we detect another section
      if (trimmedLine.toLowerCase().includes('compétences') || 
          trimmedLine.toLowerCase().includes('skills') ||
          trimmedLine.toLowerCase().includes('langues') ||
          trimmedLine.toLowerCase().includes('languages')) {
        return;
      }
    });
  }

  return interests;
}

function extractProjects(text: string): Project[] {
  console.log('Extraction des projets');
  const projects: Project[] = [];
  
  // Regex pour détecter les sections de projets
  const projectRegex = /(?:Projets?|Projects?):(.*?)(?=\n\n|\n#|\Z)/;
  const match = projectRegex.exec(text);
  
  if (match) {
    const projectsText = match[1].trim();
    const projectLines = projectsText.split('\n').filter(line => line.trim());
    
    projectLines.forEach((line, index) => {
      projects.push({
        id: `project-${index + 1}`,
        name: line.trim(),
        description: '',
        technologies: [],
        startDate: '',
        endDate: ''
      });
    });
  }
  
  return projects;
}

function extractCertifications(text: string): Certification[] {
  // Mapper votre type existant vers le type Certification
  return extractCertificationsDetaillees(text).map(cert => ({
    ...cert,
    annee: cert.anneeObtention, // Ajout de la propriété manquante
    id: undefined, // Optionnel si nécessaire
    link: undefined // Optionnel si nécessaire
  }));
}

/**
 * Extraction du texte d'un fichier PDF depuis un chemin local
 * @param filePath Chemin absolu du fichier PDF
 * @returns Texte extrait du PDF
 */
async function extractPDFTextFromLocalFile(filePath: string): Promise<string> {
  // Lire le fichier depuis le système de fichiers
  const fileBuffer = await fs.readFile(filePath);
  
  // Convertir le buffer en File
  const file = new File([fileBuffer], filePath, { type: 'application/pdf' });
  
  // Utiliser la fonction d'extraction existante
  return await extractPDFText(file);
}

export {
  extractPDFText,
  extractWordText,
  extractRawText,
  extractPersonalInfo,
  extractExperiences,
  extractEducation,
  extractSkills,
  extractLanguages,
  extractInterests,
  extractProjects,
  extractCertifications,
  extractAdresse,
  extractEmail
}

// Ajout de la fonction extractEmail
function extractEmail(text: string): string {
  // Utiliser une expression régulière pour trouver un email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}
