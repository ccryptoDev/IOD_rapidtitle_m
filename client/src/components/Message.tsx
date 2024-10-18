import React from 'react';
import MessageIcon from '../assets/img/message_icon.png'
import { useLocation } from 'react-router-dom';

export const Message = () => {
  const location = useLocation();

  return (
    <img src={location.pathname.indexOf('/community') > -1 ? '/message_active.png' : MessageIcon} />
  );
};
