import { Check, CircleDot } from 'lucide-react';
import { OnboardingStep } from '../types/doctor';
import clsx from 'clsx';

interface Props {
  currentStep: OnboardingStep;
  completedSteps: Set<OnboardingStep>;
  onStepClick: (step: OnboardingStep) => void;
}

const steps: { id: OnboardingStep; label: string }[] = [
  { id: 'basic-info', label: 'Basic Information' },
  { id: 'qualifications', label: 'Qualifications' },
  { id: 'identification', label: 'Identification' },
  { id: 'review', label: 'Review' },
];

export function OnboardingProgress({ currentStep, completedSteps, onStepClick }: Props) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = step.id === currentStep;
          const isClickable = index === 0 || completedSteps.has(steps[index - 1].id);

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              className={clsx(
                "flex flex-col items-center relative z-10 focus:outline-none group",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
              disabled={!isClickable}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                    ? "border-blue-500 bg-white text-blue-500"
                    : "border-gray-300 bg-white text-gray-300",
                  isClickable && !isCompleted && "group-hover:border-blue-400 group-hover:text-blue-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <CircleDot className="w-5 h-5" />
                )}
              </div>
              <span
                className={clsx(
                  "mt-2 text-sm transition-colors duration-200",
                  isCurrent ? "text-blue-500 font-medium" : "text-gray-500",
                  isClickable && !isCurrent && "group-hover:text-blue-400"
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
        <div className="absolute top-5 h-0.5 w-full bg-gray-200 -z-10">
          <div
            className="absolute top-0 h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}