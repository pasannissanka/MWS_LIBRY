import createReducer from '../../../../helper/createReducer';
import {
  SET_EMAIL_VALIDATION,
  SET_OTP_MODAL_VISIBLE,
  SET_OTP_VALIDATION,
  SET_PASSWORD_VALIDATION,
  SET_REGISTER_RESPONSE,
  SET_SIGN_UP_EMAIL_RESPONSE,
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
  signUpEmailResponse: {
    token: '',
  },
  validOtp: true,
  validEmail: true,
  registerResponse: {
    user: {
      id: '',
      name: '',
      email: '',
      email_verified: false,
      phone_number: '',
      phone_number_verified: false,
      userConfirmed: false,
      birth_date: '',
      followers: [],
      following: [],
    },
    token: '',
  },
  accessToken: '',
  validPassword: true,
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
  [SET_SIGN_UP_EMAIL_RESPONSE](state: any, action: {payload: object}) {
    return {
      ...state,
      signUpEmailResponse: action.payload,
    };
  },
  [SET_OTP_VALIDATION](state: any, action: {payload: object}) {
    return {
      ...state,
      validOtp: action.payload,
    };
  },
  [SET_EMAIL_VALIDATION](state: any, action: {payload: object}) {
    return {
      ...state,
      validEmail: action.payload,
    };
  },
  [SET_REGISTER_RESPONSE](state: any, action: {payload: object}) {
    return {
      ...state,
      registerResponse: action.payload,
    };
  },
  [SET_PASSWORD_VALIDATION](state: any, action: {payload: object}) {
    return {
      ...state,
      validPassword: action.payload,
    };
  },
});
