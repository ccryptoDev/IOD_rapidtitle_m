import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import loginLogo from 'assets/img/signup_logo.png'
import ImageViewer from 'components/common/ImageViewer';
import google from 'assets/img/google.png';
import facebook from 'assets/img/facebook.png';
import okta from 'assets/img/okta.png';
import { Link } from 'react-router-dom';
import { register } from 'store/actions/auth';
import { useNavigate } from 'react-router-dom';
import UserTypeDropdown from '../UserTypeDropdown';

function SignupCard() {
  const navigate = useNavigate();
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(-1);
  const [isOpen1, setIsOpen1] = useState(false);

  const getUserType = () => {
    if(userType === -1){
      return 'Select User Type';
    }
    else if(userType === 0){
      return 'Dealer';
    }
    else if(userType === 1){
      return 'Seller';
    }
    else if(userType === 2){
      return 'DMV';
    }
    else if(userType === 3){
      return 'Lender';
    }
  }
  
  const handleChange1 = () => {
    return setIsOpen1( current => !current )
  }
  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    let formData = {fname,lname,email,password,userType};
    let result = await register(formData)
    if(result === true){
      navigate('/auth/login');
    }
  }
  return (
    <>
      <div className='w-[calc(100vw-500px)] h-[80vh] bg-white z-10 absolute login-card'>
      <div className='w-[100%] text-center 2xl:py-[40px] md:py-[40px] px-[50px] 2xl:px-[100px]'>
          <h1 className='2xl:text-6xl md:text-xl welcome 2xl:font-bold'>Welcome to Rapid<span className='text-[#FF3366]'>Title</span></h1>
          <h1 className='xl:my-[10px] md:my-[10px] 2xl:my-[10px] 2xl:text-lg sm:text-sm'>Continue with</h1>
          <p className='flex justify-between xl:px-[30px] 2xl:px-[150px]'>
            <a href='/' className='flex 2xl:p-5 md:p-0'>
              <ImageViewer source={google} width={25} height={25}/>
              <span className='ml-2'>Google</span>
            </a>
            <a href='/' className='flex 2xl:p-5 md:p-0'>
              <ImageViewer source={facebook} width={25} height={25}/>
              <span className='ml-2'>Facebook</span>
            </a>
            <a href='/' className='flex 2xl:p-5 md:p-0'>
              <ImageViewer source={okta} width={25} height={25}/>
              <span className='ml-2'>Okta</span>
            </a>
          </p>
          <h1 className='xl:my-[10px] md:my-[10px] 2xl:my-[10px] 2xl:text-lg sm:text-sm'>Or Signup here</h1>
          <div className='2xl:px-[70px] '>
            <form className="2xl:mt-8 md:space-y-4 2xl:space-y-8" action="#" method="POST" onSubmit={onSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className='relative 2xl:!mb-[20px] md:!mb-[10px]'>
                  <input id="name" name="name" type="string" value={fname} onChange={e =>setFname(e.target.value)} autoComplete="name" required className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset md:text-sm 2xl:text-xl pl-5 sm:leading-6 2xl:h-[40px]" placeholder="First Name" />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.66699 4.83333C3.66699 6.67428 5.15938 8.16667 7.00033 8.16667C8.84127 8.16667 10.3337 6.67428 10.3337 4.83333C10.3337 2.99238 8.84127 1.5 7.00033 1.5C5.15938 1.5 3.66699 2.99238 3.66699 4.83333Z" fill="white"/>
                    <path d="M12.8337 16.5C12.8337 13.2783 10.222 10.6667 7.00033 10.6667C3.77866 10.6667 1.16699 13.2783 1.16699 16.5M7.00033 8.16667C5.15938 8.16667 3.66699 6.67428 3.66699 4.83333C3.66699 2.99238 5.15938 1.5 7.00033 1.5C8.84127 1.5 10.3337 2.99238 10.3337 4.83333C10.3337 6.67428 8.84127 8.16667 7.00033 8.16667Z" stroke="#7171B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  </div>
                </div>
                <div className='relative 2xl:!mb-[20px] md:!mb-[10px]'>
                  <input id="name" name="name" type="string" value={lname} onChange={e =>setLname(e.target.value)} autoComplete="name" required className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset md:text-sm 2xl:text-xl pl-5 sm:leading-6 2xl:h-[40px]" placeholder="Last Name" />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.66699 4.83333C3.66699 6.67428 5.15938 8.16667 7.00033 8.16667C8.84127 8.16667 10.3337 6.67428 10.3337 4.83333C10.3337 2.99238 8.84127 1.5 7.00033 1.5C5.15938 1.5 3.66699 2.99238 3.66699 4.83333Z" fill="white"/>
                    <path d="M12.8337 16.5C12.8337 13.2783 10.222 10.6667 7.00033 10.6667C3.77866 10.6667 1.16699 13.2783 1.16699 16.5M7.00033 8.16667C5.15938 8.16667 3.66699 6.67428 3.66699 4.83333C3.66699 2.99238 5.15938 1.5 7.00033 1.5C8.84127 1.5 10.3337 2.99238 10.3337 4.83333C10.3337 6.67428 8.84127 8.16667 7.00033 8.16667Z" stroke="#7171B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  </div>
                </div>
                <div className='relative 2xl:!mb-[20px] md:!mb-[10px]'>
                  <input id="email-address" name="email" type="email" required value={email} onChange={ e=> setEmail(e.target.value) } className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset md:text-sm 2xl:text-xl pl-5 sm:leading-6 2xl:h-[40px]" placeholder="Email address" />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.15137 6.83352V13.1668C3.15137 14.1003 3.15137 14.5667 3.33302 14.9233C3.49281 15.2369 3.74759 15.4921 4.0612 15.6519C4.41737 15.8334 4.88386 15.8334 5.81546 15.8334H15.4873C16.4189 15.8334 16.8847 15.8334 17.2409 15.6519C17.5545 15.4921 17.8101 15.2369 17.9699 14.9233C18.1514 14.5671 18.1514 14.1013 18.1514 13.1697V6.83078C18.1514 5.89918 18.1514 5.43269 17.9699 5.07652C17.8101 4.76291 17.5545 4.50813 17.2409 4.34834C16.8843 4.16669 16.4183 4.16669 15.4849 4.16669H5.8182C4.88478 4.16669 4.41772 4.16669 4.0612 4.34834C3.74759 4.50813 3.49281 4.76291 3.33302 5.07652C3.15137 5.43304 3.15137 5.9001 3.15137 6.83352Z" fill="white"/>
                      <path d="M4.40137 5.41669L9.0744 8.84358L9.07609 8.84498C9.64124 9.25942 9.92398 9.46677 10.2337 9.54687C10.5074 9.61766 10.7951 9.61766 11.0688 9.54687C11.3788 9.4667 11.6624 9.25875 12.2285 8.84358L16.9015 5.41669M3.15137 13.1668V6.83352C3.15137 5.9001 3.15137 5.43304 3.33302 5.07652C3.49281 4.76291 3.74759 4.50813 4.0612 4.34834C4.41772 4.16669 4.88478 4.16669 5.8182 4.16669H15.4849C16.4183 4.16669 16.8843 4.16669 17.2409 4.34834C17.5545 4.50813 17.8101 4.76291 17.9699 5.07652C18.1514 5.43269 18.1514 5.89918 18.1514 6.83078V13.1697C18.1514 14.1013 18.1514 14.5671 17.9699 14.9233C17.8101 15.2369 17.5545 15.4921 17.2409 15.6519C16.8847 15.8334 16.4189 15.8334 15.4873 15.8334H5.81546C4.88386 15.8334 4.41737 15.8334 4.0612 15.6519C3.74759 15.4921 3.49281 15.2369 3.33302 14.9233C3.15137 14.5667 3.15137 14.1003 3.15137 13.1668Z" stroke="#7171B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className='relative 2xl:!mb-[20px] md:!mb-[10px]'>
                  <input id="password" name="password" type="password" value={password} onChange={e=> setPassword(e.target.value)} required className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset md:text-sm sm:leading-6 2xl:text-xl pl-5 2xl:h-[40px]" placeholder="Password" />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.98438 14.8335V10.1668C3.98438 9.23341 3.98438 8.76635 4.16603 8.40983C4.32582 8.09623 4.5806 7.84144 4.89421 7.68166C5.25073 7.5 5.71778 7.5 6.6512 7.5H8.3431C8.23689 7.5 8.15104 7.4139 8.15104 7.30769V5C8.15104 3.61929 9.27033 2.5 10.651 2.5C12.0318 2.5 13.151 3.61929 13.151 5V7.30769C13.151 7.4139 13.0647 7.5 12.9585 7.5H14.6512C15.5846 7.5 16.0507 7.5 16.4072 7.68166C16.7208 7.84144 16.9764 8.09623 17.1362 8.40983C17.3177 8.766 17.3177 9.23249 17.3177 10.1641V14.8363C17.3177 15.7679 17.3177 16.2337 17.1362 16.5899C16.9764 16.9035 16.7208 17.1587 16.4072 17.3185C16.051 17.5 15.5852 17.5 14.6536 17.5H6.64849C5.71689 17.5 5.25038 17.5 4.89421 17.3185C4.5806 17.1587 4.32582 16.9035 4.16603 16.5899C3.98438 16.2334 3.98438 15.7669 3.98438 14.8335Z" fill="white"/>
                      <path d="M8.3431 7.5H6.6512C5.71778 7.5 5.25073 7.5 4.89421 7.68166C4.5806 7.84144 4.32582 8.09623 4.16603 8.40983C3.98438 8.76635 3.98438 9.23341 3.98438 10.1668V14.8335C3.98438 15.7669 3.98438 16.2334 4.16603 16.5899C4.32582 16.9035 4.5806 17.1587 4.89421 17.3185C5.25038 17.5 5.71689 17.5 6.64849 17.5H14.6536C15.5852 17.5 16.051 17.5 16.4072 17.3185C16.7208 17.1587 16.9764 16.9035 17.1362 16.5899C17.3177 16.2337 17.3177 15.7679 17.3177 14.8363V10.1641C17.3177 9.23249 17.3177 8.766 17.1362 8.40983C16.9764 8.09623 16.7208 7.84144 16.4072 7.68166C16.0507 7.5 15.5846 7.5 14.6512 7.5H12.9585M8.3431 7.5H12.9585M8.3431 7.5C8.23689 7.5 8.15104 7.4139 8.15104 7.30769V5C8.15104 3.61929 9.27033 2.5 10.651 2.5C12.0318 2.5 13.151 3.61929 13.151 5V7.30769C13.151 7.4139 13.0647 7.5 12.9585 7.5" stroke="#7171B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className='relative flex'>
                  {
                    !isOpen1 && (
                      <div className="flex items-center p-[10px] cursor-pointer bg-[#FF3366] w-[537px] rounded-lg" onClick={() => handleChange1()}>
                          <h3 className="px-2 flex-1 text-white" style={{ fontSize: '20px', fontWeight: 600 }}>{getUserType()}</h3>
                          <img className="pe-4" src="../arrow-right.png" alt="" />
                      </div>
                    )
                  }
                  {
                    isOpen1 && (
                      <div className="flex items-center p-[10px] cursor-pointer bg-[#FF3366] w-[537px] rounded-lg" onClick={() => handleChange1()}>
                          <h3 className="px-2 flex-1 text-white" style={{ fontSize: '20px', fontWeight: 600 }}>{getUserType()}</h3>
                          <img className="pe-4" src="../arrow-right.png" alt="" />
                      </div>
                    )
                  }
                  {isOpen1 && (
                      <UserTypeDropdown type={userType} setType={setUserType} close={handleChange1}/>
                  )}
                </div>
              </div>

              <div className='flex justify-center'>
                <button type="submit" className="group relative flex 2xl:w-[108px] 2xl:h-[45px] justify-center items-center rounded-md bg-indigo-600 py-2 px-3 2xl:text-2xl md:sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Signup
                </button>
              </div>
              <div className='flex justify-center'>
                <div className="2xl:text-2xl sm:text-sm flex">
                  <p className='2xl:text-2xl text-gray-500 2xl:mt-0'> Already have an account? </p> 
                  <Link to="/auth/login" className="font-medium text-[#FF3366] hover:text-red-500 ml-[20px]">Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ImageViewer source={loginLogo} width={100} height="100%" className='login-logo'/>
      </div>
    </>
  );
}

export default SignupCard;
