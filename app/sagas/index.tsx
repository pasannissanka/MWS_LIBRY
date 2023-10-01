// Imports: Dependencies
import {all} from 'redux-saga/effects';
import {appAccessSagas} from '../features/AppAccess/sagas';
import {profileViewSagas} from '../features/ProfileView/sagas';
import {DashboardSagas} from '../features/Dashboard/sagas';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([...appAccessSagas, ...profileViewSagas, ...DashboardSagas]);
}
