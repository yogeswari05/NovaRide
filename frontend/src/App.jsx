import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'

const App = () => {
   
   return (      
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/signup" element={<UserSignUp />} />
         <Route path="/login" element={<UserLogin />} />
         <Route path="/captain-signup" element={<CaptainSignUp />} />
         <Route path="/captain-login" element={<CaptainLogin />} />
      </Routes>
   )
}

export default App