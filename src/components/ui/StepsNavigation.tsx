'use client';

import { Button } from '@/components/ui/PrimaryButton';
import { CreateButton } from './CreateButton';

interface StepsNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  className?: string;
}

export function StepsNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep = false,
  className = '',
}: StepsNavigationProps) {
  return (
    <div className={`flex justify-between mb-4 space-x-4 ${className}`}>
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="text-violet-600 border-violet-600 hover:bg-violet-50"
      >
        Précédent
      </Button>
      <CreateButton paddingY='py-2' onClick={isLastStep ? onSubmit : onNext}> {isLastStep ? 'Terminer' : 'Suivant'}</CreateButton>
     
    </div>
  );
}
