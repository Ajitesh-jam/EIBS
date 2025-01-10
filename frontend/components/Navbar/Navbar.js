'use client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import { useLogin } from '@/contexts/loginContext'
import { useEffect } from 'react';

const Navbar = ({toggleGetStartedModal}) => {
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    console.log(`Log in status : ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <div className='Navbar-container'>
      {!isLoggedIn ? (
         <Button
         btnText='Login'
         onClickFunction={toggleGetStartedModal}/>
      ) : 
      <></>
      }
    </div>
  )
}

export default Navbar