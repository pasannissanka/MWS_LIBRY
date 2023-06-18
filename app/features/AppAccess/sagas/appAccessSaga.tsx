import {call, put, select} from 'redux-saga/effects';
import {setOtpModalVisible, setSignUpResponse} from '../redux/action/action';
import {fetchSignUpResponse} from '../../../services/AppAccess/AppAccess';
import {DeviceId} from '../redux/selectors';
import {setSpinnerVisible} from '../../../redux/action/action';

//RENDER ENTER OTP SCREEN
export function* renderEnterOtpScreen(action: any) {
  let response = {
    token: '',
  };

  const mobile_number = action.payload;
  const device_id: string = yield select(DeviceId);
  console.log(device_id);

  const requestBody = {
    mobile_number: mobile_number,
    device_id: device_id,
  };
  try {
    yield put(setSpinnerVisible(true));
    response = yield call(fetchSignUpResponse, requestBody);
    yield put(setSignUpResponse(response));
    yield put(setSpinnerVisible(false));
  } catch (error) {
    console.log('APP_ACCESS_SAGA_ERROR =>', error);
    yield put(setSpinnerVisible(false));
    yield put(setOtpModalVisible('cannotSend'));
  }
}
