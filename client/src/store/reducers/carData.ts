import {
    SET_VEHICLE_NUM,
    SET_VEHICLE_TYPE,
    SET_VEHICLE_BODY_TYPE_MODEL,
    SET_VEHICLE_YEAR_MODEL,
    SET_VEHICLE_MAKE,
    SET_VEHICLE_MODEL,
    SET_VEHICLE_PLATE_NUMBER,
    SET_VEHICLE_PLATE_MODEL,
    SET_VEHICLE_CLASS,
    SET_VEHICLE_TRUST_NUMBER,
    SET_VEHICLE_FEES_PAID,
    SET_VEHICLE_ISSUE_DATE,
    SET_VEHICLE_EXPIRATION_DATE,
    SET_VEHICLE_REGISTERED_OWNERS,
    SET_VEHICLE_ADDRESS,
    SET_VEHICLE_CITY,
    SET_VEHICLE_STATE,
    SET_VEHICLE1_URL,
    SET_VEHICLE2_URL,
    SET_VEHICLE3_URL,
    SET_VEHICLE_WORTH,
    SET_FLOOR_PLAN,
  } from '../types';
  
  const initialState = {
    number: null,
    type: null,
    body_type_model: null,
    year_model: null,
    make: null,
    model: null,
    plate_number: null,
    plate_model: null,
    class: null,
    trust_number: null,
    fees_paid: null,
    issue_date: null,
    expiration_date: null,
    registered_owners: null,
    address: null,
    city: null,
    state: null,
    cost: 0,
    floor_plan: 0,
  };
  
  function carMetadataReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_VEHICLE_NUM:
        return{
          ...state,
          number : payload
        }
      case SET_VEHICLE_TYPE:
        return{
          ...state,
          type : payload
        }
      case SET_VEHICLE_BODY_TYPE_MODEL:
        return{
          ...state,
          body_type_model : payload
        }
      case SET_VEHICLE_YEAR_MODEL:
        return{
          ...state,
          year_model : payload
        }
      case SET_VEHICLE_MAKE:
        return{
          ...state,
          make : payload
        }
      case SET_VEHICLE_MODEL:
        return{
          ...state,
          model : payload
        }
      case SET_VEHICLE_PLATE_NUMBER:
        return{
          ...state,
          plate_number : payload
        }
      case SET_VEHICLE_PLATE_MODEL:
        return{
          ...state,
          plate_model : payload
        }
      case SET_VEHICLE_CLASS:
        return{
          ...state,
          class : payload
        }
      case SET_VEHICLE_TRUST_NUMBER:
        return{
          ...state,
          trust_number : payload
        }
      case SET_VEHICLE_FEES_PAID:
        return{
          ...state,
          fees_paid : payload
        }
      case SET_VEHICLE_ISSUE_DATE:
        return{
          ...state,
          issue_date : payload
        }
      case SET_VEHICLE_EXPIRATION_DATE:
        return{
          ...state,
          expiration_date : payload
        }
      case SET_VEHICLE_REGISTERED_OWNERS:
        return{
          ...state,
          registered_owners : payload
        }
      case SET_VEHICLE_ADDRESS:
        return{
          ...state,
          address : payload
        }
      case SET_VEHICLE_CITY:
        return{
          ...state,
          city : payload
        }
      case SET_VEHICLE_STATE:
        return{
          ...state,
          state : payload
        }
      case SET_VEHICLE1_URL:
        return{
          ...state,
          vehicle1_image : payload
        }
      case SET_VEHICLE2_URL:
        return{
          ...state,
          vehicle2_image : payload
        }
      case SET_VEHICLE3_URL:
        return{
          ...state,
          vehicle3_image : payload
        }
      case SET_VEHICLE_WORTH:
        return{
          ...state,
          cost : payload
        }
      case SET_FLOOR_PLAN:
        return{
          ...state,
          floor_plan : payload
        }
      default:
        return state;
    }
  }
  
  export default carMetadataReducer;
  