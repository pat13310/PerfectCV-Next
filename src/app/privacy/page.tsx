import React from 'react';
import { ShieldCheckIcon, UserGroupIcon, CogIcon, DocumentTextIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50/50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg">
            <div className="space-y-14">
              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <ShieldCheckIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600">
                    Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informera sur la manière dont nous traitons vos données personnelles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <UserGroupIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Informations collectées</h2>
                  <p className="text-gray-600 mb-4">
                    Lorsque vous utilisez notre créateur de CV, nous collectons et traitons les informations suivantes :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Informations personnelles (nom, email, etc.)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Contenu du CV et préférences de mise en forme</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Données d'utilisation et analyses</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <CogIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Utilisation des données</h2>
                  <p className="text-gray-600 mb-4">
                    Nous utilisons vos informations pour :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Fournir et améliorer notre service de création de CV</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Personnaliser votre expérience</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Envoyer des mises à jour importantes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Répondre à vos demandes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <KeyIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sécurité des données</h2>
                  <p className="text-gray-600">
                    Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles. Vos données sont cryptées et stockées en toute sécurité sur nos serveurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <DocumentTextIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Accéder à vos données personnelles</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Corriger les données inexactes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Demander la suppression de vos données</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">S'opposer au traitement de vos données</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Portabilité des données</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : 10 décembre 2024
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Contact : privacy@perfectcv.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
