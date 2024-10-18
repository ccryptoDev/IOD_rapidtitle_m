import React, { BaseSyntheticEvent, useEffect, useState, useRef } from 'react';
import './index.view.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TitleStatus from './TitleStatus';
import TitleHolds from './TitleHolds';
import TitleHistory from './TitleHistory';
import TitlePeople from './TitlePeople';
import { getVehicleDetail } from 'utils/useWeb3';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import api from 'utils/api';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {io, Socket} from 'socket.io-client';
import { loadMessages } from 'store/actions/message';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

export const socket = io(`${process.env.REACT_APP_API_URL}`);
interface IMessage {
  filePath: string[];
  message: string;
  fname: string;
  __createdtime__: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" style={{ color: '#333399' }} {...props}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="#333399"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function formatDateFromTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return (
    <div>
      <p>{formattedHours}:{minutes} {ampm}</p>
    </div>
  );
}

function uploadedPath_edit(uploaded_path: string){
  const path_Array = uploaded_path.split('.');
  const filename = path_Array[0].substring(8, path_Array[0].length - 16);
  const filetype = path_Array[1];
  return (
    <div>
      <p>{filename}.{filetype}</p>
    </div>
  )
}

const TitleDetail = () => {

  const [progress, setProgress] = React.useState(0);
  const [isuploading, setIsUploading] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [messagesReceived, setMessagesReceived] = useState<IMessage[]>([]);
  const messagesEndRef = useRef(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const user = useSelector((state: any) => state.auth.user);

  const [tab, setActiveTab] = React.useState('holds');
  const [vehicleData, setVehicleData] = React.useState({})

  const {id} = useParams();
  const location = useLocation();
  const room_name = location.state ? location.state.room_name: '';

  console.log(room_name);
  console.log(id)

  const dispatch = useDispatch();

  const handleFormClick = () => {
    if (formRef.current) {
      // console.log(formRef)
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      // alert('okay');
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFormSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    let formData = new FormData();
    formData.append("myfile", file[0]);
    console.log("type: ", file[0]);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };

    try {
      //@ts-ignore
      const res = await api.post('/v2/fileupload', formData, config);
      setIsUploading(false);
      setProgress(0);
      //@ts-ignore
      setUploadedFiles([...uploadedFiles, res.data.path]);
      setFile([]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFile(newFiles);
      console.log(file);
      setTimeout(() => {
        handleFormClick();
      },1000)
    }
  }

  const scrollToBottom = () => {
    //@ts-ignore
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    messagesEndRef.current?.scrollIntoView()
  }

  socket.emit('join_room', {user, room_name});

  const [modalOpend, setModalOpened] = React.useState(false);
  const handleMiniChat = () => setModalOpened(!modalOpend);
  const [chat, setChat] = useState('');

  const sendMessage =() => {
    if(chat !== '' || uploadedFiles.length > 0){
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      const user_id = user._id;
      const user_fname = user.fname;

      const chat_room_id = id;
      
      const chat_room_name = room_name;
      socket.emit('send_message', { chat_room_id, chat_room_name, user_fname, user_id, chat, __createdtime__, uploadedFiles });
      setChat('');
      setFile([]);
      setUploadedFiles([]);
      setTimeout(() => {
        scrollToBottom();
      },100);
    }
  }

  useEffect(() => {
    const cb = async () => {
      let vehicleURI = await getVehicleDetail(Number(id));
      let res = await axios.get(vehicleURI);
      let vehicleJson = res.data;
      setVehicleData(vehicleJson)
    }

    cb();

    const fetchMessages = async (room_id :any) => {
      console.log('room_id: ' + room_id);
      const data = await loadMessages(room_id);
      console.log(data);
      setMessagesReceived(data);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    };

    fetchMessages(id);

    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
          ...state, 
          {
            filePath: data.uploadedFiles,
            message: data.chat,
            fname: data.user_fname,
            __createdtime__: data.__createdtime__,
          }
        ])
      });

      setTimeout(() => {
        scrollToBottom();
      },1000)

      return () => {
        // clearInterval(timer);
        socket.off('receive_message');
      };
  }, [modalOpend]);

  const _onKeypress = (e: any) => {
    if(e.key === 'Enter'){
      sendMessage();
    }
  }

  const downloadFile = async (fileName: string) => {
    const response = await fetch(`/uploads/${fileName}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClose = () => {
    setModalOpened(false);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '52%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    height: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };
  
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };


  return (
    <div className="px-[24px]">
      <div className="flex">
        <SideBar />
        <div className="w-full py-5">
          <HeaderBar />
          <div className="flex w-full items-center p-2">
            <div className="flex-1 header-bar ml-2">
              <span className='text-[#333399] text-3xl cursor-pointer' onClick={() => navigate(-1)}> &larr;</span>
              {/* 
              //@ts-ignore */}
              <span className='text-[#FF3366] text-3xl'> {vehicleData.make} {vehicleData.plate_model}</span>
            </div>
            <div className='cursor-pointer' onClick={handleMiniChat}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 108 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1853_189986)">
                  <circle cx="53.9851" cy="53.7957" r="42.9265" fill="#212133" />
                  <path
                    d="M43.4697 73.1247C46.7139 74.9957 50.478 76.0662 54.4921 76.0662C66.6946 76.0662 76.5875 66.1743 76.5875 53.9718C76.5875 41.7693 66.6954 31.8773 54.493 31.8773C42.2905 31.8773 32.3984 41.7693 32.3984 53.9718C32.3984 57.9859 33.4689 61.75 35.3399 64.9942L35.3472 65.0068C35.5272 65.3189 35.618 65.4763 35.6591 65.6251C35.6979 65.7654 35.7087 65.8915 35.6988 66.0367C35.6881 66.1928 35.6355 66.3546 35.5277 66.6781L33.6403 72.3403L33.6379 72.3478C33.2397 73.5424 33.0406 74.1398 33.1825 74.5378C33.3063 74.8848 33.5809 75.1587 33.928 75.2825C34.3251 75.4241 34.9198 75.2259 36.1092 74.8294L36.124 74.8239L41.7863 72.9365C42.1087 72.829 42.2726 72.7745 42.4283 72.7639C42.5736 72.7539 42.6988 72.7671 42.8392 72.8058C42.9883 72.8471 43.1458 72.9379 43.4595 73.1188L43.4697 73.1247Z"
                    stroke="white"
                    strokeWidth="5.32422"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="73.8504" cy="34.6128" r="10.1004" fill="#FF3366" />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1853_189986"
                    x="0.410156"
                    y="0.220703"
                    width="107.148"
                    height="107.15"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="5.32422" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1853_189986"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1853_189986"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <Modal
              open={modalOpend}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableEnforceFocus={false}
            >
              <Box sx={style}>
                <div className='flex'>
                  <span className='text-[#333399] text-4xl cursor-pointer absolute top-[25px] left-[20px]' onClick={handleClose}> &larr;</span>
                  <span className='text-[#333399] text-4xl absolute top-[25px] left-[50px] font-bold'>TitleChat</span>
                </div>
                <div className="grid grid-cols-10 pr-[26px] absolute top-[90px]">
                  <div className="col-span-5 ml-[10px]">
                    <p className='text-[12px] text-left'>Title information</p>
                    <div className="bg-[#9898CB] rounded-md py-2 pr-[10px] mr-[2px] text-left px-2">
                      <p className="text-white text-[18px]">{room_name.split(" - ")[0]}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className='text-[12px] text-left ml-[5px]'>ID Number</p>
                    <div className="bg-[#9898CB] rounded-md py-2 pr-[10px] ml-[5px] mr-[2px] text-left px-2">
                      <p className="text-white text-[18px]">{room_name.split(" - ")[1]}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className='text-[12px] text-left ml-[5px]'>Holds</p>
                    <div className="bg-[#FF3366] rounded-md py-2 ml-[5px] pr-[10px] mr-[2px] text-left px-2">
                      <p className="text-white text-[18px]">6/10</p>
                    </div>
                  </div>
                </div>
                <div className= {`${uploadedFiles && uploadedFiles.length > 0 ? 'bottom-[115px] max-h-[470px]' : 'bottom-[85px] max-h-[500px]'} grid flex-col absolute py-[10px] px-[20px] overflow-y-auto`} style={{width: 'calc(100% - 30px)'}}>
                  {messagesReceived.map((msg, i) => (
                    <>
                      {user.fname === msg.fname ? (
                      <>
                        {msg.message !=='' && (
                          <>
                            <span className='text-[12px] text-right'>
                              {
                                formatDateFromTimestamp(msg.__createdtime__)
                              }
                            </span>
                            <div className='grid relative mb-[10px]' key={i}>
                              <div className='bg-[#FF5C85] justify-self-end text-white w-fit p-[15px] float-right' style={{borderRadius:'20px 20px 0px'}}>{msg.message}</div>
                            </div>
                          </>)}
                        {msg.filePath && msg.filePath.length > 0 && (
                          <>
                            {
                              msg.filePath.map((uploaded_path, j) => (
                                <>
                                  <span className='text-[12px] text-right'>
                                    {
                                      formatDateFromTimestamp(msg.__createdtime__)
                                    }
                                  </span>
                                  <div className='grid relative mb-[10px]' key={j}>
                                    <div className='bg-[#FF5C85] justify-self-end w-fit p-[15px] float-right' style={{borderRadius:'20px 20px 0px'}}>
                                      {/* <img src='/file_icon.png' width={16} className='h-[16px] mt-[5px] mx-[2px]' alt='fileicon_img'></img> */}
                                      {isImageFile(uploaded_path) &&
                                        <img src={`../${uploaded_path}`} width={200} className='h-[200] mt-[5px] mx-[2px]' alt='fileicon_img' />
                                      }
                                      <div className='flex justify-center'>
                                        <img src='/file_icon.png' width={16} className='h-[16px] mt-[5px] mx-[2px]' alt='fileicon_img'></img>
                                        <span className=' cursor-pointer text-white text-center'  onClick={() => downloadFile(uploaded_path.slice(8))}>
                                          {uploadedPath_edit(uploaded_path)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))
                            }
                          </>)}
                      </>) : (
                      <>
                        {msg.message !=='' && (
                          <>
                            <div className='flex'>
                              <span className='text-[12px] mt-[0px] right-[20px] mb-[5px] text-left mr-[5px]'>{msg.fname},</span>
                              <span className='text-[12px] text-left'>
                                {
                                  formatDateFromTimestamp(msg.__createdtime__)
                                }
                              </span>
                            </div>
                            <div className='grid relative mb-[10px]' key={i}>
                              <div className='bg-[#5C5CAD] text-white w-fit p-[15px] float-left' style={{borderRadius:'0px 20px 20px'}}>{msg.message}</div>
                            </div>
                          </>)}
                        {msg.filePath && msg.filePath.length > 0 && (
                          <>
                            {
                              msg.filePath.map((uploaded_path, j) => (
                                <>
                                  <div className='flex'>
                                    <span className='text-[12px] mt-[0px] right-[20px] mb-[5px] text-left mr-[5px]'>{msg.fname},</span>
                                    <span className='text-[12px] text-left'>
                                      {
                                        formatDateFromTimestamp(msg.__createdtime__)
                                      }
                                    </span>
                                  </div>
                                  <div className='grid relative mb-[10px]' key={j}>
                                    <div className='bg-[#5C5CAD] w-fit p-[15px] float-left' style={{borderRadius:'20px 20px 0px'}}>
                                      {/* <img src='/file_icon.png' width={16} className='h-[16px] mt-[5px] mx-[2px]' alt='fileicon_img'></img> */}
                                      {isImageFile(uploaded_path) &&
                                        <img src={`../${uploaded_path}`} width={200} className='h-[200] mt-[5px] mx-[2px]' alt='fileicon_img' />
                                      }
                                      <div className='flex justify-center'>
                                        <img src='/file_icon.png' width={16} className='h-[16px] mt-[5px] mx-[2px]' alt='fileicon_img'></img>
                                        <span className=' cursor-pointer text-white text-center'  onClick={() => downloadFile(uploaded_path.slice(8))}>
                                          {uploadedPath_edit(uploaded_path)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))
                            }
                          </>)}
                      </>
                      )}
                    </>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                {uploadedFiles && uploadedFiles.length > 0 && (
                    <div className='bg-[#8F8F8F] flex absolute top-[635px] pt-[5px] items-center px-[10px] h-[30px]' style={{width: 'calc(100% - 0px)'}}>
                    {
                      uploadedFiles.map((file, i)=>(
                        <div className='flex border border-solid rounded-lg border-gray-400 px-[2px] mx-[2px]'>
                          <span className='px-[5px]' key={i}>{uploadedPath_edit(file)}</span>
                          <img src='/file_close.png' width={16} className='h-[16px] mt-[5px] cursor-pointer' alt='imoticon_img' onClick={()=>{setUploadedFiles(uploadedFiles.filter((item)=>item!==file))}}></img>
                        </div>
                      ))
                    }
                    </div>
                  )}
                <div className='bg-[#8F8F8F] flex absolute bottom-0 py-[10px] items-center px-[10px] h-[85px] rounded-b-2xl' style={{width: 'calc(100% - 0px)'}}>
                  <img src='/imoticon.png' width={24} className='h-[24px]' alt='imoticon_img'></img>
                  <img src='/file_chat.png' width={24} className='h-[24px] ml-[10px] cursor-pointer' alt='file_attach' onClick={handleClick}></img>
                  {isuploading && 
                    <div className="w-[30px] ml-[10px] mt-[7px] mr-[10px]">
                      <CircularProgressWithLabel value={progress} />
                    </div>
                  }
                  <form ref={formRef} onSubmit={onFormSubmit}>
                    <input type = 'file' ref={inputRef} className='file-input' onChange={handleFileChange} hidden />
                  </form>
                  <input type='text' style={{flex:1}} className='rounded-3xl ml-[10px] px-[20px] h-[48px]' placeholder='Say something...' value={chat} onChange={e=> setChat(e.target.value)} onKeyDown={_onKeypress}></input>
                  <div className='bg-white rounded-3xl ml-[10px] right-[10px] h-[48px] w-[48px] cursor-pointer'><img src='/paper_plane.png' alt='paper_plane' onClick={sendMessage}></img></div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className='grid grid-cols-8 px-5'>
              <div className='col-span-2 !w-full card bg-[#D6D6EB] relative' style={{border: 0,padding:30}}>
                  <img src='/detail_close.png' className='absolute right-5 cursor-pointer'/>
                  <p className='title-text mb-2'>Certificate of Title</p>
                  <p className='label'>Vehicle Number</p>
                  {/* 
                  //@ts-ignore */}
                  <p className='main-text mb-2'>{vehicleData.number}</p>
                  <div className='flex justify-between mb-2'>
                    <div>
                      <div className='label'>Year Model</div>
                      {/* 
                  //@ts-ignore */}
                      <div className='main-text'>{vehicleData.year_model}</div>
                    </div>
                    <div>
                      <div className='label'>Make</div>
                      {/* 
                  //@ts-ignore */}
                      <div className='main-text'>{vehicleData.make}</div>
                    </div>
                    <div>
                      <div className='label'>Plate Number</div>
                      {/* 
                  //@ts-ignore */}
                      <div className='main-text'>{vehicleData.plate_number}</div>
                    </div>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <div>
                      <div className='label'>Issue Date</div>
                      {/* 
                  //@ts-ignore */}
                      <div className='main-text'>{vehicleData.issue_date}</div>
                    </div>
                    <div>
                      <div className='label'>Expiration Date</div>
                      {/* 
                  //@ts-ignore */}
                      <div className='main-text'>{vehicleData.expiration_date}</div>
                    </div>
                    <div>
                      <div className='label'>Fees Paid</div>
                      <div className='main-text'>201</div>
                    </div>
                  </div>
                  <p className='label'> City/State</p>
                  <p className='main-text mb-2'> Sacramento/California</p>
                  <div className='flex justify-between'>
                      <div className='h-[80px] flex justify-center flex-col rounded-2xl bg-[#9898CB] p-3 text-white relative'>
                          <p className='label'>Serial Number</p>
                          <p>ZACCJBDT9FPB41159</p>
                          <svg width="30" height="30" viewBox="0 0 73 73" className='absolute top-2 right-2' fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="36.1846" cy="36.3408" r="35.9385" fill="#212133"/>
                            <path d="M49.2592 55.0405H51.3776M42.9043 55.0405H38.6676V48.6855M45.0226 48.6855H51.3776V42.3306H49.2592M38.6676 42.3306H42.9043M17.4844 48.685C17.4844 46.711 17.4844 45.7239 17.8069 44.9454C18.2369 43.9073 19.0611 43.083 20.0992 42.6531C20.8778 42.3306 21.8648 42.3306 23.8388 42.3306C25.8128 42.3306 26.8009 42.3306 27.5795 42.6531C28.6176 43.083 29.4416 43.9073 29.8716 44.9454C30.1941 45.7239 30.1941 46.7115 30.1941 48.6855C30.1941 50.6596 30.1941 51.6466 29.8716 52.4251C29.4416 53.4632 28.6176 54.2878 27.5795 54.7178C26.8009 55.0403 25.8128 55.0403 23.8388 55.0403C21.8648 55.0403 20.8778 55.0403 20.0992 54.7178C19.0611 54.2878 18.2369 53.4638 17.8069 52.4257C17.4844 51.6471 17.4844 50.659 17.4844 48.685ZM38.6676 27.5017C38.6676 25.5277 38.6676 24.5407 38.9901 23.7621C39.4201 22.724 40.2443 21.8998 41.2824 21.4698C42.061 21.1473 43.048 21.1473 45.022 21.1473C46.9961 21.1473 47.9842 21.1473 48.7628 21.4698C49.8009 21.8998 50.6249 22.724 51.0549 23.7621C51.3774 24.5407 51.3774 25.5283 51.3774 27.5023C51.3774 29.4763 51.3774 30.4633 51.0549 31.2419C50.6249 32.28 49.8009 33.1045 48.7628 33.5345C47.9842 33.857 46.9961 33.857 45.022 33.857C43.048 33.857 42.061 33.857 41.2824 33.5345C40.2443 33.1045 39.4201 32.2805 38.9901 31.2424C38.6676 30.4639 38.6676 29.4758 38.6676 27.5017ZM17.4844 27.5017C17.4844 25.5277 17.4844 24.5407 17.8069 23.7621C18.2369 22.724 19.0611 21.8998 20.0992 21.4698C20.8778 21.1473 21.8648 21.1473 23.8388 21.1473C25.8128 21.1473 26.8009 21.1473 27.5795 21.4698C28.6176 21.8998 29.4416 22.724 29.8716 23.7621C30.1941 24.5407 30.1941 25.5283 30.1941 27.5023C30.1941 29.4763 30.1941 30.4633 29.8716 31.2419C29.4416 32.28 28.6176 33.1045 27.5795 33.5345C26.8009 33.857 25.8128 33.857 23.8388 33.857C21.8648 33.857 20.8778 33.857 20.0992 33.5345C19.0611 33.1045 18.2369 32.2805 17.8069 31.2424C17.4844 30.4639 17.4844 29.4758 17.4844 27.5017Z" stroke="white" strokeWidth="5.32422" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </div>
                      <div className='h-[80px] flex justify-center flex-col rounded-2xl bg-[#9898CB] p-3 text-white relative'>
                        <svg width="50" height="50" viewBox="0 0 111 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="55.46" cy="54.6104" r="54.5732" fill="#212133"/>
                          <path d="M28.7852 55.5506L50.9621 33.3736C57.5572 26.7785 68.2501 26.7785 74.8452 33.3736C81.4403 39.9687 81.4395 50.662 74.8444 57.2571L49.2556 82.8459C44.8589 87.2426 37.7316 87.242 33.3349 82.8453C28.9382 78.4485 28.9371 71.3208 33.3338 66.9241L58.9226 41.3353C61.121 39.1369 64.6871 39.1369 66.8855 41.3353C69.0838 43.5336 69.0823 47.097 66.8839 49.2954L44.707 71.4724" stroke="white" strokeWidth="5.32422" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className='h-[80px] flex justify-center flex-col rounded-2xl bg-[#9898CB] p-3 text-white relative'>
                        <svg width="50" height="50" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="54.6865" cy="54.9482" r="54.5732" fill="#212133"/>
                          <path d="M24.7667 26.9961C19.9931 26.9961 16.0859 30.9033 16.0859 35.6769V73.8724C16.0859 78.646 19.9931 82.5532 24.7667 82.5532H87.2684C92.042 82.5532 95.9492 78.646 95.9492 73.8724V35.6769C95.9492 30.9033 92.042 26.9961 87.2684 26.9961H24.7667ZM24.7667 30.4684H87.2684C90.1652 30.4684 92.4769 32.7801 92.4769 35.6769V73.8724C92.4769 76.7691 90.1652 79.0808 87.2684 79.0808H24.7667C21.87 79.0808 19.5583 76.7691 19.5583 73.8724V35.6769C19.5583 32.7801 21.87 30.4684 24.7667 30.4684ZM38.439 40.8854C38.2504 40.9096 38.0671 40.9645 37.8964 41.0481L27.4795 46.2566C27.0622 46.4581 26.742 46.817 26.5894 47.2545C26.4368 47.692 26.4642 48.1723 26.6657 48.5896C26.8671 49.0069 27.2261 49.327 27.6636 49.4796C28.1011 49.6323 28.5813 49.6048 28.9986 49.4034L38.656 44.5747L48.3134 49.4034C48.7307 49.6048 49.2109 49.6323 49.6484 49.4796C50.0859 49.327 50.4449 49.0069 50.6463 48.5896C50.8478 48.1723 50.8752 47.692 50.7226 47.2545C50.57 46.817 50.2498 46.4581 49.8325 46.2566L39.4156 41.0481C39.1127 40.9002 38.7734 40.8437 38.439 40.8854ZM59.0016 42.6215C58.5411 42.6863 58.1253 42.9313 57.8455 43.3027C57.5657 43.674 57.4448 44.1414 57.5096 44.6018C57.5743 45.0623 57.8194 45.4782 58.1907 45.758C58.5621 46.0378 59.0294 46.1586 59.4899 46.0938H83.7961C84.0262 46.0971 84.2546 46.0546 84.4681 45.9688C84.6816 45.883 84.8759 45.7556 85.0397 45.5941C85.2036 45.4326 85.3337 45.2401 85.4225 45.0278C85.5113 44.8156 85.557 44.5878 85.557 44.3577C85.557 44.1276 85.5113 43.8998 85.4225 43.6875C85.3337 43.4753 85.2036 43.2828 85.0397 43.1213C84.8759 42.9597 84.6816 42.8323 84.4681 42.7466C84.2546 42.6608 84.0262 42.6183 83.7961 42.6215H59.4899C59.4357 42.619 59.3814 42.619 59.3271 42.6215C59.2729 42.619 59.2186 42.619 59.1644 42.6215C59.1101 42.619 59.0558 42.619 59.0016 42.6215ZM59.0016 49.5662C58.5411 49.6309 58.1253 49.8759 57.8455 50.2473C57.5657 50.6187 57.4448 51.086 57.5096 51.5465C57.5743 52.0069 57.8194 52.4228 58.1907 52.7026C58.5621 52.9824 59.0294 53.1032 59.4899 53.0385H78.5876C78.8177 53.0417 79.0461 52.9992 79.2596 52.9134C79.4731 52.8276 79.6674 52.7003 79.8312 52.5387C79.9951 52.3772 80.1252 52.1847 80.214 51.9724C80.3028 51.7602 80.3485 51.5324 80.3485 51.3023C80.3485 51.0722 80.3028 50.8444 80.214 50.6322C80.1252 50.4199 79.9951 50.2274 79.8312 50.0659C79.6674 49.9043 79.4731 49.777 79.2596 49.6912C79.0461 49.6054 78.8177 49.5629 78.5876 49.5662H59.4899C59.4357 49.5636 59.3814 49.5636 59.3271 49.5662C59.2729 49.5636 59.2186 49.5636 59.1644 49.5662C59.1101 49.5636 59.0558 49.5636 59.0016 49.5662ZM32.9592 51.3023C31.4724 51.3023 30.1194 52.2769 29.6497 53.6895L28.3476 57.7044L28.239 57.9757V58.2469V59.9831V65.1916V66.9277V67.7958C28.239 68.275 28.6279 68.6639 29.1071 68.6639H32.5794C33.0586 68.6639 33.4475 68.275 33.4475 67.7958V66.9277H43.8645V67.7958C43.8645 68.275 44.2534 68.6639 44.7325 68.6639H48.2049C48.684 68.6639 49.0729 68.275 49.0729 67.7958V66.9277V65.1916V59.9831V58.2469V57.9757L48.9644 57.7044L47.6623 53.6895C47.1918 52.2745 45.8395 51.3023 44.3528 51.3023H32.9592ZM32.9592 54.7746H44.3528L45.5464 58.2469H31.7656L32.9592 54.7746ZM59.0016 56.5108C58.5411 56.5755 58.1253 56.8206 57.8455 57.1919C57.5657 57.5633 57.4448 58.0306 57.5096 58.4911C57.5743 58.9515 57.8194 59.3674 58.1907 59.6472C58.5621 59.927 59.0294 60.0479 59.4899 59.9831H83.7961C84.0262 59.9864 84.2546 59.9439 84.4681 59.8581C84.6816 59.7723 84.8759 59.6449 85.0397 59.4834C85.2036 59.3218 85.3337 59.1293 85.4225 58.9171C85.5113 58.7048 85.557 58.477 85.557 58.2469C85.557 58.0169 85.5113 57.7891 85.4225 57.5768C85.3337 57.3646 85.2036 57.1721 85.0397 57.0105C84.8759 56.849 84.6816 56.7216 84.4681 56.6358C84.2546 56.55 84.0262 56.5075 83.7961 56.5108H59.4899C59.4357 56.5082 59.3814 56.5082 59.3271 56.5108C59.2729 56.5082 59.2186 56.5082 59.1644 56.5108C59.1101 56.5083 59.0558 56.5083 59.0016 56.5108ZM31.7114 61.7193C32.6697 61.7193 33.4475 62.4971 33.4475 63.4554C33.4475 64.4138 32.6697 65.1916 31.7114 65.1916C30.753 65.1916 29.9752 64.4138 29.9752 63.4554C29.9752 62.4971 30.753 61.7193 31.7114 61.7193ZM45.6006 61.7193C46.559 61.7193 47.3368 62.4971 47.3368 63.4554C47.3368 64.4138 46.559 65.1916 45.6006 65.1916C44.6423 65.1916 43.8645 64.4138 43.8645 63.4554C43.8645 62.4971 44.6423 61.7193 45.6006 61.7193ZM59.0016 63.4554C58.5411 63.5202 58.1253 63.7652 57.8455 64.1366C57.5657 64.5079 57.4448 64.9753 57.5096 65.4357C57.5743 65.8962 57.8194 66.3121 58.1907 66.5919C58.5621 66.8717 59.0294 66.9925 59.4899 66.9277H78.5876C78.8177 66.931 79.0461 66.8885 79.2596 66.8027C79.4731 66.7169 79.6674 66.5895 79.8312 66.428C79.9951 66.2665 80.1252 66.074 80.214 65.8617C80.3028 65.6495 80.3485 65.4217 80.3485 65.1916C80.3485 64.9615 80.3028 64.7337 80.214 64.5214C80.1252 64.3092 79.9951 64.1167 79.8312 63.9552C79.6674 63.7936 79.4731 63.6663 79.2596 63.5805C79.0461 63.4947 78.8177 63.4522 78.5876 63.4554H59.4899C59.4357 63.4529 59.3814 63.4529 59.3271 63.4554C59.2729 63.4529 59.2186 63.4529 59.1644 63.4554C59.1101 63.4529 59.0558 63.4529 59.0016 63.4554Z" fill="white"/>
                        </svg>
                      </div>
                  </div>
                  <Carousel className='bg-[#9898CB] text-white mt-3 rounded-xl h-[127px]' centerMode={true} dynamicHeight={true} showThumbs={false}>
                      <div className='flex'>
                        <div className='h-full'>
                          <div className='text-xl'>Vehicle Worth</div>
                          <div className='text-2xl'> $ 30,400USD </div>
                        </div>
                        <div className='ml-4'>
                          <div className='text-xl'>Floor Plan</div>
                          <div className='text-2xl'> $ 11,400USD </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='h-full'>
                          <div className='text-xl'>Vehicle Worth</div>
                          <div className='text-2xl'> $ 30,400USD </div>
                        </div>
                        <div className='ml-4'>
                          <div className='text-xl'>Floor Plan</div>
                          <div className='text-2xl'> $ 111,400USD </div>
                        </div>
                      </div>
                  </Carousel>
                  <div className='flex justify-between mt-5'>
                      <div className='w-[120px] h-[120px] bg-[#9898CB] rounded-xl text-white flex items-center justify-center'>
                        <div className='flex justify-center items-center flex-col'>
                          <img src='/user1.png' width={40} height={40}/>
                          <p>Salesman</p>
                          <p>Earl Garris</p>
                        </div>
                      </div>
                      <div className='w-[120px] h-[120px] bg-[#9898CB] rounded-xl text-white flex items-center justify-center'>
                        <div className='flex justify-center items-center flex-col'>
                          <img src={'/capitalone.png'} width={40} height={40}/>
                          <p>Lender</p>
                          <p>Capital One</p>
                        </div>
                      </div>
                      <div className='w-[120px] h-[120px] bg-[#9898CB] rounded-xl text-white flex items-center justify-center'>
                        <div className='flex justify-center items-center flex-col'>
                          <img src='/DMV.png' width={40} height={40}/>
                          <p>DMV</p>
                          <p>Sacramento</p>
                        </div>
                      </div>
                  </div>
              </div>
              <div className='col-span-6 ml-5 rounded-xl flex flex-col items-center' style={{boxShadow: "rgba(0, 0, 0, 0.25) 1px 7px 6px 2px"}}>
                  <div className='grid grid-cols-5 w-full'>
                      <div className={`  flex items-center justify-center p-3 rounded-l-xl cursor-pointer ${tab === 'status' ? 'bg-[#FF3366] text-white' : 'bg-[#D6D6EB] text-[#5C5CAD]'}`} onClick={() => setActiveTab('status')} style={{borderRight:"1px solid",fontWeight:500,fontSize:18}}>
                        Title's Status
                      </div>
                      <div className={`${tab === 'holds' ? 'bg-[#FF3366] text-white' : 'bg-[#D6D6EB] text-[#5C5CAD]'}  flex items-center justify-center p-3 cursor-pointer`} onClick={() => setActiveTab('holds')} style={{borderRight:"1px solid",fontWeight:500,fontSize:18}}>
                        <img src='/hold_icon.png' width={35} height={35} className='!h-[35px]'/>
                        <span className='ml-2'>Holds</span>
                      </div>
                      <div className={`${tab === 'people' ? 'bg-[#FF3366] text-white' : 'bg-[#D6D6EB] text-[#5C5CAD]'} bg-[#D6D6EB] flex items-center justify-center p-3 cursor-pointer`} onClick={() => setActiveTab('people')} style={{borderRight:"1px solid",fontWeight:500,fontSize:18}}>
                        <img src='/people_icon.png' width={35} height={35} className='!h-[35px]'/>
                        <span className='ml-2'>People</span>
                      </div>
                      <div className={`${tab === 'history' ? 'bg-[#FF3366] text-white' : 'bg-[#D6D6EB] text-[#5C5CAD]'} bg-[#D6D6EB] flex items-center justify-center p-3 cursor-pointer`} onClick={() => setActiveTab('history')} style={{borderRight:"1px solid",fontWeight:500,fontSize:18}}>
                        <img src='/history_icon.png' width={35} height={35} className='!h-[35px]'/>
                        <span className='ml-2'>History</span>
                      </div>
                      <div className={`${tab === 'flow' ? 'bg-[#FF3366] text-white' : 'bg-[#D6D6EB] text-[#5C5CAD]'} bg-[#D6D6EB] flex items-center justify-center p-3 cursor-pointer rounded-r-xl`} onClick={() => setActiveTab('flow')}>
                        <img src='/flow_icon.png' width={35} height={35} className='!h-[35px]'/>
                      </div>
                  </div>
                  <div className='w-[98%] bg-[#D6D6EB] h-[43px] mt-[22px] rounded-lg flex items-center py-[7px] px-[10px]'>
                    <div className='flex flex-1'>
                      <div className='pending-badge w-[71px] h-[28px] rounded-md bg-[#FF3366] text-center text-white'>Pending</div>
                      <div className='pending-badge w-[71px] h-[28px] rounded-md bg-[#FF0000] text-center text-white ml-2'>3 Days</div>
                    </div>
                    <div className='flex'>
                      <img src='/share_icon.png' width={28} height={28}/>
                      <span>Actions</span>
                      <img src='/collapse_icon.png' width={28} height={28}/>
                    </div>
                  </div>
                  {
                    tab === 'status' && <TitleStatus />
                  }
                  {
                    tab === 'holds' && <TitleHolds title_id={id} />
                  }
                  {
                    tab === 'people' && <TitlePeople />
                  }
                  {
                    tab === 'history' && <TitleHistory />
                  }
                  {
                    tab === 'flow' && <TitleHolds />
                  }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleDetail;
