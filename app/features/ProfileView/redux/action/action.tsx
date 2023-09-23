import {
  GET_ADD_LINK_RESPONSE,
  GET_DELETE_LINK_RESPONSE,
  GET_EDIT_LINK_RESPONSE,
  GET_USER_INFO_UPDATE_RESPONSE,
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
