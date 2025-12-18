interface Step3CurrentCGPAProps {
  currentCgpa: number | null;
  onCgpaChange: (cgpa: number | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3CurrentCGPA = ({
  currentCgpa,
  onCgpaChange,
  onNext,
  onBack,
}: Step3CurrentCGPAProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '') {
      onCgpaChange(null);
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onCgpaChange(numValue);
    }
  };

  const isValid = currentCgpa !== null && currentCgpa >= 0 && currentCgpa <= 10;
  const isNextDisabled = !isValid;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Current CGPA
      </h2>
      <p className="text-gray-600 mb-6">
        Enter your cumulative CGPA up to the previous semester
      </p>

      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> Enter your CGPA from all 
            previous semesters (not including the current semester). This will be 
            used to calculate your overall CGPA after this semester.
          </p>
        </div>

        {/* Input Field */}
        <div>
          <label 
            htmlFor="cgpa-input" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What is your CGPA till now?
          </label>
          <input
            id="cgpa-input"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={currentCgpa ?? ''}
            onChange={handleInputChange}
            placeholder="e.g., 8.45"
            className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${
              currentCgpa === null
                ? 'border-gray-300 focus:ring-blue-500'
                : isValid
                ? 'border-green-300 focus:ring-green-500 bg-green-50'
                : 'border-red-300 focus:ring-red-500 bg-red-50'
            }`}
          />
          {currentCgpa !== null && !isValid && (
            <p className="mt-2 text-sm text-red-600">
              CGPA must be between 0 and 10
            </p>
          )}
          {isValid && (
            <p className="mt-2 text-sm text-green-600">
              ✓ Valid CGPA entered
            </p>
          )}
        </div>

        {/* Example Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Example:</span>
          </p>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• If you're a fresher (no previous semesters), enter <span className="font-mono font-semibold">0</span></li>
            <li>• If your CGPA from previous semesters is 8.45, enter <span className="font-mono font-semibold">8.45</span></li>
          </ul>
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

export default Step3CurrentCGPA;
