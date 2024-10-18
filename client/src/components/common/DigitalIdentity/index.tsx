import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import Switcher from '../Switcher';
import Footer from '../Footer';

function DigitalIdentity() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const integrationsData = [
    {
      image:'/user1_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user2_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user3_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user4_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user5_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user7_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user8_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user9_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user2_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user4_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user7_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user5_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
    {
      image:'/user6_full.png',
      seller_id: '1010RTHQLA',
      name: 'Lia Smith',
      position: 'Salesperson'
    },
  ]

  useEffect(() => {
    
  },[])

  return (
    <div className="px-[25px]">
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
              <div className='flex items-center w-fit px-3 py-2'>
                <span className='text-xl'> All Accociates</span>
              </div>
            </div>
            <div className="flex col-span-2 w-full items-center px-4 py-1">
              <div className='flex items-center bg-[#FF3366] text-white justify-center w-[130px] px-3 py-2 rounded-tl-xl rounded-bl-xl'>
                <span className='text-xl'> All</span>
              </div>
              <div className='flex items-center justify-center w-[130px] px-3 py-2'>
                <span className='text-xl'> Sellers</span>
              </div>
              <div className='flex items-center justify-center w-[130px] px-3 py-2'>
                <span className='text-xl'> Salesperson</span>
              </div>
              <div className='flex items-center justify-center w-[130px] px-3 py-2'>
                <span className='text-xl'> DMV's</span>
              </div>
              <div className='flex items-center justify-center w-[130px] px-3 py-2'>
                <span className='text-xl'> Lenders</span>
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
                      onClick={() => {navigate(`/community/digital_identity/detail/${index}`)}}
                    />
                    <div className="absolute top-4 right-3">
                      <p className='bg-white py-1 px-3 rounded-2xl text-sm text-center'>2015</p>
                      <p className='bg-white mt-2 py-1 px-3 rounded-2xl text-sm text-center'>Senior</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base mt-1">{`Seller ID: ${data.seller_id}`}</p>
                  <p className="text-[#4848A4] text-xl">{data.name}</p>
                  <p className="text-[#FF4876] text-xl">{data.position}</p>
                  <div className="flex p-2 items-center">
                    <div className="flex-1">
                      <p className=" text-md mt-1">
                        {' '}
                        {'250 sold'}
                      </p>
                      <p className="text-md mt-1">
                        {' '}
                        Los Angeles
                      </p>
                    </div>
                    <div>
                      <div>
                        <button
                          className="bg-[#333399] w-full text-center text-white font-bold py-1 px-2 rounded inline-flex items-center"
                          style={{ borderRadius: 4 }}
                        >
                          <span className="mr-2 text-md"> 300 Completed</span>
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

export default DigitalIdentity;
