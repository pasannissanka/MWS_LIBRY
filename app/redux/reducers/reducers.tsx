import createReducer from '../../helper/createReducer';
import {SET_DEVICE_ID, SET_SPINNER_VISIBLE} from '../action/type';

// Initial State
const initialState = {
  spinnerVisibility: false,
  deviceId: '',
};

export const commonReducer = createReducer(initialState, {
  [SET_DEVICE_ID](state: any, action: {payload: object}) {
    return {
      ...state,
      deviceId: action.payload,
    };
  },
  [SET_SPINNER_VISIBLE](state: any, action: {payload: object}) {
    return {
      ...state,
      spinnerVisibility: action.payload,
    };
  },
});
