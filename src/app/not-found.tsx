'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CreateButton } from '@/components/ui/CreateButton';

// Définir des valeurs fixes pour les particules
const particles = [
  { width: 4.1, height: 4.1, opacity: 0.08, top: 85.43, left: 93.67, delay: 1.8, duration: 6.87 },
  { width: 2.8, height: 2.8, opacity: 0.07, top: 54.90, left: 62.63, delay: 0.65, duration: 6.94 },
  { width: 5.5, height: 5.5, opacity: 0.05, top: 72.25, left: 47.02, delay: 1.69, duration: 8.54 },
  { width: 3.2, height: 3.2, opacity: 0.06, top: 25.75, left: 82.32, delay: 2.1, duration: 7.23 },
  { width: 4.7, height: 4.7, opacity: 0.09, top: 35.18, left: 15.44, delay: 1.2, duration: 6.45 }
];

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50/50 overflow-hidden ">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Effet de particules subtil */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, index) => (
            <div
              key={index}
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                backgroundColor: `rgba(139, 92, 246, ${particle.opacity})`,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
              className="absolute rounded-full mix-blend-multiply filter blur-sm animate-float-particle"
            />
          ))}
        </div>

        <div className="relative z-10 text-center flex flex-col items-center pt-12">
          <div className="relative">
            {/* 404 avec effet de profondeur */}
            <h1 className="text-[12rem] font-black text-white tracking-tight select-none drop-shadow-2xl">
              404
            </h1>
            <h1 className="text-[12rem] font-black tracking-tight absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-gray-600/90 to-gray-400/80 select-none">
              404
            </h1>
          </div>

          <div className="text-center max-w-2xl mx-auto -mt-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-3">Cette page n'existe pas</h2>
            <p className="text-base text-gray-500 mb-12 leading-relaxed">
              La page que vous recherchez n'a pas été trouvée ou a été déplacée. Nous vous invitons à retourner à la page d'accueil ou à créer un nouveau CV.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.back()}
                className="group min-w-[140px] px-6 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-full font-medium transition-all duration-200 flex items-center gap-2 justify-center hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
              </button>
              <CreateButton
                href="/"
                rounded="full"
                className="min-w-[220px] px-6 py-2.5 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-medium transition-all duration-200 flex items-center gap-2 justify-center hover:shadow-lg group"
              >
                Accueil
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </CreateButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        .animate-float-particle {
          animation: float var(--duration, 5s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </main>
  );
}
