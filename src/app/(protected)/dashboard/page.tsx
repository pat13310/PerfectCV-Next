'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/PrimaryButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateCVModal from '@/components/modals/CreateCVModal';
import { CreateButton } from '@/components/ui/CreateButton';

const stats = [
  {
    name: 'CVs créés',
    value: '3',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    change: '+2 ce mois',
    changeType: 'positive',
  },
  {
    name: 'Vues du profil',
    value: '24',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    change: '+30% ce mois',
    changeType: 'positive',
  },
  {
    name: 'Téléchargements',
    value: '12',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    change: '+8 cette semaine',
    changeType: 'positive',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'update',
    content: 'CV Développeur Frontend mis à jour',
    date: 'Il y a 2 heures',
  },
  {
    id: 2,
    type: 'view',
    content: 'Votre CV a été consulté par 3 recruteurs',
    date: 'Il y a 1 jour',
  },
  {
    id: 3,
    type: 'download',
    content: 'CV Chef de Projet téléchargé',
    date: 'Il y a 2 jours',
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 text-transparent bg-clip-text">
              Bienvenue, {session?.user?.name?.split(' ')[0] || 'Utilisateur'} 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Voici un aperçu de vos activités récentes et de vos statistiques
            </p>
          </div>
          <div className="mt-6 sm:mt-0">
            <CreateButton onClick={() => setIsCreateModalOpen(true)}>Créer un nouveau CV</CreateButton>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => stat.name === 'Vues du profil' && router.push('/dashboard/statistics')}
          >
            <dt>
              <div className="absolute rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline justify-between">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className={`${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'} text-sm font-semibold`}>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-2xl">
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Activité récente
          </h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gradient-to-b from-violet-200 to-fuchsia-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-4">
                      <div>
                        <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
                          {activity.type === 'update' ? (
                            <svg className="h-5 w-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          ) : activity.type === 'view' ? (
                            <svg className="h-5 w-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          )}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4">
                        <div>
                          <p className="text-gray-600">{activity.content}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={activity.date}>{activity.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Create CV Modal */}
      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
