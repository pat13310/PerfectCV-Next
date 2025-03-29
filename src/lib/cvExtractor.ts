import { CVData } from '@/types/cv';

export async function extractCVData(rawText: string): Promise<CVData> {
  // Logique de base pour extraire les données du CV
  return {
    rawText,
    personalBranding: {
      accroche: extractAccroche(rawText),
      profilProfessionnel: extractProfilProfessionnel(rawText)
    },
    personalInfo: {
      civilite: extractCivilite(rawText),
      nomComplet: extractName(rawText),
      firstName: extractFirstName(rawText),
      lastName: extractLastName(rawText),
      email: extractEmail(rawText),
      telephone: extractTelephone(rawText),
      dateNaissance: extractDateNaissance(rawText),
      adresse: extractAdresse(rawText),
      ville: extractVille(rawText),
      pays: extractPays(rawText),
      reseauxPro: extractReseauxPro(rawText)
    },
    experience: extractCurrentExperiences(rawText),
    education: extractEducation(rawText),
    skills: extractSkills(rawText),
    languages: extractLanguageDetails(rawText),
    interests: extractInterests(rawText),
    projects: extractProjects(rawText),
    certifications: extractCertifications(rawText),
    competences: {
      techniquesMetier: extractTechnicalSkills(rawText),
      softSkills: extractSoftSkills(rawText),
      outilsLogiciels: extractOutilsLogiciels(rawText),
      langages: extractLanguages(rawText),
      methodologiesOutils: extractMethodologiesOutils(rawText)
    },
    experiencesProfessionnelles: {
      experiencesActuelles: extractCurrentExperiences(rawText),
      experiencesPrecedentes: extractPreviousExperiences(rawText)
    },
    centresInteret: extractInterestsList(rawText),
    recommandations: {
      disponible: false,
      type: null
    },
    metadonnees: {
      longueurCV: rawText.length,
      derniereMiseAJour: new Date().toISOString(),
      formatOriginal: 'texte'
    },
    langues: {
      langue_maternelle: extractLangueMaternelle(rawText),
      languesEtrangeres: extractLanguesEtrangeres(rawText)
    }
  };
}

function extractName(text: string): string {
  // Exemple simple d'extraction de nom
  const nameMatch = text.match(/^([A-Z][a-z]+ [A-Z][a-z]+)/);
  return nameMatch ? nameMatch[1] : '';
}

function extractEmail(text: string): string {
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  return emailMatch ? emailMatch[0] : '';
}

function extractTechnicalSkills(text: string): string[] {
  // Liste de compétences techniques courantes
  const technicalSkills = ['Python', 'JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL', 'Docker', 'AWS'];
  return technicalSkills.filter(skill => text.includes(skill));
}

function extractSoftSkills(text: string): string[] {
  // Liste de soft skills courantes
  const softSkills = ['Communication', 'Travail d\'équipe', 'Leadership', 'Adaptabilité', 'Résolution de problèmes'];
  return softSkills.filter(skill => text.includes(skill));
}

function extractOutilsLogiciels(text: string): string[] {
  // Liste d'outils logiciels courants
  const outilsLogiciels = ['Microsoft Office', 'Google Suite', 'Adobe Creative Cloud', 'Sketch', 'Figma'];
  return outilsLogiciels.filter(outil => text.includes(outil));
}

function extractLanguages(text: string): string[] {
  // Liste de langues courantes
  const languages = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Chinois'];
  return languages.filter(language => text.includes(language));
}

function extractMethodologiesOutils(text: string): string[] {
  // Liste de méthodologies et outils courants
  const methodologiesOutils = ['Agile', 'Scrum', 'Kanban', 'Jira', 'Trello', 'Asana'];
  return methodologiesOutils.filter(methodologie => text.includes(methodologie));
}

function extractCurrentExperiences(text: string): any[] {
  // Logique basique pour extraire les expériences actuelles
  return [];
}

function extractPreviousExperiences(text: string): any[] {
  // Logique basique pour extraire les expériences précédentes
  return [];
}

function extractCivilite(text: string): string {
  // Exemple simple d'extraction de civilité (M. ou Mme)
  const civiliteMatch = text.match(/^(M\.|Mme|Mlle)/);
  return civiliteMatch ? civiliteMatch[1] : '';
}

function extractFirstName(text: string): string {
  // Extraction du prénom
  const firstNameMatch = text.match(/^[M\.|Mme|Mlle]\s*([A-Z][a-z]+)/);
  return firstNameMatch ? firstNameMatch[1] : '';
}

function extractLastName(text: string): string {
  // Extraction du nom de famille
  const lastNameMatch = text.match(/^[M\.|Mme|Mlle]\s*[A-Z][a-z]+\s*([A-Z][a-z]+)/);
  return lastNameMatch ? lastNameMatch[1] : '';
}

