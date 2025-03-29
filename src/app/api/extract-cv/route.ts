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
    console.log('Début de l\'extraction du CV');
    
    // Validation des données
    const cvData: CVData = await request.json();
    
    console.log('Données du CV reçues:', JSON.stringify(cvData, null, 2));
    
    if (!cvData) {
      console.error('Aucune donnée de CV fournie');
      return NextResponse.json(
        { error: 'Aucune donnée de CV fournie' }, 
        { status: 400 }
      );
    }

    // Vérification des variables d'environnement
    console.log('Clé API OpenAI:', process.env.OPENAI_API_KEY ? 'Présente' : 'Manquante');
    console.log('URL de base OpenAI:', process.env.OPENAI_API_BASE_URL || 'URL par défaut');

    // Appel à l'API OpenAI pour extraction détaillée
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Tu es un expert en extraction de données de CV, avec une précision chirurgicale.

MISSION CRITIQUE :
- Extraction EXHAUSTIVE et STRUCTURÉE
- Analyse sémantique approfondie
- Contextualisation professionnelle
- Rigueur et objectivité maximales

Réponds UNIQUEMENT au format JSON.`
          },
          {
            role: "user",
            content: `Extrais MÉTHODIQUEMENT toutes les informations de ce CV au format JSON :

{
  "personalBranding": {
    "accroche": string,  // Phrase professionnelle percutante
    "profilProfessionnel": string  // Description synthétique du profil
  },
  "personalInfo": {
    "civilite": string,  // M. ou Mme
    "nomComplet": string,
    "email": string,
    "telephone": string,
    "adresse": string,
    "ville": string,
    "pays": string,
    "reseauxPro": {
      "linkedin": string,
      "github": string,
      "portfolio": string
    }
  },
  "experiencesProfessionnelles": {
    "experiencesActuelles": [
      {
        "entreprise": string,
        "secteurActivite": string,
        "poste": string,
        "dateDebut": string,
        "dateFin": string | null,  // null si poste actuel
        "duree": string,
        "localisation": string,
        "missions": string[],
        "realisationsClés": string[],
        "competencesUtilisees": string[]
      }
    ],
    "experiencesPrecedentes": [
      {
        "entreprise": string,
        "secteurActivite": string,
        "poste": string,
        "dateDebut": string,
        "dateFin": string,
        "duree": string,
        "localisation": string,
        "missions": string[],
        "realisationsClés": string[],
        "competencesUtilisees": string[]
      }
    ]
  },
  "formations": {
    "diplomesprincipaux": [
      {
        "intitule": string,
        "specialite": string,
        "etablissement": string,
        "ville": string,
        "pays": string,
        "anneeObtention": string,
        "mention": string,
        "competencesAcademiques": string[]
      }
    ],
    "formationsContinues": [
      {
        "intitule": string,
        "organisme": string,
        "annee": string,
        "duree": string
      }
    ]
  },
  "certifications": [
    {
      "nom": string,
      "organisme": string,
      "anneeObtention": string,
      "validiteJusqua": string | null,
      "competencesValidees": string[]
    }
  ],
  "competences": {
    "techniquesMetier": string[],
    "outilsLogiciels": string[],
    "langages": string[],
    "methodologiesOutils": string[],
    "softSkills": string[]
  },
  "langues": {
    "langue_maternelle": string,
    "languesEtrangeres": [
      {
        "langue": string,
        "niveau": string,  // A1, B2, C1, etc.
        "certification": string | null
      }
    ]
  },
  "centresInteret": string[],
  "recommandations": {
    "disponible": boolean,
    "type": string | null  // "ecrite", "linkedin", etc.
  },
  "metadonnees": {
    "longueurCV": number,  // nombre de mots
    "derniereMiseAJour": string,
    "formatOriginal": string  // pdf, docx, etc.
  }
}`
          },
          {
            role: "user",
            content: JSON.stringify(cvData)
          }
        ],
        max_tokens: 4096
      });

      console.log('Réponse OpenAI reçue');
      const extractionText = response.choices[0]?.message?.content || '';
      console.log('Texte extrait:', extractionText);
      
      return NextResponse.json(JSON.parse(extractionText), { status: 200 });
    } catch (openaiError) {
      console.error('Erreur OpenAI détaillée:', openaiError);
      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'extraction du CV par OpenAI', 
          details: openaiError instanceof Error ? openaiError.message : 'Erreur inconnue'
        }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur globale lors de l\'extraction du CV:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'extraction du CV', 
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }, 
      { status: 500 }
    );
  }
}
