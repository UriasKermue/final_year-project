import React, { useState, useEffect } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import axios from "axios";
import "./DiseasePrediction.css"; // Ensure this file exists and has appropriate styles

const DiseasePrediction = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInputs, setUserInputs] = useState({});
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch symptoms from the backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get("http://localhost:50001/symptoms");
        setSymptoms(response.data);
        setFilteredSymptoms(response.data.slice(0, 9)); // Show the first 9 symptoms by default
      } catch (err) {
        console.error("Error fetching symptoms:", err);
        setError("Failed to fetch symptoms. Please try again later.");
      }
    };
    fetchSymptoms();
  }, []);

  // Update filtered symptoms based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSymptoms(symptoms.slice(0, 9)); // Show default symptoms when search is empty
    } else {
      const matchedSymptoms = symptoms.filter((symptom) =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymptoms(matchedSymptoms.slice(0, 9)); // Limit to 9 results
    }
  }, [searchTerm, symptoms]);

  // Handle checkbox input changes
  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setUserInputs({ ...userInputs, [name]: checked ? 1 : 0 });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction("");
    setConfidence(null);

    try {
      const response = await axios.post(
        "http://localhost:50001/predict",
        userInputs
      );
      setPrediction(response.data.disease);
      setConfidence(response.data.confidence);

      // Reset the userInputs state after a successful prediction
      setUserInputs({});
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("An error occurred while fetching the prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h1 className="title">
        <MdHealthAndSafety size={32} className="icon" /> Disease Prediction
      </h1>
      <p className="subtitle">Select your symptoms to predict the disease.</p>

      {/* Search for symptoms */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Render symptoms dynamically */}
      {error && <p className="error-message">{error}</p>}
      {symptoms.length > 0 ? (
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="symptoms-grid">
            {filteredSymptoms.map((symptom, index) => (
              <div key={index} className="form-group">
                <label htmlFor={symptom} className="styled-label">
                  <input
                    type="checkbox"
                    id={symptom}
                    name={symptom}
                    className="styled-radio"
                    onChange={handleInputChange}
                    checked={!!userInputs[symptom]} // Reflect state
                    disabled={loading} // Disable during loading
                  />
                  {symptom.replace("_", " ")}
                </label>
              </div>
            ))}
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
      ) : (
        <p>Loading symptoms...</p>
      )}

      {/* Display prediction result */}
      {prediction && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <p>Disease: {prediction}</p>
          {confidence && <p>Confidence: {confidence.toFixed(2)}%</p>}
        </div>
      )}
    </div>
  );
};

export default DiseasePrediction;
