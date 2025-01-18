'use-client'

import React from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import SearchBar from '../SearchBar/Searchbar'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'

const Navbar = ({toggleGetStartedModal}) => {
 
  const [user ,loading ,error] = useAuthState(auth);
  console.log("user ", user);
 

  return (
    <div className='Navbar-container'>
      <div className='LogoContainer'>
        F<span>P</span>
      </div>
      <div className='Navbar-right'>
      <SearchBar/>
      {!user  && (
         <Button
         btnText='Login'
         onClickFunction={toggleGetStartedModal}
         />
      ) }
      {user && 
      (
        <>
        <ProfileSidebar  /> 
         </>
      )
    }
      
      </div>
      
    </div>
  )
}

export default Navbar