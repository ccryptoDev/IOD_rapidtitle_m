import React from 'react';
import './index.view.css';
import LoginBg from 'components/common/AuthBg'
import VerifyCard from 'components/common/EmailVerifyCard'

function Login() {
  return (
    <>
      <div className='bg-white h-screen w-screen relative flex justify-center items-center'>
        <LoginBg />
        <VerifyCard />
      </div>
    </>
  );
}

export default Login;
