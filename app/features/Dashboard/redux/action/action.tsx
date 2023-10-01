import {
  GET_USERS_BY_SEARCH_RESPONSE,
  SET_USERS_BY_SEARCH_RESPONSE,
} from './types';

export const getUsersBySearch = (keyword: string) => {
  return {
    type: GET_USERS_BY_SEARCH_RESPONSE,
    payload: keyword,
  };
};
export const setUsersBySearch = (response: object) => {
  return {
    type: SET_USERS_BY_SEARCH_RESPONSE,
    payload: response,
  };
};
