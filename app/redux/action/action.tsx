import {
  GET_DEVICE_ID,
  GET_SPINNER_VISIBLE,
  SET_DEVICE_ID,
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
