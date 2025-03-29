import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('\n ==== TEST AUTHENTIFICATION ====');
  
  try {
    // Récupération des headers
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');
    console.log('Cookie header:', cookieHeader || 'aucun cookie');

    // Vérification de la session
    const session = await getServerSession(authOptions);
    
    // Détails de la configuration
    const authDetails = {
      session: {
        présente: !!session,
        utilisateur: session?.user?.email || 'non connecté',
        expires: session?.expires || null,
      },
      configuration: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        sessionStrategy: authOptions.session?.strategy,
        signInPage: authOptions.pages?.signIn,
      },
      headers: {
        hasCookie: !!cookieHeader,
        accept: headersList.get('accept'),
        userAgent: headersList.get('user-agent'),
      }
    };

    console.log('Détails authentification:', JSON.stringify(authDetails, null, 2));

    return NextResponse.json(authDetails, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error: unknown) {
    console.error('Erreur lors du test d\'authentification:', error);
    
    // Vérifier si l'erreur est une instance d'Error
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      { error: 'Erreur lors du test d\'authentification', details: errorMessage },
      { status: 500 }
    );
  }
}
