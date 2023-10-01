import {call, put, select} from 'redux-saga/effects';
import {AccessToken} from '../redux/selectors';
import {
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';
import {GetUsersBySearchResponse} from '../../../services/models/responses';
import {fetchUsersBySearchResponse} from '../../../services/Dashboard/Dashboard';
import {GetUsersBySearchRequest} from '../../../services/models/requests';
import {setUsersBySearch} from '../redux/action/action';

export function* getUsersBySearch(action: any) {
  const keyword = action.payload;
  const access_token: string = yield select(AccessToken);

  const requestBody: GetUsersBySearchRequest = {
    page: 1,
    limit: 10,
    order: 'ASC',
    query: {
      name: keyword,
      exclude_logged_user: true,
      email: '',
      phone_number: '',
      username: keyword,
    },
  };

  try {
    const response: GetUsersBySearchResponse = yield call(
      fetchUsersBySearchResponse,
      access_token,
      requestBody,
    );

    if (response.status === 'SUCCESS') {
      if (response.data) {
        yield put(setUsersBySearch(response));
      } else {
        console.log(response.message);
      }
    } else {
      console.log(response.message);
    }
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}
