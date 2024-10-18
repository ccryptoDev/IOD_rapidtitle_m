import React from 'react';
import { useOutsideClick } from "../SelectList/useOutsideClick";

function LenderDropdown({handleClose, lender} : any) {
  const ref = useOutsideClick(()=>{
    handleClose(3, lender);
  })
  return (
    <div className="bg-[#FAFBFD] p-[15px] absolute" ref = {ref}>
      <p className="text-[12px] font-sans" style={{ color: '#97A3B7' }}>
        OUR MOST POPULAR LENDERS
      </p>
      {LenderData.map((item, index) => (
        <div key={index} className="flex items-center cursor-pointer my-4" onClick={() => handleClose(3,item)}>
          <img
            className="pe-4"
            src={require('../../../assets/img/Avatar/' + item.image + '.png')}
            alt=""
          />
          <h3
            className="px-2 flex-1 text-black"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

const LenderData = [
  {
    image: 'Avatar3',
    name: 'CAPITAL ONE AUTO FINANCE'
  },
  {
    image: 'Avatar23',
    name: 'Truist'
  },
  {
    image: 'Avatar18',
    name: 'TD Bank, N.A.'
  },
  {
    image: 'Avatar16',
    name: 'KIA FINANCE AMERICA'
  },
  {
    image: 'Avatar17',
    name: 'SANTANDER CONSUMER USA'
  }
];

export default LenderDropdown;
