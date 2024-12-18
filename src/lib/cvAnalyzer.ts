import { CVData, CVAnalysis, JobMatch } from '@/types/cv';
import { handleOpenAIError } from './openaiErrors';

export async function analyzeCVContent(cv: CVData): Promise<CVAnalysis> {
  try {
    console.log('Début de l\'analyse du CV', {
      nomComplet: cv.personalInfo?.nomComplet,
      email: cv.personalInfo?.email,
      longueurRawText: cv.rawText?.length || 0
    });

    // Validation détaillée des données du CV
    const criticalErrors: string[] = [];
    
    if (!cv.rawText || cv.rawText.trim().length === 0) {
      criticalErrors.push('Contenu du CV vide');
    }
    
    if (!cv.personalInfo?.nomComplet) {
      criticalErrors.push('Aucun nom complet trouvé');
    }
    
    if (!cv.experiencesProfessionnelles || 
        (cv.experiencesProfessionnelles.experiencesActuelles.length === 0 && 
         cv.experiencesProfessionnelles.experiencesPrecedentes.length === 0)) {
      console.warn('Aucune expérience professionnelle trouvée. Continuation de l\'analyse.');
      criticalErrors.push('Aucune expérience professionnelle');
    }

    // Générer des points forts basés sur les compétences et expériences
    const strengths: string[] = [
      ...(cv.competences?.techniquesMetier || []).map(skill => `Compétence technique : ${skill}`),
      ...(cv.competences?.softSkills || []).map(skill => `Soft skill : ${skill}`),
      ...(cv.experiencesProfessionnelles?.experiencesActuelles || [])
        .filter(exp => exp.realisationsClés && exp.realisationsClés.length > 0)
        .flatMap(exp => exp.realisationsClés?.map(realisation => `Réalisation clé : ${realisation}`) || []),
      ...(cv.certifications || [])
        .map(cert => `Certification : ${cert.nom} de ${cert.organisme}`),
      ...(cv.education || [])
        .filter(edu => edu.field)
        .map(edu => `Formation spécialisée : ${edu.degree} en ${edu.field}`)
    ];

    return {
      globalScore: 0, // À implémenter selon votre logique
      personalBranding: {
        accroche: cv.personalBranding?.accroche || '',
        pertinence: 0 // À calculer
      },
      experiencesProfessionnelles: {
        score: 0, // À calculer
        details: [
          ...(cv.experiencesProfessionnelles?.experiencesActuelles || []).map(exp => ({
            poste: exp.position,
            entreprise: exp.company,
            duree: `${exp.startDate} - ${exp.endDate}`,
            impact: exp.description ? [exp.description] : [],
            points_forts: []
          })),
          ...(cv.experiencesProfessionnelles?.experiencesPrecedentes || []).map(exp => ({
            poste: exp.position,
            entreprise: exp.company,
            duree: `${exp.startDate} - ${exp.endDate}`,
            impact: exp.description ? [exp.description] : [],
            points_forts: []
          }))
        ],
        progression: '' // À implémenter
      },
      formations: {
        score: 0, // À calculer
        diplomes: cv.education.map(edu => ({
          intitule: edu.degree,
          etablissement: edu.institution,
          annee: edu.year,
          mention: edu.field || ''
        })),
        competencesAcquises: cv.education.flatMap(edu => edu.description ? [edu.description] : [])
      },
      certifications: cv.certifications || [],
      competences: {
        techniques: cv.competences?.techniquesMetier || [],
        soft_skills: cv.competences?.softSkills || []
      },
      recommandationsPro: [], // À implémenter
      pointsAmelioration: criticalErrors,
      strengths: strengths,
      pointsForts: strengths // Ajout de la propriété pointsForts
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV', error);
    throw error;
  }
}

export async function matchJobDescription(
  cv: CVData,
  jobDescription: string
): Promise<{ score: number; matching_skills: string[]; missing_skills: string[]; recommendations: string[] }> {
  try {
    const response = await fetch('/api/match-job-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        cv: {
          competences: cv.competences,
          experiencesProfessionnelles: cv.experiencesProfessionnelles,
          education: cv.education
        }, 
        jobDescription 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Erreur lors de la comparaison avec l\'offre d\'emploi');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error matching job description:', error);
    
    if (error instanceof Error) {
      const errorDetails = handleOpenAIError(error);
      throw errorDetails;
    }
    
    throw new Error('Une erreur est survenue lors de la comparaison avec l\'offre d\'emploi');
  }
}

export async function generateATS(cv: CVData): Promise<string> {
  try {
    const response = await fetch('/api/generate-ats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cv)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Erreur lors de la génération de la version ATS');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating ATS version:', error);
    
    if (error instanceof Error) {
      const errorDetails = handleOpenAIError(error);
      throw errorDetails;
    }
    
    throw new Error('Une erreur est survenue lors de la génération de la version ATS');
  }
}

export async function getContentSuggestions(
  section: string, 
  content: string, 
  jobTitle?: string
): Promise<{ improvements: string[], originalContent: string }> {
  try {
    const prompt = `Je travaille sur la section ${section} de mon CV pour le poste de ${jobTitle || 'un emploi'}. 
    Voici mon contenu actuel : ${content}. 
    Peux-tu me donner des suggestions précises pour améliorer cette section et la rendre plus attrayante pour un recruteur ?`;

    const response = await fetch('/api/get-content-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Erreur lors de la génération des suggestions');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur lors de la génération des suggestions :', error);
    
    if (error instanceof Error) {
      const errorDetails = handleOpenAIError(error);
      throw errorDetails;
    }
    
    throw new Error('Impossible de générer des suggestions. Veuillez réessayer.');
  }
}

export async function getSuggestedColors(
  industry: string, 
  style: 'professional' | 'creative' | 'academic'
): Promise<{ primary: string, secondary: string, accent: string }> {
  try {
    const prompt = `Recommande une palette de couleurs ${style} pour un CV dans l'industrie ${industry}. 
    Donne-moi 3 couleurs principales qui représentent bien ce secteur et ce style professionnel.`;

    const response = await fetch('/api/get-suggested-colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Erreur lors de la génération des couleurs');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erreur lors de la génération des couleurs :', error);
    
    if (error instanceof Error) {
      const errorDetails = handleOpenAIError(error);
      throw errorDetails;
    }
    
    throw new Error('Impossible de générer des suggestions de couleurs. Veuillez réessayer.');
  }
}
