'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) {
      setMessage(msg);
      setMessageType(msg.toLowerCase().includes('success') ? 'success' : 'error');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setMessage('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setMessage(result.error);
        setMessageType('error');
      } else if (result?.ok) {
        // Use window.location for a full page reload to ensure proper session handling
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      setMessage(error?.message || 'Une erreur est survenue');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (loading) return;
    setLoading(true);
    signIn('google', { 
      callbackUrl: '/dashboard',
    });
  };

  const handleGithubSignIn = () => {
    if (loading) return;
    setLoading(true);
    signIn('github', { 
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className="h-[calc(80vh)] flex items-start justify-center pt-0">
      <div className="border border-gray-300 w-full max-w-md p-6 px-8 mx-auto bg-white rounded-lg shadow-sm">
        <h1 className="mb-8 text-3xl font-medium text-center text-gray-700">
          Connexion
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
          Continuer avec Google
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
          Continuer avec GitHub
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">ou</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="votreemail@exemple.com"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
              />
              <button
                type="button"
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
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Chargement...' : 'Connexion'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
