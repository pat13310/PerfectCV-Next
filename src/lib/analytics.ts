import { CVData, Experience, Education, Skill } from '@/types/cv';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface CVAnalytics {
  score: number;
  metrics: CVMetrics;
  insights: CVInsights;
  recommendations: Recommendation[];
  trends: TrendAnalysis;
  marketFit: MarketFitAnalysis;
}

export interface CVMetrics {
  wordCount: number;
  readingTime: number;
  complexity: number;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  // Conserver ces propriétés pour la compatibilité
  readabilityScore?: number;
  actionVerbs?: number;
  quantifiedResults?: number;
  keywordDensity?: Record<string, number>;
}

export interface CVInsights {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  uniqueSellingPoints: string[];
  missingElements: string[];
}

export interface Recommendation {
  id: string;
  category: 'content' | 'format' | 'skills' | 'experience' | 'education';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  implementation: string[];
  examples?: string[];
}

export interface TrendAnalysis {
  industryTrends: string[];
  emergingSkills: string[];
  decliningSkills: string[];
  salaryTrends: SalaryTrend[];
  demandForecast: string[];
}

export interface SalaryTrend {
  role: string;
  median: number;
  range: {
    min: number;
    max: number;
  };
  trend: 'increasing' | 'stable' | 'decreasing';
  location: string;
}

export interface MarketFitAnalysis {
  targetIndustries: IndustryFit[];
  roleAlignment: RoleAlignment[];
  skillGaps: SkillGapAnalysis[];
  competitiveAdvantages: string[];
  marketChallenges: string[];
}

export interface IndustryFit {
  industry: string;
  fitScore: number;
  keyRequirements: string[];
  opportunities: string[];
  challenges: string[];
}

export interface RoleAlignment {
  role: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

export interface SkillGapAnalysis {
  skill: string;
  importance: number;
  currentLevel: number;
  requiredLevel: number;
  acquisitionDifficulty: number;
  learningResources: string[];
}

export async function analyzeCV(cv: CVData): Promise<CVAnalytics> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en analyse de CV. Analyse ce CV et fournis des insights détaillés."
        },
        {
          role: "user",
          content: `Analyse ce CV et fournis une analyse complète :
          ${JSON.stringify(cv, null, 2)}`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No analysis generated');

    // Simuler une analyse complète
    return {
      score: 85,
      metrics: {
        wordCount: calculateWordCount(cv),
        readingTime: 10,
        complexity: 8,
        experience: cv.experience,
        education: cv.education,
        skills: cv.skills
      },
      insights: {
        strengths: [
          'Expérience technique solide',
          'Projets variés',
          'Formation pertinente'
        ],
        weaknesses: [
          'Manque de quantification des résultats',
          'Peu d\'expérience en leadership'
        ],
        opportunities: [
          'Développement cloud en forte demande',
          'Marché favorable aux développeurs React'
        ],
        uniqueSellingPoints: [
          'Expertise en React',
          'Expérience full-stack'
        ],
        missingElements: [
          'Certifications cloud',
          'Projets open source'
        ]
      },
      recommendations: [
        {
          id: '1',
          category: 'content',
          priority: 'high',
          title: 'Ajouter des métriques',
          description: 'Quantifier les résultats des projets',
          impact: 'Augmentation de 30% de l\'impact du CV',
          implementation: [
            'Identifier les projets clés',
            'Ajouter des métriques spécifiques'
          ]
        }
      ],
      trends: {
        industryTrends: [
          'Adoption croissante du cloud',
          'Demande en IA/ML'
        ],
        emergingSkills: [
          'AWS',
          'Machine Learning',
          'DevOps'
        ],
        decliningSkills: [
          'jQuery',
          'PHP classique'
        ],
        salaryTrends: [
          {
            role: 'Développeur React Senior',
            median: 65000,
            range: { min: 55000, max: 75000 },
            trend: 'increasing',
            location: 'France'
          }
        ],
        demandForecast: [
          'Croissance continue de la demande en React',
          'Augmentation des postes full-stack'
        ]
      },
      marketFit: {
        targetIndustries: [
          {
            industry: 'Tech',
            fitScore: 85,
            keyRequirements: ['React', 'Node.js'],
            opportunities: ['Nombreuses startups en croissance'],
            challenges: ['Concurrence élevée']
          }
        ],
        roleAlignment: [
          {
            role: 'Développeur React Senior',
            matchScore: 80,
            matchingSkills: ['React', 'JavaScript'],
            missingSkills: ['AWS', 'Kubernetes'],
            recommendations: ['Obtenir une certification cloud']
          }
        ],
        skillGaps: [
          {
            skill: 'AWS',
            importance: 8,
            currentLevel: 2,
            requiredLevel: 4,
            acquisitionDifficulty: 6,
            learningResources: [
              'AWS Certified Solutions Architect',
              'Projets pratiques sur AWS'
            ]
          }
        ],
        competitiveAdvantages: [
          'Expertise React approfondie',
          'Expérience full-stack'
        ],
        marketChallenges: [
          'Marché compétitif',
          'Évolution rapide des technologies'
        ]
      }
    };
  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw error;
  }
}

