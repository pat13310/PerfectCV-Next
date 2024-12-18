import { TemplateWrapper } from '@/components/cv/TemplateWrapper';
import { defaultTheme } from '@/lib/themes';
import { CVData } from '@/types/cv';

// Mock des templates pour éviter les imports réels
jest.mock('@/components/cv/templates/ModernTemplate', () => ({
  ModernTemplate: () => 'Modern Template'
}));

jest.mock('@/components/cv/templates/ProfessionalTemplate', () => ({
  ProfessionalTemplate: () => 'Professional Template'
}));

const mockCVData: CVData = {
  id: 'test-cv',
  userId: 'test-user',
  title: 'Test CV',
  content: 'Test Content',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    jobTitle: 'Developer',
    address: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  interests: [],
  certifications: []
};

describe('TemplateWrapper', () => {
  it('selects Modern Template when templateId is "modern"', () => {
    const wrapper = new TemplateWrapper({ 
      templateId: 'modern', 
      data: mockCVData, 
      theme: defaultTheme 
    });
    expect(wrapper.getTemplateName()).toBe('Modern Template');
  });

  it('selects Professional Template when templateId is empty', () => {
    const wrapper = new TemplateWrapper({ 
      templateId: '', 
      data: mockCVData, 
      theme: defaultTheme 
    });
    expect(wrapper.getTemplateName()).toBe('Professional Template');
  });

  it('selects Professional Template when templateId is undefined', () => {
    const wrapper = new TemplateWrapper({ 
      templateId: undefined, 
      data: mockCVData, 
      theme: defaultTheme 
    });
    expect(wrapper.getTemplateName()).toBe('Professional Template');
  });

  it('selects Professional Template when templateId is an unknown value', () => {
    const wrapper = new TemplateWrapper({ 
      templateId: 'unknown-template', 
      data: mockCVData, 
      theme: defaultTheme 
    });
    expect(wrapper.getTemplateName()).toBe('Professional Template');
  });
});
