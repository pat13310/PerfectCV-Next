import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import pdfParse from 'pdf-parse';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max

console.log('\n Module PDF API chargé\n');

// Vérifie si la requête est une requête API
async function isApiRequest(request: NextRequest) {
  const headersList = await headers();
  const accept = headersList.get('accept') || '';
  const isApi = accept.includes('application/json') || 
                request.headers.get('accept')?.includes('application/json') ||
                request.headers.get('content-type')?.includes('application/json');
  console.log(' Type de requête:', isApi ? 'API' : 'Navigation', 'Accept:', accept);
  return isApi;
}

// Route GET pour tester l'API
export async function GET(request: NextRequest) {
  console.log('\n ==== TEST API PDF ====');
  
  try {
    const session = await getServerSession(authOptions);
    const isApi = await isApiRequest(request);

    if (!session) {
      if (isApi) {
        return NextResponse.json(
          { error: 'Non autorisé' },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    
    return NextResponse.json({
      status: 'ok',
      message: 'API PDF accessible',
      user: session.user.email
    });
    
  } catch (error: unknown) {
    console.error('Erreur API PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: 'Erreur serveur', details: errorMessage },
      { status: 500 }
    );
  }
}

// Route POST pour le traitement des fichiers
export async function POST(request: NextRequest) {
  console.log('\n ==== DÉBUT POST /api/pdf ====');
  console.log(' Timestamp:', new Date().toISOString());
  
  try {
    console.log(' Vérification de l\'authentification...');
    const session = await getServerSession(authOptions);
    const isApi = await isApiRequest(request);

    if (!session) {
      if (isApi) {
        console.log(' Accès refusé: Non authentifié (requête API)');
        return NextResponse.json(
          { error: 'Non autorisé' },
          { 
            status: 401,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        console.log(' Redirection vers la page de connexion (requête navigation)');
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    console.log('Session détails:', {
      présente: !!session,
      utilisateur: session?.user?.email || 'non connecté',
      authOptions: {
        sessionStrategy: authOptions.session?.strategy,
        signInPage: authOptions.pages?.signIn,
      }
    });

    console.log(' Récupération du fichier...');
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      console.log(' Erreur: Aucun fichier fourni');
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log(' Fichier reçu:', {
      nom: file.name,
      type: file.type,
      taille: `${(file.size / 1024).toFixed(2)} KB`
    });

    if (!file.type.includes('pdf')) {
      console.log(' Erreur: Type de fichier invalide:', file.type);
      return NextResponse.json(
        { error: 'Le fichier doit être au format PDF' },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log(' Conversion en buffer...');
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log(' Buffer créé:', `${(buffer.length / 1024).toFixed(2)} KB`);
    
    console.log(' Extraction du texte...');
    const data = await pdfParse(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      console.log(' Erreur: Aucun texte extrait');
      return NextResponse.json(
        { error: 'Aucun texte extrait du PDF' },
        { 
          status: 422,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const textLength = data.text.trim().length;
    console.log(` Texte extrait: ${textLength} caractères`);
    console.log(' ==== FIN POST /api/pdf (Succès) ====\n');

    return NextResponse.json(
      { text: data.text.trim() },
      { 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error: unknown) {
    console.error('\n ==== ERREUR POST /api/pdf ====');
    console.error('Détails:', error);
    console.error('==== FIN ERREUR ====\n');
    
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { error: 'Erreur lors du traitement du fichier', details: errorMessage },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
