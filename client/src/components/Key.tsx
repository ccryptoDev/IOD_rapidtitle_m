import React from 'react';
import Key from '../assets/img/key_icon.png';
import { useLocation } from 'react-router-dom';

export const KeyIcon = () => {
  const location = useLocation()
  return (
    <img src={location.pathname.indexOf('/home') > -1?'/key_white.png':Key}/>
  );
};
