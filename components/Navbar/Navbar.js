'use-client'

import React,{useState} from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import SearchBar from '../SearchBar/Searchbar'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import GetStarted from '../GetStarted/GetStarted'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  // console.log("user ", user);

  const toggleGetStartedModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div className='Navbar-container'>
      <div className='LogoContainer'>
        F<span>P</span>
      </div>
      <div className='Navbar-right'>
        <SearchBar />
        {!user && (
          <Button
            btnText='Login'
            onClickFunction={toggleGetStartedModal}
          />
        )}
        {user &&
          (
            <>
              <ProfileSidebar />
            </>
          )
        }
      </div>
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <GetStarted setShowModal={setShowModal} />
            <button className='close-button' onClick={toggleGetStartedModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar