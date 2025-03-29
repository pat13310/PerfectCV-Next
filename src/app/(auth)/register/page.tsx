'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setMessage('Vous devez accepter les conditions d\'utilisation');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // After successful registration, sign in and redirect to dashboard
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setMessage(result.error);
        setMessageType('error');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      setMessage(error.message || 'Une erreur est survenue');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGithubSignIn = () => {
    setLoading(true);
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-1">
      <div className="border border-gray-200 w-full max-w-2xl p-6 px-6 mx-auto bg-white rounded-lg shadow-sm">
        <h1 className="mb-6 text-2xl font-medium text-center text-gray-700">
          Créer un compte
        </h1>

        {message && (
          <div className={`mb-4 p-2 rounded text-sm ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex items-center justify-center w-full p-2.5 mb-3 text-sm text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={18}
            height={18}
            className="mr-3"
          />
          S&apos;inscrire avec Google
        </button>

        <button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="flex items-center justify-center w-full p-2.5 mb-3 text-sm text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Image
            src="/github-icon.svg"
            alt="GitHub"
            width={18}
            height={18}
            className="mr-3"
          />
          S&apos;inscrire avec GitHub
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">ou</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Prénom"
                className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={loading}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="votreemail@exemple.com"
              className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Image
                src="/eye-off-icon.svg"
                alt="Toggle password visibility"
                width={18}
                height={18}
              />
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              className="w-full p-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Image
                src="/eye-off-icon.svg"
                alt="Toggle password visibility"
                width={18}
                height={18}
              />
            </button>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              disabled={loading}
              required
            />
            <label htmlFor="acceptTerms" className="ml-2 text-xs text-gray-600">
              J&apos;accepte les{' '}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                conditions d&apos;utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'Créer un compte'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
