import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { extractRawText } from '@/lib/documentParser';
import { extractCVData } from '@/lib/documentParser';

console.log(' Module parse-pdf/route.ts chargé');

// Configuration pour Next.js 13+ App Router
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes max
export const revalidate = 0;

// Augmenter la limite de taille si nécessaire
export const config = {
  api: {
    bodyParser: false, // Désactive le parseur de corps par défaut pour gérer le multipart
    responseLimit: '50mb',
  },
};

export async function GET() {
  return NextResponse.json({ 
    error: 'Méthode non autorisée' 
  }, { status: 405 });
}

export async function POST(request: NextRequest) {
  console.log(' Début de POST /api/parsepdf');

  try {
    // Vérifier le type de contenu de la requête
    const contentType = request.headers.get('content-type');
    
    let rawText: string;

    // Gérer les données textuelles via URL
    const { searchParams } = new URL(request.url);
    const rawData = searchParams.get('data');

    if (rawData) {
      // Décoder les données de l'URL
      rawText = decodeURIComponent(rawData);
    } else if (contentType?.includes('application/json')) {
      // Gérer les données textuelles JSON
      const jsonData = await request.json();
      const rawData = jsonData.data;

      if (!rawData) {
        return NextResponse.json({ error: 'Aucune donnée JSON fournie' }, { status: 400 });
      }

      rawText = decodeURIComponent(rawData);
    } else if (contentType?.includes('multipart/form-data')) {
      // Gérer l'upload de fichier PDF
      const formData = await request.formData();
      const pdfFile = formData.get('file') as File;

      if (!pdfFile) {
        return NextResponse.json({ error: 'Aucun fichier PDF téléchargé' }, { status: 400 });
      }

      // Vérifier l'extension du fichier
      if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
        return NextResponse.json({ error: 'Seuls les fichiers PDF sont autorisés' }, { status: 400 });
      }

      // Lire le contenu du fichier PDF
      const arrayBuffer = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Extraire le texte du PDF
      const pdfResult = await pdfParse(buffer);
      rawText = pdfResult.text;
    } else {
      // Type de contenu non supporté
      return NextResponse.json({ 
        error: 'Type de contenu non supporté. Utilisez JSON, URL ou multipart/form-data' 
      }, { status: 415 });
    }

    // Vérifier si le texte extrait est vide
    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Impossible d\'extraire du texte du document' }, { status: 422 });
    }

    // Traitement du texte brut
    const cvData = await extractCVData(rawText);

    return NextResponse.json({
      status: 'Succès',
      data: cvData
    });
  } catch (error) {
    console.error('Erreur lors du traitement:', error);
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Erreur inconnue lors du traitement du CV',
      details: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}
