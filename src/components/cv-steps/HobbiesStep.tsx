'use client';

import React, { useState } from 'react';
import { CVFormData } from '@/types/cvForm';
import { Button } from '@/components/ui/PrimaryButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface HobbiesStepProps {
  formData: CVFormData;
  setFormData: React.Dispatch<React.SetStateAction<CVFormData>>;
}

export function HobbiesStep({ formData, setFormData }: HobbiesStepProps) {
  const [newInterest, setNewInterest] = useState<{ name: string; description?: string }>({
    name: '',
    description: '',
  });

  const addInterest = () => {
    if (newInterest.name.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, {
          name: newInterest.name,
          description: newInterest.description || undefined
        }]
      }));
      setNewInterest({ name: '', description: '' });
    }
  };

  const removeInterest = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleInterestChange = (index: number, field: 'name' | 'description', value: string) => {
    setFormData(prev => {
      const updatedInterests = [...prev.interests];
      updatedInterests[index] = {
        ...updatedInterests[index],
        [field]: value
      };
      return { ...prev, interests: updatedInterests };
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-violet-800">Vos Centres d'Intérêt</h2>
      <p className="text-gray-600 mb-4">Ajoutez vos passions et loisirs qui peuvent enrichir votre profil</p>

      {formData.interests?.map((interest, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nom de l'intérêt"
            value={interest.name}
            onChange={(e) => handleInterestChange(index, 'name', e.target.value)}
            className="flex-grow p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Description (optionnel)"
            value={interest.description || ''}
            onChange={(e) => handleInterestChange(index, 'description', e.target.value)}
            className="flex-grow p-2 border rounded-md"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => removeInterest(index)}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Nom de l'intérêt"
          value={newInterest.name}
          onChange={(e) => setNewInterest(prev => ({ ...prev, name: e.target.value }))}
          className="flex-grow p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Description (optionnel)"
          value={newInterest.description || ''}
          onChange={(e) => setNewInterest(prev => ({ ...prev, description: e.target.value }))}
          className="flex-grow p-2 border rounded-md"
        />
        <Button 
          variant="secondary" 
          onClick={addInterest}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un centre d'intérêt
        </Button>
      </div>
    </div>
  );
};
