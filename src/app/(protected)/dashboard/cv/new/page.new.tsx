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
  InterestsStep,
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
    id: 'interests',
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
    education: [{ 
      school: '', 
      degree: '', 
      field: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [{
      name: '',
      level: ''
    }],
    interests: [],
    template: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
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
        return <InterestsStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <TemplateStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-violet-50 to-rose-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepsController
          steps={steps}
          onStepChange={setCurrentStep}
          onSubmit={handleSubmit}
          className="h-full"
        >
          {getCurrentStep()}
        </StepsController>
      </div>
    </div>
  );
}
