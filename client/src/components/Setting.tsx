import React from 'react';
import SettingIcon from '../assets/img/setting_icon.png'
import { useLocation } from 'react-router-dom';

export const Setting = () => {
  const location = useLocation();
  return (
    <img src={location.pathname.indexOf('/integrations') > -1?'/integration_white.png':SettingIcon} />
  );
};
