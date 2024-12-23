import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from './context/userContext'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <UserContext>
         <Router>
            <App />
         </Router>
      </UserContext>
   </StrictMode>,
)
