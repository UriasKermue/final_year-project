import React, { useState, useEffect } from "react";
import { Search, Activity, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

function DiseasePrediction() {
  const [symptoms, setSymptoms] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInputs, setUserInputs] = useState({});
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchingSymptoms, setFetchingSymptoms] = useState(true);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get("http://localhost:50001/symptoms");
        setSymptoms(response.data);
        setFilteredSymptoms(response.data.slice(0, 9));
      } catch (err) {
        setError("Failed to fetch symptoms. Please try again later.");
      } finally {
        setFetchingSymptoms(false);
      }
    };
    fetchSymptoms();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSymptoms(symptoms.slice(0, 9));
    } else {
      const matchedSymptoms = symptoms.filter((symptom) =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymptoms(matchedSymptoms.slice(0, 9));
    }
  }, [searchTerm, symptoms]);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setUserInputs((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(userInputs).filter(Boolean).length === 0) {
      setError("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction("");
    setConfidence(null);

    try {
      const response = await axios.post("http://localhost:50001/predict", userInputs);
      setPrediction(response.data.disease);
      setConfidence(response.data.confidence);
      setUserInputs({});
    } catch (err) {
      setError("An error occurred while fetching the prediction.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserInputs({});
    setPrediction("");
    setConfidence(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <header className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Disease Prediction</h1>
          </header>
          
          <p className="text-gray-600 mb-8">
            Select your symptoms to get a preliminary disease prediction. This tool is for educational purposes only and should not replace professional medical advice.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              disabled={fetchingSymptoms}
            />
          </div>

          {fetchingSymptoms ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSymptoms.map((symptom, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${userInputs[symptom] ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-indigo-200"}
                    `}
                  >
                    <input
                      type="checkbox"
                      name={symptom}
                      checked={!!userInputs[symptom]}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      disabled={loading}
                    />
                    <span className="ml-3 text-gray-700">
                      {symptom.replace(/_/g, " ")}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium text-white
                    ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
                    transition-colors flex items-center justify-center gap-2
                  `}
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Analyzing Symptoms..." : "Predict Disease"}
                </button>
                {(prediction || error) && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          )}

          {prediction && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Predicted Disease:</span>{" "}
                  <span className="text-green-700">{prediction}</span>
                </p>
                {confidence && (
                  <p className="text-gray-700">
                    <span className="font-medium">Confidence:</span>{" "}
                    <span className="text-green-700">{confidence.toFixed(2)}%</span>
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  Note: This is a preliminary prediction. Please consult with a healthcare professional for proper diagnosis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiseasePrediction;
