'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Tentative de connexion avec:', email);
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('Résultat de la connexion:', result);

      if (result?.error) {
        console.error('Erreur de connexion:', result.error);
        setError(result.error);
      } else {
        console.log('Connexion réussie');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="mb-8 text-3xl font-medium text-center text-gray-700">
        Connexion
      </h1>

      <button className="flex items-center justify-center w-full p-3 mb-4 text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors">
        <Image
          src="/google-icon.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-3"
        />
        Continuer avec Google
      </button>

      <button className="flex items-center justify-center w-full p-3 mb-4 text-gray-700 border rounded-lg hover:bg-gray-50 transition-colors">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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

        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Connexion
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
}
