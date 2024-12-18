import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { extractCVData } from '@/lib/cvExtractor';
import { analyzeCVContent } from '@/lib/cvAnalyzer';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer le texte brut du CV depuis le corps de la requête
    const { rawText } = await request.json();

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Aucun texte de CV fourni' }, { status: 400 });
    }

    // Extraction des données du CV
    const extractedData = await extractCVData(rawText);

    if (!extractedData) {
      return NextResponse.json({ error: 'Impossible d\'extraire les données du CV' }, { status: 422 });
    }

    // Analyse du CV
    const analysis = await analyzeCVContent(extractedData);

    return NextResponse.json({
      rawText,
      extractedData,
      analysis
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'analyse du CV:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'analyse du CV', 
      details: error instanceof Error ? error.message : 'Erreur inconnue' 
    }, { status: 500 });
  }
}
