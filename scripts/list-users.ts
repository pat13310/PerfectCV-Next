import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true
      }
    });

    console.log('📋 Liste des utilisateurs :');
    console.log('----------------------------');
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données.');
      return;
    }

    users.forEach((user, index) => {
      console.log(`👤 Utilisateur #${index + 1}:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Nom: ${user.firstName} ${user.lastName}`);
      console.log(`   Créé le: ${user.createdAt.toLocaleString()}`);
      console.log('----------------------------');
    });

  } catch (error) {
    console.error('🚨 Erreur lors de la récupération des utilisateurs :', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers().catch(console.error);
