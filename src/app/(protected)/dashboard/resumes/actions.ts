'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const userIdSchema = z.string().min(1);

export async function getResumesAction(userId: string) {
  try {
    // Valider l'ID utilisateur
    userIdSchema.parse(userId);

    const resumes = await prisma.cV.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return { success: true, data: resumes };
  } catch (error) {
    console.error('Erreur lors de la récupération des CV:', error);
    return { 
      success: false, 
      error: 'Impossible de récupérer les CV. Veuillez réessayer.' 
    };
  }
}

export async function deleteResumeAction(id: string, userId: string) {
  try {
    // Valider l'ID utilisateur
    userIdSchema.parse(userId);

    const resume = await prisma.cV.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    // Revalider le chemin pour mettre à jour la page
    revalidatePath('/dashboard/resumes');
    
    return { success: true, data: resume };
  } catch (error) {
    console.error('Erreur lors de la suppression du CV:', error);
    return { 
      success: false, 
      error: 'Impossible de supprimer le CV. Veuillez réessayer.' 
    };
  }
}
