import React, { useState, useEffect, useCallback } from 'react'
// import './assets/main.css'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// import './App.css'

import ChatApp from './components/ChatApp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatApp/>
    </>
  )
}

export default App
