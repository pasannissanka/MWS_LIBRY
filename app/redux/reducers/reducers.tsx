import createReducer from '../../helper/createReducer';
import {
  SET_DEVICE_ID,
  SET_END_POINT_ERROR,
  SET_SPINNER_VISIBLE,
} from '../action/type';

// Initial State
const initialState = {
  spinnerVisibility: false,
  deviceId: '',
  endPointErrorVisibility: false,
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
  [SET_END_POINT_ERROR](state: any, action: {payload: object}) {
    return {
      ...state,
      endPointErrorVisibility: action.payload,
    };
  },
});
