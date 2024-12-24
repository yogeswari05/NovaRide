import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("")
   
   const navigate = useNavigate();

   const [captain, setCaptain] = React.useContext(CaptainDataContext);

   const submitHandler = async (e) => {
      e.preventDefault();
      const captainData = { email: email, password: password };
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData);
      if (response.status === 200) {
         const data = response.data;
         setCaptain(data.captain);
         localStorage.setItem('token', JSON.stringify(data.token));
         
         navigate('/captain-home');
      }

      setEmail("");
      setPassword("");
   }

   return (
      <div className='p-7 h-screen flex flex-col justify-between '>
         <div className="">
            <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png' alt='Uber Logo'></img>
            <form onSubmit={(e) => submitHandler(e)}>
               <h3 className="text-lg mb-2">What's your email</h3>
               <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' placeholder='email@gmail.com' type='email' />
               <h3 className="text-lg mb-2">What's your password</h3>
               <input value={password} onChange={(e) => setPassword(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' placeholder='password' type='password' />
               <button type="submit" className='flex items-center justify-center bg-black text-white w-full py-2 rounded'>Log in</button>
            </form>
            <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link></p>
         </div>
         <div>
            <Link to='/login' className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>Sign in as User</Link>
         </div>
      </div>
   )
}

export default CaptainLogin