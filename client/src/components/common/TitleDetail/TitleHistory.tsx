import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import './index.view.css';
import { useNavigate } from 'react-router-dom';
import { loadHoldenHistory } from 'store/actions/title';


function TitleHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const cb = async () => {
      const data = await loadHoldenHistory();
      console.log(data);
      //@ts-ignore
      setData(data);
    };
    cb();
  },[])

  return (
    <div className="p-2 max-h-[680px] overflow-y-scroll w-full">
      <div className='title-body p-2'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-[#333399]">
                <thead className="text-lg">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Salesperson
                        </th>
                        <th scope="col" className="px-6 py-3">
                            STK NO
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Deal Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sold Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Select
                        </th>
                    </tr>
                </thead>
                <tbody className='text-[#212133]'>
                  {
                    data.map((record:any,index:any) => {
                      return <tr className={index % 2 === 0 ? `bg-[#D6D6EB]`:''}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap flex items-center">
                                    <div>
                                      <img src={record.salesperson.avatar} style={{width:42,height:40}}/>
                                    </div>
                                    <div className='ml-5'>
                                      <p className={'text-[#333399] text-sm'}>{record.salesperson.permission}</p>
                                      <p className='text-lg'> {record.salesperson.name}</p>
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-lg">
                                    {record.stk_no}
                                </td>
                                <td className="px-6 py-4 text-lg">
                                    {record.customer_name}
                                </td>
                                <td className="px-6 py-4 text-lg">
                                    {record.deal_num}
                                </td>
                                <td className="px-6 py-4 text-lg">
                                    {record.sold_date}
                                </td>
                                <td className="px-6 py-4 text-lg">
                                    <div className='pending-badge  rounded-md bg-[#00E577] text-center text-black'>{record.title_value}</div>
                                </td>
                                <td className="py-4 px-0 pr-3 text-lg text-center">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                </td>
                                
                            </tr>
                    })
                  }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default TitleHistory;
