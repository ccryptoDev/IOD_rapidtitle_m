import React from 'react';
import Home from 'views/Home/';
import App from '../App';
import Login from 'views/Auth/Login';
import Signup from 'views/Auth/Signup';
import EmailVerify from 'views/Auth/EmailVerify';

import { RouteObject } from 'react-router-dom';

const appRoutes: Array<RouteObject> = [
  // {
  //   path: '/home',
  //   element: <App component={Home}/>,
  // },
  // {
  //   path: '/',
  //   element: <App component={Home}/>,
  // },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
  {
    path: '/auth/verify',
    element: <EmailVerify />,
  },
];
export default appRoutes;
