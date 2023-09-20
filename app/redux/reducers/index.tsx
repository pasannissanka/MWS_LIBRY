// Imports: Dependencies
import {combineReducers} from 'redux';
import {appAccessReducer} from '../../features/AppAccess/redux/reducers/reducers';
import {commonReducer} from './reducers';
import {profileViewReducer} from '../../features/ProfileView/redux/reducers/reducers';

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
  appAccessReducer,
  commonReducer,
  profileViewReducer,
});

// Exports
export default rootReducer;
