import api from '../../utils/api';
import { setAlert } from './alert';
import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
} from '../types';
// Get current users profile
export const getCurrentProfile = () => async (dispatch :any) => {
  try {
    const res = await api.get(`/v2/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err:any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.data.msg))
  }
};