import {call, put, select} from 'redux-saga/effects';
import {setOtpModalVisible, setSignUpResponse, setSignUpResponseVerify} from '../redux/action/action';
import {fetchSignUpResponse, fetchSignUpVerifyResponse} from '../../../services/AppAccess/AppAccess';
import {DeviceId, MobileNumber, SignUpResponse} from '../redux/selectors';
import {
  setEndPointErrorVisible,
  setSpinnerVisible,
} from '../../../redux/action/action';

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

export function* renderEnterEmailScreen(action: any) {
  let response = {
    token: 'string',
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

    console.log(response);
  } catch (error) {
    yield put(setSpinnerVisible(false));
    yield put(setEndPointErrorVisible(true));

    console.log('APP_ACCESS_SAGA_ERROR =>', error);
  }
}
