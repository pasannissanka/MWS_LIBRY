import {GET_SPINNER_VISIBLE, SET_SPINNER_VISIBLE} from './type';

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
