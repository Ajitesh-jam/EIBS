'use client'
import React from 'react'
import Homepage from '@/components/HomePage/Homepage'
import { LoginProvider } from '@/contexts/loginContext'

const App = () => {
  return (
    <LoginProvider>
      <Homepage/>
    </LoginProvider>
  )
}

export default App;