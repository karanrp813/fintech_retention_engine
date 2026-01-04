import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    CreditScore: 600,
    Geography: "Germany",
    Gender: "Male",
    Age: 40,
    Tenure: 3,
    Balance: 60000,
    NumOfProducts: 2,
    HasCrCard: 1,
    IsActiveMember: 1,
    EstimatedSalary: 50000
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error: Is your Python backend running? (uvicorn src.api:app --reload)");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-5xl flex flex-col lg:flex-row gap-10">
        
        {/* LEFT SIDE: INPUT FORM */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Retention Engine
            </h1>
            <p className="text-gray-400 text-sm">Fintech Risk Analysis Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Credit Score" name="CreditScore" type="number" val={formData.CreditScore} onChange={handleChange} />
              <InputGroup label="Age" name="Age" type="number" val={formData.Age} onChange={handleChange} />
              <SelectGroup label="Geography" name="Geography" val={formData.Geography} options={["France", "Germany", "Spain"]} onChange={handleChange} />
              <SelectGroup label="Gender" name="Gender" val={formData.Gender} options={["Male", "Female"]} onChange={handleChange} />
            </div>

            <div className="glass-card p-4 rounded-xl">
               <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-gray-400 uppercase font-bold">Account Balance</label>
                  <span className="text-blue-400 font-mono">${formData.Balance}</span>
               </div>
               <input type="range" name="Balance" min="0" max="250000" value={formData.Balance} onChange={handleChange} className="w-full accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Toggle label="Active Member" name="IsActiveMember" checked={formData.IsActiveMember} onChange={handleChange} />
               <Toggle label="Credit Card" name="HasCrCard" checked={formData.HasCrCard} onChange={handleChange} />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? "Analyzing..." : "Calculate Risk"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: RESULTS */}
        <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 flex flex-col justify-center">
          {!result ? (
            <div className="text-center text-gray-500 space-y-4">
              <div className="text-6xl animate-pulse">📊</div>
              <p>Enter customer parameters to generate AI prediction.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Prediction</p>
                <h2 className={`text-6xl font-bold ${result.prediction === "Churn" ? "text-red-400" : "text-emerald-400"} drop-shadow-2xl`}>
                  {result.prediction}
                </h2>
              </div>

              <div className="glass-card rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300">Confidence Score</span>
                  <span className="font-mono text-xl">{(result.probability * 100).toFixed(1)}%</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 uppercase font-bold">Recommended Action</span>
                  <p className="text-sm leading-relaxed text-gray-200">
                    {result.prediction === "Churn" 
                      ? "⚠️ High Risk: Customer requires immediate intervention. Recommend offering a 12-month loyalty bonus or waiving upcoming fees."
                      : "✅ Low Risk: Customer is stable. Good candidate for cross-selling premium investment products."
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// Reusable Components
const InputGroup = ({ label, name, type, val, onChange }) => (
  <div>
    <label className="block text-xs text-gray-400 mb-1.5 ml-1">{label}</label>
    <input 
      type={type} name={name} value={val} onChange={onChange}
      className="w-full rounded-lg p-2.5 transition-all text-sm"
    />
  </div>
)

const SelectGroup = ({ label, name, val, options, onChange }) => (
  <div>
    <label className="block text-xs text-gray-400 mb-1.5 ml-1">{label}</label>
    <select name={name} value={val} onChange={onChange} className="w-full rounded-lg p-2.5 transition-all text-sm">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
)

const Toggle = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer glass-card px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
    </div>
    <input type="checkbox" name={name} checked={checked === 1} onChange={onChange} className="hidden" />
    <span className="text-sm font-medium text-gray-300 select-none">{label}</span>
  </label>
)