import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    WALLET_SELECTED
  } from '../types';
  
  const initialState = {
    token: localStorage.getItem('rapid_token'),
    isAuthenticated: null,
    loading: true,
    wallet: '',
    user: null
  };
  
  function authReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          wallet: payload.wallet
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          wallet: payload.wallet
        };
      case ACCOUNT_DELETED:
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          wallet: null
        };
      default:
        return state;
    }
  }
  
  export default authReducer;
  