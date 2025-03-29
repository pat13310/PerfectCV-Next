'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const { data: session, status } = useSession();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  console.log('Session status:', status);
  console.log('Session data:', session);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setShowAuthMenu(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#1a1d24] w-full ${className}`}>
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-indigo-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">Perfect CV</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">

          {!session ? (
            <>
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                Accueil
              </Link>
              <Link href="/pricing" className="text-white hover:text-gray-300 transition-colors">
                Tarifs
              </Link>
              <Link href="/about" className="text-white hover:text-gray-300 transition-colors">
                A propos de nous
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-white hover:text-gray-300 transition-colors">
                Accueil
              </Link>
              <Link href="/dashboard/assistant" className="text-white hover:text-gray-300 transition-colors">
                Assistant
              </Link>
              <Link href="/dashboard/templates" className="text-white hover:text-gray-300 transition-colors">
                Modèles
              </Link>
              <Link href="/dashboard/resumes" className="text-white hover:text-gray-300 transition-colors">
                Aperçu
              </Link>
            </>
          )}
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-6">
          {/* Language switcher */}
          <div className="flex items-center space-x-2 text-white">
            <button className="hover:text-gray-300 transition-colors font-medium">FR</button>
            <span className="text-gray-500">|</span>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">GB</button>
          </div>

          {/* Auth button */}
          <div className="relative">
            <button
              onClick={() => setShowAuthMenu(!showAuthMenu)}
              className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
            >
              {session ? (
                <>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="ml-2">{session.user?.name}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Connexion</span>
                </>
              )}
            </button>

            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-100">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setShowAuthMenu(false)}
                    >
                      Tableau de bord
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setShowAuthMenu(false)}
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setShowAuthMenu(false)}
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
