import { NextRequest, NextResponse } from 'next/server';
import { CVFormData } from '@/types/cvForm';

export async function POST(request: NextRequest) {
  try {
    // Récupérer les données du CV depuis la requête
    const cvData: CVFormData = await request.json();
    
    if (!cvData) {
      return NextResponse.json(
        { error: 'Aucune donnée de CV fournie' }, 
        { status: 400 }
      );
    }

    // TODO: Ajouter la logique de sauvegarde en base de données
    // Par exemple, avec Prisma ou un autre ORM
    console.log('CV à sauvegarder :', cvData);

    // Réponse de succès
    return NextResponse.json(
      { 
        message: 'CV enregistré avec succès', 
        cvId: cvData.id 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du CV :', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement du CV' }, 
      { status: 500 }
    );
  }
}
