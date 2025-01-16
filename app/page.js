'use client'
import React from 'react'
import Homepage from '@/components/HomePage/Homepage'
import Preloader from '@/components/Preloader/Preloader'


const App = () => {
  return (
    <>
      <Preloader />
      <Homepage />
    </>

  )
}

export default App;