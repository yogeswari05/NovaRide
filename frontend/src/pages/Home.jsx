import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div>
         <div className="bg-cover bg-center flex pt-8 justify-between flex-col h-screen w-full" style={{ backgroundImage: `url('../getStarted.jpg')` }}>
            <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png' alt='Uber Logo'></img>
            <div className='bg-white pb-4 px-4 py-4'>
               <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
               <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white p-1 pb-2 rounded mt-2'>Continue</Link>
            </div>
         </div>
      </div>
   )
}

export default Home