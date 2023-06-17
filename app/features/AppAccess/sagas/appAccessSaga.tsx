import {call, put, select} from 'redux-saga/effects';
import {setUser} from '../redux/action/action';

export function* setUserName(action: any) {
  const userName = action.payload;

  yield put(setUser(userName));
}
