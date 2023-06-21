import {callService} from '..';
import Env from '../../config/environment';
import AppAccessEndPoints from '../../constants/ServiceEndPoints/ServiceEndPoints';

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
