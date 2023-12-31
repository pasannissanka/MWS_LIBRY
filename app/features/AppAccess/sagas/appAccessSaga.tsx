import {call, put, select} from 'redux-saga/effects';
import {
  setAccessToken,
  setAddNameBirthDateResponse,
  setChangePasswordResponse,
  setEmailValidation,
  setFllowUnfollowResponseStatus,
  setLoginStatus,
  setMobileNumberValidation,
  setOtpModalVisible,
  setOtpValidation,
  setPasswordChangeRequest,
  setPasswordValidation,
  setRefreshToken,
  setRegisterResponse,
  setSignUpEmailResponse,
  setSignUpResponse,
  setSignUpResponseVerify,
  setSuggestUsers,
  setUserProfile,
  setUsernameValidation,
  setVerifyUsernameResponse,
} from '../redux/action/action';
import {
  fetchAddNameBirthDateResponse,
  fetchChangePasswordReqResponse,
  fetchChangePasswordResponse,
  fetchLoginResponse,
  fetchRegisterResponse,
  fetchSignUpEmailResponse,
  fetchSignUpResponse,
  fetchSignUpVerifyResponse,
  fetchSuggestUsersProfile,
  fetchUserProfile,
  fetchVerifyUsernameResponse,
  followUser,
  unFollowUser,
} from '../../../services/AppAccess/AppAccess';
import {
  AccessToken,
  BirthDate,
  DeviceId,
  Email,
  MobileNumber,
  OtpVerifyResponse,
  RegisteredResponse,
  SignUpEmailResponse,
  SignUpResponse,
  SuggestUsersProfils,
  UserEnteredName,
  UserProfile,
  UsernameVerifyResponse,
} from '../redux/selectors';
import {
  setAlertBoxVisibility,
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {UserProfileAttribute} from '../../ProfileView/interfaces';

//NAVIGATE ENTER OTP SCREEN
export function* renderEnterOtpScreen(action: any) {
  const triggeredScreen = action.payload;
  const mobile_number: string = yield select(MobileNumber);
  const device_id: string = yield select(DeviceId);

  const requestBody = {
    mobile_number: mobile_number,
    device_id: device_id,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        token: string;
      };
      error: null;
    } = yield call(fetchSignUpResponse, requestBody);
    if (raw_response.message === 'OTP_SENT') {
      const response = raw_response.data;
      yield put(setSignUpResponse(response));

      if (triggeredScreen === 'EnterOTPScreen') {
        yield put(setOtpModalVisible('sent'));
      } else {
        RootNavigation.replace('EnterOTPScreen');
      }
    } else if (raw_response.message === 'PHONE_NUMBER_EXISTS') {
      yield put(setMobileNumberValidation('REGISTERED'));
    } else {
      const cannotSendOtpAlertBoxContent = {
        visible: true,
        title: 'Can’t send a new code',
        description: 'Please wait 1 minute before requesting a new code.',
        button: 'OK',
        onPress: () => {},
      };

      yield put(setAlertBoxVisibility(cannotSendOtpAlertBoxContent));
    }

    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE ENTER EMAIL SCREEN
export function* renderEnterEmailScreen(action: any) {
  let response = {
    token: '',
  };

  const otp = action.payload;
  const sign_up_response: {token: string} = yield select(SignUpResponse);
  const device_id: string = yield select(DeviceId);

  const requestBody = {
    device_id: device_id,
    otp_code: otp,
    token: sign_up_response.token,
  };

  try {
    yield put(setSpinnerVisible(true));

    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        token: string;
      };
      error: null;
    } = yield call(fetchSignUpVerifyResponse, requestBody);

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;

      yield put(setSignUpResponseVerify(response));
      yield put(setOtpValidation(true));

      //Navigate Enter Email Screen
      RootNavigation.replace('EnterEmailScreen');
    } else {
      yield put(setOtpValidation(false));
    }

    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE ENTER USERNAME SCREEN
