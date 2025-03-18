import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import Header from './Components2/Header1';
import Footer from './Components2/Footer';
import Dashboard from '../src/Pages/Dboard/Dashboard1';
import HomePage from './Pages/HomePage';
import AppointmentScheduler from './Components2/AppointmentScheduler';
import MedicationReminder from './Components2/MedicationReminder';
// import MedicalRecord from './Components2/Messenger';
import Messenger from './Components2/Messenger';
import Forgetpassword from './Pages/Forgetpassword';
import VerifyOtpPage from './Pages/Dboard/pages/VerifyOtpPage'; 
// import ResetPasswordPage from './Pages/Dboard/pagge/ResetPasswordPage';
import ResetForgetPassword from './Pages/ResetForgetPassword';
import EducationResources from './Components2/EducationResources';
import AboutPage from './Pages/AboutPage';
import SupportPage from './Pages/SupportPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DoctorList from './Pages/DoctorList';
import DiseasePrediction from './Pages/DiseasePrediction';
import Start from './Pages/Start';
import PostList from './Pages/Blog/PostList';
import PostDetail from './Pages/Blog/PostDetail';
// Chat or Messenger will be imported here
import VideoCall from './Components2/Messenger/Videocall';
import AudioCall from './Components2/Messenger/AudioCall';
const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  // Check if the current route should not display the Header and Footer
  const isNoHeaderFooterPage = ['/', '/login', '/signup', '/forgetpassword', '/verifyOtppage', '/resetforgetpassword', '/dashboard1', '/messenger', '/videocall', 'audiocall'].includes(location.pathname);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      {/* Conditionally render Header and Footer */}
      {!isNoHeaderFooterPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/verifyOtppage" element={<VerifyOtpPage />} />
          <Route path="/resetforgetpassword" element={<ResetForgetPassword />} />  
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/dashboard1" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/reminders" element={<MedicationReminder />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/doctor" element={<DoctorList />} />
          <Route path="/education" element={<EducationResources />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/predictions" element={<DiseasePrediction />} />
          {/* Blog Routes */}
  {/* <Route path="/posts" element={<PostList />} />
  <Route path="/posts/:postId" element={<PostDetail />} /> */}
  <Route path="/posts" element={<PostList />} />
  <Route path="/posts/:postId" element={<PostDetail />} />

  {/* Chat components routes come below */}
  {/* <Route path="/messenger" element={<Messenger />} /> */}
<Route path="/video-call" element={<VideoCall />} />
<Route path="/audio-call" element={<AudioCall />} />
          
        </Routes>
      </main>
      {!isNoHeaderFooterPage && <Footer />}
    </>
  );
};

export default App;
