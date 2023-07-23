import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Images} from '../../../theme';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryTextInput from '../components/PrimaryTextInput';
import Collapsible from 'react-native-collapsible';
import {emailFormatevalidate} from '../../../helper/formatters';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEndPointErrorVisible,
  setUserEmail,
} from '../../../redux/action/action';
import {
  getAccessToken,
  setChangePasswordResponse,
  setEmailValidation,
  setLoginStatus,
  setPasswordValidation,
} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setChangePasswordResponse('UNDEFINED'));
    }, 5000);

    const backAction = () => {
      onPressBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );
  const LoginStatus = useSelector(
    (state: any) => state.appAccessReducer.loginStatus,
  );
  const ChangePasswordStatus = useSelector(
    (state: any) => state.appAccessReducer.confirmChangePasswordStatus,
  );
  const PasswordValidation = useSelector(
    (state: any) => state.appAccessReducer.passwordValidation,
  );
  const EmailValidation = useSelector(
    (state: any) => state.appAccessReducer.emailValidation,
  );
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();

  const onPressLogin = () => {
    const validEmail = emailFormatevalidate(email);
    const validPassword = password.trim().length > 0;

    if (validEmail) {
      dispatch(setEmailValidation('VALID'));
      if (validPassword) {
        dispatch(setPasswordValidation('VALID'));
        dispatch(setUserEmail(email));
        dispatch(getAccessToken(password));
      } else {
        dispatch(setPasswordValidation('INVALID'));
        passwordRef.current.focus();
      }
    } else {
      emailRef.current.focus();
      dispatch(setEmailValidation('INVALID'));
    }
  };

  const onPressBack = () => {
    dispatch(setEmailValidation('VALID'));
    dispatch(setPasswordValidation('VALID'));
    RootNavigation.replace('OpeningScreen');
    dispatch(setEndPointErrorVisible(false));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={16}
      style={styles.parentView}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <PrimaryContainer style={styles.primaryContainer}>
          {EndPointErrorVisibility ? (
            <EndPointError
              onPressBack={() => {
                RootNavigation.goBack();
              }}
            />
          ) : (
            <>
              <View style={styles.topSpace} />

              {EndPointErrorVisibility ? (
                <EndPointError
                  onPressBack={() => {
                    RootNavigation.goBack();
                  }}
                />
              ) : (
                <View style={styles.contentContainer}>
                  <Image
                    source={Images.logos.app_logo}
                    resizeMode="contain"
                    style={styles.logo}
                  />
                  <Collapsible
                    collapsed={ChangePasswordStatus !== 'SUCCESS'}
                    style={styles.collapsibleView}
                    duration={500}>
                    <Text style={styles.alert}>
                      {t('appAccess.loginScreen.alert.passwordResetSuccess')}
                    </Text>
                  </Collapsible>

                  <View style={styles.textInputContainer}>
                    <PrimaryTextInput
                      reference={emailRef}
                      value={email}
                      style={styles.textInput}
                      placeholder={t('appAccess.loginScreen.emailPlaceholder')}
                      inputMode="email"
                      keyboardType="default"
                      onChangeText={onChangeEmail}
                      error={
                        EmailValidation === 'INVALID' ||
                        LoginStatus === 'USER_NOT_FOUND'
                      }
                    />
                    <PrimaryTextInput
                      reference={passwordRef}
                      value={password}
                      style={styles.textInput}
                      placeholder={t(
                        'appAccess.loginScreen.passwordPlaceholder',
                      )}
                      inputMode="text"
                      keyboardType="default"
                      onChangeText={onChangePassword}
                      secureTextEntry={true}
                      error={
                        LoginStatus === 'PASSWORD_INVALID' ||
                        PasswordValidation === 'INVALID'
                      }
                    />
                    <Collapsible
                      collapsed={
                        EmailValidation === 'VALID' &&
                        PasswordValidation === 'VALID' &&
                        (LoginStatus === 'LOGIN_SUCCESS' ||
                          LoginStatus === 'UNDEFINED')
                      }
                      style={styles.collapsibleView}
                      duration={500}>
                      <Text style={styles.warning}>
                        {EmailValidation === 'INVALID' && (
                          <Text style={styles.warningRed}>
                            {t(
                              'appAccess.loginScreen.warnings.incorrectEmailFormat',
                            )}
                          </Text>
                        )}
                        {(PasswordValidation === 'INVALID' ||
                          LoginStatus === 'PASSWORD_INVALID') && (
                          <Text style={styles.warningRed}>
                            {t(
                              'appAccess.loginScreen.warnings.incorrectPassword',
                            )}
                          </Text>
                        )}
                        {LoginStatus === 'USER_NOT_FOUND' && (
                          <Text>
                            <Text style={styles.warningRed}>
                              {t(
                                'appAccess.loginScreen.warnings.emailNotRegisteredPartOne',
                              )}
                            </Text>
                            <Text
                              style={styles.warningLinkText}
                              onPress={() => {
                                dispatch(setLoginStatus('UNDEFINED'));
                                RootNavigation.navigate('OpeningScreen');
                              }}>
                              {t(
                                'appAccess.loginScreen.warnings.emailNotRegisteredPartTwo',
                              )}
                            </Text>
                            <Text style={styles.warningRed}>
                              {t(
                                'appAccess.loginScreen.warnings.emailNotRegisteredPartThree',
                              )}
                            </Text>
                          </Text>
                        )}
                      </Text>
                    </Collapsible>
                  </View>
                  <PrimaryButton
                    text={t('appAccess.loginScreen.logIn')}
                    color="green"
                    style={styles.button}
                    onPress={() => {
                      onPressLogin();
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      RootNavigation.navigate('SendResetPasswordScreen');
                    }}>
                    <Text style={styles.troubleSignInText}>
                      {t('appAccess.loginScreen.troubleSigningIn')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={onPressBack}>
                    <Text style={styles.backText}>
                      {t('appAccess.loginScreen.back')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.bottomSpace} />
            </>
          )}
        </PrimaryContainer>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContainer: {
    paddingHorizontal: 28,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  topSpace: {
    flex: 7.5,
  },
  bottomSpace: {
    flex: 1,
  },
  logo: {
    width: 155,
    height: 80,
    marginBottom: 10,
  },
  alert: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 15,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginTop: 10,
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 12,
  },
  textInput: {
    marginTop: 18,
  },
  button: {
    marginVertical: 18,
  },
  troubleSignInText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  backButton: {
    marginTop: 18,
  },
  backText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  warning: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    marginTop: 18,
  },
  warningRed: {
    color: Colors.text.WARNING_RED_COLOR,
  },
  warningLinkText: {
    color: Colors.text.LINK_TEXT_COLOR,
  },
  collapsibleView: {
    width: '100%',
  },
});
