import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
//@ts-ignore
import GoogleMapReact from 'google-map-react';

function DigitalIdentityDmvDetail() {

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 20
  };

  useEffect(() => {
    
  },[])

  return (
    <div className="">
      <div className="flex">
        <SideBar />
        <div className="w-full p-5 !pt-0">
          <HeaderBar />
          <div className="grid grid-cols-3 w-full items-center px-4">
            <div className="flex col-span-3 w-full px-4 py-12 justify-center items-center">
              <div className='store-card text-white  justify-center pt-2 rounded-tl-xl rounded-bl-xl !w-[1176px] relative'>
              <div style={{ height: '265px', width: '330px' }} className='absolute right-0 top-0'>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={{
                      fullscreenControl: false,
                      disableDefaultUI:true,
                      // mapTypeId: 'ROADMAP'
                    }}
                  >
                  </GoogleMapReact>
              </div>
                <div className='px-3 py-2'>
                  <span className='text-3xl text-[#333399]'> <span className='text-[#FF3366]'> &larr;</span> Digital DMV Identity</span>
                </div>
                <div className='grid grid-cols-3'>
                  <div className='w-full relative'>
                    <img src='/rectangle4162_full.png' className='col-span-1'></img>
                    <div className="absolute top-3 left-3">
                      <img
                        src={'/ca_dmv_x113.svg'}
                        width={'100%'}
                      />
                    </div>
                  </div>
                  <div className='col-span-2 pl-5'>
                    <div className='text-black'>
                      <p className='text-[#4848A4] text-3xl font-[700]'>Los Angels DMV</p>
                      <p className='text-gray-600'>DMV</p>
                      <p className='text-xl font-bold'>Senior SalesPerson</p>
                      <p className='text-xl'>Location: California</p>
                      <p className='flex text-xl'>Years with RapidTitle: 5</p>
                    </div>
                    <div className='grid grid-cols-6 mt-[60px]'>
                        <div className='col-span-4 grid grid-cols-4 mb-5'>
                            <div className='col-span-4 flex p-[10px]'>
                              <button
                                className="bg-[#FF3366] text-white font-bold flex justify-center py-2 px-2 ml-2 rounded items-center"
                                style={{ borderRadius: 4 }}
                              >
                                <span className="mr-2">Pending</span>
                                <svg
                                  width="14"
                                  height="9"
                                  viewBox="0 0 14 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ transform: 'rotate(180deg)' }}
                                >
                                  <path
                                    d="M1.16732 7.5L7.00065 1.66667L12.834 7.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              <button className=" text-[#FF3366] font-bold py-2 px-4 ml-2 rounded inline-flex items-center">
                                <span className="mr-2">See All</span>
                              </button>
                            </div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                            <div className='cursor-pointer'><img src='/car.png'></img></div>
                        </div>
                        <div className='col-span-2 bg-[#FF7095] p-5 relative'>
                              <p className='flex p-2'><img src='/plus_icon.png'></img> <span className='ml-2'>Assign to a Title</span></p>
                              <p className='flex p-2'><img src='/minus_icon.png'></img> <span className='ml-2'>Release from Title</span></p>
                              <hr></hr>
                              <p className='flex p-2'><img src='/file_icon.png'></img> <span className='ml-2'>Completed Titles</span></p>
                              <p className='flex p-2'><img src='/close_icon.png'></img> <span className='ml-2'>Pending Titles</span></p>
                              <p className='flex p-2'><img src='/message_icon.png'></img> <span className='ml-2'>Comments on Titles</span></p>
                              <div className='absolute bottom-5'>
                                <p className='flex p-2'><img src='/profile.png'></img> <span className='ml-2'>Basic Information</span></p>
                                <div className='flex bg-[#FFED49] text-black p-5 rounded-lg items-center'>
                                    <span className='mr-2'>Share Profile</span>
                                    <img src='/share.png' style={{width:17,height:19}}></img>
                                </div>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalIdentityDmvDetail;
