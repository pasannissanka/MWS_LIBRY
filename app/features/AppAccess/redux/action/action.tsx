import {
  GET_OTP_MODAL_VISIBLE,
  GET_SIGN_UP_RESPONSE,
  GET_SIGN_UP_RESPONSE_VERIFY,
  SET_OTP_MODAL_VISIBLE,
  SET_SIGN_UP_RESPONSE,
  SET_SIGN_UP_RESPONSE_VERIFY,
} from './types';

export const setSignUpResponse = (response: object) => {
  return {
    type: SET_SIGN_UP_RESPONSE,
    payload: response,
  };
};
export const getSignUpResponse = (
  screen: 'EnterMobileNumberScreen' | 'EnterOTPScreen',
) => {
  return {
    type: GET_SIGN_UP_RESPONSE,
    payload: screen,
  };
};

export const setOtpModalVisible = (
  visibility: 'cannotSend' | 'sent' | 'invisible',
) => {
  return {
    type: SET_OTP_MODAL_VISIBLE,
    payload: visibility,
  };
};

export const getOtpModalVisible = () => {
  return {
    type: GET_OTP_MODAL_VISIBLE,
  };
};

export const setSignUpResponseVerify = (response: object) => {
  return {
    type: SET_SIGN_UP_RESPONSE_VERIFY,
    payload: response,
  };
};
export const getSignUpResponseVerify = (otp: string) => {
  return {
    type: GET_SIGN_UP_RESPONSE_VERIFY,
    payload: otp,
  };
};
