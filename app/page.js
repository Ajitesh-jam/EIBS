'use client'
import React from 'react'
import Homepage from '@/components/HomePage/Homepage'
import { LoginProvider } from '@/contexts/loginContext'
import Preloader from '@/components/Preloader/Preloader'


const App = () => {
  return (
    <LoginProvider>
      <Preloader />
      <Homepage/>
    </LoginProvider>
  )
}

export default App;