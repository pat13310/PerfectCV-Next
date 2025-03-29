'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/lib/themes';
import { Button } from '@/components/ui/PrimaryButton';

interface SavedThemesProps {
  onSelect: (theme: Theme) => void;
}

export function SavedThemes({ onSelect }: SavedThemesProps) {
  const { customThemes, deleteCustomTheme } = useThemeStore();

  if (customThemes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Thèmes sauvegardés</h3>
      <div className="space-y-4">
        {customThemes.map((theme) => (
          <div
            key={theme.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span className="font-medium">{theme.name}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelect(theme)}
              >
                Appliquer
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteCustomTheme(theme.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
