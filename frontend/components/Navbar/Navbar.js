'use client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'

const Navbar = () => {
  const handleClick = () =>{
    console.log('Button Clicked')
  }  

  return (
    <div className='Navbar-container'>
        <Button
        btnText='Login'
        onClickFunction={handleClick}/>
    </div>
  )
}

export default Navbar