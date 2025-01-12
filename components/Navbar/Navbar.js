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
  )
}

export default Navbar