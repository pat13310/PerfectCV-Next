'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import { getContentSuggestions, getSuggestedColors } from '@/lib/openai';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/lib/themes';

interface AIAssistantProps {
  section: string;
  content: string;
  jobTitle?: string;
  onApplyContent?: (content: string) => void;
  onApplyTheme?: (theme: Partial<Theme>) => void;
}

export function AIAssistant({
  section,
  content,
  jobTitle,
  onApplyContent,
  onApplyTheme
}: AIAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    content?: string;
    skills?: string[];
    improvements?: string[];
  }>({});
  const [error, setError] = useState<string | null>(null);

  const { updateCurrentTheme } = useThemeStore();

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getContentSuggestions(section, content, jobTitle);
      setSuggestions(result);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? (err.message.includes('Clé API OpenAI manquante') 
          ? 'La clé API OpenAI n\'est pas configurée. Veuillez la définir dans vos paramètres.'
          : err.message.includes('invalide')
          ? 'La clé API OpenAI est invalide. Veuillez vérifier votre configuration.'
          : err.message.includes('Limite de requêtes')
          ? 'Limite de requêtes atteinte. Veuillez réessayer plus tard.'
          : 'Erreur lors de la génération des suggestions. Veuillez réessayer.')
        : 'Erreur lors de la génération des suggestions. Veuillez réessayer.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGetColorSuggestions = async (
    industry: string,
    style: 'professional' | 'creative' | 'academic'
  ) => {
    setLoading(true);
    setError(null);
    try {
      const colors = await getSuggestedColors(industry, style);
      if (onApplyTheme) {
        onApplyTheme({
          colors: {
            ...colors,
            background: '#ffffff',
            text: '#333333',
            headings: colors.primary,
          }
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? (err.message.includes('Clé API OpenAI manquante') 
          ? 'La clé API OpenAI n\'est pas configurée. Veuillez la définir dans vos paramètres.'
          : err.message.includes('invalide')
          ? 'La clé API OpenAI est invalide. Veuillez vérifier votre configuration.'
          : err.message.includes('Limite de requêtes')
          ? 'Limite de requêtes atteinte. Veuillez réessayer plus tard.'
          : 'Erreur lors de la génération des couleurs. Veuillez réessayer.')
        : 'Erreur lors de la génération des couleurs. Veuillez réessayer.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Assistant IA</h3>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleGetSuggestions}
            disabled={loading}
          >
            {loading ? 'Génération...' : 'Améliorer le contenu'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleGetColorSuggestions('technology', 'professional')}
            disabled={loading}
          >
            Suggérer des couleurs
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {suggestions.content && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Contenu amélioré</h4>
            <p className="text-gray-700">{suggestions.content}</p>
            {onApplyContent && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => onApplyContent(suggestions.content!)}
              >
                Appliquer
              </Button>
            )}
          </div>

          {suggestions.skills && suggestions.skills.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Compétences suggérées</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {suggestions.improvements && suggestions.improvements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Suggestions d'amélioration</h4>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-700">
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
