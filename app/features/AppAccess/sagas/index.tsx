import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {
  changePassword,
  followUserSaga,
  renderAddYourLibryScreen,
  renderChangePasswordScreen,
  renderEnterEmailScreen,
  renderEnterOtpScreen,
  renderEnterUsernameScreen,
  renderLoginScreen,
  renderWelcomeLibryScreen,
  unfollowUserSaga,
} from './appAccessSaga';

export const appAccessSagas = [
  takeLatest(type.GET_SIGN_UP_RESPONSE, renderEnterOtpScreen),
  takeLatest(type.GET_SIGN_UP_RESPONSE_VERIFY, renderEnterEmailScreen),
  takeLatest(type.GET_SIGN_UP_EMAIL_RESPONSE, renderEnterUsernameScreen),
  takeLatest(type.GET_REGISTER_RESPONSE, renderWelcomeLibryScreen),
  takeLatest(type.GET_ACCESS_TOKEN, renderLoginScreen),
  takeLatest(type.GET_ADD_NAME_BIRTH_DATE_RESPONSE, renderAddYourLibryScreen),
  takeLatest(type.GET_PASSWORD_CHANGE_REQUEST, renderChangePasswordScreen),
  takeLatest(type.GET_CHANGE_PASSWORD_RESPONSE, changePassword),
  takeLatest(type.FOLLOW_USER_REQUEST, followUserSaga),
  takeLatest(type.UNFOLLOW_USER_REQUEST, unfollowUserSaga),
];
