import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { RouteContext } from '@/types/route';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export async function GET(
  request: Request,
  context: RouteContext
): Promise<NextResponse> {
  const { id } = await context.params;

  console.log('[CV_PREVIEW_GET] Requested CV ID:', id);

  try {
    const session = await getServerSession(authOptions);

    console.log('[CV_PREVIEW_GET] Request details:', {
      cvId: id,
      userId: session?.user?.id,
      isAuthenticated: !!session
    });

    // First, try to find the CV without conditions to check if it exists at all
    const cvExists = await prisma.cV.findUnique({
      where: { id },
      select: { id: true, userId: true, isPublished: true }
    });

    console.log('[CV_PREVIEW_GET] CV existence check:', cvExists);

    // Then try to find with our access conditions
    const cv = await prisma.cV.findFirst({
      where: {
        id,
        OR: [
          { userId: session?.user?.id },
          { isPublished: true }
        ]
      },
      select: {
        id: true,
        title: true,
        content: true,
        templateId: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        userId: true
      }
    });

    console.log('[CV_PREVIEW_GET] CV details:', cv);

    if (!cv) {
      return NextResponse.json({ error: 'CV not found or access denied' }, { status: 404 });
    }

    return NextResponse.json(cv);
  } catch (error) {
    console.error('[CV_PREVIEW_GET] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { id: cvId } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ 
      error: 'Non autorisé' 
    }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const cvFile = formData.get('file') as File | null;

    console.log('[CV_PREVIEW_POST] Début de l\'import', {
      userId: session.user.id,
      cvId,
      formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
        key,
        type: typeof value,
        isFile: value instanceof File,
        fileName: value instanceof File ? value.name : undefined,
        fileSize: value instanceof File ? value.size : undefined
      }))
    });

    if (!cvFile) {
      return NextResponse.json({ 
        error: 'Aucun fichier fourni', 
        details: 'La requête ne contient pas de fichier à importer',
        context: {
          formDataKeys: Array.from(formData.keys())
        }
      }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(cvFile.type)) {
      return NextResponse.json({ 
        error: 'Type de fichier non supporté', 
        details: `Type de fichier reçu : ${cvFile.type}`,
        allowedTypes: allowedTypes
      }, { status: 400 });
    }

    console.log('[CV_PREVIEW_POST] Détails du fichier:', {
      name: cvFile.name,
      type: cvFile.type,
      size: cvFile.size,
      cvId: cvId
    });

    // Sauvegarder temporairement le fichier
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `cv_${Date.now()}_${cvFile.name}`);
    
    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(tempFilePath, buffer);

    console.log('[CV_PREVIEW_POST] Fichier temporaire créé:', tempFilePath);

    let fileContent = '';
    // Extraction du contenu selon le type de fichier
    if (cvFile.type === 'application/pdf') {
      const loader = new PDFLoader(tempFilePath);
      const docs = await loader.load();
      fileContent = docs.map(doc => doc.pageContent).join('\n\n');
    } else {
      // Gérer d'autres types de fichiers si nécessaire
      fileContent = buffer.toString('utf-8');
    }

    // Supprimer le fichier temporaire
    fs.unlinkSync(tempFilePath);

    console.log('[CV_PREVIEW_POST] Contenu extrait:', {
      longueur: fileContent.length,
      premieresLignes: fileContent.substring(0, 500) + '...'
    });
    
    // Essayer de trouver le CV existant
    let cv = await prisma.cV.findUnique({
      where: { 
        id: cvId,
        userId: session.user.id 
      }
    });

    // Si le CV n'existe pas, le créer
    if (!cv) {
      console.log('[CV_PREVIEW_POST] Création d\'un nouveau CV');
      cv = await prisma.cV.create({
        data: {
          id: cvId,
          userId: session.user.id,
          title: cvFile.name.replace(/\.[^/.]+$/, ''), // Nom du fichier sans extension
          content: fileContent,
          templateId: '', 
          isPublished: false
        }
      });
    } else {
      // Mettre à jour le CV existant
      cv = await prisma.cV.update({
        where: { id: cvId },
        data: {
          content: fileContent,
          title: cvFile.name.replace(/\.[^/.]+$/, ''),
          updatedAt: new Date()
        }
      });
    }

    console.log('[CV_PREVIEW_POST] CV traité:', {
      id: cv.id,
      title: cv.title,
      contentLength: cv.content.length
    });

    return NextResponse.json({ id: cv.id }, { status: 200 });

  } catch (error) {
    console.error('[CV_PREVIEW_POST] Erreur:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'importation du CV', 
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }, 
      { status: 500 }
    );
  }
}
