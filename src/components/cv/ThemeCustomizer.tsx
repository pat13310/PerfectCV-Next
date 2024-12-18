'use client';

import { themes, type Theme } from '@/lib/themes';
import { useCallback, useState } from 'react';
import { SwatchIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

interface ColorGroup {
  title: string;
  colors: Array<{
    key: keyof Theme['colors'];
    label: string;
  }>;
}

const colorGroups: ColorGroup[] = [
  {
    title: 'Couleurs principales',
    colors: [
      { key: 'primary', label: 'Principale' },
      { key: 'secondary', label: 'Secondaire' },
      { key: 'accent', label: 'Accent' },
    ]
  },
  {
    title: 'Texte',
    colors: [
      { key: 'text', label: 'Texte' },
      { key: 'headings', label: 'Titres' },
    ]
  },
  {
    title: 'Arrière-plan',
    colors: [
      { key: 'background', label: 'Fond' },
    ]
  }
];

interface ThemeCustomizerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onCustomColorsChange: (colors: Theme['colors']) => void;
}

export function ThemeCustomizer({
  currentTheme,
  onThemeChange,
  onCustomColorsChange,
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'colors'>('template');

  const handleColorChange = useCallback((colorKey: keyof Theme['colors'], value: string) => {
    onCustomColorsChange({
      ...currentTheme.colors,
      [colorKey]: value
    });
  }, [onCustomColorsChange, currentTheme]);

  return (
    <div className="w-[240px] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('template')}
          className={`flex items-center gap-1.5 flex-1 px-3 py-2 text-xs font-medium transition-colors relative
            ${activeTab === 'template'
              ? 'text-violet-600 border-b-2 border-violet-600 -mb-[1px]'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <Squares2X2Icon className="h-3.5 w-3.5" />
          <span>Template</span>
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-1.5 flex-1 px-3 py-2 text-xs font-medium transition-colors relative
            ${activeTab === 'colors'
              ? 'text-violet-600 border-b-2 border-violet-600 -mb-[1px]'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <SwatchIcon className="h-3.5 w-3.5" />
          <span>Couleurs</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {activeTab === 'template' ? (
          <div className="grid grid-cols-2 gap-2">
            {Object.values(themes).map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme)}
                className={`
                  group p-2 rounded-lg text-xs transition-all
                  ${currentTheme.id === theme.id
                    ? 'bg-violet-50 ring-1 ring-violet-200 text-violet-700'
                    : 'hover:bg-gray-50 border border-gray-100 text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {theme.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {colorGroups.map((group) => (
              <div key={group.title}>
                <div className="text-xs font-medium text-gray-700 mb-2">{group.title}</div>
                <div className="grid grid-cols-6 gap-1.5">
                  {group.colors.map(({ key, label }) => (
                    <div key={key} className="col-span-2">
                      <div className="text-[10px] text-gray-600 mb-1">{label}</div>
                      <input
                        type="color"
                        value={currentTheme.colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="block w-full h-6 rounded cursor-pointer ring-1 ring-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
