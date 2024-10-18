// client/src/pages/chat/messages.js
import './index.view.css';
import { useState, useEffect } from 'react';

interface IMessage {
  message: string;
  username: string;
  __createdtime__: number;
}
// interface SocketProps {
//   socket: 
// }

function Messages(props:any)  {
  const [messagesRecieved, setMessagesReceived] = useState<IMessage[]>([]);
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    
    props.socket.on('receive_message', (data: IMessage) => {
      console.log(data);
      setMessagesReceived((state) => [
          ...state, 
          {
            message: data.message,
            username: data.username,
            __createdtime__: data.__createdtime__,
          }
        ]
      )
    });

	// Remove event listener on component unmount
    return () => props.socket.off('receive_message');
  }, [])

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className='grid flex-col absolute bottom-[85px] py-[16px] px-[40px] max-h-[598px] overflow-y-auto' style={{width: 'calc(100% - 30px)'}}>
      {messagesRecieved.map((msg, i) => (
        <div className='grid mb-5' key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{msg.username}</span>
            <span>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
            <div className='bg-[#FF7095] justify-self-end text-[#010101] w-fit p-[23px] float-right' style={{borderRadius:'20px 20px 0px'}}>{msg.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;