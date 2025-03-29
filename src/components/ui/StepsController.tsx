'use client';

import { useState, useEffect } from 'react';
import { StepsProgress } from './StepsProgress';
import { StepsNavigation } from './StepsNavigation';

export interface Step {
  id: string;
  name: string;
  description: string;
}

interface StepsControllerProps {
  steps: Step[];
  onStepChange?: (step: number) => void;
  onSubmit?: () => void;
  className?: string;
  children?: React.ReactNode;
  initialStep?: number;
}

export function StepsController({
  steps,
  onStepChange,
  onSubmit,
  className = '',
  children,
  initialStep = 0,
}: StepsControllerProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    onStepChange?.(step);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="relative flex-shrink-0">
      <StepsNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={onSubmit}
              isLastStep={currentStep === steps.length - 1}
              className="mt-4 flex-shrink-0"
            />
        <StepsProgress
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepChange}
        />
        
      </div>
      
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg h-full">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto">
              {children}
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}
