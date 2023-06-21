import createReducer from '../../../../helper/createReducer';
import {
  SET_OTP_MODAL_VISIBLE,
  SET_SIGN_UP_RESPONSE,
  SET_SIGN_UP_RESPONSE_VERIFY,
} from '../action/types';

// Initial State
const initialState = {
  signUpResponse: {
    token: '',
  },
  otpModalVisibility: 'invisible',
  otpVerifyResponse: {
    token: '',
  },
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
  [SET_SIGN_UP_RESPONSE_VERIFY](state: any, action: {payload: object}) {
    return {
      ...state,
      otpVerifyResponse: action.payload,
    };
  },
});
