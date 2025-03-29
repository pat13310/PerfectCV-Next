'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { ModernTemplate } from '../templates/ModernTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { SimpleTemplate } from '../templates/SimpleTemplate';
import { useThemeStore } from '@/store/useThemeStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import type { CVData } from '@/types/cv';

interface PreviewContentProps {
  cv: any;
  isTestMode?: boolean;
}

export interface PreviewContentRef {
  print: () => void;
}

const convertTestDataToCVData = (testData: any): CVData => {
  return {
    id: 'test-cv-123',
    userId: 'test-user-456',
    title: 'CV de Test',
    content: JSON.stringify(testData),
    personalInfo: {
      firstName: testData.name.split(' ')[0] || 'John',
      lastName: testData.name.split(' ')[1] || 'Doe',
      email: testData.email || 'john.doe@example.com',
      phone: testData.phone || '+33 6 12 34 56 78',
      address: testData.address || '123 Rue de la République, 75001 Paris',
      jobTitle: testData.jobTitle || 'Développeur',
      summary: testData.objective || 'Développeur passionné avec une expérience dans le développement web.'
    },
    experience: testData.workExperience ? testData.workExperience.map((exp: any, index: number) => ({
      id: `exp-${index}`,
      company: exp.company || 'Entreprise',
      position: exp.position || 'Poste',
      location: exp.location || 'Ville',
      startDate: exp.startDate || '2020-01-01',
      endDate: exp.endDate || '2023-12-31',
      description: exp.description || 'Description de l\'expérience'
    })) : [],
    education: testData.education ? testData.education.map((edu: any, index: number) => ({
      id: `edu-${index}`,
      school: edu.institution || 'École',
      degree: edu.degree || 'Diplôme',
      field: edu.field || 'Domaine',
      startDate: edu.startDate || '2016-09-01',
      endDate: edu.endDate || '2018-06-30',
      description: edu.description || 'Description de la formation'
    })) : [],
    skills: testData.skills ? testData.skills.map((skill: string, index: number) => ({
      id: `skill-${index}`,
      name: skill,
      level: 'Intermédiaire'
    })) : [],
    languages: [],
    projects: [],
    interests: [],
    certifications: []
  };
};

const testCVData: CVData = {
  id: 'cv-123',
  userId: 'user-456',
  title: 'Mon CV Professionnel',
  personalInfo: {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    jobTitle: 'Développeur Web',
  },
  education: [
    { 
      id: 'edu-1', 
      school: 'École Polytechnique', 
      degree: 'Master en Informatique', 
      field: 'Développement Logiciel', 
      startDate: '2018', 
      endDate: '2020', 
      description: 'Formation approfondie en génie logiciel' 
    }
  ],
  experience: [
    { 
      id: 'exp-1', 
      company: 'TechCorp', 
      position: 'Développeur Full Stack', 
      location: 'Paris', 
      startDate: '2020', 
      endDate: 'Présent', 
      description: 'Développement d\'applications web modernes' 
    }
  ],
  skills: [
    { id: 'skill-1', name: 'React', level: 'Expert' },
    { id: 'skill-2', name: 'Node.js', level: 'Avancé' }
  ],
  languages: [],
  interests: [],
  projects: [],
  certifications: [],
  content: 'CV de Jean Dupont'
};

export const PreviewContent = forwardRef<PreviewContentRef, PreviewContentProps>(({ cv, isTestMode = false }, ref) => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const { currentTheme, customColors } = useThemeStore();
  const { currentTemplate } = useTemplateStore();

  useEffect(() => {
    if (isTestMode && cv) {
      // Si des données de test sont fournies, les convertir en CVData
      const convertedCvData = convertTestDataToCVData(cv);
      setCvData(convertedCvData);
    } else if (cv?.content) {
      try {
        const parsedData = JSON.parse(cv.content);
        setCvData(parsedData);
      } catch (error) {
        console.error('Error parsing CV data:', error);
      }
    } else {
      setCvData(null);
    }
  }, [cv, isTestMode]);

  useImperativeHandle(ref, () => ({
    print: () => {
      const content = document.createElement('div');
      content.innerHTML = document.querySelector('.cv-preview-content')?.innerHTML || '';
      
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      printWindow.document.write(`
        <html>
          <head>
            <title>CV Preview</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @media print {
                body { margin: 0; padding: 0; }
                .cv-preview-content { width: 210mm; min-height: 297mm; }
              }
            </style>
          </head>
          <body>
            <div class="cv-preview-content">
              ${content.innerHTML}
            </div>
            <script>
              window.onload = () => {
                window.print();
                window.onafterprint = () => window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }));

  const templateProps = cvData ? {
    data: cvData,
    theme: {
      ...currentTheme,
      colors: {
        primary: currentTheme?.colors?.primary || '#000000',
        secondary: currentTheme?.colors?.secondary || '#666666',
        accent: currentTheme?.colors?.accent || '#333333',
        background: currentTheme?.colors?.background || '#FFFFFF',
        text: currentTheme?.colors?.text || '#000000',
        headings: currentTheme?.colors?.headings || '#000000',
        ...customColors 
      }
    }
  } : null;

  const renderTemplate = () => {
    if (!templateProps) return null;

    switch (currentTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      case 'elegant':
        return <SimpleTemplate {...templateProps} />;
      default:
        return <MinimalTemplate {...templateProps} />;
    }
  };

  if (!cvData) {
    return (
      <div className="min-h-[calc(100vh-8rem)] bg-gray-50 flex items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-violet-800"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <div className="cv-preview-content w-[210mm] min-h-[297mm] bg-white shadow-lg scale-[0.8] origin-top">
        {renderTemplate()}
      </div>
    </div>
  );
});

export function PreviewContentContainer({ 
  cv, 
  isLoading, 
  isTestMode = false 
}: { 
  cv: any; 
  isLoading: boolean; 
  isTestMode?: boolean 
}) {
  return <PreviewContent cv={cv} isTestMode={isTestMode} />;
}
