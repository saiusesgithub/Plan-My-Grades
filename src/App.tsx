import Wizard from './components/wizard/Wizard';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold">PlanMyGrades</h1>
          <p className="text-blue-100 text-sm mt-1">
            Academic Grade Planning Tool - v1
          </p>
        </div>
      </header>
      <Wizard />
    </div>
  );
}

export default App;
