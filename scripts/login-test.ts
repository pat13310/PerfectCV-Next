import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function testLogin(email: string, password: string) {
  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ Utilisateur ${email} non trouvé`);
      return false;
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log(`✅ Connexion réussie pour ${email}`);
      return true;
    } else {
      console.error(`❌ Mot de passe incorrect pour ${email}`);
      return false;
    }
  } catch (error) {
    console.error('🔥 Erreur lors du test de connexion :', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function runLoginTest() {
  const testEmail = 'test@example.com';
  const testPassword = 'testpassword123';

  const loginResult = await testLogin(testEmail, testPassword);
  console.log(`📋 Résultat du test : ${loginResult ? 'Succès' : 'Échec'}`);
}

runLoginTest().catch(console.error);
