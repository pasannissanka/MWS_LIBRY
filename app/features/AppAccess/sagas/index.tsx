import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {renderEnterOtpScreen} from './appAccessSaga';

export const appAccessSagas = [
  takeLatest(type.GET_SIGN_UP_RESPONSE, renderEnterOtpScreen),
];
