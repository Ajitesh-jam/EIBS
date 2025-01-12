'use client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import { useLogin } from '@/contexts/loginContext'
import { useEffect } from 'react';
import SearchBar from '../SearchBar/Searchbar'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'


const Navbar = ({toggleGetStartedModal, publicAddress}) => {
  const {isLoggedIn} = useLogin();

  useEffect(() => {
    console.log(`Log in status : ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <div className='Navbar-container'>
      <div className='LogoContainer'>
        F<span>P</span>
      </div>
      <div className='Navbar-right'>
      <SearchBar/>
      {!isLoggedIn ? (
         <Button
         btnText='Login'
         onClickFunction={toggleGetStartedModal}/>
      ) : 
      (
        <ProfileSidebar publicAddress={publicAddress}/>
      )
      }
      </div>
      
    </div>
  )
}

export default Navbar