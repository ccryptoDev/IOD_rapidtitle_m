import React, { useState, useRef, useEffect } from "react";
import SellerDropdown from "../SellerDropdown";
import DmvDropdown from "../DmvDropdown";
import LenderDropdown from "../LenderDropdown";
import PersonDropdown from "../PersonDropdown";

function SelectList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [seller, setSeller] = useState({name:'Bob Smith',image:'Avatar1'});
  const [dmv, setDMV] = useState({name:'Los Angeles DMV',image:'Avatar2'});
  const [lender, setLender] = useState({name:'CAPITAL ONE AUTO FINANCE',image:'Avatar3'});
  const [salesperson, setSalesPerson] = useState({name:'James Maverick',image:'Avatar4'});
  const handleChange1 = () => {
    setIsOpen1(current => !current);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen(false);
  }
  const handleChange = (event: any) => {
    setIsOpen(current => !current);
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
  }
  const handleChange2 = () => {
    setIsOpen2(current => !current);
    setIsOpen1(false);
    setIsOpen(false);
    setIsOpen3(false);
  }
  const handleChange3 = () => {
    setIsOpen3(current => !current);
    setIsOpen1(false);
    setIsOpen(false);
    setIsOpen2(false);
  }

  const handleClose = (index : number, param: any) => {
    if(index === 1){
      setSeller(param);
      setIsOpen(false);
    }
    if(index === 2){
      setDMV(param);
      setIsOpen1(false);
    }
    if(index === 3){
      setLender(param);
      setIsOpen2(false);
    }
    if(index === 4){
      setSalesPerson(param);
      setIsOpen3(false);
    }
  }

  return (
    <div className="col-span-2 p-2 w-full">
      <div className="">
        <div className="store-card px-8 py-4">
          <div className="flex items-end py-3 text-[#FF3366]">
            <h1 className="text-2xl flex-1">Select a Seller</h1>
            <img src={require('../../../assets/img/Warning/Vector.png')} alt="" />
          </div>
          <div className="flex justify-between items-center  cursor-pointer">
              {
                !isOpen &&
                <div className="flex items-center p-[15px] bg-[#FAFBFD]"  onClick={handleChange}>
                  <img src={require(`../../../assets/img/Avatar/${seller.image}.png`)} alt="" />
                  <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{seller.name}</h3>
                  <img className="ps-8" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                </div>
              }
              {
                isOpen &&
                <div className="flex items-center p-[15px] bg-[#FAFBFD]"  onClick={handleChange}>
                  <img src={require(`../../../assets/img/Avatar/${seller.image}.png`)} alt="" />
                  <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{seller.name}</h3>
                  <img className="ps-8" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                </div>
              }
              {
                !isOpen &&
                <button className="bg-[#333399] text-white font-bold py-2 px-4 ml-2 rounded inline-flex items-center" style={{ borderRadius: 4 }}>
                  <span className='mr-2'>Invite a Seller</span>
                  <img src={require('../../../assets/img/User/Vector.png')} alt="" />
                </button>
              }
          </div>
          {isOpen &&
            <SellerDropdown handleClose={handleClose} seller = {seller}/>
          }
        </div>
        <div className="store-card px-8 py-4">
          <div className="flex items-end py-3 text-[#FF3366]">
            <h1 className="text-2xl flex-1">Select a DMV</h1>
            <img src={require('../../../assets/img/Warning/Vector.png')} alt="" />
          </div>
          {!isOpen1 &&
              <div className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]" onClick={handleChange1}>
                <img src={require(`../../../assets/img/Avatar/${dmv.image}.png`)} alt="" />
                <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{dmv.name}</h3>
                <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
              </div>
          }
          {isOpen1 &&
              <div className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]" onClick={handleChange1}>
                <img src={require(`../../../assets/img/Avatar/${dmv.image}.png`)} alt="" />
                <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{dmv.name}</h3>
                <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
                <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
              </div>
          }
          {isOpen1 && (
            <DmvDropdown handleClose={handleClose} dmv={dmv}/>
          )}
        </div>
        <div className="store-card px-8 py-4">
          <div className="flex items-end py-3 text-[#FF3366]">
            <h1 className="text-2xl flex-1">Select a Lender</h1>
            <img src={require('../../../assets/img/Warning/Vector.png')} alt="" />
          </div>
          {!isOpen2 &&
            <div className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]" onClick={handleChange2}>
              <img src={require(`../../../assets/img/Avatar/${lender.image}.png`)} alt="" />
              <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{lender.name}</h3>
              <img src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
            </div>
          }
          {isOpen2 &&
            <div className="flex items-center p-[15px] cursor-pointer bg-[#FAFBFD]" onClick={handleChange2}>
              <img src={require(`../../../assets/img/Avatar/${lender.image}.png`)} alt="" />
              <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{lender.name}</h3>
              <img src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
            </div>
          }
          {isOpen2 &&
            <LenderDropdown handleClose={handleClose} lender = {lender} />
          }
        </div>
        <div className="store-card px-8 py-4">
          <div className="flex items-end py-3 text-[#FF3366]">
            <h1 className="text-2xl flex-1">Select a Salesperson</h1>
            <img src={require('../../../assets/img/Warning/Vector.png')} alt="" />
          </div>
          {!isOpen3 &&
            <div className="flex items-center p-[15px] cursor-pointer" onClick={handleChange3}>
              <img src={require(`../../../assets/img/Avatar/${salesperson.image}.png`)} alt="" />
              <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{salesperson.name}</h3>
              <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
              <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
            </div>
          }
          {isOpen3 &&
            <div className="flex items-center p-[15px] cursor-pointer" onClick={handleChange3}>
              <img src={require(`../../../assets/img/Avatar/${salesperson.image}.png`)} alt="" />
              <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{salesperson.name}</h3>
              <img className="pe-4" src={require('../../../assets/img/Product/Arrow/Vector.png')} alt="" />
              <img className="ps-3" src={require('../../../assets/img/Filter.png')} alt="" />
            </div>
          }
          {isOpen3 &&
            <PersonDropdown handleClose={handleClose} salesperson = {salesperson}/>
          }
        </div>
      </div>
    </div>
  )
}

export default SelectList;