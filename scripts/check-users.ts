import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function checkAndCreateUser() {
  try {
    // Vérifier les utilisateurs existants
    const users = await prisma.user.findMany()
    console.log('Utilisateurs existants :', users.length)
    
    users.forEach(user => {
      console.log(`- Email: ${user.email}, ID: ${user.id}`)
    })

    // Si aucun utilisateur, créer un utilisateur de test
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('testpassword123', 10)
      
      const newUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User'
        }
      })

      console.log('Utilisateur de test créé :', newUser)
    }
  } catch (error) {
    console.error('Erreur lors de la vérification/création des utilisateurs :', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndCreateUser().catch(console.error)
