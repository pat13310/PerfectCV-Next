'use client';

import { Button } from '@/components/ui/PrimaryButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getResumes } from '@/lib/actions/resumes';
import { useSession } from 'next-auth/react';

interface CV {
  id: string;
  title: string;
  templateId?: string;
  updatedAt: Date;
}

export default function CVPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCVs() {
      if (session?.user?.id) {
        try {
          const userCVs = await getResumes(session.user.id);
          setCvs(userCVs.map(cv => ({
            id: cv.id,
            title: cv.title,
            templateId: cv.templateId ?? undefined,
            updatedAt: cv.updatedAt
          })));
        } catch (error) {
          console.error('Error fetching CVs:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchCVs();
  }, [session?.user?.id]);

  const handleCreateNewCV = () => {
    router.push('/cv/new');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p>Chargement de vos CV...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mes CV</h1>
          <p className="text-gray-600">Gérez et modifiez vos CV en un seul endroit</p>
        </div>
        <Button 
          onClick={handleCreateNewCV}
          className="w-fit bg-blue-600 hover:bg-blue-700 text-white"
        >
          Créer un nouveau CV
        </Button>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Aucun CV</h2>
          <p className="text-gray-600 mb-8">Commencez par créer votre premier CV</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map((cv) => (
            <div key={cv.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">{cv.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Template: {cv.templateId}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Modifié le {new Date(cv.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
