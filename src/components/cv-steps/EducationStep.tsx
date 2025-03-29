'use client';

import { Dispatch, SetStateAction } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/PrimaryButton';
import { FormField } from '@/components/forms/FormField';
import { CVFormData } from '@/types/cvForm';

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

type EducationStepProps = {
  formData: CVFormData;
  setFormData: Dispatch<SetStateAction<CVFormData>>;
};

export function EducationStep({ formData, setFormData }: EducationStepProps) {
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Formation</h2>
        <Button onClick={addEducation} variant="outline" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une formation
        </Button>
      </div>

      {formData.education.map((edu, index) => (
        <div key={index} className="space-y-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-end">
            <Button
              onClick={() => removeEducation(index)}
              variant="destructive"
              size="sm"
              className="hover:bg-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="École"
              value={edu.school}
              onChange={(value) => updateEducation(index, 'school', value)}
              required
            />
            <FormField
              label="Diplôme"
              value={edu.degree}
              onChange={(value) => updateEducation(index, 'degree', value)}
              required
            />
            <FormField
              label="Domaine d'études"
              value={edu.field}
              onChange={(value) => updateEducation(index, 'field', value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Date de début"
                type="date"
                value={edu.startDate}
                onChange={(value) => updateEducation(index, 'startDate', value)}
                required
              />
              <FormField
                label="Date de fin"
                type="date"
                value={edu.endDate}
                onChange={(value) => updateEducation(index, 'endDate', value)}
              />
            </div>
            <div className="col-span-full">
              <FormField
                label="Description"
                type="textarea"
                value={edu.description}
                onChange={(value) => updateEducation(index, 'description', value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
