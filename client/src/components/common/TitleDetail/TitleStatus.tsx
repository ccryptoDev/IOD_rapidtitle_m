import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PersonDropdown from "../PersonDropdown";



export default function TitleStatus({ data, id }: any) {
  const [shareQR, setShareQR] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [salesperson, setSalesPerson] = useState({name:'Lia Smith',image:'Avatar12'});
  const handleClose = (index : number, param: any) => {
    if(index === 4){
      setSalesPerson(param);
      setIsOpen(false);
    }
  }
  return (
    <>
      {!shareQR && (<div className='p-[60px] rounded-xl flex w-[80%] h-[70%] m-[60px] items-center relative' style={{boxShadow: "rgba(0, 0, 0, 0.25) 1px 7px 6px 2px"}}>
        <img src='/qr_code_lg.png' width={373} height={373}/>
        <div className='ml-[21px] '>
          <p className='mb-[28px]' style={{fontSize:30}}>Hyundai Tucson</p>
          <p className='mb-[9px]' style={{fontSize:16}}>Inventory Number: K9127A</p>
          <p className='mb-[9px]' style={{fontSize:16}}>Vehicle Number: K72F40K7F240FK</p>
          <p className='mb-[9px]' style={{fontSize:16}}>DMV: Los Angeles, California </p>
          <div className='pending-badge w-[71px] h-[28px] rounded-md bg-[#FF3366] text-center text-white'>Pending</div>
        </div>
        <div className='absolute bottom-[37px] right-[37px] flex'>
            <div className='pending-badge p-[5px] flex justify-center items-center h-[44px] w-[131px] rounded-md bg-[#FFED49] text-[#333399] text-center cursor-pointer' onClick={() => setShareQR(true)} style={{fontWeight:800}}>
              <span> Share QR</span>
              <img src='/share_iOS_export.png' width={20} className='h-[20px]' />
            </div>
            <div className='pending-badge ml-[37px] p-[5px] flex justify-center items-center h-[44px] w-[131px] rounded-md bg-[#FF3366] text-white text-center' style={{fontWeight:800}}>
              <span> Download QR</span>
            </div>
        </div>
      </div>)}
      {shareQR && (<div className='p-[60px] rounded-xl flex w-[80%] h-[70%] m-[60px] items-center relative' style={{boxShadow: "rgba(0, 0, 0, 0.25) 1px 7px 6px 2px"}}>
        {/* <img src='/qr_code_lg.png' width={373} height={373}/> */}
        <div className='p-[50px] rounded-2xl items-center w-[473px] h-[373px]' style={{boxShadow: "rgba(0, 0, 0, 0.25) 1px 7px 6px 2px"}}>
          <span className='text-[#333399] text-3xl cursor-pointer' onClick={() => setShareQR(false)}> &larr;</span>
          <span className='ml-[15px] text-[#FF3366]' style={{fontSize:26}}>Select a Member</span>
          {!isOpen &&
            <div className="flex items-center p-[15px] mt-[45px] cursor-pointer bg-[#FAFBFD]" onClick={() => setIsOpen(!isOpen)}>
                <img src={require(`../../../assets/img/Avatar/${salesperson.image}.png`)} alt="" />
                <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{salesperson.name}</h3>
                <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
            </div>
          }
          {isOpen &&
            <div className="flex items-center p-[15px] mt-[45px] cursor-pointer bg-[#FAFBFD]" onClick={() => setIsOpen(!isOpen)}>
                <img src={require(`../../../assets/img/Avatar/${salesperson.image}.png`)} alt="" />
                <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{salesperson.name}</h3>
                <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
            </div>
          }
          {isOpen &&
              <PersonDropdown handleClose={handleClose} salesperson = {salesperson}/>
          }
          <div className='flex bg-[#FFEB33] mt-[50px] py-2 px-3 rounded-full text-center text-[#333399] w-[30%] mx-auto cursor-pointer' style={{fontSize: '16px', fontWeight: 600}}>
            <span className='pl-[10px]'>Send</span>
            <img src='/Mail.png' className='ml-[10px]'/>
          </div>
        </div>
        <div className='ml-[70px] '>
          <p className='mb-[28px]' style={{fontSize:30}}>Hyundai Tucson</p>
          <p className='mb-[9px]' style={{fontSize:16}}>Inventory Number: K9127A</p>
          <p className='mb-[9px]' style={{fontSize:16}}>Vehicle Number: K72F40K7F240FK</p>
          <p className='mb-[9px]' style={{fontSize:16}}>DMV: Los Angeles, California </p>
          <img src='/qr_code_lg.png' width={108} height={108}/>
        </div>
      </div>)}
    </>
    
  );
}
