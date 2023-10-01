import createReducer from '../../../../helper/createReducer';
import {SET_USERS_BY_SEARCH_RESPONSE} from '../action/types';
const initialState = {
  searchedUsersResponse: {
    status: '',
    message: '',
    data: [],
    metadata: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};

export const DashboardReducer = createReducer(initialState, {
  [SET_USERS_BY_SEARCH_RESPONSE](state: any, action: {payload: object}) {
    return {
      ...state,
      searchedUsersResponse: action.payload,
    };
  },
});
