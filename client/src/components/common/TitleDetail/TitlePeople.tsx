import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate } from 'react-router-dom';
import { loadHoldenPeople } from 'store/actions/title';


function TitlePeople() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const cb = async () => {
      const data = await loadHoldenPeople();
      //@ts-ignore
      setData(data);
    };
    cb();
  },[])

  return (
    <div className="p-2 max-h-[680px] overflow-y-scroll w-full h-full">
      <div className='title-body p-2 h-full'>
        <div className="flex overflow-x-auto shadow-md sm:rounded-lg h-full">
            {
              data.map( (record: any) => {
                  return <div className='w-[259px] mr-[30px] rounded-md h-[570px] bg-[#4848A4] mb-3'>
                  <div className='p-2 w-[259px]'>
                    <img src={record.sales_image}/>
                  </div> 
                  <img src={record.sales_logo} />
                  <div className='px-3 py-5'>
                      <p className='text-[#9B96B6]'>BANK ID: {record.bank_id}</p>
                      <p className='text-white text-3xl'>{record.seller} </p>
                      <p className='text-[#FF4876] text-2xl'>{record.seller_name}</p>
                      <p className='text-[#D6D6EB] text-sm'>Title Associated: {record.title_accociated}</p>
                      <p className='text-[#D6D6EB] text-sm'>Date of Title Affiliation: {record.affiliation_date}</p>
                      <p className='text-[#D6D6EB] text-sm'>Representative: {record.representive}</p>
                  </div>
                  <div className='flex justify-center items-center h-[97px]'>
                    <div className='pending-badge  rounded-md bg-[#333399] cursor-pointer text-center text-white text-xl py-2 px-4'>{'See Digital Identity'}</div>
                  </div>
                </div>
              })
            }
        </div>
      </div>
    </div>
  );
}

export default TitlePeople;
