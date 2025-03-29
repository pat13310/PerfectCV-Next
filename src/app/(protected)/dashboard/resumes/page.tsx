'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreateButton } from '@/components/ui/CreateButton';
import CreateCVModal from '@/components/modals/CreateCVModal';
import DeleteCVModal from '@/components/modals/DeleteCVModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { getResumesAction, deleteResumeAction } from './actions';
import type { Resume } from '@/lib/actions/resumes';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

export default function ResumesPage() {
  const { data: session, status } = useSession();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null | undefined>(null);
  const [deleteModalData, setDeleteModalData] = useState<{ isOpen: boolean; cvId: string | null; cvName: string }>({
    isOpen: false,
    cvId: null,
    cvName: '',
  });

  useEffect(() => {
    async function fetchResumes() {
      if (session?.user?.id) {
        try {
          setError(null);
          const result = await getResumesAction(session.user.id);
          if (result.success) {
            setResumes(result.data?.map(resume => ({
              ...resume,
              templateId: resume.templateId ?? undefined
            })) || []);
          } else {
            setError(result.error);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des CV:', error);
          setError(error instanceof Error ? error.message : 'Une erreur est survenue lors du chargement de vos CV.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    fetchResumes();
  }, [session?.user?.id]);

  const handleDelete = async (cvId: string) => {
    if (!session?.user?.id) return;
    
    try {
      const result = await deleteResumeAction(cvId, session.user.id);
      if (result.success) {
        setResumes(prevResumes => prevResumes.filter(cv => cv.id !== cvId));
        setDeleteModalData({ isOpen: false, cvId: null, cvName: '' });
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du CV:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression du CV.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes CV</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez et modifiez vos CV en un seul endroit
          </p>
        </div>
        <CreateButton onClick={() => setIsCreateModalOpen(true)}>
          Créer un nouveau CV
        </CreateButton>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun CV</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer votre premier CV
          </p>
          <div className="mt-6">
          
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <ul className="divide-y divide-gray-200">
            {resumes.map((resume) => (
              <li key={resume.id} className="px-6 py-5 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {resume.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Modifié le {formatDate(new Date(resume.updatedAt))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Tooltip content="Aperçu">
                      <Link
                        href={`/dashboard/cv/${resume.id}/preview`}
                        className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Modifier">
                      <Link
                        href={`/dashboard/cv/${resume.id}/edit`}
                        className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Supprimer">
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <DeleteCVModal
        isOpen={deleteModalData.isOpen}
        onClose={() => setDeleteModalData({ isOpen: false, cvId: null, cvName: '' })}
        onConfirm={() => handleDelete(deleteModalData.cvId!)}
        cvName={deleteModalData.cvName}
      />
    </div>
  );
}
