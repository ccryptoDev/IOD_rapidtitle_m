import api from '../../utils/api'
import { setAlert } from './alert';
import { SET_MESSAGES } from 'store/types';
import store from '../store';

// Load Titles
export const loadMessages = async (room_id: any) => {
  try {
    console.log(room_id,'redux action')
    const res = await api.get(`/v2/messages?roomid=${room_id}`);
    store.dispatch({
      type: SET_MESSAGES,
      payload: res.data
    });
    return res.data;
  } catch (err: any) {
    console.log(err)
    setAlert(err);
  }
};