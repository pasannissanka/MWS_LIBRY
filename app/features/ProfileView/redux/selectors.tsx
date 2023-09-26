export const AccessToken = (state: {appAccessReducer: {accessToken: string}}) =>
  state.appAccessReducer.accessToken;

export const UserProfile = (state: {appAccessReducer: {userProfile: object}}) =>
  state.appAccessReducer.userProfile;

export const LinkUpdatedRefKey = (state: {
  profileViewReducer: {linkUpdatedRefKey: number};
}) => state.profileViewReducer.linkUpdatedRefKey;
