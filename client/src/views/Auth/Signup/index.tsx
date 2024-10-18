import React from 'react';
import './index.view.css';
import AuthBG from 'components/common/AuthBg'
import SignupCard from 'components/common/SignupCard'

function Signup() {
  return (
    <>
      <div className='bg-white h-screen w-screen relative flex justify-center items-center'>
        <AuthBG />
        <SignupCard />
      </div>
    </>
  );
}

export default Signup;
