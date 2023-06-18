import {
  GET_DEVICE_ID,
  GET_OTP_MODAL_VISIBLE,
  GET_SIGN_UP_RESPONSE,
  SET_DEVICE_ID,
  SET_OTP_MODAL_VISIBLE,
  SET_SIGN_UP_RESPONSE,
} from './types';

export const setDeviceId = (deviceId: string) => {
  return {
    type: SET_DEVICE_ID,
    payload: deviceId,
  };
};
export const getDeviceId = (deviceId: string) => {
  return {
    type: GET_DEVICE_ID,
    payload: deviceId,
  };
};

export const setSignUpResponse = (response: object) => {
  return {
    type: SET_SIGN_UP_RESPONSE,
    payload: response,
  };
};
export const getSignUpResponse = (mobileNumber: string) => {
  return {
    type: GET_SIGN_UP_RESPONSE,
    payload: mobileNumber,
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
