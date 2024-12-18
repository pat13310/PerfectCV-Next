'use client';

import { FormField } from '@/components/forms/FormField';
import { CVFormData } from '@/types/cvForm';
import { Dispatch, SetStateAction } from 'react';

type PersonalInfoStepProps = {
  formData: CVFormData;
  setFormData: Dispatch<SetStateAction<CVFormData>>;
};

export function PersonalInfoStep({ formData, setFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-0">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          label="Prénom"
          value={formData.personal.firstName}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, firstName: value },
            })
          }
          required
        />
        <FormField
          label="Nom"
          value={formData.personal.lastName}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, lastName: value },
            })
          }
          required
        />
        <FormField
          label="Titre professionnel"
          value={formData.personal.title}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, title: value },
            })
          }
          required
        />
        <FormField
          label="Email"
          type="email"
          value={formData.personal.email}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, email: value },
            })
          }
          required
        />
        <FormField
          label="Téléphone"
          value={formData.personal.phone}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, phone: value },
            })
          }
        />
        <FormField
          label="Adresse"
          value={formData.personal.address}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, address: value },
            })
          }
        />
        <FormField
          label="Ville"
          value={formData.personal.city}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, city: value },
            })
          }
        />
        <FormField
          label="Pays"
          value={formData.personal.country}
          onChange={(value) =>
            setFormData({
              ...formData,
              personal: { ...formData.personal, country: value },
            })
          }
        />
      </div>
      <FormField
        label="Résumé"
        type="textarea"
        value={formData.personal.summary}
        onChange={(value) =>
          setFormData({
            ...formData,
            personal: { ...formData.personal, summary: value },
          })
        }
        className="col-span-full"
      />
    </div>
  );
}
