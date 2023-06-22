import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {
  renderEnterEmailScreen,
  renderEnterOtpScreen,
  renderEnterPasswordScreen,
  renderLoginScreen,
  renderWelcomeLibryScreen,
} from './AppAccessSaga';

export const appAccessSagas = [
  takeLatest(type.GET_SIGN_UP_RESPONSE, renderEnterOtpScreen),
  takeLatest(type.GET_SIGN_UP_RESPONSE_VERIFY, renderEnterEmailScreen),
  takeLatest(type.GET_SIGN_UP_EMAIL_RESPONSE, renderEnterPasswordScreen),
  takeLatest(type.GET_REGISTER_RESPONSE, renderWelcomeLibryScreen),
  takeLatest(type.GET_ACCESS_TOKEN, renderLoginScreen),
];
