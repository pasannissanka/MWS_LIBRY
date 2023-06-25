import {call, put, select} from 'redux-saga/effects';
import {
  setAccessToken,
  setAddNameBirthDateResponse,
  setEmailValidation,
  setOtpModalVisible,
  setOtpValidation,
  setPasswordValidation,
  setRefreshToken,
  setRegisterResponse,
  setSignUpEmailResponse,
  setSignUpResponse,
  setSignUpResponseVerify,
  setSuggestUsers,
  setUserProfile,
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
  UserEnteredName,
} from '../redux/selectors';
import {
  setAlertBoxVisibility,
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';
import * as RootNavigation from '../../../navigation/RootNavigation';

//RENDER ENTER OTP SCREEN
export function* renderEnterOtpScreen(action: any) {
  let response = {
    token: '',
  };

  const triggeredScreen = action.payload;
  const mobile_number: string = yield select(MobileNumber);
  const device_id: string = yield select(DeviceId);

  const requestBody = {
    mobile_number: mobile_number,
    device_id: device_id,
  };
  try {
    yield put(setSpinnerVisible(true));
    response = yield call(fetchSignUpResponse, requestBody);
    yield put(setSignUpResponse(response));
    yield put(setSpinnerVisible(false));

    if (triggeredScreen === 'EnterOTPScreen') {
      yield put(setOtpModalVisible('sent'));
    }
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setOtpModalVisible('cannotSend'));

    //yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER ENTER EMAIL SCREEN
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
    response = yield call(fetchSignUpVerifyResponse, requestBody);

    yield put(setSignUpResponseVerify(response));
    yield put(setSpinnerVisible(false));
    yield put(setOtpValidation(true));

    //Navigate Enter Email Screen
    RootNavigation.navigate('EnterEmailScreen');
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setOtpValidation(false));

    //yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER ENTER PASSWORD SCREEN
export function* renderEnterPasswordScreen() {
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
    response = yield call(fetchSignUpEmailResponse, requestBody);

    yield put(setSignUpEmailResponse(response));
    yield put(setSpinnerVisible(false));
    yield put(setEmailValidation(true));
    //Navigate Enter Password Screen
    RootNavigation.navigate('EnterPasswordScreen');
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEmailValidation(false));
    // yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER WELCOME LIBRY SCREEN
export function* renderWelcomeLibryScreen(action: any) {
  let response = {
    user: {
      id: '',
      name: '',
      email: '',
      email_verified: false,
      phone_number: '',
      phone_number_verified: false,
      userConfirmed: false,
      birth_date: '',
      followers: [],
      following: [],
    },
    tokens: {
      accessToken: '',
      refreshToken: '',
    },
  };
  const sign_up_email_response: {token: string} = yield select(
    SignUpEmailResponse,
  );
  const device_id: string = yield select(DeviceId);

  const requestBody = {
    token: sign_up_email_response.token,
    password: action.payload,
    device_id: device_id,
  };

  try {
    yield put(setSpinnerVisible(true));
    response = yield call(fetchRegisterResponse, requestBody);

    yield put(setRegisterResponse(response));
    yield put(setSpinnerVisible(false));
    yield put(setPasswordValidation(true));
    //Navigate Enter Password Screen
    RootNavigation.navigate('WelcomeLibryScreen');
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setPasswordValidation(false));
    // yield put(setEndPointErrorVisible(true));

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
    response = yield call(fetchLoginResponse, requestBody);

    yield put(setAccessToken(response.accessToken));
    yield put(setRefreshToken(response.refreshToken));
    yield put(setSpinnerVisible(false));
    console.log('RESPONSE', response);
    yield* renderUserPorfile();
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER ADD YOUR LIBRY SCREEN
export function* renderAddYourLibryScreen() {
  let response = {
    id: '',
    name: '',
    email: '',
    email_verified: false,
    phone_number: '',
    phone_number_verified: false,
    userConfirmed: false,
    birth_date: '',
    followers: [],
    following: [],
  };

  const name: string = yield select(UserEnteredName);
  const birth_date: string = yield select(BirthDate);
  const registered_response: {
    user: {
      id: string;
      name: string;
      email: string;
      email_verified: boolean;
      phone_number: string;
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

  const requestBody = {
    name: name,
    birth_date: birth_date,
  };

  try {
    yield put(setSpinnerVisible(true));
    response = yield call(
      fetchAddNameBirthDateResponse,
      registered_response.tokens.accessToken,
      requestBody,
    );

    yield put(setAddNameBirthDateResponse(response));
    yield put(setSpinnerVisible(false));

    yield* fetchSuggestUsers();
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER USER PROFILE
function* renderUserPorfile() {
  let response = {
    id: '',
    name: '',
    email: '',
    email_verified: false,
    phone_number: '',
    phone_number_verified: false,
    userConfirmed: false,
    birth_date: '',
    followers: [],
    following: [],
  };

  const emailVerifyAlertBoxContent = {
    visible: true,
    title: 'Verify your email',
    description:
      'We have sent an email to your email address to verify your email addrss.',
    button: 'OK',
    onPress: () => {},
  };

  const access_token: string = yield select(AccessToken);
  try {
    response = yield call(fetchUserProfile, access_token);
    yield put(setUserProfile(response));

    //Navigate Dashboard Screen
    RootNavigation.replace('DashboardScreen');

    if (!response.email_verified) {
      yield put(setAlertBoxVisibility(emailVerifyAlertBoxContent));
    }
  } catch (error) {
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//FETCH USERS FOR SUGGESTION
function* fetchSuggestUsers() {
  let response = [
    {
      id: '',
      email: '',
      phone_number: '',
      name: '',
      birth_date: '',
      userConfirmed: false,
      email_verified: false,
      phone_number_verified: false,
      followers: [],
      following: [],
    },
  ];

  const registered_response: {
    user: {
      id: string;
      name: string;
      email: string;
      email_verified: boolean;
      phone_number: string;
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
    console.log('ACCESS TOKEN ->', registered_response.tokens.accessToken);
    response = yield call(
      fetchSuggestUsersProfile,
      registered_response.tokens.accessToken,
    );
    yield put(setSuggestUsers(response));
    console.log('RESPONSE', response);

    //Navigate Add Your Libry Screen
    RootNavigation.navigate('AddYourLibryScreen');
  } catch (error) {
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}

//RENDER CHANGE PASSWORD SCREEN
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
    response = yield call(fetchChangePasswordReqResponse, requestBody);

    yield put(setSpinnerVisible(false));

    RootNavigation.navigate('ChangePasswordScreen');

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
    response = yield call(fetchChangePasswordResponse, action.payload);

    yield put(setSpinnerVisible(false));

    if (response === 'SUCCESS') {
      RootNavigation.replace('LoginScreen');
    }
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}
