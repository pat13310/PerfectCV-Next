'use client';

import { CVData, PersonalInfo } from '@/types/cv';
import { Theme } from '@/lib/themes';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export interface ModernTemplateProps {
  data: CVData;
  theme: Theme;
}

export function ModernTemplate({ data, theme }: ModernTemplateProps) {
  const experiences = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const personalInfo = data.personalInfo || {} as PersonalInfo;
  const languages = data?.languages || [];
  const projects = data?.projects || [];
  const interests = data?.interests || [];
  const certifications = data?.certifications || [];

  // Classes conditionnelles basées sur le thème
  const containerClasses = {
    shadow: theme.layout.elements.shadows === 'none' ? '' : 
           theme.layout.elements.shadows === 'subtle' ? 'shadow-lg' : 'shadow-xl',
  };

  const sidebarClasses = {
    width: theme.layout.sidebar.width === 'narrow' ? 'grid-cols-[250px_1fr]' :
           theme.layout.sidebar.width === 'medium' ? 'grid-cols-[300px_1fr]' : 'grid-cols-[350px_1fr]',
    background: theme.layout.sidebar.background === 'colored' ? 
                `bg-gradient-to-b from-[${theme.colors.primary}] to-[${theme.colors.secondary}] bg-opacity-10` :
                theme.layout.sidebar.background === 'light' ? 'bg-gray-50' : 'bg-transparent',
  };

  const sectionClasses = {
    spacing: theme.layout.sections.spacing === 'compact' ? 'space-y-4' :
             theme.layout.sections.spacing === 'normal' ? 'space-y-6' : 'space-y-8',
  };

  const sectionStyles = {
    background: `linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.secondary}10)`,
    borderLeft: `4px solid ${theme.colors.primary}`,
    padding: '1rem',
    borderRadius: '0.5rem',
  };

  return (
    <div 
      className={`w-full max-w-[210mm] mx-auto bg-white rounded-lg overflow-hidden print:shadow-none ${containerClasses.shadow}`}
      style={{ color: theme.colors.text, '--text-color': theme.colors.text } as React.CSSProperties}
    >
      {/* En-tête */}
      <div 
        className="mb-8 p-6"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}25)`,
          color: 'inherit'
        }}
      >
        <div className="flex items-center space-x-4 mb-6">
          {theme.layout.header.showPhoto && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg" 
                 style={{ borderColor: theme.colors.primary }}>
              <UserCircleIcon className="w-full h-full text-gray-300" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme.colors.headings }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-2xl font-medium mb-4" style={{ color: theme.colors.primary }}>
              {personalInfo.jobTitle}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'inherit' }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors" style={{ color: 'inherit' }}>
                  <EnvelopeIcon className="h-5 w-5" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors" style={{ color: 'inherit' }}>
                  <PhoneIcon className="h-5 w-5" />
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2" style={{ color: 'inherit' }}>
                  <MapPinIcon className="h-5 w-5" />
                  {personalInfo.address}
                </div>
              )}
            </div>
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-gray-600 leading-relaxed whitespace-pre-line" style={{ color: 'inherit' }}>
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div className={`grid ${sidebarClasses.width} print:grid-cols-[1fr_2fr]`}>
        {/* Colonne de gauche */}
        <div className={`p-6 ${sidebarClasses.background}`} style={{ backgroundColor: theme.layout.sidebar.background === 'colored' ? theme.colors.primary : undefined }}>
          {/* Contact */}
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${theme.layout.elements.icons === 'none' ? 'border-b pb-2' : ''}`} 
                style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }}>
              Contact
            </h2>
            <div className="space-y-2">
              {theme.layout.elements.icons !== 'none' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className={`${theme.layout.elements.icons === 'prominent' ? 'h-5 w-5' : 'h-4 w-4'}`} 
                                style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }} />
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <PhoneIcon className={`${theme.layout.elements.icons === 'prominent' ? 'h-5 w-5' : 'h-4 w-4'}`} 
                               style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }} />
                      <span className="text-sm">{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.address && (
                    <div className="flex items-center gap-2">
                      <MapPinIcon className={`${theme.layout.elements.icons === 'prominent' ? 'h-5 w-5' : 'h-4 w-4'}`} 
                                style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }} />
                      <span className="text-sm">{personalInfo.address}</span>
                    </div>
                  )}
                </div>
              )}
              {theme.layout.elements.icons === 'none' && (
                <div className="space-y-1">
                  <div className="text-sm">{personalInfo.email}</div>
                  {personalInfo.phone && <div className="text-sm">{personalInfo.phone}</div>}
                  {personalInfo.address && <div className="text-sm">{personalInfo.address}</div>}
                </div>
              )}
            </div>
          </div>

          {/* Compétences */}
          {skills.length > 0 && (
            <section style={sectionStyles} className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${theme.layout.elements.icons === 'none' ? 'border-b pb-2' : ''}`} 
                  style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }}>
                Compétences
              </h2>
              <div className={`${sectionClasses.spacing}`}>
                {skills.map((skill, index) => (
                  <div key={skill.id || `skill-${index}-${skill.name}`} className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${theme.layout.elements.icons === 'none' ? 'border-b pb-2' : ''}`} 
                  style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }}>
                Langues
              </h2>
              <div className={`${sectionClasses.spacing}`}>
                {languages.map((lang, index) => (
                  <div key={lang.id || `lang-${index}-${lang.name}`} className="flex items-center gap-2">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${lang.level}%`, backgroundColor: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Centres d'intérêt */}
          {interests.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${theme.layout.elements.icons === 'none' ? 'border-b pb-2' : ''}`} 
                  style={{ color: theme.layout.sidebar.background === 'colored' ? 'white' : theme.colors.primary }}>
                Centres d'intérêt
              </h2>
              <div className={`${sectionClasses.spacing}`}>
                {interests.map((interest, index) => (
                  <div key={interest.id || `interest-${index}-${interest.name}`} className="mb-4">
                    <h3 className="text-lg font-medium">{interest.name}</h3>
                    {interest.description && (
                      <p className="text-sm text-gray-600 whitespace-pre-line">{interest.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne de droite */}
        <div className="p-6">
          {/* Expérience */}
          {experiences.length > 0 && (
            <section style={sectionStyles} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.headings }}>
                Expérience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id || `exp-${index}-${exp.company}-${exp.position}`} className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2"
                         style={{ borderColor: theme.colors.primary }} />
                    <div className="absolute left-[7px] top-6 bottom-0 w-[2px]"
                         style={{ backgroundColor: `${theme.colors.primary}20` }} />
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                        {exp.position}
                      </h3>
                      <div className="text-lg font-medium" style={{ color: theme.colors.secondary }}>
                        {exp.company}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                    </div>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formation */}
          {education.length > 0 && (
            <section style={sectionStyles} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.headings }}>
                Formation
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id || `edu-${index}-${edu.school}-${edu.degree}`} className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2"
                         style={{ borderColor: theme.colors.primary }} />
                    <div className="absolute left-[7px] top-6 bottom-0 w-[2px]"
                         style={{ backgroundColor: `${theme.colors.primary}20` }} />
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                        {edu.degree}
                      </h3>
                      <div className="text-lg font-medium" style={{ color: theme.colors.secondary }}>
                        {edu.school}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projets */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-semibold mb-6 pb-2 border-b-2`} 
                  style={{ borderColor: `${theme.colors.primary}40`, color: theme.colors.primary }}>
                Projets
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id || `project-${index}-${project.name}`} className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2"
                         style={{ borderColor: theme.colors.primary }} />
                    <div className="absolute left-[7px] top-6 bottom-0 w-[2px]"
                         style={{ backgroundColor: `${theme.colors.primary}20` }} />
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                        {project.name}
                      </h3>
                      <div className="text-lg font-medium" style={{ color: theme.colors.secondary }}>
                        {project.startDate} - {project.endDate || 'En cours'}
                      </div>
                    </div>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span key={`${project.id || project.name}-tech-${index}`} className="px-2 py-1 text-xs rounded-full" 
                                style={{ backgroundColor: theme.colors.primary + '20', color: theme.colors.primary }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-sm mt-2 inline-block hover:underline"
                         style={{ color: theme.colors.primary }}>
                        Voir le projet
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-semibold mb-6 pb-2 border-b-2`} 
                  style={{ borderColor: `${theme.colors.primary}40`, color: theme.colors.primary }}>
                Certifications
              </h2>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={cert.id || `cert-${index}-${cert.name}`} className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-white border-2"
                         style={{ borderColor: theme.colors.primary }} />
                    <div className="absolute left-[7px] top-6 bottom-0 w-[2px]"
                         style={{ backgroundColor: `${theme.colors.primary}20` }} />
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: theme.colors.primary }}>
                        {cert.name}
                      </h3>
                      <div className="text-lg font-medium" style={{ color: theme.colors.secondary }}>
                        {cert.organization}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {cert.date}{cert.validUntil ? ` - ${cert.validUntil}` : ''}
                      </div>
                    </div>
                    {cert.link && (
                      <a href={cert.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-sm hover:underline"
                         style={{ color: theme.colors.primary }}>
                        Voir le certificat
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
