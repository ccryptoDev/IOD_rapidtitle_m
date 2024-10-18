import {useEffect} from 'react';
import './index.view.css';
import AuthBG from 'components/common/AuthBg'
import LoginCard from 'components/common/LoginCard'
import setAuthToken from 'utils/setAuthToken';
import store from 'store/store';
import { LOGOUT } from 'store/types';
import { loadUser } from 'store/actions/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className='bg-white h-screen w-screen relative flex justify-center items-center'>
        <AuthBG />
        <LoginCard />
      </div>
    </>
  );
}

export default Login;
