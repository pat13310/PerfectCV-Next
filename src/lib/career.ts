import { CVData } from '@/types/cv';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface CareerPlan {
  id: string;
  userId: string;
  currentRole: string;
  targetRole: string;
  timeframe: number; // en mois
  milestones: CareerMilestone[];
  skills: SkillGap[];
  training: TrainingPlan[];
  networking: NetworkingPlan;
  mentorship: MentorshipPlan;
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  type: 'skill' | 'certification' | 'project' | 'role' | 'other';
  priority: 'high' | 'medium' | 'low';
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: 'high' | 'medium' | 'low';
  resources: LearningResource[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'video' | 'article' | 'project';
  url?: string;
  provider?: string;
  duration?: string;
  cost?: number;
  rating?: number;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  resources: LearningResource[];
  milestones: string[]; // IDs des jalons associés
  progress: number;
}

export interface NetworkingPlan {
  events: NetworkingEvent[];
  connections: ProfessionalConnection[];
  communities: ProfessionalCommunity[];
  targetCompanies: TargetCompany[];
}

export interface NetworkingEvent {
  id: string;
  title: string;
  type: 'conference' | 'meetup' | 'webinar' | 'workshop' | 'other';
  date: string;
  location?: string;
  url?: string;
  notes?: string;
}

export interface ProfessionalConnection {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  linkedin?: string;
  lastContact?: string;
  notes?: string;
  relationship: 'mentor' | 'peer' | 'colleague' | 'other';
}

export interface ProfessionalCommunity {
  id: string;
  name: string;
  platform: string;
  url: string;
  members: number;
  focus: string[];
  joined: string;
}

export interface TargetCompany {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  connections: string[]; // IDs des connexions dans l'entreprise
  opportunities: JobOpportunity[];
  notes: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  posted?: string;
  status: 'watching' | 'applied' | 'interviewing' | 'closed';
}

export interface MentorshipPlan {
  goals: string[];
  currentMentor?: ProfessionalConnection;
  potentialMentors: ProfessionalConnection[];
  sessions: MentorshipSession[];
}

export interface MentorshipSession {
  id: string;
  date: string;
  duration: number;
  topics: string[];
  notes: string;
  actionItems: string[];
}

export async function generateCareerPlan(
  cv: CVData,
  targetRole: string,
  timeframe: number
): Promise<CareerPlan> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en développement de carrière. Analyse ce CV et génère un plan de carrière détaillé."
        },
        {
          role: "user",
          content: `Génère un plan de carrière pour passer de ${cv.experience[0]?.position} à ${targetRole} en ${timeframe} mois.
          CV: ${JSON.stringify(cv, null, 2)}`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No career plan generated');

    // Simuler la création d'un plan de carrière
    return {
      id: Date.now().toString(),
      userId: cv.userId || 'anonymous',
      currentRole: cv.experience[0]?.position || '',
      targetRole,
      timeframe,
      milestones: [
        {
          id: '1',
          title: 'Certification Cloud',
          description: 'Obtenir une certification cloud majeure',
          targetDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false,
          type: 'certification',
          priority: 'high'
        }
      ],
      skills: [
        {
          skill: 'Cloud Computing',
          currentLevel: 2,
          targetLevel: 4,
          priority: 'high',
          resources: [
            {
              id: '1',
              title: 'AWS Certified Solutions Architect',
              type: 'course',
              provider: 'AWS',
              duration: '3 mois',
              cost: 300
            }
          ]
        }
      ],
      training: [
        {
          id: '1',
          title: 'Formation Cloud',
          description: 'Programme complet de formation cloud',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          resources: [],
          milestones: ['1'],
          progress: 0
        }
      ],
      networking: {
        events: [],
        connections: [],
        communities: [],
        targetCompanies: []
      },
      mentorship: {
        goals: [
          'Développer des compétences en leadership',
          'Comprendre les tendances du secteur'
        ],
        potentialMentors: [],
        sessions: []
      }
    };
  } catch (error) {
    console.error('Error generating career plan:', error);
    throw error;
  }
}

export async function suggestNextSteps(plan: CareerPlan): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en développement de carrière. Suggère les prochaines étapes basées sur ce plan de carrière."
        },
        {
          role: "user",
          content: `Suggère les 3-5 prochaines actions concrètes basées sur ce plan :
          ${JSON.stringify(plan, null, 2)}`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No suggestions generated');

    // Simuler les suggestions
    return [
      'Commencer la formation AWS Certified Solutions Architect',
      'Rejoindre 2-3 communautés cloud sur LinkedIn',
      'Planifier une session avec un mentor potentiel',
      'Créer un projet personnel utilisant AWS'
    ];
  } catch (error) {
    console.error('Error generating suggestions:', error);
    throw error;
  }
}

export function calculateProgress(plan: CareerPlan): number {
  const completedMilestones = plan.milestones.filter(m => m.completed).length;
  const totalMilestones = plan.milestones.length;
  
  const skillsProgress = plan.skills.reduce((acc, skill) => {
    const progress = (skill.currentLevel / skill.targetLevel) * 100;
    return acc + progress;
  }, 0) / plan.skills.length;

  const trainingProgress = plan.training.reduce((acc, training) => {
    return acc + training.progress;
  }, 0) / plan.training.length;

  return (
    (completedMilestones / totalMilestones * 0.4) +
    (skillsProgress * 0.3) +
    (trainingProgress * 0.3)
  ) * 100;
}
