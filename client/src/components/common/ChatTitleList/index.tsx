import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate } from 'react-router-dom';
import multiIcon from 'assets/img/multi_select.svg';
import flagIcon from 'assets/img/red_flag.svg';
import CO from 'assets/img/capital_one.png';
import LA from 'assets/img/LA.png';
import Key from 'assets/img/key_icon.png'

function ChatTitleList({ data, changeRoom, socket, room_id }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    // const cb = async () => {
    //   const result: any = await getAllTitles();
    //   console.log(result);
    //   result.map((titleLink: any) => {
    //     setTimeout(async () => {
    //       let res = await axios.get(titleLink);
    //       let vehicleJson = res.data;
    //     }, 500);
    //   });
    // };
    // cb();
  }, []);

  return (
    <div>
      {
        data.map((title: any, index: any) => {
          return(
            <div className={`${room_id === title._id ? 'bg-[#FF85A3]' : 'bg-white'} flex py-[8px] pl-[5px] justify-between items-center cursor-pointer rounded-lg`} onClick={() => changeRoom(title._id, title.data.images[0], title.data.make+' - '+ title.data.plate_number)}>
              <img
                  src={title.data.images[0]}
                  width={'18%'}
                  className="rounded-lg"
                />
              <div className='ml-[3px]'>
                <div className='text-md font-bold text-[#4848A4]'> {title.data.make} - {title.data.plate_number}</div>
                <div className='text-md text-[#7171B8]'> Sure, i’ll get it done as soon...</div>
              </div>
              <div className='mr-[5px]'>
                <div className='text-sm text-[#7171B8]'>05:14 pm</div>
                <div className='float-right'><img src='/pin.png' alt='pin_img' /></div>
              </div>
            </div>
          );
        })
      }
    </div>
    // <div className="p-2 max-h-[680px] overflow-y-scroll" style={{ flex:4 }}>
    //   <div className="title-body grid grid-cols-4 p-2">
    //     {data.map((title: any, index: any) => {
    //       return (
    //         <div className="card min-h-[297px] col-span-1 m-2" key={index}>
    //           <div className="w-full relative">
    //             <img
    //               src={title.data.images[0]}
    //               width={'100%'}
    //               className="cursor-pointer"
    //               onClick={() => navigate(`/titleDetail/${17}`)}
    //             />
    //             <img
    //               src={multiIcon}
    //               className="absolute top-4 left-5 cursor-pointer"
    //             />
    //             <img
    //               src={flagIcon}
    //               className="absolute bottom-3 left-3 cursor-pointer"
    //             />
    //             <div className="absolute top-4 right-3">
    //               <img src={CO} className="cursor-pointer w-[55px] h-[22px]" />
    //               <img
    //                 src={LA}
    //                 className="cursor-pointer w-[55px] h-[22px] mt-2"
    //               />
    //             </div>
    //             <img
    //               src={'user1.png'}
    //               width={44}
    //               height={43}
    //               className="absolute right-2 bottom-[-20px]"
    //             />
    //           </div>
    //           <p className="text-gray-600 text-base mt-1">{title.data.number}</p>
    //           <p className="text-[#4848A4] text-xl">{title.data.make}</p>
    //           <div className="flex p-2 items-center">
    //             <div className="flex-1">
    //               <p className="text-[#FF4876] text-xl mt-1">
    //                 {' '}
    //                 $ {title.data.cost}
    //               </p>
    //               <p className="text-black text-base mt-1">
    //                 {' '}
    //                 {30} Days
    //               </p>
    //               <p className="text-black text-base mt-1"> {title.data.plate_number}</p>
    //             </div>
    //             <div>
    //               <div>
    //                 <button
    //                   className="bg-[#FF3366] w-full text-white font-bold py-1 px-2 rounded inline-flex items-center"
    //                   style={{ borderRadius: 4 }}
    //                 >
    //                   <span className="mr-2 text-xl"> {20} Holds</span>
    //                 </button>
    //               </div>
    //               <div className="mt-2">
    //                 <button
    //                   className="bg-[#FF5C85] justify-center w-full text-white font-bold py-2 px-3 rounded inline-flex items-center"
    //                   style={{ borderRadius: 4 }}
    //                 >
    //                   <span className="mr-2 text-xl"> {'pending'}</span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}

export default ChatTitleList;
