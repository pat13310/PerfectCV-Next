import { CVData } from '@/types/cv';

export interface JobApplication {
  id: string;
  cvId: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: string;
  nextStep?: {
    type: ApplicationStep;
    date: string;
    notes?: string;
  };
  notes: string[];
  contacts: ContactPerson[];
  timeline: ApplicationEvent[];
  documents: ApplicationDocument[];
}

export type ApplicationStatus =
  | 'draft'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type ApplicationStep =
  | 'phone_screen'
  | 'technical_interview'
  | 'hr_interview'
  | 'assignment'
  | 'onsite'
  | 'reference_check'
  | 'offer_negotiation';

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface ApplicationEvent {
  id: string;
  type: ApplicationEventType;
  date: string;
  description: string;
  outcome?: string;
  nextSteps?: string;
}

export type ApplicationEventType =
  | 'application_sent'
  | 'interview'
  | 'follow_up'
  | 'feedback'
  | 'offer'
  | 'rejection'
  | 'note';

export interface ApplicationDocument {
  id: string;
  type: 'cv' | 'cover_letter' | 'portfolio' | 'assignment' | 'other';
  name: string;
  version: string;
  url: string;
  createdAt: string;
}

export interface ApplicationStats {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  byCompany: Record<string, number>;
  responseRate: number;
  averageResponseTime: number;
  interviewRate: number;
}

export function calculateApplicationStats(
  applications: JobApplication[]
): ApplicationStats {
  const stats: ApplicationStats = {
    total: applications.length,
    byStatus: {
      draft: 0,
      applied: 0,
      interviewing: 0,
      offer: 0,
      accepted: 0,
      rejected: 0,
      withdrawn: 0,
    },
    byCompany: {},
    responseRate: 0,
    averageResponseTime: 0,
    interviewRate: 0,
  };

  applications.forEach(app => {
    // Count by status
    stats.byStatus[app.status]++;

    // Count by company
    stats.byCompany[app.company] = (stats.byCompany[app.company] || 0) + 1;
  });

  // Calculate rates
  const responded = applications.filter(app => 
    ['interviewing', 'offer', 'accepted', 'rejected'].includes(app.status)
  ).length;

  const interviewed = applications.filter(app =>
    ['interviewing', 'offer', 'accepted'].includes(app.status)
  ).length;

  stats.responseRate = (responded / applications.length) * 100;
  stats.interviewRate = (interviewed / applications.length) * 100;

  return stats;
}

export function generateApplicationTimeline(
  application: JobApplication
): ApplicationEvent[] {
  const timeline: ApplicationEvent[] = [
    {
      id: '1',
      type: 'application_sent',
      date: application.appliedDate,
      description: `Candidature envoyée pour le poste de ${application.position} chez ${application.company}`,
    },
    ...application.timeline,
  ];

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function suggestNextSteps(
  application: JobApplication
): string[] {
  const suggestions: string[] = [];

  switch (application.status) {
    case 'applied':
      suggestions.push(
        'Envoyer un email de suivi dans 5-7 jours',
        'Connecter avec des employés sur LinkedIn',
        'Préparer les questions pour l\'entretien'
      );
      break;
    case 'interviewing':
      suggestions.push(
        'Envoyer un email de remerciement',
        'Noter les points clés discutés',
        'Préparer les questions pour la prochaine étape'
      );
      break;
    case 'offer':
      suggestions.push(
        'Examiner les détails de l\'offre',
        'Préparer les points de négociation',
        'Faire une liste de questions sur les avantages'
      );
      break;
  }

  return suggestions;
}

export function generateFollowUpEmail(
  application: JobApplication,
  type: 'follow_up' | 'thank_you' | 'acceptance' | 'rejection'
): string {
  switch (type) {
    case 'follow_up':
      return `
Bonjour [Nom du recruteur],

Je vous écris pour suivre ma candidature au poste de ${application.position} chez ${application.company}, envoyée le ${new Date(application.appliedDate).toLocaleDateString()}.

Je reste très intéressé par cette opportunité et serais ravi d'en discuter plus en détail avec vous.

Cordialement,
[Votre nom]
      `;
    case 'thank_you':
      return `
Bonjour [Nom du recruteur],

Je tenais à vous remercier pour notre entretien d'aujourd'hui concernant le poste de ${application.position}. J'ai beaucoup apprécié notre discussion sur [point clé].

Je reste à votre disposition pour toute information complémentaire.

Cordialement,
[Votre nom]
      `;
    case 'acceptance':
      return `
Bonjour [Nom du recruteur],

J'ai le plaisir de vous confirmer mon acceptation de l'offre de poste de ${application.position} chez ${application.company}.

Je suis ravi de rejoindre votre équipe et impatient de commencer.

Cordialement,
[Votre nom]
      `;
    case 'rejection':
      return `
Bonjour [Nom du recruteur],

Je tenais à vous remercier pour l'opportunité de candidater au poste de ${application.position} chez ${application.company}.

Bien que je ne sois pas retenu pour ce poste, j'apprécie le temps que vous avez consacré à mon entretien.

Je vous souhaite le meilleur pour vos recrutements futurs.

Cordialement,
[Votre nom]
      `;
    default:
      return '';
  }
}
