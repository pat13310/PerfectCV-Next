'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import {
  CareerPlan,
  generateCareerPlan,
  suggestNextSteps,
  calculateProgress,
} from '@/lib/career';
import { CVData } from '@/types/cv';

interface CareerPlannerProps {
  cv: CVData;
  onSave: (plan: CareerPlan) => void;
}

export function CareerPlanner({ cv, onSave }: CareerPlannerProps) {
  const [plan, setPlan] = useState<CareerPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [timeframe, setTimeframe] = useState(12); // mois
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'skills' | 'training' | 'networking'
  >('overview');

  const handleGeneratePlan = async () => {
    if (!targetRole) {
      setError('Veuillez spécifier un poste cible');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newPlan = await generateCareerPlan(cv, targetRole, timeframe);
      setPlan(newPlan);
      const nextSteps = await suggestNextSteps(newPlan);
      setSuggestions(nextSteps);
    } catch (err) {
      setError('Erreur lors de la génération du plan. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration initiale */}
      {!plan && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Planifier votre carrière</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Poste cible
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ex: Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Horizon temporel
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value={6}>6 mois</option>
                <option value={12}>1 an</option>
                <option value={24}>2 ans</option>
                <option value={36}>3 ans</option>
              </select>
            </div>

            <Button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Génération...' : 'Générer un plan'}
            </Button>

            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Plan de carrière */}
      {plan && (
        <>
          {/* En-tête */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {plan.currentRole} → {plan.targetRole}
                </h2>
                <p className="text-gray-600 mt-1">
                  Plan sur {plan.timeframe} mois
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {calculateProgress(plan).toFixed(0)}%
                </div>
                <p className="text-sm text-gray-600">progression</p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Prochaines étapes</h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b">
              <nav className="flex space-x-4 p-4">
                {(['overview', 'skills', 'training', 'networking'] as const).map(
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
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Jalons */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Jalons</h3>
                    <div className="space-y-4">
                      {plan.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-start space-x-4 border rounded-lg p-4"
                        >
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            onChange={() => {
                              const updatedPlan = {
                                ...plan,
                                milestones: plan.milestones.map((m) =>
                                  m.id === milestone.id
                                    ? { ...m, completed: !m.completed }
                                    : m
                                ),
                              };
                              setPlan(updatedPlan);
                              onSave(updatedPlan);
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{milestone.title}</h4>
                              <span
                                className={`px-2 py-0.5 rounded text-xs ${
                                  milestone.priority === 'high'
                                    ? 'bg-red-100 text-red-700'
                                    : milestone.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}
                              >
                                {milestone.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {milestone.description}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Date cible:{' '}
                              {new Date(milestone.targetDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">Compétences à développer</h3>
                  <div className="space-y-4">
                    {plan.skills.map((skill) => (
                      <div
                        key={skill.skill}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium">{skill.skill}</h4>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${
                                skill.priority === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : skill.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {skill.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-500">
                              {skill.currentLevel}
                            </span>
                            <span className="text-gray-300 mx-1">→</span>
                            <span className="text-sm font-medium">
                              {skill.targetLevel}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {skill.resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="text-sm bg-gray-50 p-2 rounded"
                            >
                              <div className="flex justify-between">
                                <span>{resource.title}</span>
                                {resource.duration && (
                                  <span className="text-gray-500">
                                    {resource.duration}
                                  </span>
                                )}
                              </div>
                              {resource.provider && (
                                <p className="text-gray-500 mt-1">
                                  {resource.provider}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ... Autres onglets ... */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
