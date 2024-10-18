import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import Switcher from '../Switcher';
import Footer from '../Footer';

function Integrations() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const integrationsData = [
    {
      logo: '/ca_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/adot_x70.png',
      name: 'Department of Transportation',
      location: 'State of Arizona',
    },
    {
      logo: '/va_dmv_x90.png',
      name: 'Department of Motor Vehicles',
      location: 'State of West Virginia',
    },
    {
      logo: '/ncdot_x70.png',
      name: 'Department of Transportation',
      location: 'State of North Carolina',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/adot_x70.png',
      name: 'Department of Transportation',
      location: 'State of Arizona',
    },
    {
      logo: '/va_dmv_x90.png',
      name: 'Department of Motor Vehicles',
      location: 'State of West Virginia',
    },
    {
      logo: '/ncdot_x70.png',
      name: 'Department of Transportation',
      location: 'State of North Carolina',
    },
    {
      logo: '/texas_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of Texas',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Highway S. & Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Highway S. & Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/texas_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of Texas',
    },
    {
      logo: '/va_dmv_x90.png',
      name: 'Department of Motor Vehicles',
      location: 'State of West Virginia',
    },
    {
      logo: '/adot_x70.png',
      name: 'Department of Transportation',
      location: 'State of Arizona',
    },
    {
      logo: '/va_dmv_x90.png',
      name: 'Department of Motor Vehicles',
      location: 'State of West Virginia',
    },
    {
      logo: '/ncdot_x70.png',
      name: 'Department of Transportation',
      location: 'State of North Carolina',
    },
    {
      logo: '/texas_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of Texas',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Highway S. & Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Highway S. & Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/texas_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of Texas',
    },
    {
      logo: '/va_dmv_x90.png',
      name: 'Department of Motor Vehicles',
      location: 'State of West Virginia',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/ca_dmv_x70.png',
      name: 'Highway S. & Motor Vehicles',
      location: 'State of California',
    },
    {
      logo: '/texas_dmv_x70.png',
      name: 'Department of Motor Vehicles',
      location: 'State of Texas',
    },
  ]

  useEffect(() => {
    
  },[])

  return (
    <>
      <div className="px-[24px]">
        <div className="flex">
          <SideBar />
          <div className="w-full p-5">
            <HeaderBar />
            <div className="flex w-full items-center p-4">
              <div className='flex-1 flex items-center'>
                <span className='text-2xl'> Integrations</span>
                <img src='/integrations_icon.png' className='ml-3' width={24} height={24}/>
              </div>
              <button className='bg-[#FF3366] text-white py-[5px] px-[8px] rounded-md'>Active</button>
            </div>
            <div className="flex w-full items-center p-2">
                <span className='text-sm text-gray-700'> Integrations allow your RapidTitle to Connect and service with the selected Department of Motor Vehicles of Preference in the state that it is available.</span>
            </div>
            <div className='grid grid-rows-4 grid-flow-col gap-1 p-5 overflow-x-auto overflow-y-hidden' style={{maxWidth: 'calc(100vw - 175px)'}}>
              {
                integrationsData.map(data => {
                    return <div>
                              <div className='flex items-center justify-center row-span-1 w-[547px] h-[107px] rounded-md mt-3' style={{border: '1px solid #DCDCDC'}}> 
                                  <div className='mr-2'>
                                    <img src={data.logo} width={70}/>
                                  </div>
                                  <div className='mr-[38px]'>
                                    <p className='text-[#4848A4] text-xl flex'> {data.name} <img src='/dropdown_closed.png' className='cursor-pointer'/></p>
                                    <p className='text-[#9B96B6] text-md'> {data.location}</p>
                                  </div>
                                  <Switcher />
                              </div>
                            </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Integrations;
