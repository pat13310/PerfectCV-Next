import { Resume } from './resumes';

describe('Resume Type', () => {
  it('should allow templateId to be undefined', () => {
    const resumeWithoutTemplate: Resume = {
      id: '1',
      title: 'Test CV',
      userId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'CV content',
      isPublished: false
    };

    expect(resumeWithoutTemplate.templateId).toBeUndefined();
  });

  it('should allow templateId to be null', () => {
    const resumeWithNullTemplate: Resume = {
      id: '1',
      title: 'Test CV',
      userId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'CV content',
      templateId: null,
      isPublished: false
    };

    expect(resumeWithNullTemplate.templateId).toBeNull();
  });

  it('should allow templateId to be a string', () => {
    const resumeWithTemplate: Resume = {
      id: '1',
      title: 'Test CV',
      userId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'CV content',
      templateId: 'modern',
      isPublished: false
    };

    expect(resumeWithTemplate.templateId).toBe('modern');
  });
});
