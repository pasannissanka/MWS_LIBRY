export const AccessToken = (state: {appAccessReducer: {accessToken: string}}) =>
  state.appAccessReducer.accessToken;

export const UserProfile = (state: {appAccessReducer: {userProfile: object}}) =>
  state.appAccessReducer.userProfile;
