'use client';

import { useEffect, useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch templates from API
    const mockTemplates = [
      {
        id: '1',
        name: 'Template Moderne',
        description: 'Un design épuré et professionnel',
        thumbnail: '/templates/modern.png'
      },
      {
        id: '2',
        name: 'Template Créatif',
        description: 'Parfait pour les profils créatifs',
        thumbnail: '/templates/creative.png'
      },
      // Add more templates as needed
    ];

    setTemplates(mockTemplates);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Templates de CV</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {/* Add actual template preview images later */}
              <div className="w-full h-48 bg-gray-200" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
              <p className="text-gray-600 text-sm">{template.description}</p>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                onClick={() => {
                  // TODO: Implement template selection
                  console.log('Selected template:', template.id);
                }}
              >
                Utiliser ce template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
