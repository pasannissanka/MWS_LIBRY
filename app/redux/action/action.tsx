import {
  GET_DEVICE_ID,
  GET_END_POINT_ERROR,
  GET_SPINNER_VISIBLE,
  SET_DEVICE_ID,
  SET_END_POINT_ERROR,
  SET_SPINNER_VISIBLE,
} from './type';

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
