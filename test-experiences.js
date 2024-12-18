const { extractExperiences } = require('./src/lib/documentParser');

const sampleText = `
Google
Développeur Senior
Mountain View, Californie
Développement d'applications web innovantes utilisant les dernières technologies. 
Collaboration étroite avec l'équipe de produit pour créer des solutions performantes.

Microsoft
Ingénieur Logiciel
Redmond, Washington
Conception et implémentation de systèmes cloud distribués.
Optimisation des performances des services backend.
`;

const experiences = extractExperiences(sampleText);
console.log(JSON.stringify(experiences, null, 2));
