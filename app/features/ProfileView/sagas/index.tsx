import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {
  addLink,
  changeEmail,
  changePassword,
  deleteAccount,
  deleteLink,
  editLink,
  getProfileImgUploadUrl,
  reorderLinks,
  updateUserInfo,
} from './profileViewSaga';

export const profileViewSagas = [
  takeLatest(type.GET_ADD_LINK_RESPONSE, addLink),
  takeLatest(type.GET_DELETE_LINK_RESPONSE, deleteLink),
  takeLatest(type.GET_EDIT_LINK_RESPONSE, editLink),
  takeLatest(type.GET_USER_INFO_UPDATE_RESPONSE, updateUserInfo),
  takeLatest(type.GET_EMAIL_CHANGE_RESPONSE, changeEmail),
  takeLatest(type.GET_PASSWORD_CHANGE_RESPONSE, changePassword),
  takeLatest(type.GET_PROFILE_IMAGE_UPLOADED_RESPONSE, getProfileImgUploadUrl),
  takeLatest(type.GET_REORDER_LINKS_RESPONSE, reorderLinks),
  takeLatest(type.GET_ACCOUNT_DELETE_RESPONSE, deleteAccount),
];
