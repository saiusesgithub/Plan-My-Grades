import { AcademicStage } from '../Wizard';

interface Step2StageProps {
  selectedStage: AcademicStage | null;
  onStageSelect: (stage: AcademicStage) => void;
  onNext: () => void;
  onBack: () => void;
}

interface StageOption {
  value: AcademicStage;
  label: string;
  description: string;
  icon: string;
}

const stageOptions: StageOption[] = [
  {
    value: 'BEFORE_MID1',
    label: 'Before Mid-1',
    description: 'Planning before first mid-term exam',
    icon: '📝',
  },
  {
    value: 'AFTER_MID1',
    label: 'After Mid-1',
    description: 'Mid-1 completed, planning for remaining exams',
    icon: '📊',
  },
  {
    value: 'AFTER_MID2',
    label: 'After Mid-2',
    description: 'Both mids completed, planning for semester exam',
    icon: '📈',
  },
  {
    value: 'BEFORE_SEM',
    label: 'Before Semester Exam',
    description: 'All internals completed, final exam planning',
    icon: '🎯',
  },
];

const Step2Stage = ({ 
  selectedStage, 
  onStageSelect, 
  onNext, 
  onBack 
}: Step2StageProps) => {
  const isNextDisabled = selectedStage === null;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Academic Stage
      </h2>
      <p className="text-gray-600 mb-6">
        Select your current position in the semester
      </p>

      <div className="space-y-4">
        {stageOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onStageSelect(option.value)}
            className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
              selectedStage === option.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${
                    selectedStage === option.value
                      ? 'text-blue-900'
                      : 'text-gray-800'
                  }`}>
                    {option.label}
                  </h3>
                  {selectedStage === option.value && (
                    <span className="text-blue-600 font-bold">✓</span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  selectedStage === option.value
                    ? 'text-blue-700'
                    : 'text-gray-600'
                }`}>
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">Note:</span> Your selection determines 
          which marks you'll need to enter in the next steps. Choose the stage that 
          best reflects where you are in the semester.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isNextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2Stage;
