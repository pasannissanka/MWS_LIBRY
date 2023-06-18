// Imports: Dependencies
import {combineReducers} from 'redux';
import {appAccessReducer} from '../features/AppAccess/redux/reducers/reducers';

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
  appAccessReducer,
});

// Exports
export default rootReducer;
