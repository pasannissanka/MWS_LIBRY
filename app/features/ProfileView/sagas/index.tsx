import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {
  addLink,
  changeEmail,
  changePassword,
  deleteLink,
  editLink,
  updateUserInfo,
} from './profileViewSaga';

export const profileViewSagas = [
  takeLatest(type.GET_ADD_LINK_RESPONSE, addLink),
  takeLatest(type.GET_DELETE_LINK_RESPONSE, deleteLink),
  takeLatest(type.GET_EDIT_LINK_RESPONSE, editLink),
  takeLatest(type.GET_USER_INFO_UPDATE_RESPONSE, updateUserInfo),
  takeLatest(type.GET_EMAIL_CHANGE_RESPONSE, changeEmail),
  takeLatest(type.GET_PASSWORD_CHANGE_RESPONSE, changePassword),
];
