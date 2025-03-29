import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.error('[CV_CREATE] Utilisateur non authentifié');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Log de débogage pour les données entrantes
    const rawData = await req.text();
    console.log('[CV_CREATE] Données brutes reçues', rawData);

    let data;
    try {
      data = JSON.parse(rawData);
    } catch (parseError) {
      console.error('[CV_CREATE] Erreur de parsing JSON', {
        error: parseError,
        rawData
      });
      return new NextResponse('Invalid JSON', { status: 400 });
    }

    console.log('[CV_CREATE] Données parsées', {
      title: data.title,
      userId: session.user.id,
      contentKeys: Object.keys(data)
    });

    const cv = await prisma.cV.create({
      data: {
        title: data.title || 'Nouveau CV',
        content: JSON.stringify(data),
        templateId: data.templateId || 'default',
        userId: session.user.id,
      },
    });

    console.log('[CV_CREATE] CV créé avec succès', {
      cvId: cv.id,
      title: cv.title
    });

    return NextResponse.json(cv);
  } catch (error) {
    console.error('[CV_CREATE] Erreur complète lors de la création du CV', {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : 'No error message',
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const cvs = await prisma.cV.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(cvs);
  } catch (error) {
    console.error('[CV_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
