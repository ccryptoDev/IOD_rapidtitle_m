import React from "react";
import { useOutsideClick } from "../SelectList/useOutsideClick";

function TitleStatusDropdown({handler, titleStatus} : any) {
    const ref = useOutsideClick(()=>{
        handler(2, titleStatus);
      })
    return (
        <div className="bg-[#FAFBFD] p-[15px] absolute" ref = {ref}>
            {
                StateData.map((item, index) => (
                    <div key={index} className="flex items-center cursor-pointer my-4" onClick={() => handler(2,item.name)}>
                        <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{item.name}</h3>
                        <img className="pe-4" src={require('../../../assets/img/Avatar/info.png')} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

const StateData = [
    {
        name: 'Completed'
    },
    {
        name: 'Pending'
    },
]

export default TitleStatusDropdown;