'use client';

import { useEffect, useRef } from 'react';

interface Step {
  id: string;
  name: string;
  description: string;
}

interface StepsProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function StepsProgress({ steps, currentStep, onStepClick }: StepsProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const scrollToCurrentStep = () => {
      const currentStepElement = stepRefs.current[currentStep];
      const container = containerRef.current;

      if (currentStepElement && container) {
        const containerRect = container.getBoundingClientRect();
        const stepRect = currentStepElement.getBoundingClientRect();
        
        // Calculer si l'élément est partiellement ou totalement hors de vue
        const isPartiallyOutOfView = 
          stepRect.left < containerRect.left ||
          stepRect.right > containerRect.right;

        if (isPartiallyOutOfView) {
          const scrollLeft = currentStepElement.offsetLeft - containerRect.width / 2 + stepRect.width / 2;
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    };

    // Scroll immédiatement au changement d'étape
    scrollToCurrentStep();

    // Ajouter un petit délai pour s'assurer que le scroll fonctionne même après les transitions
    const timeoutId = setTimeout(scrollToCurrentStep, 100);

    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <nav aria-label="Progress" className="mb-2">
      <div ref={containerRef} className="overflow-x-auto no-scrollbar pb-0">
        <ol role="list" className="flex space-x-4 min-w-max">
          {steps.map((step, index) => (
            <li
              key={step.id}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex-shrink-0 w-64 first:pl-0 last:pr-4"
            >
              <button
                onClick={() => onStepClick(index)}
                className={`group w-full ${
                  index <= currentStep ? 'hover:bg-violet-50' : 'hover:bg-gray-50'
                } rounded-lg transition-colors duration-200`}
              >
                <div
                  className={`flex flex-col border-l-4 py-2 pl-4 md:pl-0 md:pt-4 md:pb-2 ${
                    index < currentStep
                      ? 'border-violet-600'
                      : index === currentStep
                      ? 'border-violet-600'
                      : 'border-gray-200'
                  } md:border-l-0 md:border-t-4`}
                >
                  <span
                    className={`text-sm font-medium ${
                      index < currentStep
                        ? 'text-violet-600'
                        : index === currentStep
                        ? 'text-violet-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-gray-500">{step.description}</span>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
