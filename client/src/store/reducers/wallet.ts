import {
    WALLET_SELECTED
  } from '../types';
  
  const initialState = {
    wallet: '',
  };
  
  function walletReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case WALLET_SELECTED:
        return {
          ...state,
          wallet: payload
        };
      default:
        return state;
    }
  }
  
  export default walletReducer;
  