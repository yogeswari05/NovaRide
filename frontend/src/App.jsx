import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogOut from './pages/UserLogOut'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'

const App = () => {
   return (      
      <Routes>
         <Route path="/" element={<Start />} />
         <Route path="/signup" element={<UserSignUp />} />
         <Route path="/login" element={<UserLogin />} />
         <Route path="/home" element={
            <UserProtectWrapper>
               <Home />
            </UserProtectWrapper>
         } />
         <Route path='/user/logout' element={
            <UserProtectWrapper>
               <UserLogOut />
            </UserProtectWrapper>}
         />

         <Route path="/captain-signup" element={<CaptainSignUp />} />
         <Route path="/captain-login" element={<CaptainLogin />} />
         <Route path="/captain-home" element={
            <CaptainProtectWrapper>
               <CaptainHome />
            </CaptainProtectWrapper>
         } />
         <Route path='/captain/logout' element={
            <CaptainProtectWrapper>
               <UserLogOut />
            </CaptainProtectWrapper>}
         />
      </Routes>
   )
}

export default App