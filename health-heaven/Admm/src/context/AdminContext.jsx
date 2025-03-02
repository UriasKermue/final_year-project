import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/all-doctors");
      console.log("Backend response:", data); // Log the response from backend
      if (data) {
        setDoctors(data.doctor); // Update the state with the doctor data
        console.log("Doctors fetched:", data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching doctors");
      console.error("Error fetching doctors:", error);
    }
  };
  
  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    setDoctors,
    doctors,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
