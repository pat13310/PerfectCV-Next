'use client';

import { Dispatch, SetStateAction } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/PrimaryButton';
import { FormField } from '@/components/forms/FormField';
import { CVFormData } from '@/types/cvForm';

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

type ExperienceStepProps = {
  formData: CVFormData;
  setFormData: Dispatch<SetStateAction<CVFormData>>;
};

export function ExperienceStep({ formData, setFormData }: ExperienceStepProps) {
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Expérience professionnelle</h2>
        <Button onClick={addExperience} variant="outline" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une expérience
        </Button>
      </div>

      {formData.experience.map((exp, index) => (
        <div key={index} className="space-y-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-end">
            <Button
              onClick={() => removeExperience(index)}
              variant="destructive"
              size="sm"
              className="hover:bg-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Entreprise"
              value={exp.company}
              onChange={(value) => updateExperience(index, 'company', value)}
              required
            />
            <FormField
              label="Poste"
              value={exp.position}
              onChange={(value) => updateExperience(index, 'position', value)}
              required
            />
            <FormField
              label="Lieu"
              value={exp.location}
              onChange={(value) => updateExperience(index, 'location', value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Date de début"
                type="date"
                value={exp.startDate}
                onChange={(value) => updateExperience(index, 'startDate', value)}
                required
              />
              <FormField
                label="Date de fin"
                type="date"
                value={exp.endDate}
                onChange={(value) => updateExperience(index, 'endDate', value)}
              />
            </div>
            <div className="col-span-full">
              <FormField
                label="Description"
                type="textarea"
                value={exp.description}
                onChange={(value) => updateExperience(index, 'description', value)}
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
