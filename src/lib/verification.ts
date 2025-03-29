import { randomBytes } from 'crypto';
import { prisma } from './prisma';

// Durée de validité du code (10 minutes)
const CODE_EXPIRATION = 10 * 60 * 1000;

export const generateVerificationCode = () => {
  // Génère un code à 6 chiffres
  return randomBytes(3).readUIntBE(0, 3) % 1000000;
};

export const storeVerificationCode = async (userId: string, code: number) => {
  const expiresAt = new Date(Date.now() + CODE_EXPIRATION);
  
  await prisma.verificationCode.upsert({
    where: { userId },
    create: {
      userId,
      code: code.toString(),
      expiresAt
    },
    update: {
      code: code.toString(),
      expiresAt,
      attempts: 0
    }
  });

  return expiresAt;
};

export const verifyCode = async (userId: string, code: string) => {
  const verificationCode = await prisma.verificationCode.findUnique({
    where: { userId }
  });

  if (!verificationCode) {
    throw new Error('Code de vérification non trouvé');
  }

  if (verificationCode.attempts >= 3) {
    throw new Error('Trop de tentatives. Veuillez générer un nouveau code');
  }

  if (verificationCode.expiresAt < new Date()) {
    throw new Error('Code expiré. Veuillez générer un nouveau code');
  }

  if (verificationCode.code !== code) {
    // Incrémenter le compteur de tentatives
    await prisma.verificationCode.update({
      where: { userId },
      data: { attempts: { increment: 1 } }
    });
    throw new Error('Code incorrect');
  }

  // Supprimer le code après utilisation
  await prisma.verificationCode.delete({
    where: { userId }
  });

  return true;
};
