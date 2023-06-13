import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Sizes, Images} from '../../../theme';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryTextInput from '../components/PrimaryTextInput';
import Collapsible from 'react-native-collapsible';
import {emailFormatevalidate} from '../../../helper/formatters';

const LoginScreen = () => {
  const {t} = useTranslation();
  const warnings = {
    IncorrectEmailFormat: ' IncorrectEmailFormat',
  };

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [warning, setWarning] = useState('');

  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();

  const onPressLogin = () => {
    const validEmail = emailFormatevalidate(email);
    const validPassword = password.trim().length > 0;

    if (validPassword) {
    } else {
      passwordRef.current.focus();
    }
    if (validEmail) {
      setWarning('');
      RootNavigation.replace('DashboardScreen');
    } else {
      emailRef.current.focus();
      setWarning(warnings.IncorrectEmailFormat);
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
            <Image
              source={Images.logos.app_logo}
              resizeMode="contain"
              style={styles.logo}
            />
            <Collapsible
              collapsed={true}
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
              />
              <PrimaryTextInput
                reference={passwordRef}
                value={password}
                style={styles.textInput}
                placeholder={t('appAccess.loginScreen.passwordPlaceholder')}
                inputMode="text"
                keyboardType="default"
                onChangeText={onChangePassword}
                secureTextEntry={true}
              />
              <Collapsible
                collapsed={warning === ''}
                style={styles.collapsibleView}
                duration={500}>
                {warning === warnings.IncorrectEmailFormat && (
                  <Text style={styles.warning}>
                    {t('appAccess.loginScreen.warnings.incorrectEmailFormat')}
                  </Text>
                )}
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
              onPress={() => {
                RootNavigation.navigate('OpeningScreen');
              }}>
              <Text style={styles.backText}>
                {t('appAccess.loginScreen.back')}
              </Text>
            </TouchableOpacity>
          </View>
        </PrimaryContainer>
      </View>
    </>
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
    marginTop: Sizes.HEIGHT_RATIO * 294,
    marginBottom: Sizes.HEIGHT_RATIO * 39,
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
    color: Colors.text.WARNING_RED_COLOR,
    marginTop: 18,
  },
  collapsibleView: {
    width: '100%',
  },
});