export function* renderEnterUsernameScreen() {
  let response = {
    token: '',
  };
  const email: string = yield select(Email);
  const verify_otp_response: {token: string} = yield select(OtpVerifyResponse);
  const device_id: string = yield select(DeviceId);

  const requestBody = {
    device_id: device_id,
    email: email,
    token: verify_otp_response.token,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        token: string;
      };
      error: null;
    } = yield call(fetchSignUpEmailResponse, requestBody);

    if (raw_response.message === 'EMAIL_ADDED') {
      response = raw_response.data;

      yield put(setSignUpEmailResponse(response));
      yield put(setEmailValidation('VALID'));

      //Navigate Enter Username Screen
      RootNavigation.replace('EnterUsernameScreen');
    } else if (raw_response.message === 'EMAIL_TAKEN') {
      yield put(setEmailValidation('REGISTERED'));
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE ENTER PASSWORD SCREEN
export function* renderEnterPasswordScreen(action: any) {
  let response = {
    token: '',
  };
  const username: string = action.payload;
  const sign_up_email_response: {token: string} = yield select(
    SignUpEmailResponse,
  );
  const device_id: string = yield select(DeviceId);
  const requestBody = {
    device_id: device_id,
    username: username,
    token: sign_up_email_response.token,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        token: string;
      };
      error: null;
    } = yield call(fetchVerifyUsernameResponse, requestBody);

    if (raw_response.message === 'USERNAME_ADDED') {
      response = raw_response.data;

      yield put(setVerifyUsernameResponse(response));
      yield put(setUsernameValidation('VALID'));

      //Navigate Enter Username Screen
      RootNavigation.replace('EnterPasswordScreen');
    } else if (raw_response.message === 'USERNAME_TAKEN') {
      yield put(setUsernameValidation('TAKEN'));
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE WELCOME LIBRY SCREEN
export function* renderWelcomeLibryScreen(action: any) {
  let response = {
    user: {},
    tokens: {
      accessToken: '',
      refreshToken: '',
    },
  };
  const verify_username_response: {token: string} = yield select(
    UsernameVerifyResponse,
  );
  const device_id: string = yield select(DeviceId);
  const currentUserInfo: object = yield select(UserProfile);

  const requestBody = {
    token: verify_username_response.token,
    password: action.payload,
    device_id: device_id,
    is_marketing_enabled: true,
  };

  try {
    yield put(setSpinnerVisible(true));

    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: {
        user: UserProfileAttribute;
        tokens: {
          accessToken: string;
          refreshToken: string;
        };
      };
    } = yield call(fetchRegisterResponse, requestBody);

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;

      yield put(setRegisterResponse(response));

      yield put(setUserProfile({...currentUserInfo, ...response.user}));
      yield put(setPasswordValidation('VALID'));

      //Navigate Enter Password Screen
      RootNavigation.replace('WelcomeLibryScreen');
    } else {
      yield put(setPasswordValidation('INVALID'));
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER LOGIN SCREEN
export function* renderLoginScreen(action: any) {
  let response = {
    accessToken: '',
    refreshToken: '',
  };

  const email: string = yield select(Email);

  const requestBody = {
    email: email,
    password: action.payload,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: 'LOGIN_SUCCESS' | 'USER_NOT_FOUND' | 'PASSWORD_INVALID';
      data: {
        accessToken: string;
        refreshToken: string;
      };
    } = yield call(fetchLoginResponse, requestBody);

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      yield put(setAccessToken(response.accessToken));
      yield put(setRefreshToken(response.refreshToken));
      yield put(setLoginStatus('LOGIN_SUCCESS'));
      yield* renderUserPorfile();
    } else {
      if (raw_response.message === 'PASSWORD_INVALID') {
        yield put(setLoginStatus('PASSWORD_INVALID'));
      } else {
        yield put(setLoginStatus('USER_NOT_FOUND'));
      }
    }

    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//ADD NAME & BIRTHDAY
export function* renderAddYourLibryScreen() {
  let response = {};

  const name: string = yield select(UserEnteredName);
  const birth_date: string = yield select(BirthDate);
  const currentUserInfo: object = yield select(UserProfile);
  const registered_response: {
    user: UserProfileAttribute;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  } = yield select(RegisteredResponse);

  const requestBody = {
    name: name,
    birth_date: birth_date,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: '';
      data: UserProfileAttribute;
    } = yield call(
      fetchAddNameBirthDateResponse,
      registered_response.tokens.accessToken,
      requestBody,
    );

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      yield put(setAddNameBirthDateResponse(response));
      yield put(setUserProfile({...currentUserInfo, ...response}));
      yield* fetchSuggestUsers();
    } else {
    }

    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER USER PROFILE
function* renderUserPorfile() {
  let response = {};

  const emailVerifyAlertBoxContent = {
    visible: true,
    title: 'Verify your email',
    description:
      'We have sent an email to your email address to verify your email addrss.',
    button: 'OK',
    onPress: () => {},
  };

  const access_token: string = yield select(AccessToken);
  const currentUserInfo: object = yield select(UserProfile);
  try {
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: UserProfileAttribute;
    } = yield call(fetchUserProfile, access_token);

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      yield put(setUserProfile({...currentUserInfo, ...response}));

      //Navigate Dashboard Screen
      RootNavigation.replace('DashboardScreen');

      if (!raw_response.data.email_verified) {
        yield put(setAlertBoxVisibility(emailVerifyAlertBoxContent));
      }
    }
  } catch (error) {
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE ADD YOUR LIBRY SCREEN
function* fetchSuggestUsers() {
  let response = [
    {
      id: '',
      email: '',
      phone_number: '',
      username: '',
      name: '',
      birth_date: '',
      userConfirmed: false,
      email_verified: false,
      phone_number_verified: false,
      followers: [],
      following: [],
      isFollowed: false,
    },
  ];

  const registered_response: {
    user: {
      id: string;
      name: string;
      email: string;
      email_verified: boolean;
      phone_number: string;
      username: string;
      phone_number_verified: boolean;
      userConfirmed: boolean;
      birth_date: string;
      followers: [];
      following: [];
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  } = yield select(RegisteredResponse);

  try {
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: '';
      data: [];
    } = yield call(
      fetchSuggestUsersProfile,
      registered_response.tokens.accessToken,
    );
    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      yield put(setSuggestUsers(response));

      //Navigate Add Your Libry Screen
      RootNavigation.navigate('AddYourLibryScreen');
    }
  } catch (error) {
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//NAVIGATE CHANGE PASSWORD SCREEN
export function* renderChangePasswordScreen() {
  let response = {
    CodeDeliveryDetails: {
      AttributeName: 'phone_number',
      DeliveryMedium: 'SMS',
      Destination: '',
    },
  };

  const email: string = yield select(Email);

  const requestBody = {
    email: email,
  };

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: '';
      data: {
        CodeDeliveryDetails: {
          AttributeName: 'phone_number';
          DeliveryMedium: 'SMS';
          Destination: '+*******6828';
        };
      };
    } = yield call(fetchChangePasswordReqResponse, requestBody);
    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      yield put(setPasswordChangeRequest('OTP_SENT'));
      RootNavigation.replace('ChangePasswordScreen');

      const verificationCodeAlertBoxContent = {
        visible: true,
        title: 'Verification Code',
        description: `We have sent a verification code to your ${response.CodeDeliveryDetails.AttributeName.replace(
          '_',
          ' ',
        )}`,
        button: 'OK',
        onPress: () => {},
      };

      yield put(setAlertBoxVisibility(verificationCodeAlertBoxContent));
    } else {
      yield put(setPasswordChangeRequest('USER_NOT_FOUND'));
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//FETCH CONFIRM PASSWORD CHANGE RESPONSE
export function* changePassword(action: any) {
  let response = '';

  try {
    yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: string;
      data: string;
    } = yield call(fetchChangePasswordResponse, action.payload);

    if (raw_response.status === 'SUCCESS') {
      response = raw_response.data;
      if (response === 'SUCCESS') {
        RootNavigation.replace('LoginScreen');
        yield put(setChangePasswordResponse('SUCCESS'));
      }
    } else {
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

// FOLLOW USER
export function* followUserSaga(action: any) {
  const registered_response: {
    user: {};
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  } = yield select(RegisteredResponse);
  const currentUserInfo: object = yield select(UserProfile);

  const user = action.payload;
  try {
    //yield put(setSpinnerVisible(true));
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: 'USER_FOLLOWED';
      data: UserProfileAttribute;
    } = yield call(followUser, user.id, registered_response.tokens.accessToken);
    if (raw_response.message === 'USER_FOLLOWED') {
      const suggestUsersProfils: [
        {
          id: '';
          email: '';
          phone_number: '';
          username: '';
          name: '';
          birth_date: '';
          userConfirmed: boolean;
          email_verified: boolean;
          phone_number_verified: boolean;
          followers: [];
          following: [];
          isFollowed: boolean;
        },
      ] = yield select(SuggestUsersProfils);

      suggestUsersProfils[user.index].isFollowed = true;

      yield put(setSuggestUsers(suggestUsersProfils));
      yield put(setUserProfile({...currentUserInfo, ...raw_response.data}));

      yield put(setFllowUnfollowResponseStatus('USER_FOLLOWED'));
    } else {
      yield put(setFllowUnfollowResponseStatus('FAILURE'));
    }
    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//UNFOLLOW USER
export function* unfollowUserSaga(action: any) {
  const registered_response: {
    user: {};
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  } = yield select(RegisteredResponse);
  const currentUserInfo: object = yield select(UserProfile);
  const user = action.payload;
  try {
    const raw_response: {
      status: 'ERROR' | 'SUCCESS';
      message: 'USER_UNFOLLOWED';
      data: UserProfileAttribute;
    } = yield call(
      unFollowUser,
      user.id,
      registered_response.tokens.accessToken,
    );

    if (raw_response.message === 'USER_UNFOLLOWED') {
      const suggestUsersProfils: [
        {
          id: '';
          email: '';
          phone_number: '';
          username: '';
          name: '';
          birth_date: '';
          userConfirmed: boolean;
          email_verified: boolean;
          phone_number_verified: boolean;
          followers: [];
          following: [];
          isFollowed: boolean;
        },
      ] = yield select(SuggestUsersProfils);

      suggestUsersProfils[user.index].isFollowed = false;

      yield put(setSuggestUsers(suggestUsersProfils));
      yield put(setUserProfile({...currentUserInfo, ...raw_response.data}));
      yield put(setFllowUnfollowResponseStatus('USER_UNFOLLOWED'));
    } else {
      yield put(setFllowUnfollowResponseStatus('FAILURE'));
    }

    yield put(setSpinnerVisible(false));
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}
