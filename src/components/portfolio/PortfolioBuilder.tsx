'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Portfolio,
  Project,
  generatePortfolioFromCV,
  generateProjectDescription,
  calculatePortfolioStats,
  suggestPortfolioImprovements,
} from '@/lib/portfolio';
import { CVData } from '@/types/cv';

interface PortfolioBuilderProps {
  cv: CVData;
  initialPortfolio?: Portfolio;
  onSave: (portfolio: Portfolio) => void;
}

export function PortfolioBuilder({
  cv,
  initialPortfolio,
  onSave,
}: PortfolioBuilderProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>(
    initialPortfolio || generatePortfolioFromCV(cv)
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<
    'projects' | 'skills' | 'achievements' | 'certifications'
  >('projects');
  const [editMode, setEditMode] = useState(false);

  const stats = calculatePortfolioStats(portfolio);
  const suggestions = suggestPortfolioImprovements(portfolio);

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Nouveau projet',
      description: '',
      role: '',
      startDate: new Date().toISOString(),
      ongoing: true,
      technologies: [],
      links: [],
      images: [],
      highlights: [],
      category: 'professional',
      visibility: 'public',
    };

    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, newProject],
    });
    setSelectedProject(newProject);
    setEditMode(true);
  };

  return (
    <div className="space-y-6">
      {/* En-tête du portfolio */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{portfolio.title}</h2>
            <p className="text-gray-600 mt-1">{portfolio.description}</p>
          </div>
          <Button onClick={() => onSave(portfolio)}>Enregistrer</Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">{stats.totalProjects}</div>
            <div className="text-sm text-gray-600">Projets</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">
              {Object.keys(stats.skillsByCategory).length}
            </div>
            <div className="text-sm text-gray-600">Catégories de compétences</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">{stats.totalEndorsements}</div>
            <div className="text-sm text-gray-600">Recommandations</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">{stats.publicProjects}</div>
            <div className="text-sm text-gray-600">Projets publics</div>
          </div>
        </div>

        {/* Suggestions d&apos;amélioration */}
        {suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Suggestions d&apos;amélioration</h3>
            <ul className="list-disc list-inside space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-4 p-4">
            {(['projects', 'skills', 'achievements', 'certifications'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="p-6">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Projets</h3>
                <Button onClick={handleAddProject}>Ajouter un projet</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.images[0] && (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Compétences</h3>
              {Object.entries(stats.skillsByCategory).map(([category, count]) => (
                <div key={category}>
                  <h4 className="font-medium mb-2">{category}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{skill.name}</h5>
                              <p className="text-sm text-gray-600">
                                {skill.yearsOfExperience} ans d&apos;expérience
                              </p>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-2 h-2 rounded-full mx-0.5 ${
                                    i < skill.level
                                      ? 'bg-blue-500'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {skill.endorsements.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">
                                {skill.endorsements.length} recommandation
                                {skill.endorsements.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ... Autres onglets ... */}
        </div>
      </div>

      {/* Modal d&apos;édition de projet */}
      {selectedProject && editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Éditer le projet</h3>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedProject(null);
                  setEditMode(false);
                }}
              >
                Fermer
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={selectedProject.title}
                  onChange={(e) => {
                    const updatedProject = {
                      ...selectedProject,
                      title: e.target.value,
                    };
                    setSelectedProject(updatedProject);
                    setPortfolio({
                      ...portfolio,
                      projects: portfolio.projects.map((p) =>
                        p.id === updatedProject.id ? updatedProject : p
                      ),
                    });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* ... Autres champs d&apos;édition ... */}

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProject(null);
                    setEditMode(false);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    setPortfolio({
                      ...portfolio,
                      projects: portfolio.projects.map((p) =>
                        p.id === selectedProject.id ? selectedProject : p
                      ),
                    });
                    setSelectedProject(null);
                    setEditMode(false);
                  }}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
