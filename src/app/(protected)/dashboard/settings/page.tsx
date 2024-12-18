'use client';

import { useSession } from 'next-auth/react';
import { useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/PrimaryButton';
import { Toast } from '@/components/ui/Toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { PasswordChangeModal } from "@/components/ui/PasswordChangeModal";
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface NotificationType {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Preferences {
  language: string;
  notificationsEnabled: boolean;
}

interface UiState {
  isLoading: boolean;
  isEditing: boolean;
  showDeleteModal: boolean;
  showPasswordModal: boolean;
}

const formSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string()
    .email('Adresse email invalide')
    .min(5, 'L\'email doit contenir au moins 5 caractères')
    .max(50, 'L\'email ne peut pas dépasser 50 caractères'),
  currentPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [preferences, setPreferences] = useState<Preferences>({
    language: 'fr',
    notificationsEnabled: true,
  });

  const [uiState, setUiState] = useState<UiState>({
    isLoading: false,
    isEditing: false,
    showDeleteModal: false,
    showPasswordModal: false
  });

  const [notification, setNotification] = useState<NotificationType | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    password: '',
    error: ''
  });

  const [verificationState, setVerificationState] = useState({
    isVerifying: false,
    code: '',
    error: '',
    verified: false
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSaving(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNotification({
        type: 'success',
        message: 'Vos paramètres ont été mis à jour avec succès',
      });
      setUiState(prev => ({ ...prev, isEditing: false }));
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Une erreur est survenue lors de la mise à jour',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!deleteConfirmation.password) {
        setDeleteConfirmation(prev => ({
          ...prev,
          error: 'Veuillez entrer votre mot de passe'
        }));
        return;
      }

      setUiState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: deleteConfirmation.password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la suppression du compte');
      }

      router.push('/login');
      setNotification({
        type: 'success',
        message: 'Votre compte a été supprimé avec succès',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression',
      });
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false, showDeleteModal: false }));
      setDeleteConfirmation({ password: '', error: '' });
    }
  };

  const handleLanguageChange = useCallback((value: string) => {
    setPreferences((prev) => ({ ...prev, language: value }));
    if (!uiState.isEditing) {
      setUiState((prev) => ({ ...prev, isEditing: true }));
    }
  }, [uiState.isEditing]);

  const handleNotificationToggle = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
    if (!uiState.isEditing) {
      setUiState((prev) => ({ ...prev, isEditing: true }));
    }
  }, [uiState.isEditing]);

  const handleCancelClick = useCallback(() => {
    form.reset();
    setPreferences({
      language: 'fr',
      notificationsEnabled: true,
    });
    setUiState((prev) => ({ ...prev, isEditing: false }));
  }, [session?.user?.name, session?.user?.email]);

  const handlePasswordChange = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      setUiState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors du changement de mot de passe');
      }

      setNotification({
        type: 'success',
        message: 'Mot de passe modifié avec succès',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
      throw error; // Propager l'erreur pour que la modale puisse la gérer
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Supprimer le compte
        </h3>
        <p className="text-gray-600 mb-6">
          Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          Pour confirmer, veuillez entrer votre mot de passe.
        </p>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={deleteConfirmation.password}
            onChange={(e) => setDeleteConfirmation(prev => ({
              ...prev,
              password: e.target.value,
              error: ''
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez votre mot de passe"
          />
          {deleteConfirmation.error && (
            <p className="mt-2 text-sm text-red-600">
              {deleteConfirmation.error}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setUiState(prev => ({ ...prev, showDeleteModal: false }));
              setDeleteConfirmation({ password: '', error: '' });
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={uiState.isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {uiState.isLoading ? 'Suppression...' : 'Confirmer la suppression'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center">
          <Cog6ToothIcon className="h-6 w-6 text-violet-600" />
          <h1 className="ml-3 text-lg font-semibold leading-6 text-gray-900">
            Paramètres du compte
          </h1>
        </div>
        <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
          Profile
        </span>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {/* Profil */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-sm font-medium text-gray-900">Profil</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Gérez vos informations personnelles.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                  Nom complet
                </label>
                <div className="mt-1 relative">
                  <input
                    {...form.register('name')}
                    type="text"
                    id="name"
                    className={`block w-full rounded-lg border-0 py-2 pl-3 pr-10 text-sm text-gray-900 shadow-sm ring-1 ring-inset ${form.formState.errors.name ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 transition-shadow hover:ring-gray-400`}
                    placeholder="Votre nom complet"
                    disabled={isSaving}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input
                    {...form.register('email')}
                    type="email"
                    id="email"
                    className={`block w-full rounded-lg border-0 py-2 pl-3 pr-10 text-sm text-gray-900 shadow-sm ring-1 ring-inset ${form.formState.errors.email ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 transition-shadow hover:ring-gray-400`}
                    placeholder="vous@exemple.com"
                    disabled={isSaving}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </section>

          {/* Sécurité */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-sm font-medium text-gray-900">Sécurité</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Gérez vos paramètres de sécurité
              </p>
            </div>
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Mot de passe</h3>
                  <p className="text-xs text-gray-500">
                    Changez votre mot de passe pour sécuriser votre compte
                  </p>
                </div>
                <Button
                  onClick={() => setUiState(prev => ({ ...prev, showPasswordModal: true }))}
                  className="flex items-center gap-1.5"
                  variant='outline'
                >
                  Changer mot de passe
                </Button>
              </div>

              <div className="flex items-center justify-between ">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Supprimer le compte</h3>
                  <p className="text-xs text-gray-500">
                    Supprimez définitivement votre compte et toutes vos données
                  </p>
                </div>
                <Button
                  onClick={() => setUiState(prev => ({ ...prev, showDeleteModal: true }))}
                  variant="danger"
                  className="flex  items-center gap-1.5"
                >
                  Supprimer le compte
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Préférences */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-sm font-medium text-gray-900">Préférences</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Personnalisez votre expérience PerfectCV.
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="language" className="block text-xs font-medium text-gray-700">
                  Langue
                </label>
                <select
                  id="language"
                  name="language"
                  value={preferences.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-0 py-2 pl-3 pr-10 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 transition-shadow hover:ring-gray-400"
                  disabled={uiState.isLoading}
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-medium text-gray-900">Notifications</h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Recevez des notifications sur les mises à jour importantes.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${preferences.notificationsEnabled ? 'bg-violet-600' : 'bg-gray-200'
                      } relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
                    onClick={handleNotificationToggle}
                    disabled={uiState.isLoading}
                  >
                    <span
                      className={`${preferences.notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Barre d'actions */}
      <div className="sticky bottom-0 mt-6 flex items-center justify-end gap-2 border-t border-gray-900/10 bg-white/60 backdrop-blur-sm pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancelClick}
          disabled={!form.formState.isDirty || isSaving}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:from-gray-100 hover:to-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 border border-gray-200"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!form.formState.isDirty || isSaving}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:from-pink-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-all duration-200"
        >
          {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Enregistrer
        </Button>
      </div>

      {/* Toast de notification */}
      {notification && (
        <Toast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Modales */}
      {uiState.showPasswordModal && (
        <PasswordChangeModal
          isOpen={uiState.showPasswordModal}
          onClose={() => setUiState(prev => ({ ...prev, showPasswordModal: false }))}
          onPasswordChange={handlePasswordChange}
        />
      )}

      {uiState.showDeleteModal && <DeleteConfirmationModal />}
    </div>

  );
}
