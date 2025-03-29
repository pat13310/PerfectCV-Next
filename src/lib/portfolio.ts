import { CVData } from '@/types/cv';

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  description: string;
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  certifications: Certification[];
  publications: Publication[];
  presentations: Presentation[];
  customSections: CustomSection[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  startDate: string;
  endDate?: string;
  ongoing: boolean;
  technologies: string[];
  links: ProjectLink[];
  images: ProjectImage[];
  highlights: string[];
  collaborators?: string[];
  category: ProjectCategory;
  visibility: 'public' | 'private' | 'unlisted';
}

export type ProjectCategory =
  | 'professional'
  | 'personal'
  | 'academic'
  | 'opensource'
  | 'research'
  | 'hackathon';

export interface ProjectLink {
  id: string;
  type: 'github' | 'website' | 'demo' | 'documentation' | 'other';
  url: string;
  title: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  isPrimary: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience: number;
  projects: string[]; // Project IDs
  endorsements: Endorsement[];
}

export interface Endorsement {
  id: string;
  userId: string;
  userName: string;
  relationship: string;
  comment?: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'award' | 'recognition' | 'milestone' | 'other';
  issuer?: string;
  proof?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  url?: string;
  doi?: string;
  abstract?: string;
  citations?: number;
  category: 'journal' | 'conference' | 'book' | 'article' | 'other';
}

export interface Presentation {
  id: string;
  title: string;
  event: string;
  date: string;
  location?: string;
  description: string;
  slides?: string;
  video?: string;
  audience?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  links?: { title: string; url: string }[];
}

export function generatePortfolioFromCV(cv: CVData): Portfolio {
  return {
    id: Date.now().toString(),
    userId: cv.userId || '',
    title: `Portfolio de ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`,
    description: cv.personalInfo.summary || '',
    projects: cv.experience.map(exp => ({
      id: exp.id,
      title: exp.position,
      description: exp.description,
      role: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      ongoing: !exp.endDate,
      technologies: [],
      links: [],
      images: [],
      highlights: exp.description.split('. '),
      category: 'professional',
      visibility: 'public'
    })),
    skills: cv.skills.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: 'general',
      level: 3,
      yearsOfExperience: 1,
      projects: [],
      endorsements: []
    })),
    achievements: [],
    certifications: [],
    publications: [],
    presentations: [],
    customSections: []
  };
}

export function generateProjectDescription(project: Project): string {
  return `
# ${project.title}

## Rôle
${project.role}

## Période
${new Date(project.startDate).toLocaleDateString()} - ${project.ongoing ? 'En cours' : new Date(project.endDate!).toLocaleDateString()}

## Description
${project.description}

## Points clés
${project.highlights.map(h => `- ${h}`).join('\n')}

## Technologies utilisées
${project.technologies.join(', ')}

${project.collaborators ? `## Collaborateurs\n${project.collaborators.join(', ')}` : ''}

## Liens
${project.links.map(l => `- [${l.title}](${l.url})`).join('\n')}
`;
}

export function calculatePortfolioStats(portfolio: Portfolio) {
  return {
    totalProjects: portfolio.projects.length,
    skillsByCategory: portfolio.skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalEndorsements: portfolio.skills.reduce(
      (sum, skill) => sum + skill.endorsements.length,
      0
    ),
    publicProjects: portfolio.projects.filter(p => p.visibility === 'public').length,
    totalCertifications: portfolio.certifications.length,
    totalPublications: portfolio.publications.length
  };
}

export function suggestPortfolioImprovements(portfolio: Portfolio): string[] {
  const suggestions: string[] = [];

  if (portfolio.projects.length < 3) {
    suggestions.push('Ajouter plus de projets pour montrer votre expérience');
  }

  if (portfolio.projects.some(p => !p.images.length)) {
    suggestions.push('Ajouter des captures d\'écran ou des images à vos projets');
  }

  if (portfolio.skills.some(s => !s.endorsements.length)) {
    suggestions.push('Obtenir des recommandations pour vos compétences');
  }

  return suggestions;
}
