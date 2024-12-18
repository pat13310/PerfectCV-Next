import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(request: Request) {
  try {
    // Récupérer la session de l'utilisateur connecté
    const session = await getServerSession(authOptions)

    // Vérifier si l'utilisateur est authentifié
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    // Supprimer l'utilisateur de la base de données
    await prisma.user.delete({
      where: { 
        email: session.user?.email || undefined 
      }
    })

    // Déconnecter l'utilisateur
    return NextResponse.json({ message: "Compte supprimé avec succès" }, { status: 200 })

  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error)
    return NextResponse.json({ 
      error: "Impossible de supprimer le compte" 
    }, { status: 500 })
  }
}
