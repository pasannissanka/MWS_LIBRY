import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Images} from '../../../theme';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import PrimaryTextInput from '../components/PrimaryTextInput';
import {validatePassword} from '../../../helper/formatters';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {
  getChangePasswordResponse,
  setPasswordValidation,
} from '../redux/action/action';
import * as RootNavigation from '../../../navigation/RootNavigation';
import EndPointError from '../../../components/views/EndPointError';
import {setEndPointErrorVisible} from '../../../redux/action/action';

const ChangePasswordScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const Email = useSelector((state: any) => state.commonReducer.userEmail);
  const PasswordValidation = useSelector(
    (state: any) => state.appAccessReducer.passwordValidation,
  );
  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const [password, onChangePassword] = useState('');
  const [otp, onChangeOtp] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');

  const passwordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();

  let requestBody = {
    password: '',
    email: '',
    code: '',
  };

  const onPressChangePassword = () => {
    const validPassword = validatePassword(password);
    if (!validPassword) {
      dispatch(setPasswordValidation('INVALID'));
      passwordRef.current.focus();
    } else if (password.length === 0) {
      dispatch(setPasswordValidation('VALID'));
      passwordRef.current.focus();
    } else if (confirmPassword !== password) {
      dispatch(setPasswordValidation('VALID'));
      confirmPasswordRef.current.focus();
    } else {
      dispatch(setPasswordValidation('VALID'));
      requestBody = {
        password: password,
        email: Email,
        code: otp.trim(),
      };

      dispatch(getChangePasswordResponse(requestBody));
    }
  };

  useEffect(() => {
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

  const onPressBack = () => {
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
            <View style={styles.contentContainer}>
              <View style={styles.topSpace} />

              <>
                <Image
                  source={Images.logos.app_logo}
                  resizeMode="contain"
                  style={styles.logo}
                />
                <View style={styles.textInputContainer}>
                  <PrimaryTextInput
                    //reference={passwordRef}
                    value={otp}
                    style={styles.textInput}
                    placeholder={'Verification Code'}
                    inputMode="numeric"
                    keyboardType="phone-pad"
                    onChangeText={onChangeOtp}
                    secureTextEntry={false}
                    error={false}
                  />
                  <PrimaryTextInput
                    reference={passwordRef}
                    value={password}
                    style={styles.textInput}
                    placeholder={t(
                      'appAccess.changePasswordScreen.passwordPlaceholder',
                    )}
                    inputMode="text"
                    keyboardType="default"
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    error={PasswordValidation === 'INVALID'}
                  />
                  <PrimaryTextInput
                    reference={confirmPasswordRef}
                    value={confirmPassword}
                    style={styles.textInput}
                    placeholder={t(
                      'appAccess.changePasswordScreen.confirmPasswordPlaceholder',
                    )}
                    inputMode="text"
                    keyboardType="default"
                    onChangeText={onChangeConfirmPassword}
                    secureTextEntry={true}
                  />

                  <Collapsible
                    collapsed={PasswordValidation === 'VALID'}
                    style={styles.collapsibleView}
                    duration={500}>
                    <Text style={styles.warning}>
                      {t(
                        'appAccess.enterPasswordScreen.warnings.incorrectPasswordFormat',
                      )}
                    </Text>
                  </Collapsible>
                </View>

                <PrimaryButton
                  text={t('appAccess.changePasswordScreen.changePassword')}
                  color="green"
                  style={styles.button}
                  onPress={() => {
                    onPressChangePassword();
                  }}
                />
              </>
              <View style={styles.bottomSpace} />
            </View>
          )}
        </PrimaryContainer>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContainer: {
    paddingHorizontal: 28,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // marginTop: Sizes.HEIGHT_RATIO * 294,
    // marginBottom: Sizes.HEIGHT_RATIO * 181,
  },
  topSpace: {
    flex: 1.6,
  },
  bottomSpace: {
    flex: 1,
  },
  logo: {
    width: 155,
    height: 80,
    marginBottom: 10,
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 12,
  },
  textInput: {
    marginTop: 18,
  },
  button: {
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
  collapsibleView: {
    width: '100%',
  },
  warning: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.WARNING_RED_COLOR,
    marginTop: 14,
  },
});
