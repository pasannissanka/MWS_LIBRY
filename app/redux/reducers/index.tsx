// Imports: Dependencies
import {combineReducers} from 'redux';
import {appAccessReducer} from '../../features/AppAccess/redux/reducers/reducers';
import {commonReducer} from './reducers';

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
  appAccessReducer,
  commonReducer,
});

// Exports
export default rootReducer;
