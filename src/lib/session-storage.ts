import { FormData } from '@/types/formData';
import { prisma } from '@/lib/prisma';

// Un stockage en base de données pour les données de session
export async function storeCVData(userId: string, cvData: FormData | null): Promise<void> {
  try {
    // Vérifier si les données sont nulles ou undefined
    if (!cvData) {
      console.warn('Tentative de stockage de données CV nulles pour l\'utilisateur:', userId);
      return; // Sortir de la fonction sans lever d'erreur
    }

    // Validation supplémentaire des données
    if (typeof cvData !== 'object') {
      console.error('Les données CV ne sont pas un objet valide:', cvData);
      throw new Error('Format de données CV invalide');
    }

    // Vérification des champs obligatoires
    if (!cvData.personal || !cvData.personal.firstName) {
      console.error('Données personnelles incomplètes:', cvData.personal);
      throw new Error('Informations personnelles manquantes');
    }

    // Tenter de mettre à jour ou créer un nouvel enregistrement de CV
    const dataToStore = JSON.stringify(cvData);
    
    console.log('Données CV à stocker:', dataToStore.slice(0, 500) + '...');

    await prisma.curriculum.upsert({
      where: { userId },
      update: { data: dataToStore },
      create: { 
        userId, 
        data: dataToStore 
      }
    });
    console.log('Données CV stockées avec succès pour l\'utilisateur:', userId);
  } catch (error) {
    console.error('Erreur lors du stockage des données CV:', error);
    throw error;
  }
}

export async function getCVData(userId: string): Promise<FormData | null> {
  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: { userId }
    });

    if (!curriculum) {
      console.log('Aucune donnée CV trouvée pour l\'utilisateur:', userId);
      return null;
    }

    console.log('Données CV récupérées pour l\'utilisateur:', userId);
    return JSON.parse(curriculum.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données CV:', error);
    throw error;
  }
}

export async function clearCVData(userId: string) {
  try {
    await prisma.curriculum.delete({
      where: { userId }
    });
    console.log('Données CV supprimées pour l\'utilisateur:', userId);
  } catch (error) {
    console.error('Erreur lors de la suppression des données CV:', error);
    throw error;
  }
}
