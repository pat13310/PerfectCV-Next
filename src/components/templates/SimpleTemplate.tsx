import { Theme } from '@/lib/themes';
import { PersonalInfo, Experience, Education, Skill, CVData } from '@/types/cv';

export interface SimpleTemplateProps {
  data: CVData;
  theme?: Theme;
}

export function SimpleTemplate({ data, theme }: SimpleTemplateProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-8" style={{ color: theme?.colors.text, backgroundColor: theme?.colors.background }}>
      {/* Personal Information */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme?.colors.primary }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg mb-2">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center gap-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2" style={{ color: theme?.colors.primary }}>
            Professional Summary
          </h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: theme?.colors.primary }}>
            Work Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{exp.position}</h3>
              <p className="text-sm">{exp.company}</p>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: theme?.colors.primary }}>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{edu.degree}</h3>
              <p className="text-sm">{edu.school}</p>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate || 'Present'}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: theme?.colors.primary }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm rounded"
                style={{ backgroundColor: theme?.colors.accent, color: theme?.colors.background }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
