'use client';

import { useState, SetStateAction, Dispatch } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { createRoot } from 'react-dom/client';
import { CVFormData } from '@/types/cvForm';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Un design épuré et contemporain, parfait pour les profils créatifs et innovants. Met en valeur vos compétences avec style.',
    preview: '/templates/modern.png',
  },
  {
    id: 'professional',
    name: 'Professionnel',
    description: 'Template élégant et formel, idéal pour les secteurs traditionnels. Structure claire et efficace pour une lecture optimale.',
    preview: '/templates/professional.png',
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Design unique et audacieux pour se démarquer. Parfait pour les métiers créatifs et les startups innovantes.',
    preview: '/templates/creative.png',
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Style épuré et minimaliste qui va à l\'essentiel. Idéal pour mettre en avant votre parcours de manière claire et concise.',
    preview: '/templates/minimal.png',
  },
  {
    id: 'academic',
    name: 'Académique',
    description: 'Format structuré pour les profils académiques et scientifiques. Parfait pour les chercheurs et enseignants.',
    preview: '/templates/academic.png',
  },
];

type TemplateStepProps = {
  formData: CVFormData;
  setFormData: Dispatch<SetStateAction<CVFormData>>;
  selectedTemplate?: string;
  onTemplateChange?: (templateId: string) => void;
};

export const TemplateStep: React.FC<TemplateStepProps> = ({ formData, setFormData, selectedTemplate, onTemplateChange }) => {
  const [currentIndex, setCurrentIndex] = useState(Math.max(0, templates.findIndex(t => t.id === selectedTemplate)) || 1);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
    onTemplateChange?.(templates[(currentIndex + 1) % templates.length].id);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
    onTemplateChange?.(templates[(currentIndex - 1 + templates.length) % templates.length].id);
  };

  const getVisibleTemplates = () => {
    const result = [];
    const prev = (currentIndex - 1 + templates.length) % templates.length;
    const next = (currentIndex + 1) % templates.length;
    
    result.push(templates[prev]);
    result.push(templates[currentIndex]);
    result.push(templates[next]);
    
    return result;
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col gap-6 items-start justify-center w-full">
        <h2 className="text-xl font-bold text-violet-950">
          {`Modèle "${templates[currentIndex].name}"`}
        </h2>
        <p className="mt-2 text-violet-600">Sélectionnez le design qui correspond le mieux à votre profil</p>
      </div>

      <div className="relative flex-1 flex flex-col">
        <div className="relative flex-1 flex items-center">
          {/* Left navigation button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeftIcon className="h-5 w-5 text-violet-700" />
          </button>

          {/* Carousel container */}
          <div className="flex-1 bg-gradient-to-br from-violet-100 via-violet-50 to-pink-50 rounded-2xl p-4 h-[280px] overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <div className="flex w-[85%] justify-center gap-4">
                {getVisibleTemplates().map((template, idx) => {
                  const isActive = idx === 1;
                  const isPrevious = idx === 0;
                  const isNext = idx === 2;

                  return (
                    <div
                      key={template.id}
                      className={`transition-all duration-500 ease-out px-2 ${
                        isActive ? 'w-[35%]' : 'w-[25%]'
                      }`}
                    >
                      <div
                        className={`transition-all duration-500 transform ${
                          isActive 
                            ? 'scale-100 opacity-100 rotate-0' 
                            : isPrevious
                              ? 'scale-90 opacity-70 -rotate-6'
                              : 'scale-90 opacity-70 rotate-6'
                        }`}
                      >
                        <div className="relative h-[220px] bg-white rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            if (!isActive) {
                              const newIndex = idx === 0 
                                ? (currentIndex - 1 + templates.length) % templates.length 
                                : (currentIndex + 1) % templates.length;
                              setCurrentIndex(newIndex);
                              onTemplateChange?.(template.id);
                            }
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-pink-50/50 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                          <Image
                            src={template.preview}
                            alt={template.name}
                            className={`relative z-10 object-contain transition-all duration-500 ${isActive ? 'scale-[0.95]' : 'scale-90'}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.style.width = '100%';
                                placeholder.style.height = '100%';
                                parent.appendChild(placeholder);
                                const root = createRoot(placeholder);
                                root.render(<ImagePlaceholder />);
                              }
                            }}
                          />
                          
                          {/* Info overlay */}
                          <div
                            className={`absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t ${
                              isActive 
                                ? 'from-violet-950 via-violet-900/80 to-transparent' 
                                : 'from-violet-950/90 via-violet-900/70 to-transparent'
                            } backdrop-blur-[1px] transition-all duration-500`}
                          >
                            <div className="text-center p-2">
                              <h3 className="text-sm font-bold tracking-wide text-white/95 mb-0.5">
                                {template.name}
                              </h3>
                              <p className="text-violet-50 text-[10px] leading-relaxed font-medium mb-1.5">
                                {template.description}
                              </p>
                              {isActive && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onTemplateChange?.(template.id);
                                  }}
                                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/95 text-violet-900 hover:bg-white transition-all hover:scale-105 active:scale-95"
                                >
                                  Sélectionner
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right navigation button */}
          <button
            onClick={goToNext}
            className="absolute right-2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRightIcon className="h-5 w-5 text-violet-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
