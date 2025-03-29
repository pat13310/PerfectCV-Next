'use client';

import { Button } from '@/components/ui/PrimaryButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = (plan: string) => {
    if (!session) {
      router.push('/login?message=Connectez-vous pour souscrire à un abonnement');
      return;
    }
    // TODO: Implémenter la logique de paiement
    console.log(`Souscription au plan ${plan}`);
  };

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "mois",
      features: [
        "1 CV personnalisé",
        "Templates de base",
        "Export PDF",
        "Assistance par email"
      ],
      cta: "Commencer Gratuitement",
      highlighted: false
    },
    {
      name: "Pro",
      price: "9.99€",
      period: "mois",
      features: [
        "CVs illimités",
        "Tous les templates premium",
        "Export multi-formats",
        "Analyse IA avancée",
        "Support prioritaire 24/7",
        "Suggestions IA personnalisées"
      ],
      cta: "Commencer l'essai Pro",
      highlighted: true
    },
    {
      name: "Entreprise",
      price: "49.99€",
      period: "mois",
      features: [
        "Tout le plan Pro",
        "Gestion multi-utilisateurs",
        "API d'intégration",
        "Support dédié",
        "Formation personnalisée",
        "Personnalisation sur mesure"
      ],
      cta: "Contacter les ventes",
      highlighted: false
    }
  ];

  return (
    <div className="pt-16 min-h-[calc(100vh-4rem)] bg-[length:100%] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 text-transparent bg-clip-text">
            Choisissez votre plan
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des solutions adaptées à vos besoins, de la création simple de CV à la gestion complète de carrière
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-white via-white/95 to-violet-50/90 border-2 border-violet-300 shadow-xl shadow-violet-200/50'
                  : 'bg-white/90 backdrop-blur-sm border border-violet-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/30'
              }`}
            >
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-1 ${
                  plan.highlighted ? 'text-violet-800' : 'text-violet-700'
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-violet-900' : 'text-violet-800'
                  }`}>
                    {plan.price}
                  </span>
                  <span className="text-violet-600 text-base">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <svg
                      className={`w-4 h-4 ${
                        plan.highlighted ? 'text-pink-500' : 'text-violet-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-2 transition-all duration-300 text-sm font-semibold mt-auto ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-700 hover:via-fuchsia-700 hover:to-pink-700 text-white shadow-lg shadow-violet-300/50 hover:shadow-xl hover:shadow-violet-400/50'
                    : 'bg-white hover:bg-violet-50 text-violet-700 border-2 border-violet-200 hover:border-violet-300'
                }`}
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-4">
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Tous les prix sont en euros (EUR) et incluent la TVA.
            <br />
            Besoin d&apos;une solution personnalisée ?{' '}
            <a href="/contact" className="font-medium text-violet-700 hover:text-pink-600 transition-colors duration-300 hover:underline">
              Contactez-nous
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
