import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CVData } from '@/types/cv';

// Configuration sécurisée de l'API
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL 
});

export async function POST(request: NextRequest) {
  try {
    // Validation des données
    const cvData: CVData = await request.json();
    
    if (!cvData) {
      return NextResponse.json(
        { error: 'Aucune donnée de CV fournie' }, 
        { status: 400 }
      );
    }

    // Appel à l'API OpenAI pour une analyse détaillée
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Tu es un expert en recrutement international, spécialisé dans l'analyse approfondie de CV.

ANALYSE PROFESSIONNELLE DÉTAILLÉE
Objectif : Extraire et évaluer finement le potentiel professionnel du candidat.

INSTRUCTIONS CRUCIALES :
- Analyse EXHAUSTIVE et OBJECTIVE
- Format de réponse JSON STRICT
- Évaluations précises et constructives
- Recommandations personnalisées et stratégiques`
        },
        {
          role: "user",
          content: `Analyse PROFESSIONNELLEMENT ce CV avec une granularité MAXIMALE :

{
  "globalScore": number, // Note globale /100
  "personalBranding": {
    "accroche": string,  // Phrase d'accroche professionnelle
    "pertinence": number // /20
  },
  "experiencesProfessionnelles": {
    "score": number,     // /20
    "details": [
      {
        "poste": string,
        "entreprise": string,
        "duree": string,
        "impact": string[], // Réalisations concrètes
        "points_forts": string[]
      }
    ],
    "progression": string  // Évolution de carrière
  },
  "formations": {
    "score": number,     // /20
    "diplomes": [
      {
        "intitule": string,
        "etablissement": string,
        "annee": string,
        "mention": string
      }
    ],
    "competencesAcquises": string[]
  },
  "certifications": [
    {
      "nom": string,
      "organisme": string,
      "annee": string
    }
  ],
  "competences": {
    "techniques": string[],
    "soft_skills": string[]
  },
  "recommandationsPro": string[],
  "pointsAmelioration": string[]
}`
        },
        {
          role: "user",
          content: JSON.stringify(cvData)
        }
      ],
      max_tokens: 4096
    });

    const analysisText = response.choices[0]?.message?.content || '';
    
    return NextResponse.json(JSON.parse(analysisText), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse du CV' }, 
      { status: 500 }
    );
  }
}
