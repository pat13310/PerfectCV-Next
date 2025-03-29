'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import {
  CVAnalytics,
  analyzeCV,
  generateRecommendations,
  calculateMarketScore,
} from '@/lib/analytics';
import { CVData } from '@/types/cv';

interface CVInsightsProps {
  cv: CVData;
}

export function CVInsights({ cv }: CVInsightsProps) {
  const [analytics, setAnalytics] = useState<CVAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'market' | 'recommendations' | 'trends'
  >('overview');

  useEffect(() => {
    handleAnalyze();
  }, [cv]);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCV(cv);
      setAnalytics(result);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? (err.message.includes('Clé API OpenAI manquante') 
          ? 'La clé API OpenAI n\'est pas configurée. Veuillez la définir dans vos paramètres.' 
          : 'Erreur lors de l\'analyse. Veuillez réessayer.')
        : 'Erreur lors de l\'analyse. Veuillez réessayer.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
          <p>Analyse en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        {error}
        <Button
          onClick={handleAnalyze}
          className="mt-4"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* En-tête avec score global */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Analyse du CV</h2>
            <p className="text-gray-600 mt-1">
              Score de marché: {calculateMarketScore(analytics).toFixed(0)}/100
            </p>
          </div>
          <Button onClick={handleAnalyze}>
            Actualiser l&apos;analyse
          </Button>
        </div>

        {/* Métriques clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">
              {analytics.metrics.wordCount}
            </div>
            <div className="text-sm text-gray-600">Mots</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">
              {analytics.metrics.readabilityScore}/100
            </div>
            <div className="text-sm text-gray-600">Lisibilité</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">
              {analytics.metrics.actionVerbs}
            </div>
            <div className="text-sm text-gray-600">Verbes d&apos;action</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-2xl font-semibold">
              {analytics.metrics.quantifiedResults}
            </div>
            <div className="text-sm text-gray-600">Résultats quantifiés</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-4 p-4">
            {(['overview', 'market', 'recommendations', 'trends'] as const).map(
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
              {/* Forces et faiblesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Points forts</h3>
                  <ul className="space-y-2">
                    {analytics.insights.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-green-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Points à améliorer</h3>
                  <ul className="space-y-2">
                    {analytics.insights.weaknesses.map((weakness, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mots-clés */}
              <div>
                <h3 className="text-lg font-medium mb-4">Mots-clés détectés</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(analytics.metrics.keywordDensity).map(
                    ([keyword, density]) => (
                      <div
                        key={keyword}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {keyword}{' '}
                        <span className="text-gray-500">
                          {(density * 100).toFixed(1)}%
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'market' && (
            <div className="space-y-6">
              {/* Alignement des rôles */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Alignement avec le marché
                </h3>
                <div className="space-y-4">
                  {analytics.marketFit.roleAlignment.map((role) => (
                    <div
                      key={role.role}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{role.role}</h4>
                          <div className="mt-1">
                            <span className="text-sm text-gray-500">
                              Score de correspondance:{' '}
                            </span>
                            <span className="font-medium">
                              {role.matchScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">
                            Compétences correspondantes
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {role.matchingSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">
                            Compétences manquantes
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {role.missingSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tendances salariales */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Tendances salariales
                </h3>
                <div className="space-y-4">
                  {analytics.trends.salaryTrends.map((trend) => (
                    <div
                      key={trend.role}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{trend.role}</h4>
                          <p className="text-sm text-gray-500">
                            {trend.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {trend.median.toLocaleString()}€
                          </div>
                          <div className="text-sm text-gray-500">
                            {trend.range.min.toLocaleString()}€ -{' '}
                            {trend.range.max.toLocaleString()}€
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm ${
                            trend.trend === 'increasing'
                              ? 'bg-green-100 text-green-700'
                              : trend.trend === 'stable'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {trend.trend === 'increasing'
                            ? '↗ En hausse'
                            : trend.trend === 'stable'
                            ? '→ Stable'
                            : '↘ En baisse'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {analytics.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        rec.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <span className="text-lg">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{rec.title}</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            rec.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{rec.description}</p>
                      <div className="mt-4">
                        <h5 className="font-medium text-sm mb-2">Impact</h5>
                        <p className="text-sm text-gray-600">{rec.impact}</p>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-medium text-sm mb-2">
                          Mise en œuvre
                        </h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {rec.implementation.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Tendances de l'industrie */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Tendances de l'industrie
                </h3>
                <ul className="space-y-2">
                  {analytics.trends.industryTrends.map((trend, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compétences émergentes vs déclinantes */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Compétences émergentes
                  </h3>
                  <div className="space-y-2">
                    {analytics.trends.emergingSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-green-500">↗</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Compétences déclinantes
                  </h3>
                  <div className="space-y-2">
                    {analytics.trends.decliningSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-red-500">↘</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prévisions de la demande */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Prévisions de la demande
                </h3>
                <div className="space-y-4">
                  {analytics.trends.demandForecast.map((forecast, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded"
                    >
                      {forecast}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
