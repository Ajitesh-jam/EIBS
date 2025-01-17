'use client'
import React,{useState} from 'react'
import GetStarted from '@/components/GetStarted/GetStarted'

const page = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleGetStartedModal = () => {
    setShowModal(!showModal);
  }
  
  const handleLogin = () => {
    console.log("logging in");
  }

  return (
    <>
    {showModal && (
      <div className='modal-overlay'>
          <div className='modal-content'>
              <GetStarted handleLogin={handleLogin} setShowModal={setShowModal}/>
              <button className='close-button' onClick={toggleGetStartedModal}>
                  X
              </button>
          </div>
      </div>
  )}
    <div className='container'>
      <button onClick={toggleGetStartedModal}>Get Started</button>
    </div>
  </>
  )
}

export default page