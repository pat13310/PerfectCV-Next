import { ClipboardDocumentCheckIcon, ScaleIcon, ShieldCheckIcon, UserGroupIcon, BanknotesIcon } from '@heroicons/react/24/outline';

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50/50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent mb-4">
            Conditions d'Utilisation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veuillez lire attentivement ces conditions avant d'utiliser notre service.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-lg">
            <div className="space-y-14">
              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptation des Conditions</h2>
                  <p className="text-gray-600">
                    En accédant et en utilisant PerfectCV, vous acceptez d'être lié par ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <UserGroupIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Utilisation du Service</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous devez avoir au moins 18 ans pour utiliser ce service</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous êtes responsable de maintenir la confidentialité de votre compte</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous acceptez de ne pas utiliser le service à des fins illégales</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <ShieldCheckIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété Intellectuelle</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Le contenu du service est protégé par des droits d'auteur</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous conservez vos droits sur le contenu que vous créez</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous nous accordez une licence pour héberger votre contenu</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <BanknotesIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Paiements et Abonnements</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Les prix sont affichés en euros et incluent la TVA</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Les abonnements sont automatiquement renouvelés</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
                      <span className="text-gray-600">Vous pouvez annuler votre abonnement à tout moment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-violet-50 p-3 rounded-xl">
                  <ScaleIcon className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation de Responsabilité</h2>
                  <p className="text-gray-600">
                    Notre service est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas responsables des dommages directs, indirects, accessoires ou consécutifs résultant de votre utilisation du service.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : 10 décembre 2024
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Contact : terms@perfectcv.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
