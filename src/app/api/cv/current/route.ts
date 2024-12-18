import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Variable globale pour stocker temporairement les données du CV
let currentCvData: any = null;

export async function POST(request: NextRequest) {
  try {
    // Récupérer la session de l'utilisateur
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        message: 'Non authentifié', 
        status: 'error' 
      }, { status: 401 });
    }

    // Récupérer les données du CV
    const cvData = await request.json();
    
    if (!cvData) {
      return NextResponse.json({ 
        message: 'Aucune donnée de CV reçue', 
        status: 'error' 
      }, { status: 400 });
    }

    try {
      // Créer ou mettre à jour le CV dans Prisma
      const cv = await prisma.cV.upsert({
        where: { 
          // Utiliser une combinaison unique pour identifier le CV courant
          id: cvData.id || undefined 
        },
        update: {
          // Mettre à jour les champs existants
          title: cvData.title || 'CV sans titre',
          content: JSON.stringify(cvData),
          templateId: cvData.template,
          isPublished: false
        },
        create: {
          // Créer un nouveau CV si non existant
          title: cvData.title || 'Nouveau CV',
          content: JSON.stringify(cvData),
          userId: session.user.id,
          templateId: cvData.template,
          isPublished: false
        }
      });

      return NextResponse.json({ 
        message: 'Données du CV enregistrées avec succès', 
        status: 'success',
        cvId: cv.id
      }, { status: 201 });
    } catch (dbError) {
      console.error('Erreur de base de données:', dbError);
      return NextResponse.json({ 
        message: 'Erreur lors de l\'enregistrement du CV', 
        status: 'error',
        details: dbError instanceof Error ? dbError.message : 'Erreur inconnue'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors du traitement des données du CV:', error);
    return NextResponse.json({ 
      message: 'Erreur lors du traitement des données', 
      status: 'error',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer la session de l'utilisateur
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        message: 'Non authentifié', 
        status: 'error' 
      }, { status: 401 });
    }

    // Rechercher le CV le plus récent de l'utilisateur
    const cv = await prisma.cV.findFirst({
      where: { 
        userId: session.user.id,
        isPublished: false 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!cv) {
      return NextResponse.json({ 
        message: 'Aucune donnée de CV trouvée', 
        status: 'error' 
      }, { status: 404 });
    }

    // Parser le contenu JSON du CV
    const cvData = JSON.parse(cv.content);
    
    return NextResponse.json(cvData, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du CV:', error);
    return NextResponse.json({ 
      message: 'Erreur lors de la récupération des données', 
      status: 'error',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}
