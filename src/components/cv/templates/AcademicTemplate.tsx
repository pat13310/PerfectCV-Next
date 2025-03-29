'use client';

import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';

interface AcademicTemplateProps {
  data: CVData;
  theme: Theme;
}

export function AcademicTemplate({ data, theme }: AcademicTemplateProps) {
  const { colors, fonts, spacing } = theme;

  return (
    <div 
      className="max-w-[210mm] mx-auto shadow-lg"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: fonts.body
      }}
    >
      {/* En-tête académique */}
      <div className="p-8 text-center border-b" style={{ borderColor: colors.primary }}>
        <h1 
          className="text-4xl mb-3"
          style={{ 
            color: colors.headings,
            fontFamily: fonts.heading
          }}
        >
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div 
          className="text-lg space-y-1"
          style={{ color: colors.secondary }}
        >
          <p>{data.personalInfo.email}</p>
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
        </div>
      </div>

      <div className="p-8">
        {/* Formation */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-2xl mb-6 pb-2 border-b"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderColor: colors.accent
              }}
            >
              Formation académique
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: spacing.element }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: colors.headings }}
                      >
                        {edu.degree}
                      </h3>
                      <p 
                        className="font-medium"
                        style={{ color: colors.secondary }}
                      >
                        {edu.school}
                      </p>
                    </div>
                    <p className="text-sm whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p className="text-base">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications et Recherches (simulé avec expérience) */}
        {data.experience.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-2xl mb-6 pb-2 border-b"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderColor: colors.accent
              }}
            >
              Publications et Recherches
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: spacing.element }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: colors.headings }}
                      >
                        {exp.position}
                      </h3>
                      <p 
                        className="font-medium"
                        style={{ color: colors.secondary }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm whitespace-nowrap">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <p className="text-base">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences et Domaines d'expertise */}
        {data.skills.length > 0 && (
          <section>
            <h2 
              className="text-2xl mb-6 pb-2 border-b"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderColor: colors.accent
              }}
            >
              Domaines d&apos;expertise
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div 
                  key={skill.id}
                  className="flex items-center space-x-2"
                >
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
