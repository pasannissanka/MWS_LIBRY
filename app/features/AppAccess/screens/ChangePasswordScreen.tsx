import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Images} from '../../../theme';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import PrimaryTextInput from '../components/PrimaryTextInput';
import {validatePassword} from '../../../helper/formatters';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {getChangePasswordResponse} from '../redux/action/action';

const ChangePasswordScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const Email = useSelector((state: any) => state.commonReducer.userEmail);

  const [password, onChangePassword] = useState('');
  const [otp, onChangeOtp] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [warning, setWarning] = useState('');

  const passwordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();

  const warnings = {
    IncorrectPasswordFormat: 'IncorrectPasswordFormat',
  };

  let requestBody = {
    password: '',
    email: '',
    code: '',
  };

  const onPressChangePassword = () => {
    const validPassword = validatePassword(password);
    if (!validPassword) {
      setWarning(warnings.IncorrectPasswordFormat);
      passwordRef.current.focus();
    } else if (password.length === 0) {
      setWarning('');
      passwordRef.current.focus();
    } else if (confirmPassword !== password) {
      setWarning('');
      confirmPasswordRef.current.focus();
    } else {
      setWarning('');
      requestBody = {
        password: password,
        email: Email,
        code: otp.trim(),
      };

      dispatch(getChangePasswordResponse(requestBody));
    }
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <PrimaryContainer style={styles.primaryContainer}>
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
                  error={warning !== ''}
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
                  error={warning !== ''}
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
                  collapsed={warning === ''}
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
        </PrimaryContainer>
      </View>
    </>
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
