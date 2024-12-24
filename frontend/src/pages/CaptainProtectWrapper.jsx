import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
   const token = localStorage.getItem('token')
   const navigate = useNavigate()
   const [captain, setCaptain] = React.useContext(CaptainDataContext);
   const [ isLoading, setIsLoading ] = useState(true)

   useEffect(() => {
      if (!token) {
         navigate('/captain-login')
      }
      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(response => {
         if (response.status === 200) {
            console.log(response.data.captain);
            setCaptain(response.data.captain);
            setIsLoading(false)
         }
      }).catch((err) => { // if any error ie, token expired, logout the user
         console.log("Error in CaptainProtectWrapper: ", err);
         localStorage.removeItem('token')
         navigate('/captain-login')
      })
   }, [ token ])

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

export default CaptainProtectWrapper