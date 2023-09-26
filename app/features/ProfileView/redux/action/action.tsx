import {
  GET_ADD_LINK_RESPONSE,
  GET_DELETE_LINK_RESPONSE,
  GET_EDIT_LINK_RESPONSE,
  GET_EMAIL_CHANGE_RESPONSE,
  GET_PASSWORD_CHANGE_RESPONSE,
  GET_USER_INFO_UPDATE_RESPONSE,
  SET_LINK_UPDATED_REFERNCE_KEY,
  SET_PORFILE_INFO_UPDATED_REFERNCE_KEY,
} from './types';

export const getAddLinkResponse = (request: object) => {
  return {
    type: GET_ADD_LINK_RESPONSE,
    payload: request,
  };
};

export const getDeleteLinkResponse = (request: string) => {
  return {
    type: GET_DELETE_LINK_RESPONSE,
    payload: request,
  };
};

export const getEditLinkResponse = (payload: object) => {
  return {
    type: GET_EDIT_LINK_RESPONSE,
    payload: payload,
  };
};

export const getUserInfoUpdateResponse = (payload: object) => {
  return {
    type: GET_USER_INFO_UPDATE_RESPONSE,
    payload: payload,
  };
};

export const getEmailChangeResponse = (payload: object) => {
  return {
    type: GET_EMAIL_CHANGE_RESPONSE,
    payload: payload,
  };
};

export const getPasswordChangeResponse = (request: object) => {
  return {
    type: GET_PASSWORD_CHANGE_RESPONSE,
    payload: request,
  };
};

export const setLinkUpdatedRefKey = (key: number) => {
  return {
    type: SET_LINK_UPDATED_REFERNCE_KEY,
    payload: key,
  };
};

export const setProfileInfoUpdatedRefKey = (key: number) => {
  return {
    type: SET_PORFILE_INFO_UPDATED_REFERNCE_KEY,
    payload: key,
  };
};
