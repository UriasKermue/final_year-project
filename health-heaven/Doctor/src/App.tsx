import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Prescriptions from "./pages/Prescriptions";
import Records from "./pages/Records";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import DoctorRegistrationForm from "./pages/DoctorRegistrationForm";
import DoctorLogin from "./pages/login";
import AddBlog from "./pages/AddBlog";
import BlogList from "./pages/getBlog";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="DoctorRegistration" element={<DoctorRegistrationForm />} />
      <Route path="/" element={<DoctorLogin />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="bloglist" element={<BlogList />} />
      </Route>
    </Routes>
  );
}

export default App;
