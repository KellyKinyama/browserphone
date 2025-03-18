import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './assets/phone.css'
// import './assets/phone.light.css'
import App from './App.jsx'

createRoot(document.getElementById('Phone')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
