'use client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import { useLogin } from '@/contexts/loginContext'
import { useEffect } from 'react';
import SearchBar from '../SearchBar/Searchbar'


const Navbar = ({toggleGetStartedModal,openProfile}) => {
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    console.log(`Log in status : ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <div className='Navbar-container'>
      <SearchBar/>
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