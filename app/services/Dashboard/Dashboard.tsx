import {callService} from '..';
import Env from '../../config/environment';
import DashboardEndPoints from '../../constants/ServiceEndPoints/DashboardEndPoints';

export function fetchUsersBySearchResponse(token: string, body: object) {
  return callService(
    Env.BASE_URL,
    DashboardEndPoints.SEARCH_USERS,
    'POST',
    token,
    body,
    null,
  );
}
