'use client';

import { CVData, PersonalInfo } from '@/types/cv';
import { Theme } from '@/lib/themes';
import Image from 'next/image';

export interface ElegantTemplateProps {
  data: CVData;
  theme: Theme;
}

export function ElegantTemplate({ data, theme }: ElegantTemplateProps) {
  const experiences = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const personalInfo = data.personalInfo || {} as PersonalInfo;
  const languages = data?.languages || [];
  const certifications = data?.certifications || [];

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white">
      {/* Header avec photo et fond sombre */}
      <div className="relative w-full h-[200px] bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="flex items-center gap-8">
          {personalInfo.photoUrl && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <Image
                src={personalInfo.photoUrl}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-wider mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <div className="text-xl text-gray-300">{personalInfo.jobTitle}</div>
            )}
          </div>
        </div>
      </div>

      {/* Contact info bar */}
      <div className="bg-gray-100 py-3 px-8 flex items-center justify-between text-sm">
        {personalInfo.email && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.address && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{personalInfo.address}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-[300px_1fr] min-h-[calc(297mm-200px-48px)]">
        {/* Sidebar sombre */}
        <div className="bg-gray-900 text-white p-8">
          {/* À propos */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">À PROPOS DE MOI</h2>
              <p className="text-sm text-gray-300 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Éducation */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">ÉDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <div className="text-sm text-gray-400">{edu.school}</div>
                    <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Compétences */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">COMPÉTENCES</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700">LANGUES</h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang.name}</span>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Contenu principal */}
        <div className="p-8">
          {/* Expérience professionnelle */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
                EXPÉRIENCE PROFESSIONNELLES
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-900 before:rounded-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold">{exp.position}</h3>
                        <div className="text-base text-gray-600">{exp.company}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
                FORMATIONS
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold">{cert.name}</h3>
                      <div className="text-sm text-gray-600">{cert.organization}</div>
                    </div>
                    <div className="text-sm text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
