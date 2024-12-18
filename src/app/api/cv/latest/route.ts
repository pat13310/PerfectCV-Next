import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Récupérer le dernier CV créé par l'utilisateur
    const latestCV = await prisma.cV.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latestCV) {
      return NextResponse.json(
        { error: 'No CV found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ cv: latestCV });
  } catch (error) {
    console.error('Error in GET /api/cv/latest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
