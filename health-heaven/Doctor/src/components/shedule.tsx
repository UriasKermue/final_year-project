import { useState } from "react";

const API_URL = "http://localhost:5000/api/doctor";

export default function Schedule() {
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [lunchBreak, setLunchBreak] = useState<string>("12:30-1:00");
  const [loading, setLoading] = useState<boolean>(false);

  const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const lunchBreakOptions = ["12:00-12:30", "12:30-1:00", "1:00-1:30"];

  /** ✅ Update Availability */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated.");

      const requestBody = { workingDays, startTime, endTime, lunchBreak };

      const response = await fetch(`${API_URL}/update-availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      if (!response.ok) throw new Error(JSON.parse(responseText).message || "Failed to update availability");

      alert("Availability updated successfully!");
    } catch (error: any) {
      console.error("❌ Error updating availability:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Working Days */}
        <div>
          <label className="block text-gray-700 font-medium">Working Days:</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {availableDays.map((day) => (
              <button
                key={day}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm ${
                  workingDays.includes(day) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() =>
                  setWorkingDays((prev) =>
                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                  )
                }
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              required
            />
          </div>
        </div>

        {/* Lunch Break */}
        <div>
          <label className="block text-gray-700 font-medium">Lunch Break:</label>
          <select
            value={lunchBreak}
            onChange={(e) => setLunchBreak(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            {lunchBreakOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Availability"}
        </button>
      </form>
    </div>
  );
}
