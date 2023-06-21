import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {renderEnterEmailScreen, renderEnterOtpScreen} from './AppAccessSaga';

export const appAccessSagas = [
  takeLatest(type.GET_SIGN_UP_RESPONSE, renderEnterOtpScreen),
  takeLatest(type.GET_SIGN_UP_RESPONSE_VERIFY, renderEnterEmailScreen),
];
