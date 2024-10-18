import React from 'react';
import { useOutsideClick } from "../SelectList/useOutsideClick";

function DmvDropdown({handleClose, dmv} : any) {
  const ref = useOutsideClick(()=>{
    handleClose(2, dmv);
  })
  return (
    <div className="bg-[#FAFBFD] p-[15px] absolute" ref={ref}>
      <p className="text-[12px] font-sans" style={{ color: '#97A3B7' }}>
        OUR MOST POPULAR LENDERS
      </p>
      {DmvData.map((item, index) => (
        <div key={index} className="flex items-center cursor-pointer my-4" onClick={() => handleClose(2,item)}>
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

const DmvData = [
  {
    image: 'Avatar19',
    name: 'Los Angeles DMV'
  },
  {
    image: 'Avatar22',
    name: 'Las Vegas DMV'
  },
  {
    image: 'Avatar19',
    name: 'San Diego DMV'
  },
  {
    image: 'Avatar20',
    name: 'Milwaukee DMV'
  },
  {
    image: 'Avatar21',
    name: 'Portland DMV'
  }
];

export default DmvDropdown;