function calculateWordCount(cv: CVData): number {
  let text = '';
  
  // Concaténer tout le texte du CV
  text += cv.personalInfo.summary || '';
  cv.experience.forEach(exp => {
    text += exp.position + ' ' + exp.company + ' ' + exp.description + ' ';
  });
  cv.education.forEach(edu => {
    text += edu.degree + ' ' + edu.school + ' ' + (edu.description || '') + ' ';
  });
  cv.skills.forEach(skill => {
    text += skill.name + ' ';
  });

  // Compter les mots
  return text.trim().split(/\s+/).length;
}

const calculateExperienceScore = (experience: Experience[]): number => {
  if (!experience || experience.length === 0) return 0;

  const experienceScore = experience.reduce((score, exp) => {
    let baseScore = 10; // Score de base pour une expérience

    // Bonus pour la durée de l'expérience
    if (exp.startDate && exp.endDate) {
      const duration = parseInt(exp.endDate) - parseInt(exp.startDate);
      baseScore += duration > 2 ? 5 : 2;
    }

    // Bonus pour une description détaillée
    if (exp.description && exp.description.length > 100) {
      baseScore += 3;
    }

    return score + baseScore;
  }, 0);

  // Normalisation du score
  return Math.min(experienceScore / experience.length, 20);
};

export async function generateRecommendations(
  analytics: CVAnalytics,
  focus: 'content' | 'format' | 'skills' | 'all' = 'all'
): Promise<Recommendation[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en optimisation de CV. Génère des recommandations basées sur cette analyse."
        },
        {
          role: "user",
          content: `Génère des recommandations détaillées basées sur cette analyse, focus: ${focus}
          ${JSON.stringify(analytics, null, 2)}`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No recommendations generated');

    return analytics.recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

export function calculateMarketScore(analytics: CVAnalytics): number {
  const weights = {
    skills: 0.3,
    experience: 0.3,
    trends: 0.2,
    marketFit: 0.2
  };

  const skillsScore = analytics.marketFit.skillGaps.reduce(
    (acc, gap) => acc + (gap.currentLevel / gap.requiredLevel),
    0
  ) / analytics.marketFit.skillGaps.length * 100;

  const experienceScore = calculateExperienceScore(analytics.metrics.experience);

  const trendScore = analytics.marketFit.targetIndustries.reduce(
    (acc, industry) => acc + industry.fitScore,
    0
  ) / analytics.marketFit.targetIndustries.length;

  const marketFitScore = analytics.marketFit.roleAlignment.reduce(
    (acc, role) => acc + role.matchScore,
    0
  ) / analytics.marketFit.roleAlignment.length;

  return (
    skillsScore * weights.skills +
    experienceScore * weights.experience +
    trendScore * weights.trends +
    marketFitScore * weights.marketFit
  );
}
