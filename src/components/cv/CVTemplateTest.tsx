'use client';

import React, { useState } from 'react';
import { PreviewContentContainer } from './PreviewContent';
import { Button } from '@/components/ui/PrimaryButton';

export default function CVTemplateTest() {
  const [cvData, setCvData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0123456789',
    address: '123 Main St, Anytown, USA',
    objective: 'To obtain a challenging and rewarding position in the field of software development.',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Anytown University',
        date: '2010-2014',
      },
    ],
    workExperience: [
      {
        company: 'ABC Corporation',
        position: 'Software Developer',
        date: '2014-2018',
        description: 'Developed and maintained multiple software applications using Java and Python.',
      },
    ],
    skills: ['Java', 'Python', 'JavaScript', 'HTML/CSS'],
    template: 'modern'
  });

  const [isTestMode, setIsTestMode] = useState(true);

  const handleToggleTestMode = () => {
    setIsTestMode(!isTestMode);
  };

  const handleUpdateCvData = (field: keyof typeof cvData, value: string | string[]) => {
    setCvData({ ...cvData, [field]: value });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Test des Templates de CV</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Simple Template (Test Mode)</h2>
          <div className="border rounded-lg p-2">
            <PreviewContentContainer 
              cv={cvData} 
              isLoading={false} 
              isTestMode={isTestMode} 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Instructions</h3>
          <p>Ce composant permet de tester le rendu des différents templates de CV.</p>
          <p>Le mode test utilise des données prédéfinies pour simuler un CV.</p>
          
          <Button variant="outline" onClick={handleToggleTestMode}>
            {isTestMode ? 'Sortir du mode test' : 'Entrer en mode test'}
          </Button>
          
          {!isTestMode && (
            <div>
              <h4 className="text-md font-medium">Modifier les données du CV</h4>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nom
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    value={cvData.name} 
                    onChange={(e) => handleUpdateCvData('name', e.target.value)} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    value={cvData.email} 
                    onChange={(e) => handleUpdateCvData('email', e.target.value)} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Téléphone
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="phone" 
                    type="tel" 
                    value={cvData.phone} 
                    onChange={(e) => handleUpdateCvData('phone', e.target.value)} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Adresse
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="address" 
                    type="text" 
                    value={cvData.address} 
                    onChange={(e) => handleUpdateCvData('address', e.target.value)} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objective">
                    Objectif
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="objective" 
                    value={cvData.objective} 
                    onChange={(e) => handleUpdateCvData('objective', e.target.value)} 
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
