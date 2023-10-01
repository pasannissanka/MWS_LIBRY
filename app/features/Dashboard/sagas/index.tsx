import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {getUsersBySearch} from './DashboardSaga';

export const DashboardSagas = [
  takeLatest(type.GET_USERS_BY_SEARCH_RESPONSE, getUsersBySearch),
];
