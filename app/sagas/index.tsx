// Imports: Dependencies
import {all} from 'redux-saga/effects';
import {appAccessSagas} from '../features/AppAccess/sagas';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([...appAccessSagas]);
}
