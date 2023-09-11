import createReducer from '../../helper/createReducer';
import {
  SET_ALERT_BOX_VISIBILITY,
  SET_DEVICE_ID,
  SET_END_POINT_ERROR,
  SET_MOBILE_NUMBER,
  SET_SPINNER_VISIBLE,
  SET_USER_EMAIL,
  SET_USER_ENTERED_BIRTH_DATE,
  SET_USER_ENTERED_NAME,
} from '../action/type';

// Initial State
const initialState = {
  spinnerVisibility: false,
  deviceId: '',
  endPointErrorVisibility: false,
  mobileNumber: '',
  userEmail: '',
  userEnteredName: '',
  userEnteredBirthDate: '',
  alertBoxVisibility: {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
    negativeButton: '',
    onPressNegative: () => {},
    buttonTextStyle: {},
  },
};

export const commonReducer = createReducer(initialState, {
  [SET_DEVICE_ID](state: any, action: {payload: object}) {
    return {
      ...state,
      deviceId: action.payload,
    };
  },
  [SET_MOBILE_NUMBER](state: any, action: {payload: object}) {
    return {
      ...state,
      mobileNumber: action.payload,
    };
  },
  [SET_SPINNER_VISIBLE](state: any, action: {payload: object}) {
    return {
      ...state,
      spinnerVisibility: action.payload,
    };
  },
  [SET_END_POINT_ERROR](state: any, action: {payload: object}) {
    return {
      ...state,
      endPointErrorVisibility: action.payload,
    };
  },
  [SET_USER_EMAIL](state: any, action: {payload: object}) {
    return {
      ...state,
      userEmail: action.payload,
    };
  },
  [SET_USER_ENTERED_NAME](state: any, action: {payload: object}) {
    return {
      ...state,
      userEnteredName: action.payload,
    };
  },
  [SET_USER_ENTERED_BIRTH_DATE](state: any, action: {payload: object}) {
    return {
      ...state,
      userEnteredBirthDate: action.payload,
    };
  },
  [SET_ALERT_BOX_VISIBILITY](state: any, action: {payload: object}) {
    return {
      ...state,
      alertBoxVisibility: action.payload,
    };
  },
});
