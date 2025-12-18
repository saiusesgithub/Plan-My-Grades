import { getCurrentSemester, getBranchInfo } from '../../../data/curriculum';

interface Step1SemesterProps {
  onNext: () => void;
}

const Step1Semester = ({ onNext }: Step1SemesterProps) => {
  const semesterData = getCurrentSemester();
  const branchInfo = getBranchInfo();

  const theorySubjects = semesterData.subjects.filter(s => s.type === 'theory');
  const labSubjects = semesterData.subjects.filter(s => s.type === 'lab');

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Semester Confirmation
      </h2>
      <p className="text-gray-600 mb-6">
        Verify your current semester details
      </p>

      <div className="space-y-6">
        {/* Semester Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            {semesterData.name}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Branch:</span>
              <span className="ml-2 font-medium text-gray-800">
                {branchInfo.branch}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Regulation:</span>
              <span className="ml-2 font-medium text-gray-800">
                {branchInfo.regulation}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Credits:</span>
              <span className="ml-2 font-medium text-gray-800">
                {semesterData.totalCredits}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Subjects:</span>
              <span className="ml-2 font-medium text-gray-800">
                {semesterData.subjects.length}
              </span>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">
              Theory Subjects
            </h4>
            <div className="text-2xl font-bold text-blue-600">
              {theorySubjects.length}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {theorySubjects.reduce((sum, s) => sum + s.credits, 0)} credits
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">
              Lab Subjects
            </h4>
            <div className="text-2xl font-bold text-green-600">
              {labSubjects.length}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {labSubjects.reduce((sum, s) => sum + s.credits, 0)} credits
            </p>
          </div>
        </div>

        {/* Subjects List */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">All Subjects:</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {semesterData.subjects.map(subject => (
              <div 
                key={subject.code}
                className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {subject.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({subject.code})
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    subject.type === 'theory' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {subject.type}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {subject.credits} cr
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-end">
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

export default Step1Semester;
