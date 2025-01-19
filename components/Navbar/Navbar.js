'use client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import { useLogin } from '@/contexts/loginContext'
import { useEffect } from 'react';


const Navbar = ({toggleGetStartedModal,onLoginClick, onSearch}) => {
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    console.log(`Log in status : ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <div className='Navbar-container'>
      <div className="logo-container">
        <p>LOGO</p>
      </div>
  
      {!isLoggedIn ? (
         <Button
         btnText='Login'
         onClickFunction={toggleGetStartedModal}/>
      ) : 
      <Button 
      btnText='Profile'
      onClickFunction={openProfile}/>
      }
    </div>
  )
}

export default Navbar