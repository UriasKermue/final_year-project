import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setAToken, backendUrl} = useContext(AdminContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (state === "Admin") {
            const { data } = await axios.post(backendUrl + '/api/doctor/alogin', { email, password });
            console.log(data); // Log the entire response

            if (data.token) {
                // If the token exists, store it in localStorage
                localStorage.setItem('atoken', data.token);
                setAToken(data.token);
                toast.success(data.message); // Show success message
            } else {
                toast.error(data.message); // Show error message
            }
        }
    } catch (error) {
        console.error('Login failed:', error);
        toast.error("An error occurred while logging in");
    }
};


  return (
    <form
      className="min-h-[80vh] flex items-center justify-center bg-gray-50"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-4 p-8 min-w-[340px] sm:min-w-[400px] border-none rounded-xl text-gray-600 text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-blue-600">{state}</span> Login
        </p>
        {error && (
          <p className="text-red-500 text-sm font-medium w-full text-center">
            {error}
          </p>
        )}
        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Login
        </button>
         {
            state === "Admin" ? <p>
                Doctor Login ? <span className="text-blue-600 underline cursor-pointer" onClick={()=>setState('Doctor')} >Click here</span>
            </p> :
             <p>Admin Login ? <span className="text-blue-600 underline cursor-pointer" onClick={()=>setState('Admin')} >Click here</span></p>
         }
      </div>
    </form>
  );
};

export default Login;
