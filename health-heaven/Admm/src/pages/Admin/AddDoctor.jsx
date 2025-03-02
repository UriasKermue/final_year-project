import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');

  const {backendUrl, aToken} = useContext(AdminContext);

  const handleImageUpload = (e) => {
    setDoctorImage(e.target.files[0]);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        if(!doctorImage){
            toast.error('Please upload a doctor image');
        }
        const formData = new FormData();
        formData.append('doctorImage', doctorImage);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('experience', experience);
        formData.append('fees',Number(fees));
        formData.append('speciality', speciality);
        formData.append('education', education);
        formData.append('address', address);
         formData.forEach((value, key) => {
             console.log(`${key}: ${value}`);
         })
       const {data}= await axios.post(backendUrl+ '/api/doctor/aadd-doctor',formData, { headers:{aToken}})  
        if(data.success){
            toast.success(data.message);
            setName('');
            setEmail('');
            setPassword('');
            setExperience('');
            setFees('');
            setSpeciality('');
            setEducation('');
            setAddress('');
            setDoctorImage(false);
            console.log(data);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
        
    }
    // Add your submission logic here
  };

  return (
    <form className="m-5 w-full" onSubmit={handleSubmit}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-3">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-200 rounded-full cursor-pointer  "
              src={ doctorImage ? URL.createObjectURL(doctorImage) : assets.upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={handleImageUpload}
          />
          <p>Upload Doctor Image</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 items-start text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Your Name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {/* <div>
          <p className="mt-4 mb-2">About</p>
          <textarea
            className="w-full px-12 pt-2 border rounded"
            placeholder="About"
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div> */}
        <button
          type="submit"
          className="bg-blue-600 px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
