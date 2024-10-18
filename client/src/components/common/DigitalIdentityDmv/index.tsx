import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import Switcher from '../Switcher';
import Footer from '../Footer';


function DigitalIdentityDmv() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };


  const integrationsData = [
    {
      image:'/rectangle4162.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Los Angeles DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4163.png',
      logo: '/logo2_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Solem DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4164.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'San Diego DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4165.png',
      logo: '/logo4_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Milwaukee DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4166.png',
      logo: '/logo5_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Las Vegas DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4167.png',
      logo: '',
      dmv_id: '1010RTHQLA',
      name: 'Seattle DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4168.png',
      logo: '/logo2_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Portland DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4169.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Sacramento DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4162.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Los Angeles DMV',
      position: 'DMV',
      senior: "Seniortssssss"
    },
    {
      image:'/rectangle4163.png',
      logo: '/logo2_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Solem DMV',
      position: 'DMV',
      senior: "Seniortssssss"
    },
    {
      image:'/rectangle4164.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'San Diego DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4165.png',
      logo: '/logo4_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Milwaukee DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4166.png',
      logo: '/logo5_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Las Vegas DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4167.png',
      logo: '',
      dmv_id: '1010RTHQLA',
      name: 'Seattle DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4168.png',
      logo: '/logo2_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Portland DMV',
      position: 'DMV'
    },
    {
      image:'/rectangle4169.png',
      logo: '/logo1_dmv.png',
      dmv_id: '1010RTHQLA',
      name: 'Sacramento DMV',
      position: 'DMV'
    },
  ]

  useEffect(() => {
    
  },[])

  return (
    <div className="">
      <div className="flex">
        <SideBar />
        <div className="w-full p-5 !pt-0">
          <HeaderBar />
          <div className="grid grid-cols-3 w-full items-center px-4">
            <div className='flex'>
              <div className='flex items-center bg-[#4848A4] text-white w-fit px-3 py-2 rounded-tl-xl rounded-bl-xl'>
                <Switcher />
                <span className='text-xl'> Associates</span>
              </div>
              <div className='flex items-center bg-[#EBEBF5] text-white w-fit px-8 py-2 rounded-tr-xl rounded-br-xl'>
                <span className='text-xl text-[#5A6A9D]'>DMVs</span>
                <img
                      src={`/dropdown_closed.png`}
                      width={'50%'}
                      className="cursor-pointer ml-9"
                      onClick={() => {}}
                    />
              </div>
            </div>
          </div>
        
          <div className='grid grid-rows-2 grid-flow-col gap-1 p-5 overflow-x-auto overflow-y-hidden' style={{maxWidth: 'calc(100vw - 175px)'}}>
            {
              integrationsData.map((data,index) => {
                  return <div className="card min-h-[270px] col-span-1 m-2" key={index}>
                  <div className="w-full relative">
                    <img
                      src={`${data.image}`}
                      width={'100%'}
                      className="cursor-pointer"
                      onClick={() => {navigate(`/community/digital_identity_dmv/detail/${index}`)}}
                    />
                    <div className="absolute top-3 left-3">
                      <img
                        src={`${data.logo}`}
                        width={'100%'}
                      />
                    </div>
                    <div className='absolute top-4 right-3'>
                    {
                      data.senior === undefined ? 
                        <p className='bg-white py-1 px-3 rounded-2xl text-sm text-center text-[#333399]'>jhon Miller JR</p>
                      :                    
                        <p className=' bg-white py-1 px-4 rounded-2xl text-sm text-center text-[#333399]'>2005</p>
                    }
                    </div>
                    {
                      data.senior === undefined ? <></>:                    
                      <div className='absolute top-12 right-3'>
                        <p className=' bg-white py-1 px-3 rounded-2xl text-sm text-center text-[#333399]'>Senior</p>
                      </div>
                    }
                  </div>
                  <p className="text-gray-600 text-base mt-1 font-[400]">{`DMV ID: ${data.dmv_id}`}</p>
                  <p className="text-[#4848A4] text-xl font-[700]">{data.name}</p>
                  <p className="text-[#FF4876] text-xl font-[600]">{data.position}</p>
                  <div className="flex p-2 items-center">
                    <div className="flex-1 text-[#393949]">
                      <p className=" text-md mt-1">
                        {'100 Titles'}
                      </p>
                      <p className="text-md mt-1">
                        California
                      </p>
                    </div>
                    <div>
                      <div>
                        <button
                          className="bg-[#FF7095] w-full h-5000 text-center text-white font-bold py-3 px-2 rounded inline-flex items-center"
                          style={{ borderRadius: 8 }}
                        >
                          <span className="mr-2 text-md"> 35 Pending</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalIdentityDmv;
