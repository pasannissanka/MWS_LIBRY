import {callService} from '..';
import Env from '../../config/environment';
import ProfileViewEndPoints from '../../constants/ServiceEndPoints/ProfileViewEndPoints';

export function fetchAddLinkResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.LINK,
    'POST',
    token,
    body,
  );
}

export function fetchDeleteLinkResponse(token: string, id: string) {
  return callService(
    Env.BASE_URL,
    `${ProfileViewEndPoints.LINK}${id}`,
    'DELETE',
    token,
    null,
  );
}

export function fetchEditLinkResponse(token: string, id: string, body: object) {
  return callService(
    Env.BASE_URL,
    `${ProfileViewEndPoints.LINK}${id}`,
    'POST',
    token,
    body,
  );
}

export function fetchReorderLinksResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.REORDER_LINKS,
    'PATCH',
    token,
    body,
  );
}

export function fetchUpdateUserInfoResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.UPDATE_PROFILE_INFO,
    'POST',
    token,
    body,
  );
}

export function fetchEmailChangeResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.EMAIL_CHANGE_RESPONSE,
    'POST',
    token,
    body,
  );
}

export function fetchPasswordChangeResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.CHANGE_PASSWORD,
    'POST',
    token,
    body,
  );
}

export function fetchProfileImgUploadUrl(token: string, param: object) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.GET_PROFILE_IMAGE_UPLOAD_URL,
    'GET',
    token,
    null,
    param,
  );
}

export function fetchUploadProfileImageResponse(url: string, imageUri: string) {
  return callService(url, null, 'PUT', null, imageUri, null);
}

export function fetchProfileImgUploadCompletedResponse(
  token: string,
  param: object,
) {
  return callService(
    Env.BASE_URL,
    ProfileViewEndPoints.PROFILE_IMAGE_UPLOAD_COMPLETED,
    'GET',
    token,
    null,
    param,
  );
}
