import {call, put, select} from 'redux-saga/effects';
import {
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';
import {
  fetchAddLinkResponse,
  fetchDeleteLinkResponse,
} from '../../../services/ProfileView/ProfileView';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {AccessToken} from '../redux/selectors';
import {setUserProfile} from '../../AppAccess/redux/action/action';

//GET ADD LINK RESPONSE
export function* addLink(action: any) {
  const requestBody = action.payload;
  const access_token: string = yield select(AccessToken);

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        id: string;
        email: string;
        username: string;
        phone_number: string;
        description: string;
        name: string;
        birth_date: string;
        userConfirmed: boolean;
        email_verified: boolean;
        phone_number_verified: boolean;
        followers: [];
        following: [];
        links: [
          {
            id: string;
            url: string;
            title: string;
            createdAt: string;
          },
        ];
        profilePicture: {};
        followersCount: 0;
        followingCount: 0;
      };
    } = yield call(fetchAddLinkResponse, access_token, requestBody);
    if (raw_response.status === 'SUCCESS') {
      yield put(setUserProfile(raw_response.data));
      RootNavigation.goBack();
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}

//GET ADD LINK RESPONSE
export function* deleteLink(action: any) {
  const id = action.payload;
  const access_token: string = yield select(AccessToken);

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        id: string;
        email: string;
        username: string;
        phone_number: string;
        description: string;
        name: string;
        birth_date: string;
        userConfirmed: boolean;
        email_verified: boolean;
        phone_number_verified: boolean;
        followers: [];
        following: [];
        links: [
          {
            id: string;
            url: string;
            title: string;
            createdAt: string;
          },
        ];
        profilePicture: {};
        followersCount: 0;
        followingCount: 0;
      };
    } = yield call(fetchDeleteLinkResponse, access_token, id);
    if (raw_response.status === 'SUCCESS') {
      yield put(setUserProfile(raw_response.data));
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}
