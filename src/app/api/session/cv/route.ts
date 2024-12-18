import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { storeCVData, getCVData } from '@/lib/session-storage';
import { CVFormData } from '@/types/cvForm';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Débogage avancé de la requête
    const requestHeaders = Object.fromEntries(request.headers.entries());
    console.log('En-têtes de la requête:', JSON.stringify(requestHeaders, null, 2));

    // Vérification du type de contenu
    const contentType = request.headers.get('content-type');
    console.log('Type de contenu:', contentType);

    // Récupération du corps de la requête de manière sécurisée
    let rawBody;
    try {
      rawBody = await request.text(); // Récupère le corps brut
      console.log('Corps de la requête brut:', rawBody);
    } catch (textError) {
      console.error('Erreur lors de la lecture du corps de la requête (text):', textError);
      return NextResponse.json({ 
        error: 'Impossible de lire le corps de la requête', 
        details: String(textError) 
      }, { status: 400 });
    }

    try {
      const rawData = JSON.parse(rawBody);

      console.log('Données JSON parsées:', JSON.stringify(rawData, null, 2));

      const isValidFormData = (data: any): boolean => {
        const missingFields: string[] = [];

        // Vérifier les champs personnels
        const personalFields = [
          'firstName', 'lastName', 'email', 'phone', 
          'address', 'city', 'country', 'summary'
        ];
        personalFields.forEach(field => {
          if (!data.personal || !data.personal[field]) {
            missingFields.push(`personal.${field}`);
          }
        });

        // Correction : utiliser 'experience' au lieu de 'experiences'
        if (!data.experience) {
          data.experience = [];
        }

        return missingFields.length === 0;
      };

      if (!isValidFormData(rawData)) {
        console.error('Structure de données invalide:', rawData);
        return NextResponse.json({ 
          error: 'Structure de données de CV invalide', 
          details: 'Les données ne correspondent pas au format attendu',
          receivedData: rawData
        }, { status: 400 });
      }

      const cvData: CVFormData = rawData;

      // Stocker les données du CV avec l'ID utilisateur
      await storeCVData(session.user.id, cvData);

      return NextResponse.json({ 
        message: 'Données du CV stockées avec succès',
        data: {
          personalName: `${cvData.personal.firstName} ${cvData.personal.lastName}`,
          experienceCount: cvData.experience.length,
          educationCount: cvData.education.length
        }
      }, { status: 200 });
    } catch (error) {
      console.error('Erreur lors du traitement des données:', error);
      return NextResponse.json({ 
        error: 'Erreur lors du traitement des données',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors du stockage des données du CV:', error);
    return NextResponse.json({ 
      error: 'Erreur lors du traitement des données',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Session récupérée:', session);
    
    if (!session || !session.user?.id) {
      console.error('Utilisateur non authentifié');
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    console.log('ID utilisateur:', session.user.id);

    const cvData = await getCVData(session.user.id);

    console.log('Données CV récupérées:', cvData);

    if (!cvData) {
      console.error('Aucune donnée de CV trouvée pour cet utilisateur');
      return NextResponse.json({ error: 'Aucune donnée de CV trouvée' }, { status: 404 });
    }

    return NextResponse.json(cvData, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du CV:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération des données', 
      details: error instanceof Error ? error.message : 'Erreur inconnue' 
    }, { status: 500 });
  }
}
