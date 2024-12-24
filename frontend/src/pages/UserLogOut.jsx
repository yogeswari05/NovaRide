import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogOut = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("Token in UserLogOut: ", token); // Debugging log

      const logout = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            });
            if (response.status === 200) {
               localStorage.removeItem('token');
               console.log("removed token");
               navigate('/login');
            }
         } catch (error) {
            console.error("Error during logout: ", error); // Debugging log
         }
      };
      logout();
   }, [navigate]);

   return (
      <div>UserLogOut</div>
   )
}

export default UserLogOut