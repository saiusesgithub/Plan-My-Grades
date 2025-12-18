import { useState } from 'react';
import Step1Semester from './steps/Step1Semester';
import Step2Stage from './steps/Step2Stage';
import Step3CurrentCGPA from './steps/Step3CurrentCGPA';
import Step4SubjectMarks, { SubjectMarks } from './steps/Step4SubjectMarks';
import Step5TargetGrades, { TargetGrade } from './steps/Step5TargetGrades';
import { getCurrentSemester } from '../../data/curriculum';

export type AcademicStage = 
  | 'BEFORE_MID1' 
  | 'AFTER_MID1' 
  | 'AFTER_MID2' 
  | 'BEFORE_SEM';

interface WizardState {
  currentStep: number;
  selectedSemester: string;
  stage: AcademicStage | null;
  currentCgpa: number | null;
  subjectMarks: Record<string, SubjectMarks>;
  targetGrades: Record<string, TargetGrade>;
}

const Wizard = () => {
  // Initialize subject marks structure
  const initializeSubjectMarks = (): Record<string, SubjectMarks> => {
    const semesterData = getCurrentSemester();
    const marks: Record<string, SubjectMarks> = {};
    
    semesterData.subjects.forEach(subject => {
      marks[subject.code] = {
        mid1: null,
        mid2: null,
        internals: null,
      };
    });
    
    return marks;
  };

  // Initialize target grades (default to 'O' for theory subjects)
  const initializeTargetGrades = (): Record<string, TargetGrade> => {
    const semesterData = getCurrentSemester();
    const grades: Record<string, TargetGrade> = {};
    
    semesterData.subjects
      .filter(subject => subject.type === 'theory')
      .forEach(subject => {
        grades[subject.code] = 'O';
      });
    
    return grades;
  };

  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    selectedSemester: '2-1', // Hardcoded for v1
    stage: null,
    currentCgpa: null,
    subjectMarks: initializeSubjectMarks(),
    targetGrades: initializeTargetGrades(),
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

  const handleCgpaChange = (cgpa: number | null) => {
    setWizardState(prev => ({
      ...prev,
      currentCgpa: cgpa,
    }));
  };

  const handleMarksChange = (
    subjectCode: string,
    field: keyof SubjectMarks,
    value: number | null
  ) => {
    setWizardState(prev => ({
      ...prev,
      subjectMarks: {
        ...prev.subjectMarks,
        [subjectCode]: {
          ...prev.subjectMarks[subjectCode],
          [field]: value,
        },
      },
    }));
  };

  const handleGradeChange = (subjectCode: string, grade: TargetGrade) => {
    setWizardState(prev => ({
      ...prev,
      targetGrades: {
        ...prev.targetGrades,
        [subjectCode]: grade,
      },
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
      case 3:
        return (
          <Step3CurrentCGPA 
            currentCgpa={wizardState.currentCgpa}
            onCgpaChange={handleCgpaChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4SubjectMarks 
            stage={wizardState.stage}
            subjectMarks={wizardState.subjectMarks}
            onMarksChange={handleMarksChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5TargetGrades 
            targetGrades={wizardState.targetGrades}
            onGradeChange={handleGradeChange}
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
