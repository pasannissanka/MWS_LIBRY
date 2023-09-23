import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {addLink, deleteLink, editLink} from './profileViewSaga';

export const profileViewSagas = [
  takeLatest(type.GET_ADD_LINK_RESPONSE, addLink),
  takeLatest(type.GET_DELETE_LINK_RESPONSE, deleteLink),
  takeLatest(type.GET_EDIT_LINK_RESPONSE, editLink),
];
