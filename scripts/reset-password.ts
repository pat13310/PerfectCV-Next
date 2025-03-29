import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function resetPassword(email: string, newPassword: string) {
  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ Utilisateur ${email} non trouvé`);
      return false;
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log(`✅ Mot de passe réinitialisé pour ${email}`);
    return true;
  } catch (error) {
    console.error('🔥 Erreur lors de la réinitialisation du mot de passe :', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function runPasswordReset() {
  const testEmail = 'test@example.com';
  const newPassword = 'testpassword123';

  const resetResult = await resetPassword(testEmail, newPassword);
  console.log(`📋 Résultat de la réinitialisation : ${resetResult ? 'Succès' : 'Échec'}`);
}

runPasswordReset().catch(console.error);
