import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';


const DoctorsList = () => {
  const { doctors, getAllDoctors, backendUrl } = useContext(AdminContext);

  // Fetch doctors on component mount
  useEffect(() => {
    getAllDoctors();
    console.log("Doctors:", doctors);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            {/* Doctor Image */}
            <div className="relative w-full h-56 bg-gray-200 flex items-center justify-center">
            <img
                  src={`${backendUrl}/${item.doctorImage.replace(/\\/g, '/')}`}
                  alt={item.name}
                  className="object-cover w-full h-full"
              
                />
            </div>
            {/* Doctor Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name.trim()}</h2>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              <p className="mt-2 text-sm text-gray-500">Email: {item.email.trim()}</p>
              <p className="text-sm text-gray-500">Education: {item.education}</p>
              <p className="text-sm text-gray-500">Experience: {item.experience} years</p>
              <p className="text-sm text-gray-500">Fees: {item.fees} INR</p>
              <p className="text-sm text-gray-500">Address: {item.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

