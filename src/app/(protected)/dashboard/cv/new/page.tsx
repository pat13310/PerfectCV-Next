'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StepsController, type Step } from '@/components/ui/StepsController';
import {
  PersonalInfoStep,
  EducationStep,
  ExperienceStep,
  SkillsStep,
  HobbiesStep,
  TemplateStep,
} from '@/components/cv-steps';
import { CVFormData } from '@/types/cvForm';

const steps: Step[] = [
  {
    id: 'personal',
    name: 'Informations personnelles',
    description: 'Vos informations de base',
  },
  {
    id: 'education',
    name: 'Formation',
    description: 'Votre parcours académique',
  },
  {
    id: 'experience',
    name: 'Expérience',
    description: 'Vos expériences professionnelles',
  },
  {
    id: 'skills',
    name: 'Compétences',
    description: 'Vos compétences techniques et soft skills',
  },
  {
    id: 'hobbies',
    name: 'Loisirs',
    description: 'Vos centres d\'intérêt',
  },
  {
    id: 'template',
    name: 'Template',
    description: 'Choisissez le design de votre CV',
  },
];

export default function NewCVPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CVFormData>({
    personal: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
    interests: [],
    template: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const templateOptions = [
    { id: '', label: 'Défaut (Professionnel)' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'creative', label: 'Créatif' },
    { id: 'academic', label: 'Académique' },
    { id: 'unknown-template', label: 'Template Inconnu' }
  ];

  const handleSubmit = async () => {
    try {
      const title = formData.personal.firstName && formData.personal.lastName
        ? `CV - ${formData.personal.firstName} ${formData.personal.lastName}`
        : 'Nouveau CV';

      const response = await fetch('/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          title,
          ...formData,
        }),
      });

      if (response.ok) {
        router.push('/dashboard/cv');
      }
    } catch (error) {
      console.error('Error creating CV:', error);
    }
  };

  const getCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <EducationStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ExperienceStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <SkillsStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <HobbiesStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <TemplateStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden bg-gradient-to-br from-violet-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <h1>Créer un Nouveau CV</h1>
        
        {/* Sélecteur de template pour test */}
        <div className="mb-4">
          <label htmlFor="template-select" className="block text-sm font-medium text-gray-700">
            Sélectionner un Template (Test)
          </label>
          <select 
            id="template-select"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {templateOptions.map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </select>
        </div>

        {/* Affichage du template sélectionné pour test */}
        {selectedTemplate !== undefined && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Aperçu du Template</h2>
            {/* TemplateWrapper 
              templateId={selectedTemplate} 
              data={mockCVData} 
              theme={defaultTheme} 
            /> */}
          </div>
        )}

        <StepsController
          steps={steps}
          onStepChange={setCurrentStep}
          onSubmit={handleSubmit}
        >
          {getCurrentStep()}
        </StepsController>
      </div>
    </div>
  );
}
