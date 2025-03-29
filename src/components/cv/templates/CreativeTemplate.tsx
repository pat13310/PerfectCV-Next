'use client';

import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';

interface CreativeTemplateProps {
  data: CVData;
  theme: Theme;
}

export function CreativeTemplate({ data, theme }: CreativeTemplateProps) {
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
      {/* En-tête créatif avec fond de couleur */}
      <div 
        className="p-12 relative overflow-hidden"
        style={{ 
          backgroundColor: colors.primary,
          color: colors.background
        }}
      >
        {/* Cercles décoratifs */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ 
            backgroundColor: colors.accent,
            transform: 'translate(20%, -20%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ 
            backgroundColor: colors.secondary,
            transform: 'translate(-20%, 20%)'
          }}
        />

        <div className="relative">
          <h1 
            className="text-5xl mb-4"
            style={{ fontFamily: fonts.heading }}
          >
            {data.personalInfo.firstName}
            <br />
            {data.personalInfo.lastName}
          </h1>
          <div className="space-y-1 text-lg opacity-90">
            <p>{data.personalInfo.email}</p>
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Expérience professionnelle */}
        {data.experience.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-3xl mb-6 inline-block relative"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading
              }}
            >
              <span className="relative z-10">Expérience</span>
              <span 
                className="absolute bottom-0 left-0 w-full h-3 opacity-20"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div 
                  key={exp.id} 
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: colors.accent }}
                >
                  <div 
                    className="absolute left-0 w-4 h-4 rounded-full -translate-x-[9px] mt-1"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: colors.headings }}
                  >
                    {exp.position}
                  </h3>
                  <p 
                    className="font-medium mb-2"
                    style={{ color: colors.secondary }}
                  >
                    {exp.company}
                  </p>
                  <p className="text-sm mb-2">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: spacing.section }}>
            <h2 
              className="text-3xl mb-6 inline-block relative"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading
              }}
            >
              <span className="relative z-10">Formation</span>
              <span 
                className="absolute bottom-0 left-0 w-full h-3 opacity-20"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="space-y-8">
              {data.education.map((edu) => (
                <div 
                  key={edu.id}
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: colors.accent }}
                >
                  <div 
                    className="absolute left-0 w-4 h-4 rounded-full -translate-x-[9px] mt-1"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: colors.headings }}
                  >
                    {edu.degree}
                  </h3>
                  <p 
                    className="font-medium mb-2"
                    style={{ color: colors.secondary }}
                  >
                    {edu.school}
                  </p>
                  <p className="text-sm mb-2">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {data.skills.length > 0 && (
          <section>
            <h2 
              className="text-3xl mb-6 inline-block relative"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading
              }}
            >
              <span className="relative z-10">Compétences</span>
              <span 
                className="absolute bottom-0 left-0 w-full h-3 opacity-20"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`
                  }}
                >
                  <span 
                    className="font-medium"
                    style={{ color: colors.primary }}
                  >
                    {skill.name}
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
