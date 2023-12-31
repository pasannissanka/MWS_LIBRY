const AppAccessEndPoints = {
  SIGN_UP_OTP: '/auth/signup/otp',
  VERIFY_SIGN_UP_OTP: '/auth/signup/otp-verify',
  SIGN_EMAIL: '/auth/signup/email',
  VERIFY_USERNAME: '/auth/signup/username',
  REGISTER: '/auth/signup/register',
  LOGIN: '/auth/login',
  ADD_NAME_BIRTH_DATE: '/profile/onboarding',
  USER_PROFILE: '/profile',
  SUGGEST_USERS: '/user/popular',
  PASSWORD_CHANGE_REQUEST: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/new-password',
};

export default AppAccessEndPoints;
