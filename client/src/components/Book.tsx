import React from 'react';
import BookIcon from '../assets/img/book_icon.png'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Book = () => {
  const location = useLocation();
  const activeMenu = useSelector((state: any) => state.profile.activeMenu);
  return (
    <img src={location.pathname.indexOf('/book') > -1?'/key_white.svg':BookIcon} />
  );
};
