import React from 'react';
import { useOutsideClick } from "../SelectList/useOutsideClick";

function HoldingStatusDropdown(props: any) {
  const ref = useOutsideClick(() => {
    props.handler(props.holdstatus);
  })
  
  return (
    <div className="bg-[#FAFBFD] px-[6px] absolute z-10 rounded-lg" ref = {ref}>
      {
        StateData.map((item, index) => (
          <div key={index} className="flex items-center cursor-pointer" onClick={() => props.handler(item.name)}>
            <h3 className="px-2 flex-1 text-black " style={{ fontSize: '16px', fontWeight: 600 }}>{item.name === true ? 'Completed' : 'Pending'}</h3>
          </div>
        ))
      }
    </div>
  )
}

const StateData = [
  {
    name: true
  },
  {
    name: false
  },
]


export default HoldingStatusDropdown;
