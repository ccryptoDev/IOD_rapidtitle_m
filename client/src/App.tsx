import React, {useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//routing module
import PrivateRoute from './components/routing/PrivateRoute';
//redux module
import { loadUser } from './store/actions/auth';
import store from './store/store';
import { LOGOUT } from './store/types';
import setAuthToken from './utils/setAuthToken';
//toastify settings
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from 'views/Home';
import Login from 'views/Auth/Login';
import Signup from 'views/Auth/Signup';
import EmailVerify from 'views/Auth/EmailVerify';
import { ProSidebarProvider } from 'react-pro-sidebar';
import NewTitle from './views/NewTitle/index';
import OtherInfo from 'views/OtherInfo';
import TitleDetail from 'components/common/TitleDetail';
import Spinner from 'components/spinner/Spinner';
import Integrations from 'components/common/Integrations';
import Community from 'components/common/Community';
import DigitalIdentity from 'components/common/DigitalIdentity';
import DigitalIdentityDetail from 'components/common/DigitalIdentityDetail';
import DigitalIdentityDmv from 'components/common/DigitalIdentityDmv';
import DigitalIdentityDmvDetail from 'components/common/DigitalIdentityDmvDetail';


function App() {

  useEffect( () => {
    const startFunc = async () => {
        // check for token in LS when app first runs
        if (localStorage.rapid_token) {
          // if there is a token set axios headers for all requests
          setAuthToken(localStorage.rapid_token);
        }
        // try to fetch a user, if no token or invalid token we
        // will get a 401 response from our API
        if((window.location.pathname !== '/auth/login')){
          await loadUser();
        }
        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
          if (!localStorage.rapid_token) store.dispatch({ type: LOGOUT });
        });
    }
    startFunc();
  }, []);

  return (
    <>
      <Router>
        <ToastContainer />
        <Spinner />
        <ProSidebarProvider>
          <Routes>
            <Route path='/' element={<PrivateRoute component={Home} />}/>
            <Route path='/auth/login' element={<Login />}/>
            <Route path='/auth/signup' element={<Signup />} />
            <Route path="/verify" element={<EmailVerify />} />    
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path='/createtitle' element={<PrivateRoute component={NewTitle} />} />
            <Route path='/createtitle/otherinfo' element={<PrivateRoute component={OtherInfo} />} />
            <Route path="/titleDetail/:id" element={<PrivateRoute component={TitleDetail} />} />
            <Route path="/integrations" element={<PrivateRoute component={Integrations} />} />
            <Route path="/community" element={<PrivateRoute component={Community} />} />
            <Route path="/community/digital_identity" element={<PrivateRoute component={DigitalIdentity} />} />
            <Route path="/community/digital_identity/detail/:id" element={<PrivateRoute component={DigitalIdentityDetail} />} />
            <Route path="/community/digital_identity_dmv" element={<PrivateRoute component={DigitalIdentityDmv} />} />
            <Route path="/community/digital_identity_dmv/detail/:id" element={<PrivateRoute component={DigitalIdentityDmvDetail} />} />
          </Routes>
        </ProSidebarProvider>
      </Router>
    </>
  );
}

export default App;
