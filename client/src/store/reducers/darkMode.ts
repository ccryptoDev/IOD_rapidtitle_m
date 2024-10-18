import {
    DARK_MODE
  } from '../types';
  
  const initialState = {
    isDark: false,
  };
  
  function darkModeReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case DARK_MODE:
        return{
          ...state,
          isDark : payload
        }
      default:
        return state;
    }
  }
  
  export default darkModeReducer;
  