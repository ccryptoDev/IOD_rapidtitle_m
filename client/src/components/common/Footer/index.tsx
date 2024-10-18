import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/img/avatar.png';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="absolute flex bottom-0 z-10 h-[156px] text-[#333399] items-center footer w-full px-[30px] py-[30px] uppercase">
      <div className="flex items-center">
        <span className="w-[46px] h-[46px] footer-icons flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 15.8002V4.2002C1 3.08009 1 2.51962 1.21799 2.0918C1.40973 1.71547 1.71547 1.40973 2.0918 1.21799C2.51962 1 3.08009 1 4.2002 1H15.8002C16.9203 1 17.4796 1 17.9074 1.21799C18.2837 1.40973 18.5905 1.71547 18.7822 2.0918C19 2.5192 19 3.07899 19 4.19691V15.8031C19 16.921 19 17.48 18.7822 17.9074C18.5905 18.2837 18.2837 18.5905 17.9074 18.7822C17.48 19 16.921 19 15.8031 19H15H5H4.19691C3.07899 19 2.5192 19 2.0918 18.7822C1.71547 18.5905 1.40973 18.2837 1.21799 17.9074C1 17.4796 1 16.9203 1 15.8002Z"
              fill="#D6D6EB"
            />
            <path
              d="M15 19C15 16.2386 12.7614 14 10 14C7.23858 14 5 16.2386 5 19M15 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2837 18.7822 17.9074C19 17.48 19 16.921 19 15.8031V4.19691C19 3.07899 19 2.5192 18.7822 2.0918C18.5905 1.71547 18.2837 1.40973 17.9074 1.21799C17.4796 1 16.9203 1 15.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002V15.8002C1 16.9203 1 17.4796 1.21799 17.9074C1.40973 18.2837 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H5M15 19H5M10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8C13 9.65685 11.6569 11 10 11Z"
              stroke="#4848A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="ml-[30px]">
          <h1 className="text-xl">
            {' '}
            NOT REGISTERED IN <br />
            CUSTOMER'S NAME
          </h1>
          <span className="text-5xl"> 470/2750</span>{' '}
          <span className="text-red-600"> &uarr;200%</span>
        </div>
      </div>
      <div className="flex items-center summary">
        <span className="w-[46px] h-[46px] footer-icons flex items-center justify-center">
          <svg
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 11.8002V7V5V4.2002C1.5 3.08009 1.5 2.51962 1.71799 2.0918C1.90973 1.71547 2.21547 1.40973 2.5918 1.21799C3.01962 1 3.58009 1 4.7002 1H16.3002C17.4203 1 17.9796 1 18.4074 1.21799C18.7837 1.40973 19.0905 1.71547 19.2822 2.0918C19.5 2.5192 19.5 3.07899 19.5 4.19691V5V7V11.8036C19.5 12.9215 19.5 13.4805 19.2822 13.9079C19.0905 14.2842 18.7837 14.5905 18.4074 14.7822C17.98 15 17.421 15 16.3031 15H4.69691C3.57899 15 3.0192 15 2.5918 14.7822C2.21547 14.5905 1.90973 14.2842 1.71799 13.9079C1.5 13.4801 1.5 12.9203 1.5 11.8002Z"
              fill="#D6D6EB"
            />
            <path
              d="M1.5 7V11.8002C1.5 12.9203 1.5 13.4801 1.71799 13.9079C1.90973 14.2842 2.21547 14.5905 2.5918 14.7822C3.0192 15 3.57899 15 4.69691 15H16.3031C17.421 15 17.98 15 18.4074 14.7822C18.7837 14.5905 19.0905 14.2842 19.2822 13.9079C19.5 13.4805 19.5 12.9215 19.5 11.8036V7M1.5 7V5M1.5 7H19.5M1.5 5V4.2002C1.5 3.08009 1.5 2.51962 1.71799 2.0918C1.90973 1.71547 2.21547 1.40973 2.5918 1.21799C3.01962 1 3.58009 1 4.7002 1H16.3002C17.4203 1 17.9796 1 18.4074 1.21799C18.7837 1.40973 19.0905 1.71547 19.2822 2.0918C19.5 2.5192 19.5 3.07899 19.5 4.19691V5M1.5 5H19.5M5.5 11H9.5M19.5 7V5"
              stroke="#4848A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="ml-[30px]">
          <h1 className="text-xl">
            {' '}
            Car traded has lien <br />
            that has to be paid.
          </h1>
          <span className="text-5xl"> 153/2750</span>{' '}
          <span className="text-green-600"> &darr;82%</span>
        </div>
      </div>
      <div className="flex items-center summary">
        <span className="w-[46px] h-[46px] footer-icons flex items-center justify-center">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 16L13.5 19L7.5 16L1.5 19V4L7.5 1L13.5 4L19.5 1V16Z"
              fill="#5C5CAD"
            />
            <path
              d="M13.5 4V19M13.5 4L19.5 1V16L13.5 19M13.5 4L7.5 1M13.5 19L7.5 16M7.5 16L1.5 19V4L7.5 1M7.5 16V1"
              stroke="#4848A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="ml-[30px]">
          <h1 className="text-xl">
            {' '}
            purchase has out <br />
            of state title
          </h1>
          <span className="text-5xl"> 40/750</span>{' '}
          <span className="text-green-600"> &darr;60%</span>
        </div>
      </div>
      <div className="flex items-center summary">
        <span className="w-[46px] h-[46px] footer-icons flex items-center justify-center">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 13C1.25 19.2132 6.2868 24.25 12.5 24.25C18.7132 24.25 23.75 19.2132 23.75 13C23.75 6.7868 18.7132 1.75 12.5 1.75C6.2868 1.75 1.25 6.7868 1.25 13Z"
              fill="#5C5CAD"
            />
            <path
              d="M12.5 8.56274V13.5627M12.5 24.25C6.2868 24.25 1.25 19.2132 1.25 13C1.25 6.7868 6.2868 1.75 12.5 1.75C18.7132 1.75 23.75 6.7868 23.75 13C23.75 19.2132 18.7132 24.25 12.5 24.25ZM12.5623 17.3127V17.4377L12.4377 17.4373V17.3127H12.5623Z"
              stroke="#D6D6EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="ml-[30px]">
          <h1 className="text-xl">
            {' '}
            not have title at <br />
            time of purchase
          </h1>
          <span className="text-5xl"> 640/5050</span>{' '}
          <span className="text-red-600"> &uarr;200%</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
