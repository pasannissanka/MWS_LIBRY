export const DeviceId = (state: {commonReducer: {deviceId: string}}) =>
  state.commonReducer.deviceId;
export const MobileNumber = (state: {commonReducer: {mobileNumber: string}}) =>
  state.commonReducer.mobileNumber;
export const SignUpResponse = (state: {
  appAccessReducer: {
    signUpResponse: {
      token: string;
    };
  };
}) => state.appAccessReducer.signUpResponse;
