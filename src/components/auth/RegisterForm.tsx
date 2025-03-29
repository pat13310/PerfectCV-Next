'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
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
    setMessage('');

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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/dashboard');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGithubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="mb-8 text-3xl font-medium text-center text-gray-700">
        Créer un compte
      </h1>

      {message && (
        <div className={`mb-4 p-3 rounded ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center justify-center w-full p-3 mb-4 text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <Image
          src="/google-icon.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-3"
        />
        S&apos;inscrire avec Google
      </button>

      <button
        onClick={handleGithubSignIn}
        disabled={loading}
        className="flex items-center justify-center w-full p-3 mb-4 text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <Image
          src="/github-icon.svg"
          alt="GitHub"
          width={20}
          height={20}
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
        <input
          type="text"
          placeholder="Entrez votre prénom"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          disabled={loading}
          required
        />

        <input
          type="text"
          placeholder="Entrez votre nom"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          disabled={loading}
          required
        />

        <input
          type="email"
          placeholder="votreemail@exemple.com"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={loading}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            disabled={loading}
            required
          />
          <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
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
          className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Création en cours...' : 'Créer un compte'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <Link href="/(auth)/login" className="text-indigo-600 hover:text-indigo-500">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
