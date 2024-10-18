import React from "react";
import { useOutsideClick } from "../SelectList/useOutsideClick";

function UserTypeDropdown({type, setType, close} : any) {
    const ref = useOutsideClick(()=>{
        setType(type);
        close();
      })
    return (
        <div className="bg-[#CCCCCC] absolute left-[537px] rounded-lg" ref = {ref}>
            <div className="flex flex-col items-center cursor-pointer my-3">
                <div className="hover:bg-[#333399] hover:text-white px-10 py-2 flex-1 text-black" onClick={() => {setType(0); close()}}> <h3  style={{ fontSize: '18px', fontWeight: 600 }}> Dealer</h3></div>
                <div className="hover:bg-[#333399] hover:text-white px-10 py-2 flex-1 text-black" onClick={() => {setType(1); close()}}> <h3  style={{ fontSize: '18px', fontWeight: 600 }}> Seller</h3></div>
                <div className="hover:bg-[#333399] hover:text-white px-10 py-2 flex-1 text-black" onClick={() => {setType(2); close()}}> <h3  style={{ fontSize: '18px', fontWeight: 600 }}> DMV</h3></div>
                <div className="hover:bg-[#333399] hover:text-white px-10 py-2 flex-1 text-black" onClick={() => {setType(3); close()}}> <h3  style={{ fontSize: '18px', fontWeight: 600 }}> Lender</h3></div>
            </div>
        </div>
    )
}

export default UserTypeDropdown;