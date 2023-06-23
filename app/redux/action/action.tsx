import {
  GET_DEVICE_ID,
  GET_END_POINT_ERROR,
  GET_MOBILE_NUMBER,
  GET_SPINNER_VISIBLE,
  GET_USER_EMAIL,
  GET_USER_ENTERED_BIRTH_DATE,
  GET_USER_ENTERED_NAME,
  SET_DEVICE_ID,
  SET_END_POINT_ERROR,
  SET_MOBILE_NUMBER,
  SET_SPINNER_VISIBLE,
  SET_USER_EMAIL,
  SET_USER_ENTERED_BIRTH_DATE,
  SET_USER_ENTERED_NAME,
} from './type';

export const setDeviceId = (deviceId: string) => {
  return {
    type: SET_DEVICE_ID,
    payload: deviceId,
  };
};
export const getDeviceId = () => {
  return {
    type: GET_DEVICE_ID,
  };
};

export const setMobileNumber = (number: string) => {
  return {
    type: SET_MOBILE_NUMBER,
    payload: number,
  };
};
export const getMobileNumber = () => {
  return {
    type: GET_MOBILE_NUMBER,
  };
};

export const setSpinnerVisible = (visibility: boolean) => {
  return {
    type: SET_SPINNER_VISIBLE,
    payload: visibility,
  };
};

export const getSpinnerVisible = () => {
  return {
    type: GET_SPINNER_VISIBLE,
  };
};

export const setEndPointErrorVisible = (visibility: boolean) => {
  return {
    type: SET_END_POINT_ERROR,
    payload: visibility,
  };
};

export const getEndPointErrorVisible = () => {
  return {
    type: GET_END_POINT_ERROR,
  };
};

export const setUserEmail = (email: string) => {
  return {
    type: SET_USER_EMAIL,
    payload: email,
  };
};

export const getUserEmail = () => {
  return {
    type: GET_USER_EMAIL,
  };
};

export const setUserEnteredName = (name: string) => {
  return {
    type: SET_USER_ENTERED_NAME,
    payload: name,
  };
};

export const getUserEnteredName = () => {
  return {
    type: GET_USER_ENTERED_NAME,
  };
};

export const setUserEnteredBirthDate = (date: string) => {
  return {
    type: SET_USER_ENTERED_BIRTH_DATE,
    payload: date,
  };
};

export const getUserEnteredBirthDate = () => {
  return {
    type: GET_USER_ENTERED_BIRTH_DATE,
  };
};
