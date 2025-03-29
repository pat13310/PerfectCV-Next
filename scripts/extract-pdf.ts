import { extractPDFTextFromLocalFile } from '../src/lib/documentParser';
import path from 'path';

async function main() {
  try {
    // Utilisez un chemin absolu ou relatif à votre projet
    const pdfPath = path.resolve(process.cwd(), 'mon_cv.pdf');
    
    console.log('Chemin du PDF :', pdfPath);
    
    const extractedText = await extractPDFTextFromLocalFile(pdfPath);
    
    console.log('Contenu extrait :');
    console.log(extractedText);
  } catch (error) {
    console.error('Erreur lors de l\'extraction :', error);
  }
}

main();
