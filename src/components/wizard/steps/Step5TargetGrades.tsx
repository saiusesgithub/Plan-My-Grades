import { getCurrentSemester } from '../../../data/curriculum';

export type TargetGrade = 'O' | 'A+' | 'A' | 'B+';

interface Step5TargetGradesProps {
  targetGrades: Record<string, TargetGrade>;
  onGradeChange: (subjectCode: string, grade: TargetGrade) => void;
  onNext: () => void;
  onBack: () => void;
}

const gradeOptions: TargetGrade[] = ['O', 'A+', 'A', 'B+'];

const Step5TargetGrades = ({
  targetGrades,
  onGradeChange,
  onNext,
  onBack,
}: Step5TargetGradesProps) => {
  const semesterData = getCurrentSemester();
  const theorySubjects = semesterData.subjects.filter(s => s.type === 'theory');

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Target Grades
      </h2>
      <p className="text-gray-600 mb-6">
        Select your desired grade for each theory subject
      </p>

      {/* Info Box */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Choose the grade you want to 
          achieve in each theory subject. This will help plan how many marks you need 
          in the semester exam. Lab grades are assumed to be "O" by default.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theory Subjects */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Theory Subjects ({theorySubjects.length})
          </h3>
          
          <div className="space-y-3">
            {theorySubjects.map((subject) => {
              const selectedGrade = targetGrades[subject.code] || 'O';

              return (
                <div 
                  key={subject.code}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {subject.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.code} • {subject.credits} credits
                    </p>
                  </div>

                  <div className="ml-4">
                    <select
                      value={selectedGrade}
                      onChange={(e) => onGradeChange(subject.code, e.target.value as TargetGrade)}
                      className="px-4 py-2 text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                    >
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grade Info */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-3">Grade Information:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-700">O</div>
              <div className="text-xs text-green-600 mt-1">Outstanding</div>
              <div className="text-xs text-gray-500">90-100</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-blue-700">A+</div>
              <div className="text-xs text-blue-600 mt-1">Excellent</div>
              <div className="text-xs text-gray-500">80-89</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-purple-700">A</div>
              <div className="text-xs text-purple-600 mt-1">Very Good</div>
              <div className="text-xs text-gray-500">70-79</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-orange-700">B+</div>
              <div className="text-xs text-orange-600 mt-1">Good</div>
              <div className="text-xs text-gray-500">60-69</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Your Target Summary:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              theorySubjects.reduce((acc, subject) => {
                const grade = targetGrades[subject.code] || 'O';
                acc[grade] = (acc[grade] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([grade, count]) => (
              <div key={grade} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
                <span className="font-bold text-gray-800">{grade}</span>
                <span className="text-gray-600 ml-1">× {count}</span>
              </div>
            ))}
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step5TargetGrades;
