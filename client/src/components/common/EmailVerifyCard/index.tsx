import React, { BaseSyntheticEvent } from 'react';
import './index.view.css';
import loginLogo from 'assets/img/verify_logo.png';
import ImageViewer from 'components/common/ImageViewer';
import { useNavigate } from 'react-router-dom';
import VerifyBox from '../VerifyBox';

function EmailVerifyCard() {
  const navigate = useNavigate();
  const handleConfirm = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('auth_token', 'test');
    navigate('/home');
  };
  return (
    <>
      <div className="max-w-[1216px] w-[calc(100vw-500px)] h-[80vh] bg-white z-10 absolute verify-card">
        <ImageViewer
          source={loginLogo}
          width={100}
          height="100%"
          className="login-logo"
        />
        <div className="logo-text text-white text-4xl leading-snug md:text-2xl">
          A 'must have' technology <br></br> service for 100% of dealers
        </div>
        <div className="w-[100%] text-center 2xl:py-[60px] md:py-[40px] 2xl:px-[100px] md:px-[80px]">
          <div className="flex items-center justify-end mb-[60px] md:mb-[20px]">
            <svg
              className="cursor-pointer"
              onClick={() => navigate('/auth/login')}
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6667 15L12.6667 22M12.6667 22L19.6667 29M12.6667 22H31.3333M43 22C43 10.402 33.598 1 22 1C10.402 1 1 10.402 1 22C1 33.598 10.402 43 22 43C33.598 43 43 33.598 43 22Z"
                stroke="#4848A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2">Back to Login</span>
          </div>
          <h1 className="2xl:text-5xl xl:text-3xl md:text-9xl welcome md:mb-3 2xl:mb-10">
            Please enter the Code
          </h1>
          <h1 className="xl:my-[10px] md:my-[5px] 2xl:text-3xl md:text-sm leading-10 text-left">
            Looks like you are trying to logIn from a different place as you
            always do, to verify that it is you who is trying to enter the
            account, please enter the code that has been sent to your email
            adress
          </h1>
          <h1 className="xl:my-[10px] md:my-[5px] 2xl:text-xl 2xl:mt-10 text-red-700 md:text-sm text-left">
            We sent you a code to the Will********@gmail.com email adress.
          </h1>
          <VerifyBox />
          <div className="flex items-center mt-10">
            <span className="flex-1 text-left text-blue-800 place-self-end cursor-pointer 2xl:text-[20px]">
              Resend code
            </span>
            <button
              className="bg-[#FF3366] text-white font-bold py-2 px-4 rounded 2xl:text-[20px]"
              onClick={handleConfirm}
            >
              continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerifyCard;
