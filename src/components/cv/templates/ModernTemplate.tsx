'use client';

import { CVData } from '@/types/cv';
import { Theme } from '@/lib/themes';

interface ModernTemplateProps {
  data: CVData;
  theme: Theme;
}

export function ModernTemplate({ data, theme }: ModernTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
      <div className="p-8" style={{ color: theme.colors.text }}>
        {/* En-tête */}
        <header className="border-b border-gray-300 pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.primary }}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <div className="text-gray-600 space-y-1">
            <p>{data.personalInfo.email}</p>
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
          </div>
        </header>

        {/* Expérience professionnelle */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ color: theme.colors.primary }}>
              Expérience professionnelle
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ color: theme.colors.primary }}>
              Formation
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                  <p className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="text-gray-600 mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ color: theme.colors.primary }}>
              Compétences
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-600 text-sm">{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
