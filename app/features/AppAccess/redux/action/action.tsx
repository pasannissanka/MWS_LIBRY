import {
  GET_EMAIL_VALIDATION,
  GET_OTP_MODAL_VISIBLE,
  GET_OTP_VALIDATION,
  GET_PASSWORD_VALIDATION,
  GET_REGISTER_RESPONSE,
  GET_SIGN_UP_EMAIL_RESPONSE,
  GET_SIGN_UP_RESPONSE,
  GET_SIGN_UP_RESPONSE_VERIFY,
  SET_EMAIL_VALIDATION,
  SET_OTP_MODAL_VISIBLE,
  SET_OTP_VALIDATION,
  SET_PASSWORD_VALIDATION,
  SET_REGISTER_RESPONSE,
  SET_SIGN_UP_EMAIL_RESPONSE,
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

export const setSignUpEmailResponse = (response: object) => {
  return {
    type: SET_SIGN_UP_EMAIL_RESPONSE,
    payload: response,
  };
};
export const getSignUpEmailResponse = () => {
  return {
    type: GET_SIGN_UP_EMAIL_RESPONSE,
  };
};

export const setOtpValidation = (valid: boolean) => {
  return {
    type: SET_OTP_VALIDATION,
    payload: valid,
  };
};
export const getOtpValidation = () => {
  return {
    type: GET_OTP_VALIDATION,
  };
};

export const setEmailValidation = (valid: boolean) => {
  return {
    type: SET_EMAIL_VALIDATION,
    payload: valid,
  };
};

export const getEmailValidation = () => {
  return {
    type: GET_EMAIL_VALIDATION,
  };
};

export const setRegisterResponse = (response: object) => {
  return {
    type: SET_REGISTER_RESPONSE,
    payload: response,
  };
};

export const getRegisterResponse = (password: string) => {
  return {
    type: GET_REGISTER_RESPONSE,
    payload: password,
  };
};

export const setPasswordValidation = (valid: boolean) => {
  return {
    type: SET_PASSWORD_VALIDATION,
    payload: valid,
  };
};

export const getPasswordlValidation = () => {
  return {
    type: GET_PASSWORD_VALIDATION,
  };
};
