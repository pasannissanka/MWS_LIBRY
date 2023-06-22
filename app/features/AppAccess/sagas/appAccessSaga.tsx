import {call, put, select} from 'redux-saga/effects';
import {
  setAccessToken,
  setEmailValidation,
  setOtpModalVisible,
  setOtpValidation,
  setPasswordValidation,
  setRefreshToken,
  setRegisterResponse,
  setSignUpEmailResponse,
  setSignUpResponse,
  setSignUpResponseVerify,
} from '../redux/action/action';
import {
  fetchLoginResponse,
  fetchRegisterResponse,
  fetchSignUpEmailResponse,
  fetchSignUpResponse,
  fetchSignUpVerifyResponse,
} from '../../../services/AppAccess/AppAccess';
import {
  DeviceId,
  Email,
  MobileNumber,
  OtpVerifyResponse,
  SignUpEmailResponse,
  SignUpResponse,
} from '../redux/selectors';
import {
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
    console.log('RES BODY', response);
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
    token: '',
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

    //Navigate Dashboard Screen
    RootNavigation.replace('DashboardScreen');
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}
