import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    
    // Longueur minimale
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Présence de chiffres
    if (/\d/.test(password)) strength += 1;
    
    // Présence de lettres minuscules
    if (/[a-z]/.test(password)) strength += 1;
    
    // Présence de lettres majuscules
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Présence de caractères spéciaux
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 1) return 'Très faible';
    if (strength <= 2) return 'Faible';
    if (strength <= 4) return 'Moyen';
    if (strength <= 5) return 'Fort';
    return 'Très fort';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 4) return 'bg-yellow-500';
    if (strength <= 5) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const strength = calculateStrength(password);
  const percentage = (strength / 6) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-xs font-medium ${strength > 4 ? 'text-green-600' : 'text-gray-500'}`}>
        Force du mot de passe: {getStrengthText(strength)}
      </p>
      <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
        <li className={password.length >= 8 ? 'text-green-600' : ''}>
          Au moins 8 caractères
        </li>
        <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
          Au moins une majuscule
        </li>
        <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
          Au moins une minuscule
        </li>
        <li className={/\d/.test(password) ? 'text-green-600' : ''}>
          Au moins un chiffre
        </li>
        <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}>
          Au moins un caractère spécial
        </li>
      </ul>
    </div>
  );
};
