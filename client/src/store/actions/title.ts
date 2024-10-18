import api from '../../utils/api'
import { setAlert } from './alert';
import { SET_TITLES } from 'store/types';
import { SET_HOLDINGTITLES } from 'store/types';
import store from '../store';

// Load Titles
export const loadTitles = async (filterMode: string) => {
  try {
    let res;
    if (filterMode === 'all') {
      res = await api.get('/v2/titles');
    } else {
      const status = filterMode === 'pending' ? 0 : 1;
      res = await api.get(`/v2/titles/filter?status=${status}`);
    }

    store.dispatch({
      type: SET_TITLES,
      payload: res.data
    });
    return res.data;
  } catch (err: any) {
    setAlert(err);
  }
};

export const loadTitles_search = async (search_title: any) => {
  try {
    const res = await api.get(`/v2/titles/search?search_title=${search_title}`);
    store.dispatch({
      type: SET_TITLES,
      payload: res.data
    });
    return res.data;
  } catch (err: any) {
    setAlert(err);
  }
};

export const loadHoldingTitles = async (title_id: any) => {
  try {
    console.log(title_id)
    const res = await api.get(`/v2/holdingtitles?title_id=${title_id}`);
    store.dispatch({
      type: SET_HOLDINGTITLES,
      payload: res.data
    });
    return res.data;
  } catch (err: any) {
    setAlert(err);
  }
};

export const loadHoldingTitles1 = async (title_id:any) => {
  try {
    const res = await api.get(`/v2/holdingtitles/test?title_id=${title_id}`);
    store.dispatch({
      type: SET_HOLDINGTITLES,
      payload: res.data
    });
    return res.data;
  } catch (err: any) {
    setAlert(err);
  }
};

// Load Holen Titles
export const loadHoldenTitles = async () => {
  return [
    {
      hold:'Car has a Lien to be Paid',
      //holden status 0: pending, 1: completed
      status: 0,
      responsible: {
        image: '/sacramento.png',
        description: 'Sacramento'
      },
      days: 31,
      notes: '',
    },
    {
      hold:'Car had a Registered Owner',
      status: 1,
      responsible: {
        image: '/user1.png',
        description: 'Earl Garris'
      },
      days: 8,
      notes: '',
    },
    {
      hold:'Car has a Title at Purchase',
      status: 1,
      responsible: {
        image: '/user2.png',
        description: 'Melina B.'
      },
      days: 5,
      notes: '',
    },
    {
      hold:'Documents are Signed and In-State',
      status: 1,
      responsible: {
        image: '/DMV.png',
        description: 'DMV'
      },
      days: 22,
      notes: '',
    },
    {
      hold:'Correct Documents Signed by the Dealer.',
      status: 1,
      responsible: {
        image: '/sacramento_blue.png',
        description: 'Sacramento'
      },
      days: 12,
      notes: '',
    },
    {
      hold:'Bank sent the correct Title',
      status: 1,
      responsible: {
        image: '/capitalone.png',
        description: 'Capitalone'
      },
      days: 22,
      notes: '',
    },
    {
      hold:'Car has a Lien to be Paid',
      status: 0,
      responsible: {
        image: '/sacramento.png',
        description: 'Sacramento'
      },
      days: 31,
      notes: '',
    },
  ];
};

export const loadHoldenHistory = async () => {
  return [
    {
      salesperson:{
        avatar: '/user1.png',
        permission: 'Dealership NC',
        name: 'Susan Jenkins'
      },
      stk_no:'PC4171',
      customer_name: 'James D. Owens',
      deal_num: '108237',
      sold_date: '04/09/2022',
      title_value: '$29,869',
    },
    {
      salesperson:{
        avatar: '/user2.png',
        permission: 'Seller/Owner',
        name: 'James D. Owens'
      },
      stk_no:'PC4170',
      customer_name: 'Bernadette Eve',
      deal_num: '108236',
      sold_date: '04/09/2022',
      title_value: '$39,969',
    },
    {
      salesperson:{
        avatar: '/user3.png',
        permission: 'Seller/Owner',
        name: 'Susan Jenkins'
      },
      stk_no:'PC4171',
      customer_name: 'James D. Owens',
      deal_num: '108237',
      sold_date: '04/09/2022',
      title_value: '$29,869',
    },
    {
      salesperson:{
        avatar: '/user2.png',
        permission: 'Dealership NC',
        name: 'Susan Jenkins'
      },
      stk_no:'PC4173',
      customer_name: 'James D. Owens',
      deal_num: '108237',
      sold_date: '04/09/2022',
      title_value: '$26,869',
    },
    {
      salesperson:{
        avatar: '/user1.png',
        permission: 'Dealership NC',
        name: 'Susan Jenkins'
      },
      stk_no:'PC4181',
      customer_name: 'James D. Owens',
      deal_num: '108227',
      sold_date: '04/09/2022',
      title_value: '$25,869',
    },
  ];
};

export const loadHoldenPeople = async () => {
  return [
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/capitalone_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Capital One',
      seller_name: 'BANK',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Max Hindenburg',
    },
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/DMV_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Los Angeles',
      seller_name: 'DMV',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Jhon Miller JR',
    },
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/capitalone_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Capital One',
      seller_name: 'BANK',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Max Hindenburg',
    },
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/capitalone_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Capital One',
      seller_name: 'BANK',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Max Hindenburg',
    },
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/capitalone_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Capital One',
      seller_name: 'BANK',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Max Hindenburg',
    },
    {
      sales_image:'/capitalone_wide.png',
      sales_logo:'/capitalone_lg.png',
      bank_id: '1010RTHQLA',
      seller: 'Capital One',
      seller_name: 'BANK',
      title_accociated: 'K9015A',
      affiliation_date: '09/11/2022',
      representive: 'Max Hindenburg',
    },
  ];
};
