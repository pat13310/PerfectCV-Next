'use client';

import { Suspense, lazy, useMemo } from 'react';
import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';

// Lazy load templates
const ModernTemplate = lazy(() => import('./templates/ModernTemplate').then(mod => ({ default: mod.ModernTemplate })));
const MinimalTemplate = lazy(() => import('./templates/MinimalTemplate').then(mod => ({ default: mod.MinimalTemplate })));
const CreativeTemplate = lazy(() => import('./templates/CreativeTemplate').then(mod => ({ default: mod.CreativeTemplate })));
const AcademicTemplate = lazy(() => import('./templates/AcademicTemplate').then(mod => ({ default: mod.AcademicTemplate })));
const ProfessionalTemplate = lazy(() => import('./templates/ProfessionalTemplate').then(mod => ({ default: mod.ProfessionalTemplate })));

interface TemplateWrapperProps {
  templateId?: string;
  data: CVData;
  theme: Theme;
}

const LoadingTemplate = () => (
  <div className="animate-pulse">
    <div className="h-40 bg-gray-200 rounded-t-lg" />
    <div className="space-y-4 p-8">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

export class TemplateWrapper {
  private templateId: string;
  private data: CVData;
  private theme: Theme;

  constructor({ templateId = '', data, theme }: TemplateWrapperProps) {
    this.templateId = templateId;
    this.data = data;
    this.theme = theme;
  }

  getTemplateName(): string {
    switch (this.templateId) {
      case 'modern':
        return 'Modern Template';
      default:
        return 'Professional Template';
    }
  }

  getTemplate() {
    switch (this.templateId) {
      case 'modern':
        return ModernTemplate;
      case 'minimal':
        return MinimalTemplate;
      case 'creative':
        return CreativeTemplate;
      case 'academic':
        return AcademicTemplate;
      default:
        return ProfessionalTemplate;
    }
  }

  render() {
    const Template = this.getTemplate();
    return (
      <Suspense fallback={<LoadingTemplate />}>
        <Template data={this.data} theme={this.theme} />
      </Suspense>
    );
  }
}
