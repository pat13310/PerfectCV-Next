import React, { useState, useMemo } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { themes } from '@/lib/themes';
import {
  Squares2X2Icon,
  SwatchIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// Définition des palettes prédéfinies
const COLOR_PALETTES = [
  {
    name: 'Corporate',
    primary: '#3B82F6',    // Bleu professionnel
    secondary: '#60A5FA',  // Bleu clair
    accent: '#2563EB',     // Bleu foncé
    background: '#FFFFFF',
    text: '#1F2937',       // Gris anthracite
    headings: '#111827'    // Gris très foncé
  },
  {
    name: 'Creative',
    primary: '#8B5CF6',    // Violet
    secondary: '#A78BFA',  // Violet clair
    accent: '#6D28D9',     // Violet profond
    background: '#FFFFFF',
    text: '#2D3748',       // Gris bleuté
    headings: '#1A202C'    // Gris très foncé
  },
  {
    name: 'Minimal',
    primary: '#4B5563',    // Gris neutre
    secondary: '#6B7280',  // Gris moyen
    accent: '#374151',     // Gris foncé
    background: '#FFFFFF',
    text: '#1F2937',       // Gris anthracite
    headings: '#111827'    // Gris très foncé
  },
  {
    name: 'Vibrant',
    primary: '#10B981',    // Vert émeraude
    secondary: '#34D399',  // Vert clair
    accent: '#059669',     // Vert profond
    background: '#FFFFFF',
    text: '#2D3748',       // Gris bleuté
    headings: '#1A202C'    // Gris très foncé
  }
];

export function TemplateColor() {
  const {
    currentTheme,
    setCurrentTheme,
    customColors,
    setCustomColors
  } = useThemeStore();

  const [selectedPalette, setSelectedPalette] = useState<string>('Corporate');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // Gestion de la sélection de palette
  const handlePaletteSelect = (palette: typeof COLOR_PALETTES[0]) => {
    setSelectedPalette(palette.name);

    // Trouver un thème existant qui correspond le mieux
    const matchingTheme = Object.values(themes).find(theme =>
      theme.colors.primary === palette.primary
    ) || Object.values(themes)[0];

    // Mettre à jour le thème et les couleurs personnalisées
    setCurrentTheme(matchingTheme);
    setCustomColors({
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      background: palette.background,
      text: palette.text,
      headings: palette.headings
    });
  };

  // Gestion de la modification manuelle des couleurs
  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors({
      ...customColors,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
      {/* En-tête de personnalisation */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-3">
          <SwatchIcon className="h-6 w-6 text-violet-600" />
          <h3 className="text-sm font-semibold text-gray-800">
            Personnalisation des Couleurs
          </h3>
        </div>
      </div>
      {/* Bouton de mode avancé */}
      <button
        onClick={() => setIsAdvancedMode(!isAdvancedMode)}
        className="flex items-center space-x-2 text-sm text-violet-600 
            hover:bg-violet-50 px-3 py-1.5 rounded-md transition-colors"
      >
        {isAdvancedMode ? <Squares2X2Icon className="h-4 w-4" /> : <AdjustmentsHorizontalIcon className="h-4 w-4" />}
        <span>{isAdvancedMode ? 'Mode Rapide' : 'Mode Avancé'}</span>
      </button>


      {/* Mode Rapide - Palettes Prédéfinies */}
      {!isAdvancedMode && (
        <div className="grid grid-cols-2 gap-4">
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => handlePaletteSelect(palette)}
              className={`relative rounded-lg overflow-hidden shadow-md 
                ${selectedPalette === palette.name 
                  ? 'ring-2 ring-violet-500 scale-105' 
                  : 'hover:opacity-90'} transition-all duration-200`}
            >
              {/* Rectangle de couleurs */}
              <div className="flex h-20 w-full">
                {['primaire', 'secondaire', 'accent', 'arrière-plan'].map((colorKey) => (
                  <div 
                    key={colorKey} 
                    className="flex-1 h-full"
                    style={{ backgroundColor: palette[colorKey as keyof typeof palette] }}
                  />
                ))}
              </div>
              <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md shadow-sm">
                <span className="text-sm font-medium text-gray-800">
                  {palette.name}
                </span>
              </div>
              {selectedPalette === palette.name && (
                <div className="absolute top-2 left-2 bg-violet-500 text-white px-2 py-1 rounded-full text-xs">
                  Sélectionné
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mode Avancé - Sélection Détaillée */}
      {isAdvancedMode && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Rectangle de couleurs */}
            <div className="flex h-20 w-full rounded-lg overflow-hidden shadow-md">
              {Object.entries(customColors || {}).map(([key, value]) => (
                <div 
                  key={key} 
                  className="flex-1 h-full flex items-center justify-center"
                  style={{ backgroundColor: value }}
                >
                  <span className="text-xs font-medium text-white drop-shadow-md">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(customColors || {}).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-xs font-medium text-gray-600 tracking-wider">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className=" space-x-3 bg-gray-50 p-2 ">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
                    className="w-10 h-10 border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-mono text-gray-500">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic text-center">
            Ajustez finement la palette de couleurs de votre CV
          </p>
        </div>
      )}
    </div>
  );
}

export default TemplateColor;
