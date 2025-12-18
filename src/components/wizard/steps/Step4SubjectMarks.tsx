import { AcademicStage } from '../Wizard';
import { getCurrentSemester, Subject } from '../../../data/curriculum';

export interface SubjectMarks {
  mid1: number | null;
  mid2: number | null;
  internals: number | null;
}

interface Step4SubjectMarksProps {
  stage: AcademicStage | null;
  subjectMarks: Record<string, SubjectMarks>;
  onMarksChange: (subjectCode: string, field: keyof SubjectMarks, value: number | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4SubjectMarks = ({
  stage,
  subjectMarks,
  onMarksChange,
  onNext,
  onBack,
}: Step4SubjectMarksProps) => {
  const semesterData = getCurrentSemester();
  const theorySubjects = semesterData.subjects.filter(s => s.type === 'theory');
  const labSubjects = semesterData.subjects.filter(s => s.type === 'lab');

  const handleInputChange = (
    subjectCode: string,
    field: keyof SubjectMarks,
    value: string
  ) => {
    if (value === '') {
      onMarksChange(subjectCode, field, null);
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onMarksChange(subjectCode, field, numValue);
    }
  };

  const validateMark = (value: number | null, max: number): boolean => {
    if (value === null) return false;
    return value >= 0 && value <= max;
  };

  const isAllRequiredFilled = (): boolean => {
    if (stage === 'BEFORE_MID1') return true; // No marks needed

    for (const subject of theorySubjects) {
      const marks = subjectMarks[subject.code];
      if (!marks) return false;

      if (stage === 'AFTER_MID1') {
        if (!validateMark(marks.mid1, 30)) return false;
      } else if (stage === 'AFTER_MID2') {
        if (!validateMark(marks.mid1, 30) || !validateMark(marks.mid2, 30)) {
          return false;
        }
      } else if (stage === 'BEFORE_SEM') {
        if (
          !validateMark(marks.mid1, 30) ||
          !validateMark(marks.mid2, 30) ||
          !validateMark(marks.internals, 10)
        ) {
          return false;
        }
      }
    }

    return true;
  };

  const getRequiredFields = (): Array<keyof SubjectMarks> => {
    switch (stage) {
      case 'BEFORE_MID1':
        return [];
      case 'AFTER_MID1':
        return ['mid1'];
      case 'AFTER_MID2':
        return ['mid1', 'mid2'];
      case 'BEFORE_SEM':
        return ['mid1', 'mid2', 'internals'];
      default:
        return [];
    }
  };

  const requiredFields = getRequiredFields();
  const isNextDisabled = !isAllRequiredFilled();

  if (stage === 'BEFORE_MID1') {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Subject Marks
        </h2>
        <p className="text-gray-600 mb-6">
          Enter marks obtained in assessments
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            No Marks to Enter Yet
          </h3>
          <p className="text-blue-700">
            You selected "Before Mid-1" stage. You can proceed to the next step 
            to set your target grades.
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Subject Marks
      </h2>
      <p className="text-gray-600 mb-6">
        Enter marks obtained in theory subjects
      </p>

      {/* Info Box */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Stage: {stage}</span>
          <br />
          Enter marks for: {requiredFields.map(f => f === 'mid1' ? 'Mid-1 (30)' : f === 'mid2' ? 'Mid-2 (30)' : 'Internals (10)').join(', ')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Theory Subjects */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Theory Subjects ({theorySubjects.length})
          </h3>
          
          <div className="space-y-4">
            {theorySubjects.map((subject) => {
              const marks = subjectMarks[subject.code] || { mid1: null, mid2: null, internals: null };

              return (
                <div 
                  key={subject.code}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-800">
                      {subject.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {subject.code} • {subject.credits} credits
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Mid-1 */}
                    {requiredFields.includes('mid1') && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Mid-1 (out of 30)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="30"
                          value={marks.mid1 ?? ''}
                          onChange={(e) => handleInputChange(subject.code, 'mid1', e.target.value)}
                          placeholder="0-30"
                          className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${
                            marks.mid1 === null
                              ? 'border-gray-300 focus:ring-blue-500'
                              : validateMark(marks.mid1, 30)
                              ? 'border-green-300 focus:ring-green-500 bg-green-50'
                              : 'border-red-300 focus:ring-red-500 bg-red-50'
                          }`}
                        />
                      </div>
                    )}

                    {/* Mid-2 */}
                    {requiredFields.includes('mid2') && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Mid-2 (out of 30)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="30"
                          value={marks.mid2 ?? ''}
                          onChange={(e) => handleInputChange(subject.code, 'mid2', e.target.value)}
                          placeholder="0-30"
                          className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${
                            marks.mid2 === null
                              ? 'border-gray-300 focus:ring-blue-500'
                              : validateMark(marks.mid2, 30)
                              ? 'border-green-300 focus:ring-green-500 bg-green-50'
                              : 'border-red-300 focus:ring-red-500 bg-red-50'
                          }`}
                        />
                      </div>
                    )}

                    {/* Internals */}
                    {requiredFields.includes('internals') && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Internals (out of 10)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          value={marks.internals ?? ''}
                          onChange={(e) => handleInputChange(subject.code, 'internals', e.target.value)}
                          placeholder="0-10"
                          className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 ${
                            marks.internals === null
                              ? 'border-gray-300 focus:ring-blue-500'
                              : validateMark(marks.internals, 10)
                              ? 'border-green-300 focus:ring-green-500 bg-green-50'
                              : 'border-red-300 focus:ring-red-500 bg-red-50'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lab Subjects Info */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Lab Subjects ({labSubjects.length})
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <span className="font-semibold">Note:</span> Lab subjects are assumed 
              to receive grade "O" by default. No marks input needed for labs.
            </p>
            <div className="mt-3 space-y-1">
              {labSubjects.map((lab) => (
                <div key={lab.code} className="text-xs text-green-700">
                  • {lab.name} ({lab.credits} credits)
                </div>
              ))}
            </div>
          </div>
        </div>
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

export default Step4SubjectMarks;
