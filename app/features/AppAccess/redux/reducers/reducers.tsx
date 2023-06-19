import createReducer from '../../../../helper/createReducer';
import {SET_OTP_MODAL_VISIBLE, SET_SIGN_UP_RESPONSE} from '../action/types';

// Initial State
const initialState = {
  signUpResponse: {
    token: '',
  },
  otpModalVisibility: 'invisible',
};

export const appAccessReducer = createReducer(initialState, {
  [SET_SIGN_UP_RESPONSE](state: any, action: {payload: object}) {
    return {
      ...state,
      signUpResponse: action.payload,
    };
  },
  [SET_OTP_MODAL_VISIBLE](state: any, action: {payload: object}) {
    return {
      ...state,
      otpModalVisibility: action.payload,
    };
  },
});
