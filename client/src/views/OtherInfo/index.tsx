import React from "react";
import HeaderBar from "components/common/HeaderBar";
import SideBar from "components/common/SideBar";
import SelectTables from "components/common/SelectTables";
import AdditionalInfo from "components/common/AdditionalInfo";

function OtherInfo() {
  return (
    <div className="px-[24px]">
      <div className='flex'>
        <SideBar />
        <div className='w-full py-5'>
          <HeaderBar />
          <div className="grid grid-cols-5 gap-4">
              <SelectTables />
              <AdditionalInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherInfo;