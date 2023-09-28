import {callService} from '..';
import Env from '../../config/environment';
import AppAccessEndPoints from '../../constants/ServiceEndPoints/AppAccessEndPoints';

export function fetchSignUpResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.SIGN_UP_OTP,
    'POST',
    null, //token
    body,
  );
}

export function fetchSignUpVerifyResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.VERIFY_SIGN_UP_OTP,
    'POST',
    null, //token
    body,
  );
}

export function fetchSignUpEmailResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.SIGN_EMAIL,
    'POST',
    null, //token
    body,
  );
}

export function fetchVerifyUsernameResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.VERIFY_USERNAME,
    'POST',
    null, //token
    body,
  );
}

export function fetchRegisterResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.REGISTER,
    'POST',
    null, //token
    body,
  );
}

export function fetchLoginResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.LOGIN,
    'POST',
    null, //token
    body,
  );
}

export function fetchAddNameBirthDateResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.ADD_NAME_BIRTH_DATE,
    'POST',
    token,
    body,
  );
}

export function fetchUserProfile(token: string) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.USER_PROFILE,
    'GET',
    token,
    null,
  );
}

export function fetchSuggestUsersProfile(token: string) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.SUGGEST_USERS,
    'GET',
    token,
    null,
  );
}
export function fetchChangePasswordReqResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.PASSWORD_CHANGE_REQUEST,
    'POST',
    null,
    body,
  );
}

export function fetchChangePasswordResponse(body: object) {
  return callService(
    Env.BASE_URL,
    AppAccessEndPoints.CHANGE_PASSWORD,
    'POST',
    null,
    body,
  );
}

export function followUser(id: string, token: string) {
  return callService(Env.BASE_URL, `/user/${id}/follow`, 'POST', token, null);
}

export function unFollowUser(id: string, token: string) {
  return callService(Env.BASE_URL, `/user/${id}/unfollow`, 'POST', token, null);
}
