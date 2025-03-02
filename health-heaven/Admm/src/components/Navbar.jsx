import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {aToken , setAToken }=  useContext(AdminContext)
    const naviagte = useNavigate()

    const logout =()=>{
       naviagte('/')
       aToken && setAToken('')
       aToken && localStorage.removeItem('atoken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white' >
      <div className='flex items-center gap-2 text-xs ' >
        <img src="" alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500' >{aToken ? 'Admin' :  '' }Admin</p>
    
      </div>
      <button onClick={logout} className='bg-blue-600 text-white px-10 py-2 rounded-full' >Logout</button>
    </div>
  )
}

export default Navbar