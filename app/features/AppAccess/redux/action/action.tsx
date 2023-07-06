import {
  FOLLOW_USER_REQUEST,
  GET_ACCESS_TOKEN,
  GET_ADD_NAME_BIRTH_DATE_RESPONSE,
  GET_CHANGE_PASSWORD_RESPONSE,
  GET_EMAIL_VALIDATION,
  GET_OTP_MODAL_VISIBLE,
  GET_OTP_VALIDATION,
  GET_PASSWORD_CHANGE_REQUEST,
  GET_PASSWORD_VALIDATION,
  GET_REFRESH_TOKEN,
  GET_REGISTER_RESPONSE,
  GET_SIGN_UP_EMAIL_RESPONSE,
  GET_SIGN_UP_RESPONSE,
  GET_SIGN_UP_RESPONSE_VERIFY,
  GET_USER_PROFILE,
  SET_ACCESS_TOKEN,
  SET_ADD_NAME_BIRTH_DATE_RESPONSE,
  SET_CHANGE_PASSWORD_RESPONSE,
  SET_EMAIL_VALIDATION,
  SET_LOGIN_STATUS,
  SET_OTP_MODAL_VISIBLE,
  SET_OTP_VALIDATION,
  SET_PASSWORD_CHANGE_REQUEST,
  SET_PASSWORD_VALIDATION,
  SET_REFRESH_TOKEN,
  SET_REGISTER_RESPONSE,
  SET_SIGN_UP_EMAIL_RESPONSE,
  SET_SIGN_UP_RESPONSE,
  SET_SIGN_UP_RESPONSE_VERIFY,
  SET_SUGGEST_USERS,
  SET_USER_PROFILE,
  UNFOLLOW_USER_REQUEST,
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

export const setAccessToken = (token: string) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: token,
  };
};

export const getAccessToken = (password: string) => {
  return {
    type: GET_ACCESS_TOKEN,
    payload: password,
  };
};

export const setRefreshToken = (token: string) => {
  return {
    type: SET_REFRESH_TOKEN,
    payload: token,
  };
};

export const getRefreshToken = () => {
  return {
    type: GET_REFRESH_TOKEN,
  };
};

export const setAddNameBirthDateResponse = (response: object) => {
  return {
    type: SET_ADD_NAME_BIRTH_DATE_RESPONSE,
    payload: response,
  };
};

export const getAddNameBirthDateResponse = () => {
  return {
    type: GET_ADD_NAME_BIRTH_DATE_RESPONSE,
  };
};

export const setUserProfile = (response: object) => {
  return {
    type: SET_USER_PROFILE,
    payload: response,
  };
};

export const getUserProfile = () => {
  return {
    type: GET_USER_PROFILE,
  };
};

export const setSuggestUsers = (response: any) => {
  return {
    type: SET_SUGGEST_USERS,
    payload: response,
  };
};

export const getSuggestUsers = () => {
  return {
    type: SET_SUGGEST_USERS,
  };
};

export const setPasswordChangeRequest = (
  response: 'OTP_SENT' | 'USER_NOT_FOUND' | 'UNDEFINED',
) => {
  return {
    type: SET_PASSWORD_CHANGE_REQUEST,
    payload: response,
  };
};

export const getPasswordChangeRequest = () => {
  return {
    type: GET_PASSWORD_CHANGE_REQUEST,
  };
};

export const setChangePasswordResponse = (
  response: 'SUCCESS' | 'FAILURE' | 'UNDEFINED',
) => {
  return {
    type: SET_CHANGE_PASSWORD_RESPONSE,
    payload: response,
  };
};

export const getChangePasswordResponse = (reqBody: object) => {
  return {
    type: GET_CHANGE_PASSWORD_RESPONSE,
    payload: reqBody,
  };
};

export const followUserResponse = (id: string) => {
  return {
    type: FOLLOW_USER_REQUEST,
    payload: id,
  };
};

export const unfollowUserResponse = (id: string) => {
  return {
    type: UNFOLLOW_USER_REQUEST,
    payload: id,
  };
};

export const setLoginStatus = (
  status: 'LOGIN_SUCCESS' | 'USER_NOT_FOUND' | 'PASSWORD_INVALID' | 'UNDEFINED',
) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: status,
  };
};
