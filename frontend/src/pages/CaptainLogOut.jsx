import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainLogOut = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("Token in CaptainLogOut: ", token); // Debugging log

      const logout = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            });
            if (response.status === 200) {
               localStorage.removeItem('token');
               console.log("removed token");
               navigate('/captain-login');
            }
         } catch (error) {
            console.error("Error during logout: ", error); // Debugging log
         }
      };
      logout();
   }, [navigate]);

   return (
      <div>CaptainLogOut</div>
   )
}

export default CaptainLogOut