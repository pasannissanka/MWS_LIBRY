export const DeviceId = (state: {commonReducer: {deviceId: string}}) =>
  state.commonReducer.deviceId;
export const MobileNumber = (state: {commonReducer: {mobileNumber: string}}) =>
  state.commonReducer.mobileNumber;
export const Email = (state: {commonReducer: {userEmail: string}}) =>
  state.commonReducer.userEmail;
export const SignUpResponse = (state: {
  appAccessReducer: {
    signUpResponse: {
      token: string;
    };
  };
}) => state.appAccessReducer.signUpResponse;

export const OtpVerifyResponse = (state: {
  appAccessReducer: {
    otpVerifyResponse: {
      token: string;
    };
  };
}) => state.appAccessReducer.otpVerifyResponse;
