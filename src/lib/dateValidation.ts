// Utilitaire de validation pour les dates de naissance

export function isValidDateNaissance(dateNaissance?: string): boolean {
  if (!dateNaissance) return false;

  // Expression régulière pour valider le format AAAA-MM-JJ
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateNaissance)) return false;

  // Convertir en objet Date pour validation supplémentaire
  const date = new Date(dateNaissance);
  
  // Vérifier que la date est valide et pas dans le futur
  return (
    date instanceof Date && 
    !isNaN(date.getTime()) && 
    date < new Date()
  );
}

export function calculateAge(dateNaissance?: string): number | null {
  if (!isValidDateNaissance(dateNaissance)) return null;

  const birthDate = new Date(dateNaissance!);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
