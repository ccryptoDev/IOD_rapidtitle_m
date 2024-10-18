import React, { BaseSyntheticEvent, useEffect, useCallback, useState } from 'react';
import './index.view.css';
import { useNavigate } from 'react-router-dom';
import { loadHoldingTitles } from 'store/actions/title';
import HoldingStatusDropdown from '../HoldingStatusDropdown';
import { Console } from 'console';
import api from 'utils/api';
import { useSelector } from 'react-redux';
import { setAlert } from 'store/actions/alert';
import { 
  getTitleDetail,
  getHoldsStatus,
  updateHoldsStatus 
} from 'utils/useWeb3';
import { holds_status_const } from 'utils/constants';
import { useDispatch } from 'react-redux'
import { canBeRendered } from 'react-toastify/dist/utils';

interface holds_type {
  status: boolean,
  updateAt: string
}

function TitleHolds(props: any) { 
  const dispatch = useDispatch();
  const {title_id} = props;
  const [titleDetail, setTitleDetail] = useState([]);
  const [createdTime, setCreatedTime] = useState<Date>(new Date());
  const user = useSelector((state: any) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [openedRow, setOpenedRow] = useState(-1);
  const navigate = useNavigate();
  const [holds, setHolds] = useState<holds_type[]>([]);
  const [holdUpdated, setHoldUpdated] = useState(false);

  const handleOpen = (index: any) => {
    if(user.userType != 2)
      setAlert("Only DMV is able to update the holds status!");
    else
      setOpenedRow(index);
  }

  const handleClose = (newStatus: boolean) => {
    let update_id = openedRow;

    const update_status = async (title_id: number, update_id: number, newStatus: boolean) => {
      try {
        // spinner turn on
        dispatch({ type: 'SET_LOADING', payload: true });

        const tx = await updateHoldsStatus(title_id, update_id, newStatus);
        if( tx.events.StatusUpdated.returnValues ) {
          setHoldUpdated(true);
          setAlert('The holds status is updated successfully!')
        }

        // spinner turn off
        dispatch({ type: 'SET_LOADING', payload: false });

        /**
         * updating holds status from db
         */
        /* const res = await api.put(`/v2/holdingtitles/${update_id}`, {newStatus, title_id});
        const holdsStatusAfterUpdate = await loadHoldingTitles(title_id.title_id);
        console.log('status after update', holdsStatusAfterUpdate);
        setHolds(holdsStatusAfterUpdate); */
        
      } catch (err: any) {
        console.log(err);
      }
    };

    if (holds[openedRow].status !== newStatus) {
      update_status(Number(title_id) - 1, update_id, newStatus); 
    }

    console.log('updateID --- ', update_id);

    setTimeout(() => {
      setOpenedRow(-1);
    }, 100);
  }

  useEffect(() => {
    const cb = async (title_id: number) => {
      // get Title details
      const titleInfo = await getTitleDetail(title_id);
      setTitleDetail(titleInfo);

      const hold_createTime = new Date(titleInfo[7] * 1000);
      const formattedCreateTime = hold_createTime.toLocaleString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                  } as Intl.DateTimeFormatOptions);
      setCreatedTime(hold_createTime);
      console.log('createdTime ', createdTime);

      // load holds_status from db
      // let holds = await loadHoldingTitles(title_id);
    };

    cb(Number(title_id) - 1);

  }, []);

  const getHolds = useCallback(async () => {
    // load holds status from smart contract
    return await getHoldsStatus(title_id - 1, 8);
  }, [holdUpdated, createdTime]);

  useEffect(() => {
    const cb = async () => {
      // spinner turn on
      dispatch({ type: 'SET_LOADING', payload: true });

      // load holds status from smart contract
      const holds = await getHolds();
      
      const updatedHolds: holds_type[] = holds.map((hold: holds_type) => {
        const timestamp = parseInt(hold.updateAt);
        const updatedDate = new Date(timestamp * 1000);
        const diffInMs = updatedDate > createdTime ? updatedDate.getTime() - createdTime.getTime() : 0;
        const diffInDays = diffInMs > 0 ? Math.floor(diffInMs / (1000 * 60 * 60 * 24)) : 0;
        return { ...hold, updateAt: diffInDays };
      });

      console.log('updated holds', updatedHolds);

      setHolds(updatedHolds);
      const count_completedHolds = updatedHolds.map(hold => hold.status).filter(status => status === true).length;
      
      const updatedTitle = {
        numHolds: updatedHolds.length,
        completedHolds: count_completedHolds,
        status: updatedHolds.length === count_completedHolds ? 1 : 0
      }
      
      const res = await api.put(`/v2/titles/${title_id}`, {updatedTitle: updatedTitle});
      console.log(res.data);

      // spinner turn off
      dispatch({ type: 'SET_LOADING', payload: false });
      setHoldUpdated(false);
    }

    cb(); 
  }, [holdUpdated, createdTime, getHolds]);

  return (
    <div className="p-2 max-h-[680px] overflow-y-scroll w-full">
      <div className='title-body p-2'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-[#333399]">
              <thead className="text-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Hold
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Responsible
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Days
                  </th> 
                  <th scope="col" className="px-6 py-3">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
                </tr>
              </thead>

              <tbody className='text-[#212133]'>
                {
                  holds.map((hold: any, index: any) => {
                    return (
                      <tr className={index % 2 === 0 ? `bg-[#D6D6EB]` : ''} key={index} >
                        
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap flex items-center">
                          <div>
                            <img src={hold.status === false ? '/hold_pending.png' : '/hold_complete.png'} style={{width: 42, height: 40}}/>
                          </div>
                          <div className='ml-5'>
                            <p className={hold.status === false ? 'text-[#FF3366] text-sm' : 'text-[#333399] text-sm'}>{hold.status === false ? 'Pending' : 'Completed'}</p>
                            <p className='text-lg'> {holds_status_const[index]} </p>
                          </div>
                        </th>

                        <td className="px-4 py-4 text-lg relative">
                          {
                            hold.status === false ? 
                              <div className='pending-badge cursor-pointer  rounded-md bg-[#FF3366] text-center text-white' onClick={()=>handleOpen(index)}>Pending</div> 
                              : 
                              <div className='pending-badge  rounded-md cursor-pointer bg-[#333399] text-center text-white' onClick={()=>handleOpen(index)}>Completed</div>
                          }
                          {
                            index == openedRow && <HoldingStatusDropdown handler={handleClose} holdstatus={hold.status} />
                          }
                        </td>
                        
                        <td className="px-6 py-4 text-lg">
                          {
                            <div className={hold.status === false ? `pending-badge flex justify-center py-1 px-2 rounded-md bg-[#FF3366] text-center text-white w-fit` : 'flex'}>
                              <img src={index % 4 == 0 ? '/user1.png' : index % 4 == 1 ? '/sacramento.png' : index % 4 == 2 ? '/DMV.png' : '/user2.png'} style={{width: 24, height: 24}} />  
                              <span className='ml-2'>{index % 4 == 0 ? 'Earl Garris' : index % 4 == 1 ? 'Sacramento' : index % 4 == 2 ? 'DMV' : 'Melina B.'}</span>
                            </div> 
                          }
                        </td>

                        <td className="px-6 py-4 text-lg">
                          {
                            hold.status === '0' ? 
                              <div className='pending-badge flex justify-center py-1 px-2 rounded-md bg-[#FF3366] text-center text-white w-fit'>
                                {hold.updateAt} Days
                              </div> 
                              : 
                              <div>
                                {hold.updateAt} Days
                              </div>
                          }
                        </td>

                        <td className="px-6 py-4 text-lg">
                          {
                            hold.status ? 
                              <img src='/note_new.svg'/> 
                              : 
                              <img src='/note_edit.svg' style={{color:'white'}} />
                          }
                        </td>

                        <td className="py-4 px-0 pr-3 text-lg text-center">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default TitleHolds;
