'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import { CVData } from '@/types/cv';
import { analyzeCVContent, matchJobDescription, generateATS, CVAnalysis as ICVAnalysis, JobMatch } from '@/lib/cvAnalyzer';

interface CVAnalysisProps {
  cv: CVData;
}

export function CVAnalysis({ cv }: CVAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ICVAnalysis | null>(null);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);
  const [atsVersion, setAtsVersion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCVContent(cv);
      setAnalysis(result);
    } catch (err) {
      setError('Erreur lors de l\'analyse du CV. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobMatch = async () => {
    if (!jobDescription) {
      setError('Veuillez entrer une description de poste.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await matchJobDescription(cv, jobDescription);
      setJobMatch(result);
    } catch (err) {
      setError('Erreur lors de la comparaison avec l\'offre d\'emploi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateATS = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateATS(cv);
      setAtsVersion(result);
    } catch (err) {
      setError('Erreur lors de la génération de la version ATS. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Analyse du CV</h3>
          <Button
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyse en cours...' : 'Analyser'}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Score global:</span>
              <span className="text-lg">{analysis.score}/100</span>
            </div>

            <div>
              <h4 className="font-medium mb-2">Points forts</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-green-600">{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Points à améliorer</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-orange-600">{weakness}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Suggestions</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-blue-600">{suggestion}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Mots-clés détectés</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Lisibilité</h4>
              <div className="flex items-center space-x-2">
                <span>Score: {analysis.readability.score}/100</span>
                <span className="text-gray-600">-</span>
                <span>{analysis.readability.feedback}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Comparaison avec une offre d&apos;emploi</h3>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={4}
          placeholder="Collez ici la description du poste..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Button
          onClick={handleJobMatch}
          disabled={loading || !jobDescription}
          className="mb-4"
        >
          {loading ? 'Comparaison...' : 'Comparer'}
        </Button>

        {jobMatch && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Correspondance:</span>
              <span className="text-lg">{jobMatch.score}%</span>
            </div>

            <div>
              <h4 className="font-medium mb-2">Compétences correspondantes</h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.matching_skills.map((skill, index) => (
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
              <h4 className="font-medium mb-2">Compétences manquantes</h4>
              <div className="flex flex-wrap gap-2">
                {jobMatch.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recommandations</h4>
              <ul className="list-disc list-inside space-y-1">
                {jobMatch.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-blue-600">{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Version ATS</h3>
          <Button
            onClick={handleGenerateATS}
            disabled={loading}
          >
            {loading ? 'Génération...' : 'Générer version ATS'}
          </Button>
        </div>

        {atsVersion && (
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
              {atsVersion}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
