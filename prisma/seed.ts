import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test si nécessaire
  const user = await prisma.user.upsert({
    where: {
      email: 'test@example.com',
    },
    update: {},
    create: {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'hashedpassword', // Dans un vrai cas, il faudrait hasher le mot de passe
    },
  });

  // CV 1: Développeur Frontend
  await prisma.cV.create({
    data: {
      title: 'CV Développeur Frontend',
      content: JSON.stringify({
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+33 6 12 34 56 78',
          address: 'Paris, France',
          title: 'Développeur Frontend Senior',
          dateNaissance: '1990-01-15',
        },
        experience: [
          {
            title: 'Développeur Frontend Senior',
            company: 'Tech Company',
            location: 'Paris',
            startDate: '2020-01',
            endDate: 'present',
            description: 'Développement d\'applications React modernes',
          }
        ],
        education: [
          {
            degree: 'Master en Informatique',
            school: 'Université de Paris',
            location: 'Paris',
            startDate: '2015',
            endDate: '2020',
          }
        ],
        skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS']
      }),
      templateId: 'modern',
      userId: user.id,
    },
  });

  // CV 2: Chef de Projet
  await prisma.cV.create({
    data: {
      title: 'CV Chef de Projet',
      content: JSON.stringify({
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+33 6 12 34 56 78',
          address: 'Paris, France',
          title: 'Chef de Projet IT',
          dateNaissance: '1990-01-15',
        },
        experience: [
          {
            title: 'Chef de Projet IT',
            company: 'Grande Entreprise',
            location: 'Paris',
            startDate: '2018-01',
            endDate: 'present',
            description: 'Gestion de projets IT complexes',
          }
        ],
        education: [
          {
            degree: 'Master en Management de Projet',
            school: 'École de Management',
            location: 'Paris',
            startDate: '2016',
            endDate: '2018',
          }
        ],
        skills: ['Gestion de Projet', 'Agile', 'Scrum', 'Leadership']
      }),
      templateId: 'professional',
      userId: user.id,
    },
  });

  console.log('Base de données initialisée avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
