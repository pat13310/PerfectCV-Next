'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/PrimaryButton';
import {
  JobApplication,
  ApplicationStatus,
  ApplicationStep,
  calculateApplicationStats,
  generateApplicationTimeline,
  suggestNextSteps,
  generateFollowUpEmail,
} from '@/lib/applications';

interface ApplicationTrackerProps {
  applications: JobApplication[];
  onUpdateApplication: (application: JobApplication) => void;
}

export function ApplicationTracker({
  applications,
  onUpdateApplication,
}: ApplicationTrackerProps) {
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const stats = calculateApplicationStats(applications);

  const statusColors: Record<ApplicationStatus, string> = {
    draft: 'bg-gray-200',
    applied: 'bg-blue-200',
    interviewing: 'bg-yellow-200',
    offer: 'bg-purple-200',
    accepted: 'bg-green-200',
    rejected: 'bg-red-200',
    withdrawn: 'bg-gray-300',
  };

  const handleStatusChange = (application: JobApplication, status: ApplicationStatus) => {
    onUpdateApplication({
      ...application,
      status,
      timeline: [
        ...application.timeline,
        {
          id: Date.now().toString(),
          type: status === 'rejected' ? 'rejection' : 'note',
          date: new Date().toISOString(),
          description: `Statut mis à jour : ${status}`,
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Taux de réponse</h4>
          <p className="text-2xl">{stats.responseRate.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Taux d&apos;entretiens</h4>
          <p className="text-2xl">{stats.interviewRate.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Candidatures totales</h4>
          <p className="text-2xl">{stats.total}</p>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Mes candidatures</h3>
        </div>
        <div className="divide-y">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{app.position}</h4>
                  <p className="text-gray-600">{app.company}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      statusColors[app.status]
                    }`}
                  >
                    {app.status}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmailTemplate(true);
                    }}
                  >
                    Email
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Postulé le {new Date(app.appliedDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Détails de la candidature */}
      {selectedApp && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold">{selectedApp.position}</h3>
              <p className="text-gray-600">{selectedApp.company}</p>
            </div>
            <select
              value={selectedApp.status}
              onChange={(e) =>
                handleStatusChange(selectedApp, e.target.value as ApplicationStatus)
              }
              className="border rounded p-1"
            >
              {Object.keys(statusColors).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Timeline</h4>
            <div className="space-y-4">
              {generateApplicationTimeline(selectedApp).map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>{event.description}</p>
                    {event.outcome && (
                      <p className="text-sm text-gray-600 mt-1">
                        Résultat : {event.outcome}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Suggestions</h4>
            <ul className="list-disc list-inside space-y-2">
              {suggestNextSteps(selectedApp).map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-medium mb-3">Documents</h4>
            <div className="space-y-2">
              {selectedApp.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      Version {doc.version} - {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Template d&apos;email */}
      {showEmailTemplate && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Template d&apos;email</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEmailTemplate(false)}
              >
                Fermer
              </Button>
            </div>
            <select
              className="w-full mb-4 p-2 border rounded"
              onChange={(e) => {
                const template = generateFollowUpEmail(
                  selectedApp,
                  e.target.value as any
                );
                // Mettre à jour le template
              }}
            >
              <option value="follow_up">Email de suivi</option>
              <option value="thank_you">Email de remerciement</option>
              <option value="acceptance">Acceptation de l&apos;offre</option>
              <option value="rejection">Refus de l&apos;offre</option>
            </select>
            <textarea
              className="w-full h-64 p-4 border rounded"
              value={generateFollowUpEmail(selectedApp, 'follow_up')}
              readOnly
            />
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => {
                  // Copier dans le presse-papier
                  navigator.clipboard.writeText(
                    generateFollowUpEmail(selectedApp, 'follow_up')
                  );
                }}
              >
                Copier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
