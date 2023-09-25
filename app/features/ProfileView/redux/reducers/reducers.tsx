import createReducer from '../../../../helper/createReducer';
import {SET_LINK_UPDATED_REFERNCE_KEY} from '../action/types';

const initialState = {
  linkUpdatedRefKey: 0,
};

export const profileViewReducer = createReducer(initialState, {
  [SET_LINK_UPDATED_REFERNCE_KEY](state: any, action: {payload: object}) {
    return {
      ...state,
      linkUpdatedRefKey: action.payload,
    };
  },
});
