import {GET_USER, SET_USER} from './types';

export const setUser = (name: string) => {
  return {
    type: SET_USER,
    payload: name,
  };
};
export const getUser = (name: string) => {
  return {
    type: GET_USER,
    payload: name,
  };
};
