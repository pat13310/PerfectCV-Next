'use client';

import React from 'react';
import { CVData, PersonalInfo } from '@/types/cv';
import { Theme } from '@/lib/themes';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export interface MinimalTemplateProps {
  data: CVData;
  theme: Theme;
}

export function MinimalTemplate({ data, theme }: MinimalTemplateProps) {
  const experiences = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const personalInfo = data?.personalInfo ?? {} as PersonalInfo;
  const languages = data?.languages ?? [];
  const projects = data?.projects ?? [];
  const interests = data?.interests ?? [];
  const certifications = data?.certifications ?? [];

  // Classes conditionnelles basées sur le thème
  const containerClasses = {
    shadow: {
      none: '',
      subtle: 'shadow-lg',
      medium: 'shadow-xl',
    }[theme.layout.elements.shadows],
  };

  const sidebarClasses = {
    width: {
      narrow: 'grid-cols-[250px_1fr]',
      medium: 'grid-cols-[300px_1fr]',
      wide: 'grid-cols-[350px_1fr]',
    }[theme.layout.sidebar.width],
    background: {
      colored: 'bg-opacity-10',
      light: 'bg-gray-50',
      none: 'bg-transparent',
    }[theme.layout.sidebar.background],
  };

  const sectionClasses = {
    spacing: {
      compact: 'space-y-4',
      normal: 'space-y-6',
      relaxed: 'space-y-8',
    }[theme.layout.sections.spacing],
  };

  return (
    <div 
      className={`w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:mx-0 print:rounded-none print:w-full`}
      style={{ 
        color: theme.colors.text, 
        '--text-color': theme.colors.text,
        pageBreakAfter: 'always',
        pageBreakInside: 'avoid'
      } as React.CSSProperties}
    >
      {/* En-tête avec informations de contact */}
      <div className="w-full px-8 py-6 border-b" style={{ borderColor: theme.colors.primary + '20' }}>
        <div className="flex items-center gap-6">
          {theme.layout.header.showPhoto && (
            <div className="flex-shrink-0">
              {personalInfo.photoUrl ? (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                >
                  <UserCircleIcon className="w-12 h-12" style={{ color: theme.colors.primary }} />
                </div>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate" style={{ color: theme.colors.primary }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <div className="text-lg mt-1 font-medium text-gray-600 truncate">
                {personalInfo.jobTitle}
              </div>
            )}
            {/* Contact info en ligne */}
            <div className="mt-3 flex flex-wrap gap-3">
              {personalInfo.email && (
                <div key="email" className="flex items-center gap-1.5 text-xs truncate">
                  <EnvelopeIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: theme.colors.primary }} />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div key="phone" className="flex items-center gap-1.5 text-xs truncate">
                  <PhoneIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: theme.colors.primary }} />
                  <span className="truncate">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div key="address" className="flex items-center gap-1.5 text-xs truncate">
                  <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: theme.colors.primary }} />
                  <span className="truncate">{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* À propos */}
        {personalInfo.summary && (
          <div className="mt-3 text-xs text-gray-600 leading-relaxed max-w-3xl break-words">
            {personalInfo.summary}
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-8 space-y-6">
        {/* Expérience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Expérience Professionnelle
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={`exp-${exp.id}`} className="group">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{exp.position}</h3>
                      <div className="text-xs font-medium mt-0.5 truncate" style={{ color: theme.colors.secondary }}>
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                      {exp.startDate} - {exp.endDate || 'Présent'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed break-words">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {education.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Formation
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={`edu-${edu.id}`} className="group">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{edu.degree}</h3>
                      <div className="text-xs font-medium mt-0.5 truncate" style={{ color: theme.colors.secondary }}>
                        {edu.school}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                      {edu.startDate} - {edu.endDate || 'Présent'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed break-words">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div 
                  key={`skill-${index}`}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ backgroundColor: theme.colors.primary + '10', color: theme.colors.primary }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Langues
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={`lang-${lang.id}`} className="flex items-center justify-between">
                  <span className="text-xs">{lang.name}</span>
                  <span className="text-xs text-gray-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projets */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Projets
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={`proj-${project.id}`} className="group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{project.name}</h3>
                    </div>
                    {project.startDate && (
                      <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 ml-2">
                        {project.startDate} - {project.endDate || 'En cours'}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed break-words">
                    {project.description}
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <div 
                          key={`tech-${project.id}-${tech}-${index}`}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ backgroundColor: theme.colors.primary + '10', color: theme.colors.primary }}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1 inline-block hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      Voir le projet
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={`cert-${cert.id}`}>
                  <h3 className="text-sm font-semibold">{cert.name}</h3>
                  <div className="text-xs" style={{ color: theme.colors.secondary }}>{cert.organization}</div>
                  <div className="text-xs text-gray-500 mt-1">{cert.date}</div>
                  {cert.link && (
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1 inline-block hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      Voir le certificat
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Centres d'intérêt */}
        {interests.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-4 pb-1 border-b" style={{ color: theme.colors.primary, borderColor: theme.colors.primary + '20' }}>
              Centres d'intérêt
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {interests.map((interest, index) => (
                <div key={`interest-${index}`} className="text-xs">
                  {interest.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
