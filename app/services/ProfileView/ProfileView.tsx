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
