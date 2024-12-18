import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the entire params object
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { data: null, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    console.log('Fetching CV with ID:', id);
    
    const cv = await prisma.cV.findUnique({
      where: { 
        id,
        userId: session.user.id
      },
      select: {
        id: true,
        title: true,
        content: true,
        templateId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        isPublished: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!cv) {
      console.log('CV not found');
      return NextResponse.json(
        { data: null, error: 'CV not found' },
        { status: 404 }
      );
    }

    console.log('CV found:', cv);
    return NextResponse.json({ data: cv, error: null }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/cv/[id]:', error);
    return NextResponse.json(
      { 
        data: null, 
        error: 'Internal Server Error', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
