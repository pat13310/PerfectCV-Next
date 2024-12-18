import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './PrimaryButton';
import { Loader2, X } from 'lucide-react';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

const formSchema = z.object({
  currentPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordChange: (data: FormValues) => Promise<void>;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
  onPasswordChange
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationState, setVerificationState] = useState({
    isVerifying: false,
    code: '',
    error: '',
    verified: false
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/user/send-code', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de l\'envoi du code');
      }

      setVerificationState(prev => ({
        ...prev,
        isVerifying: true,
        error: ''
      }));
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/user/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: verificationState.code
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Code incorrect');
      }

      const formData = form.getValues();
      await onPasswordChange(formData);
      
      // Réinitialiser le formulaire et fermer la modale
      form.reset();
      setVerificationState({
        isVerifying: false,
        code: '',
        error: '',
        verified: false
      });
      onClose();
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Changer le mot de passe
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!verificationState.isVerifying ? (
            <form className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  {...form.register("currentPassword")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {form.formState.errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...form.register("newPassword")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {form.formState.errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
                <div className="mt-2">
                  <PasswordStrengthMeter password={form.watch("newPassword") || ""} />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...form.register("confirmPassword")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isLoading || !form.formState.isValid}
                  className="flex items-center gap-1.5"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Continuer
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Code de vérification
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Un code de vérification a été envoyé à votre adresse email.
                </p>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationState.code}
                  onChange={(e) => setVerificationState(prev => ({
                    ...prev,
                    code: e.target.value,
                    error: ''
                  }))}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Entrez le code à 6 chiffres"
                />
                {verificationState.error && (
                  <p className="mt-2 text-sm text-red-600">
                    {verificationState.error}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVerificationState(prev => ({
                    ...prev,
                    isVerifying: false,
                    code: '',
                    error: ''
                  }))}
                >
                  Retour
                </Button>
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isLoading || !verificationState.code}
                  className="flex items-center gap-1.5"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Vérifier et changer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