function extractTelephone(text: string): string {
  // Extraction du numéro de téléphone
  const phoneMatch = text.match(/\b(0[1-9]\d{8}|\+33\d{9})\b/);
  return phoneMatch ? phoneMatch[1] : '';
}

function extractDateNaissance(text: string): string {
  // Extraction de la date de naissance
  const dateMatch = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
  return dateMatch ? dateMatch[1] : '';
}

function extractAdresse(text: string): string {
  // Extraction de l'adresse (exemple simple)
  const adresseMatch = text.match(/\b(\d+\s+[A-Za-z\s]+,\s*\d{5}\s+[A-Za-z\s]+)\b/);
  return adresseMatch ? adresseMatch[1] : '';
}

function extractVille(text: string): string {
  // Extraction de la ville
  const villeMatch = text.match(/\b([A-Za-z\s]+),\s*\d{5}\s+[A-Za-z\s]+\b/);
  return villeMatch ? villeMatch[1].trim() : '';
}

function extractPays(text: string): string {
  // Extraction du pays
  const paysMatch = text.match(/\b([A-Za-z\s]+)\b/);
  return paysMatch ? paysMatch[1].trim() : '';
}

function extractReseauxPro(text: string): string[] {
  // Extraction des réseaux professionnels
  const reseauxProMatch = text.match(/(LinkedIn|Twitter|GitHub)/g);
  return reseauxProMatch ? reseauxProMatch : [];
}

function extractAccroche(text: string): string {
  // Logique pour extraire l'accroche du CV
  const accroche = text.split('\n').find(line => line.includes('Objectif') || line.includes('Profil'));
  return accroche || '';
}

function extractProfilProfessionnel(text: string): string {
  // Logique pour extraire le profil professionnel
  const profilMatch = text.match(/Profil\s*Professionnel[:\n]*(.*?)(\n\n|$)/);
  return profilMatch ? profilMatch[1].trim() : '';
}

function extractEducation(text: string): any[] {
  // Logique simple pour extraire les formations
  const educationKeywords = ['Diplôme', 'Formation', 'École', 'Université'];
  const educationLines = text.split('\n').filter(line => 
    educationKeywords.some(keyword => line.includes(keyword))
  );
  return educationLines.map(line => ({
    degree: line,
    institution: '',
    year: ''
  }));
}

function extractSkills(text: string): any[] {
  const allSkills = [
    ...extractTechnicalSkills(text),
    ...extractSoftSkills(text)
  ];
  return allSkills.map((skill, index) => ({
    id: `skill_${index}`,
    name: skill,
    level: ''
  }));
}

function extractLanguageDetails(text: string): any[] {
  const languages = extractLanguages(text);
  return languages.map((lang, index) => ({
    id: `lang_${index}`,
    name: lang,
    language: lang,
    level: ''
  }));
}

function extractInterests(text: string): any[] {
  const interests = extractInterestsList(text);
  return interests.map((interest, index) => ({
    id: `interest_${index}`,
    name: interest,
    description: ''
  }));
}

function extractProjects(text: string): any[] {
  // Logique simple pour extraire les projets
  const projectKeywords = ['Projet', 'Project'];
  const projectLines = text.split('\n').filter(line => 
    projectKeywords.some(keyword => line.includes(keyword))
  );
  return projectLines.map((project, index) => ({
    id: `project_${index}`,
    name: project,
    description: '',
    technologies: []
  }));
}

function extractCertifications(text: string): any[] {
  // Logique simple pour extraire les certifications
  const certKeywords = ['Certification', 'Diplôme', 'Attestation'];
  const certLines = text.split('\n').filter(line => 
    certKeywords.some(keyword => line.includes(keyword))
  );
  return certLines.map((cert, index) => ({
    nom: cert,
    organisme: '',
    annee: '',
    anneeObtention: '',
    validiteJusqua: null,
    competencesValidees: []
  }));
}

function extractInterestsList(text: string): string[] {
  const interestKeywords = ['Intérêt', 'Hobby', 'Loisir'];
  return text.split('\n')
    .filter(line => interestKeywords.some(keyword => line.includes(keyword)))
    .map(line => line.replace(/Intérêt[s]?:|Hobby:|Loisir[s]?:/i, '').trim());
}

function extractLangueMaternelle(text: string): string {
  // Logique simple pour extraire la langue maternelle
  const langueMatch = text.match(/Langue\s*Maternelle[:\s]*(\w+)/i);
  return langueMatch ? langueMatch[1] : 'Français';
}

function extractLanguesEtrangeres(text: string): any[] {
  // Logique simple pour extraire les langues étrangères
  const langues = extractLanguages(text).filter(lang => lang !== extractLangueMaternelle(text));
  return langues.map(langue => ({
    langue: langue,
    niveau: '',
    certification: null
  }));
}
