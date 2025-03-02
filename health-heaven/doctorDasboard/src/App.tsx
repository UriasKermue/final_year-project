import React, { useState, useEffect } from 'react';
import { OnboardingProgress } from './components/OnboardingProgress';
import { BasicInfoForm } from './components/BasicInfoForm';
import { QualificationsForm } from './components/QualificationsForm';
import { IdentificationForm } from './components/IdentificationForm';
import { ReviewStep } from './components/ReviewStep';
import { DoctorFormData, OnboardingStep } from './types/doctor';
import { Stethoscope } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('basic-info');
  const [formData, setFormData] = useState<Partial<DoctorFormData>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<OnboardingStep>>(new Set());

  // Debugging: Log completed steps on every change
  useEffect(() => {
    console.log('Completed Steps:', completedSteps);
  }, [completedSteps]);

  // Handle submitting of each form step
  const handleBasicInfoSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => new Set([...prev, 'basic-info']));
    setCurrentStep('qualifications');
  };

  const handleQualificationsSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => new Set([...prev, 'qualifications']));
    setCurrentStep('identification');
  };

  const handleIdentificationSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => new Set([...prev, 'identification']));
    setCurrentStep('review');
  };

  const handleFinalSubmit = async () => {
    console.log('Submitting application:', formData);
    alert('Application submitted successfully! We will review your credentials and get back to you soon.');
  };

  // Can access step if it's already completed or the previous steps are completed
  const canAccessStep = (step: OnboardingStep): boolean => {
    switch (step) {
      case 'basic-info':
        return true;
      case 'qualifications':
        return completedSteps.has('basic-info');
      case 'identification':
        return completedSteps.has('qualifications');
      case 'review':
        return completedSteps.has('identification');
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Doctor Registration
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Join our healthcare platform and start helping patients
          </p>
        </div>

        {/* Onboarding Progress */}
        <OnboardingProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={(step) => {
            console.log(`Navigating to: ${step}`);
            if (canAccessStep(step)) setCurrentStep(step);
          }}
        />

        {/* Form Step 1: Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div
            className={clsx(
              'bg-white shadow rounded-lg p-6 md:p-8 transition-all duration-300',
              currentStep === 'basic-info' ? 'lg:col-span-2' : 'lg:col-span-1'
            )}
          >
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <BasicInfoForm
              onSubmit={handleBasicInfoSubmit}
              defaultValues={formData}
              isActive={currentStep === 'basic-info'}
            />
          </div>

          {/* Form Step 2: Qualifications */}
          {(canAccessStep('qualifications') || completedSteps.has('qualifications')) && (
            <div
              className={clsx(
                'bg-white shadow rounded-lg p-6 md:p-8 transition-all duration-300',
                currentStep === 'qualifications' ? 'lg:col-span-2' : 'lg:col-span-1'
              )}
            >
              <h2 className="text-xl font-semibold mb-6">Qualifications</h2>
              <QualificationsForm
                onSubmit={handleQualificationsSubmit}
                onBack={() => setCurrentStep('basic-info')}
                defaultValues={formData}
                isActive={currentStep === 'qualifications'}
              />
            </div>
          )}

          {/* Form Step 3: Identification */}
          {(canAccessStep('identification') || completedSteps.has('identification')) && (
            <div
              className={clsx(
                'bg-white shadow rounded-lg p-6 md:p-8 transition-all duration-300',
                currentStep === 'identification' ? 'lg:col-span-2' : 'lg:col-span-1'
              )}
            >
              <h2 className="text-xl font-semibold mb-6">Identification</h2>
              <IdentificationForm
                onSubmit={handleIdentificationSubmit}
                onBack={() => setCurrentStep('qualifications')}
                defaultValues={formData}
                isActive={currentStep === 'identification'}
              />
            </div>
          )}

          {/* Form Step 4: Review */}
          {(canAccessStep('review') || completedSteps.has('review')) && (
            <div
              className={clsx(
                'bg-white shadow rounded-lg p-6 md:p-8 transition-all duration-300',
                currentStep === 'review' ? 'lg:col-span-2' : 'lg:col-span-1'
              )}
            >
              <h2 className="text-xl font-semibold mb-6">Review</h2>
              <ReviewStep
                data={formData}
                onSubmit={handleFinalSubmit}
                onBack={() => setCurrentStep('identification')}
                isActive={currentStep === 'review'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
