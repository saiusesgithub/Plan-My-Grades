import { useState } from 'react';
import Step1Semester from './steps/Step1Semester';
import Step2Stage from './steps/Step2Stage';

export type AcademicStage = 
  | 'BEFORE_MID1' 
  | 'AFTER_MID1' 
  | 'AFTER_MID2' 
  | 'BEFORE_SEM';

interface WizardState {
  currentStep: number;
  selectedSemester: string;
  stage: AcademicStage | null;
}

const Wizard = () => {
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    selectedSemester: '2-1', // Hardcoded for v1
    stage: null,
  });

  const handleNext = () => {
    setWizardState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const handleBack = () => {
    setWizardState(prev => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  const handleStageSelect = (stage: AcademicStage) => {
    setWizardState(prev => ({
      ...prev,
      stage,
    }));
  };

  const renderStep = () => {
    switch (wizardState.currentStep) {
      case 1:
        return (
          <Step1Semester 
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Stage 
            selectedStage={wizardState.stage}
            onStageSelect={handleStageSelect}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-sm font-medium text-gray-600">
              Step {wizardState.currentStep} of 6
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(wizardState.currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        {renderStep()}
      </div>
    </div>
  );
};

export default Wizard;
