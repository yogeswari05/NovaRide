import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
   const token = localStorage.getItem('token');
   const navigate = useNavigate()
   const [user, setUser] = React.useContext(UserDataContext);
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (!token) {
         navigate('/login')
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(response => {
         if (response.status === 200) {
            console.log(response.data.user);
            setUser(response.data.user);
            setIsLoading(false)
         }
      }).catch((err) => { // if any error ie, token expired, logout the user
         console.log("Error in UserProtectWrapper: ", err);
         localStorage.removeItem('token')
         navigate('/login')
      })
   }, [token, navigate]); // Added navigate to dependency array

   if (isLoading) {
      return (
         <div>Loading...</div>
      )
   }

   return (
      <>
         {children}
      </>
   )
}

export default UserProtectWrapper