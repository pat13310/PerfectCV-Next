'use client';

import { CVData } from '@/types/cv';

interface MinimalTemplateProps {
  data: CVData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
      <div className="p-8">
        {/* En-tête */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <div className="text-gray-600 space-y-1 text-sm">
            <p>{data.personalInfo.email}</p>
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
          </div>
        </header>

        {/* Expérience professionnelle */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider border-b pb-2">
              Expérience professionnelle
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                    <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formation */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider border-b pb-2">
              Formation
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                    <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compétences */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-wider border-b pb-2">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
