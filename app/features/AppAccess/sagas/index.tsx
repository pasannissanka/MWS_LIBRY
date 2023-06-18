import {takeLatest} from 'redux-saga/effects';
import * as type from '../redux/action/types';
import {setUserName} from './appAccessSaga';

export const appAccessSagas = [takeLatest(type.GET_USER, setUserName)];
