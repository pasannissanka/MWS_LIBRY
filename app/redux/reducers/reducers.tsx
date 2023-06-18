import createReducer from '../../helper/createReducer';
import {SET_SPINNER_VISIBLE} from '../action/type';

// Initial State
const initialState = {
  spinnerVisibility: false,
};

export const commonReducer = createReducer(initialState, {
  [SET_SPINNER_VISIBLE](state: any, action: {payload: object}) {
    return {
      ...state,
      spinnerVisibility: action.payload,
    };
  },
});
