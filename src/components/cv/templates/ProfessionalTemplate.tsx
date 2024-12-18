'use client';

import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';

interface ProfessionalTemplateProps {
  data: CVData;
  theme: Theme;
}

export function ProfessionalTemplate({ data, theme }: ProfessionalTemplateProps) {
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
      {/* En-tête avec bande de couleur */}
      <div 
        className="p-8 relative"
        style={{ 
          borderTop: `8px solid ${colors.primary}`,
        }}
      >
        <h1 
          className="text-4xl mb-2"
          style={{ 
            color: colors.headings,
            fontFamily: fonts.heading
          }}
        >
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-lg space-y-1" style={{ color: colors.secondary }}>
          <p>{data.personalInfo.email}</p>
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Expérience professionnelle */}
        {data.experience.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-2xl mb-4"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderBottom: `2px solid ${colors.accent}`,
                paddingBottom: '0.5rem'
              }}
            >
              Expérience professionnelle
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: spacing.element }}>
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: colors.headings }}
                  >
                    {exp.position}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium" style={{ color: colors.secondary }}>
                      {exp.company}
                    </p>
                    <p className="text-sm">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <p className="text-base">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-2xl mb-4"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderBottom: `2px solid ${colors.accent}`,
                paddingBottom: '0.5rem'
              }}
            >
              Formation
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: spacing.element }}>
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: colors.headings }}
                  >
                    {edu.degree}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium" style={{ color: colors.secondary }}>
                      {edu.school}
                    </p>
                    <p className="text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p className="text-base">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {data.skills.length > 0 && (
          <section>
            <h2 
              className="text-2xl mb-4"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading,
                borderBottom: `2px solid ${colors.accent}`,
                paddingBottom: '0.5rem'
              }}
            >
              Compétences
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div 
                  key={skill.id}
                  className="flex items-center justify-between p-2 rounded"
                  style={{ backgroundColor: `${colors.accent}10` }}
                >
                  <span className="font-medium" style={{ color: colors.headings }}>
                    {skill.name}
                  </span>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
