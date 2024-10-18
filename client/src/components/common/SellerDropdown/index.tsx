import React, { useState } from "react";
import { useOutsideClick } from "../SelectList/useOutsideClick";

function SellerDropdown({handleClose, seller} : any) {
    const ref = useOutsideClick(()=>{
        handleClose(1, seller);
        console.log('clicked outside of div');
    })
    return (
        <div className="bg-[#FAFBFD] p-[15px] absolute" ref={ref}>
            <p className="text-[12px] font-sans" style={{ color: "#97A3B7" }}>YOUR SELLERS IN THIS GROUP</p>
            {
                SellerData.map((item, index) => (
                    <div key={index} className="flex items-center cursor-pointer my-4" onClick={() => {handleClose(1,item)}}>
                        <img className="pe-4" src={require('../../../assets/img/Avatar/'+ item.image + '.png')} alt="" />
                        <h3 className="px-2 flex-1 text-black" style={{ fontSize: '16px', fontWeight: 600 }}>{item.name}</h3>
                    </div>
                ))
            }
        </div>
    )
}

const SellerData = [
    {
        image: 'Avatar1',
        name: 'Bob Smith'
    },
    {
        image: 'Avatar6',
        name: 'James Henderson'
    },
    {
        image: 'Avatar7',
        name: 'Samuel Jackson'
    },
    {
        image: 'Avatar8',
        name: 'Steven Barrera'
    },
    {
        image: 'Avatar9',
        name: 'Martin Splink'
    },
    {
        image: 'Avatar10',
        name: 'Julia Pfeiffer'
    },
    {
        image: 'Avatar11',
        name: 'Michell Donaldson<'
    },
]

export default SellerDropdown;