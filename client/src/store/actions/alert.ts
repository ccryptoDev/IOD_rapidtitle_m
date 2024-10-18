import { toast } from 'react-toastify';

export const setAlert = (msg: string, type='info') => {
  if(type === 'warning'){
    toast.error(msg);
    return;
  }
  toast.info(msg)
};
