import createReducer from '../../../../helper/createReducer';
import {SET_USER} from '../action/types';

// Initial State
const initialState = {
  user: 'xxx',
};

export const appAccessReducer = createReducer(initialState, {
  [SET_USER](state: any, action: {payload: string}) {
    return {
      ...state,
      user: action.payload,
    };
  },
});
