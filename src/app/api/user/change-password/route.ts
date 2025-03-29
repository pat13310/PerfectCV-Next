import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { scryptSync, timingSafeEqual } from 'crypto'
import { hashPassword } from "@/lib/auth";
import { sendPasswordChangeEmail } from "@/lib/email";

export async function PUT(request: Request) {
  try {
    // Récupérer les informations du client
    const headersList = request.headers;
    const userAgent = headersList.get('user-agent') || '';
    const ip = headersList.get('x-forwarded-for') ||
               headersList.get('x-real-ip') ||
               '127.0.0.1';

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Les mots de passe sont requis' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: { 
        id: true,
        password: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier le mot de passe actuel
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(currentPassword, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (!match) {
      return NextResponse.json(
        { error: 'Mot de passe actuel incorrect' },
        { status: 401 }
      );
    }

    // Hasher et mettre à jour le nouveau mot de passe
    const hashedNewPassword = hashPassword(newPassword);

    // Mettre à jour le mot de passe et créer l'historique dans une transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { email: session.user.email },
        data: { password: hashedNewPassword }
      }),
      prisma.passwordHistory.create({
        data: {
          userId: user.id,
          ipAddress: ip,
          userAgent: userAgent
        }
      })
    ]);

    // Envoyer l'email de confirmation
    try {
      await sendPasswordChangeEmail(
        user.email,
        user.firstName || user.email.split('@')[0]
      );
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // On continue même si l'email échoue
    }

    return NextResponse.json(
      { message: 'Mot de passe mis à jour avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du mot de passe' },
      { status: 500 }
    );
  }
}
