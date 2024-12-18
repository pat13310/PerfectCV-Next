import { useThemeStore } from '@/store/useThemeStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import { themes } from '@/lib/themes';

const TEMPLATES = [
  { id: 'elegant', name: 'Elegant', theme: 'simple-dark' },
  { id: 'minimal', name: 'Minimal', theme: 'simple-light' },
  { id: 'modern', name: 'Modern', theme: 'simple-blue' }
];

export function TemplateList() {
  const { setCurrentTheme } = useThemeStore();
  const { setCurrentTemplate } = useTemplateStore();

  const handleSelect = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setCurrentTemplate(templateId);
      const theme = Object.values(themes).find(t => t.id === template.theme);
      if (theme) setCurrentTheme(theme);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-medium mb-4">Modèles</div>
      <div className="grid gap-3">
        {TEMPLATES.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            className="relative h-10 rounded-lg border hover:border-violet-500"
          >
            <div className="absolute rounded-lg inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <span className="text-xs text-white font-medium">{name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
