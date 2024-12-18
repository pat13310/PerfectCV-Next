import Link from 'next/link';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50/30 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 text-transparent bg-clip-text mb-4">
            Perfect CV
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            En <span className="text-fuchsia-600">Quelques Minutes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Construisez un CV professionnel qui vous démarque. Notre technologie IA avancée 
            et nos templates modernes vous permettent de créer un CV parfaitement adapté 
            à votre profil et au poste de vos rêves.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-14">
            <Link
              href="/dashboard/cv/new"
              className="text-white inline-flex opacity-90 hover:opacity-100 items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-base font-semibold rounded-full transition-all shadow-lg shadow-purple-200"
            >
              Commencer Votre CV
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 border-2 border-violet-600 text-violet-700 text-base font-semibold rounded-full hover:bg-violet-50 transition-all"
            >
              Améliorer mon CV
              <ArrowUpTrayIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Link href="/dashboard/cv/new" className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-violet-700 transition-colors">
                Rapide & Intelligent
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                Notre IA analyse votre profil et suggère les meilleures formulations pour mettre en valeur vos compétences
              </p>
            </Link>

            {/* Feature 2 */}
            <Link href="/dashboard/cv/new" className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-violet-700 transition-colors">
                Templates Premium
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                Des modèles professionnels conçus par des experts en recrutement pour maximiser vos chances
              </p>
            </Link>

            {/* Feature 3 */}
            <Link href="/dashboard/cv/new" className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-violet-700 transition-colors">
                Optimisé ATS
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                Vos CVs sont optimisés pour passer les systèmes de suivi des candidatures (ATS) avec succès
              </p>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* ATS Optimization Feature */}
              <Link href="/dashboard/cv/new" 
                className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 
                         transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/80">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl p-3 shadow-lg
                              transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-violet-700 transition-colors">Optimisé pour l'ATS</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Nos CV sont spécialement conçus pour passer les systèmes de suivi des candidatures (ATS) avec succès. 
                  Format optimisé, mots-clés pertinents et structure claire pour maximiser vos chances d'être sélectionné.
                </p>
              </Link>

              {/* Professional Templates Feature */}
              <Link href="/dashboard/cv/new"
                className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100
                         transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/80">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl p-3 shadow-lg
                              transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-violet-700 transition-colors">Templates Professionnels</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Des modèles modernes et professionnels conçus par des experts en recrutement. 
                  Design élégant et mise en page optimisée pour mettre en valeur votre parcours.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
