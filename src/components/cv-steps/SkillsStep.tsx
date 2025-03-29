'use client';

import { Dispatch, SetStateAction } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/PrimaryButton';
import { FormField } from '@/components/forms/FormField';
import { SelectField } from '@/components/forms/SelectField';
import { CVFormData } from '@/types/cvForm';

type SkillsStepProps = {
  formData: CVFormData;
  setFormData: Dispatch<SetStateAction<CVFormData>>;
};

export function SkillsStep({ formData, setFormData }: SkillsStepProps) {
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', level: 'Intermédiaire' }],
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const updateSkill = (index: number, field: keyof { name: string; level: string }, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Compétences</h2>
        <Button onClick={addSkill} variant="outline" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une compétence
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1">
              <FormField
                label="Compétence"
                value={skill.name}
                onChange={(value) => updateSkill(index, 'name', value)}
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Niveau"
                value={skill.level}
                onChange={(value) => updateSkill(index, 'level', value)}
                options={[
                  'Débutant',
                  'Intermédiaire',
                  'Avancé',
                  'Expert',
                ]}
                required
              />
            </div>
            <Button
              onClick={() => removeSkill(index)}
              variant="destructive"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-700 mb-2"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
