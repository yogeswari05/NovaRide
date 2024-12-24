import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'


const CaptainSignUp = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [vehicleColor, setVehicleColor] = useState("")
   const [vehiclePlate, setVehiclePlate] = useState("")
   const [vehicleCapacity, setVehicleCapacity] = useState("")
   const [vehicleType, setVehicleType] = useState("")
   const navigate = useNavigate();

   const [captain, setCaptain] = React.useState(CaptainDataContext);

   const submitHandler = async (e) => {
      e.preventDefault();
      const newCaptain = {
         fullname: {
            firstname: firstName,
            lastname: lastName
         },
         email: email,
         password: password,
         vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
         }
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain);
      if (response.status === 201) {
         const data = response.data;
         setCaptain(data.captain);
         localStorage.setItem('token', JSON.stringify(data.token));
         navigate('/CaptainHome');
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
   }

   return (
      <div className='p-7 h-screen flex flex-col justify-between '>
         <div>
            <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png' alt='Uber Logo'></img>
            <form onSubmit={(e) => { submitHandler(e) }}>
               <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
               <div className='flex gap-4 mb-7'> <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base' type="text" placeholder='First name' value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                  <input required className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastName} onChange={(e) => {   setLastName(e.target.value)}}/>
               </div>

               <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
               <input required value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com'/>

               <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
               <input className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' value={password} onChange={(e) => { setPassword(e.target.value) }} required type="password" placeholder='password' />

               <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
               <div className='flex gap-4 mb-7'>
                  <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => {    setVehicleColor(e.target.value) }} />
                  <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => {    setVehiclePlate(e.target.value) }} />
               </div>
               <div className='flex gap-4 mb-7'> <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' type="number" placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => {    setVehicleCapacity(e.target.value) }} />
                  <select required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base' value={vehicleType} onChange={(e) => {    setVehicleType(e.target.value) }} >
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                  </select>
               </div>
               <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
            </form>
            <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Log in here</Link></p>
         </div>
         <div>
            <p className='text-xs leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS
               messages, including by automated means, from Uber and
               its affiliates to the number provided.
            </p>
         </div>
      </div>
   )
}

export default CaptainSignUp