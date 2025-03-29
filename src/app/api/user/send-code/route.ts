import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateVerificationCode, storeVerificationCode } from "@/lib/verification";
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        id: true,
        email: true,
        firstName: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const code = generateVerificationCode();
    const expiresAt = await storeVerificationCode(user.id, code);

    // Envoyer le code par email
    await sendVerificationEmail(
      user.email,
      user.firstName || user.email.split('@')[0],
      code,
      expiresAt
    );

    return NextResponse.json(
      { message: "Code envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du code:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du code" },
      { status: 500 }
    );
  }
}
