import {call, put, select} from 'redux-saga/effects';
import {
  setAlertBoxVisibility,
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';
import {
  fetchAddLinkResponse,
  fetchDeleteLinkResponse,
  fetchEditLinkResponse,
  fetchUpdateUserInfoResponse,
} from '../../../services/ProfileView/ProfileView';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {AccessToken, UserProfile} from '../redux/selectors';
import {setUserProfile} from '../../AppAccess/redux/action/action';
import {UserProfileAttribute} from '../interfaces';

//GET ADD LINK RESPONSE
export function* addLink(action: any) {
  const requestBody = action.payload;
  const access_token: string = yield select(AccessToken);

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: [
        {
          id: string;
          url: string;
          title: string;
          createdAt: string;
          order: number;
        },
      ];
    } = yield call(fetchAddLinkResponse, access_token, requestBody);
    if (raw_response.status === 'SUCCESS') {
      const UpdatedUserProfile: UserProfileAttribute = yield select(
        UserProfile,
      );
      UpdatedUserProfile.links = raw_response.data;
      yield put(setUserProfile(UpdatedUserProfile));
      RootNavigation.navigate('EditLinksOrderScreen');
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}

//GET DELETE LINK RESPONSE
export function* deleteLink(action: any) {
  const id = action.payload;
  const access_token: string = yield select(AccessToken);

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: [
        {
          id: string;
          url: string;
          title: string;
          createdAt: string;
          order: number;
        },
      ];
    } = yield call(fetchDeleteLinkResponse, access_token, id);
    if (raw_response.status === 'SUCCESS') {
      const UpdatedUserProfile: UserProfileAttribute = yield select(
        UserProfile,
      );
      UpdatedUserProfile.links = raw_response.data;
      yield put(setUserProfile(UpdatedUserProfile));
      //RootNavigation.replace('EditLinksOrderScreen');
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}

//GET EDIT LINK RESPONSE
export function* editLink(action: any) {
  const id = action.payload.id;
  const requestBody = action.payload.requestBody;
  const access_token: string = yield select(AccessToken);

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: [
        {
          id: string;
          url: string;
          title: string;
          createdAt: string;
          order: number;
        },
      ];
    } = yield call(fetchEditLinkResponse, access_token, id, requestBody);
    if (raw_response.status === 'SUCCESS') {
      const UpdatedUserProfile: UserProfileAttribute = yield select(
        UserProfile,
      );
      UpdatedUserProfile.links = raw_response.data;
      yield put(setUserProfile(UpdatedUserProfile));
      RootNavigation.navigate('EditLinksOrderScreen');
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}

//GET UPDATE USER INFO RESPONSE
export function* updateUserInfo(action: any) {
  const requestBody = action.payload.requestBody;
  const t = action.payload.translation;
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
        followersCount: number;
        followingCount: number;
        profilePicture: object;
      };
    } = yield call(fetchUpdateUserInfoResponse, access_token, requestBody);

    if (raw_response.status === 'SUCCESS') {
      const UpdatedUserProfile: UserProfileAttribute = yield select(
        UserProfile,
      );

      UpdatedUserProfile.username = raw_response.data.username;
      UpdatedUserProfile.name = raw_response.data.name;
      UpdatedUserProfile.description = raw_response.data.description;

      yield put(setUserProfile(UpdatedUserProfile));
    } else {
      if (raw_response.message === 'USERNAME_ALREADY_EXISTS') {
        const editProfileInfoAlert = {
          visible: true,
          title: t(
            'profileView.EditProfileScreen.editProfileInfoAlertThree.title',
          ),
          description: t(
            'profileView.EditProfileScreen.editProfileInfoAlertThree.description',
          ),
          button: t(
            'profileView.EditProfileScreen.editProfileInfoAlertThree.button',
          ),
          onPress: () => {},
        };

        yield put(setAlertBoxVisibility(editProfileInfoAlert));
      }
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('PROFILE_VIEW_SAGA_ERROR =>', error);
  }
}
