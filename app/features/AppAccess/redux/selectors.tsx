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

export const SignUpEmailResponse = (state: {
  appAccessReducer: {
    signUpEmailResponse: {
      token: string;
    };
  };
}) => state.appAccessReducer.signUpEmailResponse;

export const UsernameVerifyResponse = (state: {
  appAccessReducer: {
    usernameVerifyResponse: {
      token: string;
    };
  };
}) => state.appAccessReducer.usernameVerifyResponse;

export const BirthDate = (state: {
  commonReducer: {userEnteredBirthDate: string};
}) => state.commonReducer.userEnteredBirthDate;

export const UserEnteredName = (state: {
  commonReducer: {userEnteredName: string};
}) => state.commonReducer.userEnteredName;

export const AccessToken = (state: {appAccessReducer: {accessToken: string}}) =>
  state.appAccessReducer.accessToken;

export const RegisteredResponse = (state: {
  appAccessReducer: {registerResponse: object};
}) => state.appAccessReducer.registerResponse;

export const SuggestUsersProfils = (state: {
  appAccessReducer: {suggestUserProfils: object};
}) => state.appAccessReducer.suggestUserProfils;
