import React from "react";
import HeaderBar from "components/common/HeaderBar";
import TitleList from "components/common/TitleList";
import FilterCards from "components/common/FilterCards";
import TitleTables from "components/common/TitleTables";
import SideBar from "components/common/SideBar";
import SelectList from "components/common/SelectList";
import SelectTables from "components/common/SelectTables";

function NewTitle() {
  return (
    <div className="px-[24px]">
      <div className='flex'>
        <SideBar />
        <div className='w-full py-5'>
          <HeaderBar />
          <div className="grid grid-cols-5 gap-4">
            <SelectList />
            <SelectTables />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewTitle;