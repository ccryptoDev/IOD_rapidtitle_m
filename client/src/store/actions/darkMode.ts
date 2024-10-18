import { setAlert } from './alert';
import {
  DARK_MODE
} from '../types';
// Get current users profile
export const setDartModeAction = (param: any) => async (dispatch: any) => {
  console.log(param);
  try {
    dispatch({
      type: DARK_MODE,
      payload: param
    });
  } catch (err) {
    
  }
};