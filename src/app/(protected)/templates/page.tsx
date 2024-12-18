'use client';

import Link from 'next/link';
import Image from 'next/image';

const templates = [
  {
    id: 1,
    name: 'Professionnel',
    description: 'Un design épuré et professionnel, parfait pour les cadres et managers.',
    image: '/templates/professional.png',
  },
  {
    id: 2,
    name: 'Créatif',
    description: 'Un design moderne et créatif, idéal pour les métiers artistiques.',
    image: '/templates/creative.png',
  },
  {
    id: 3,
    name: 'Minimaliste',
    description: 'Simple et efficace, ce template met en avant vos compétences.',
    image: '/templates/minimal.png',
  },
  // Ajoutez plus de templates ici
];

export default function TemplatesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Templates de CV</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choisissez parmi notre sélection de templates professionnels pour créer votre CV parfait.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="aspect-h-3 aspect-w-4 bg-gray-200">
              <Image
                src={template.image}
                alt={template.name}
                width={400}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                <p className="mt-3 text-base text-gray-500">{template.description}</p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/cv/new?template=${template.id}`}
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Utiliser ce template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
