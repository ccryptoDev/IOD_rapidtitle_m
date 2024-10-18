import api from '../../utils/api'
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  WALLET_SELECTED,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import store from '../store';
// Load User
export const loadUser = async () => {
  try {
    const res = await api.get('/v2/auth');
    
    store.dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    store.dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = async (formData: any) => {
  try {
    const res = await api.post('/v2/users/', formData);
      store.dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      setAlert("Registered Successfully");
      return true;
  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => setAlert(error.msg,'warning'));
    }
    store.dispatch({
      type: REGISTER_FAIL
    });
    return false;
  }
};

// Login User
export const login = async (data: any) =>  {
  try {
    const res = await api.post('/v2/auth', data);
    const {success} =  res.data;
    if(success){
      setAlert("Logged In");
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      await loadUser();
      return true
    }
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => setAlert(error.msg, 'danger'));
    }

    store.dispatch({
      type: LOGIN_FAIL
    });
    return false;
  }
};

// Login User
export const setWallet = async (data: any) => {
  try {
    const res = await api.post('/v2/auth/wallet', data);
    const {success} =  res.data;
    if(success){
      setAlert("Selected Address: "+ data.wallet);
      store.dispatch({
        type: WALLET_SELECTED,
        payload: data.wallet
      });
      return true
    }
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => setAlert(error.msg, 'danger'));
    }

    return false;
  }
};

// Logout
export const logout = () => store.dispatch({ type: LOGOUT });
