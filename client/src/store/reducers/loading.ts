import {
    SET_LOADING
  } from '../types';
  
  const initialState = {
    loading: false,
  };
  
  function loadingReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_LOADING:
        return {
          ...state,
          loading: payload
        };
      default:
        return state;
    }
  }
  
  export default loadingReducer;
  