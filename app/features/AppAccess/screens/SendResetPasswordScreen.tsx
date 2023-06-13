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

const SendResetPasswordScreen = () => {
  const {t} = useTranslation();
  const warnings = {
    IncorrectEmailFormat: 'IncorrectEmailFormat',
  };

  const [email, onChangeEmail] = useState('');
  const [warning, setWarning] = useState('');

  const emailRef = useRef<any>();

  const onPressResetPassword = () => {
    const validEmail = emailFormatevalidate(email);

    if (validEmail) {
      setWarning('');
      RootNavigation.navigate('ChangePasswordScreen');
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

            <View style={styles.textInputContainer}>
              <PrimaryTextInput
                reference={emailRef}
                value={email}
                style={styles.textInput}
                placeholder={t(
                  'appAccess.sendResetPasswordScreen.emailPlaceholder',
                )}
                inputMode="email"
                keyboardType="default"
                onChangeText={onChangeEmail}
              />

              <Collapsible
                collapsed={warning === ''}
                style={styles.collapsibleView}
                duration={500}>
                {warning === warnings.IncorrectEmailFormat && (
                  <Text style={styles.warning}>
                    {t(
                      'appAccess.sendResetPasswordScreen.warnings.incorrectEmailFormat',
                    )}
                  </Text>
                )}
              </Collapsible>
            </View>
            <PrimaryButton
              text={t('appAccess.sendResetPasswordScreen.sendPasswordReset')}
              color="green"
              style={styles.button}
              onPress={() => {
                onPressResetPassword();
              }}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                RootNavigation.goBack();
              }}>
              <Text style={styles.backText}>
                {t('appAccess.sendResetPasswordScreen.back')}
              </Text>
            </TouchableOpacity>
          </View>
        </PrimaryContainer>
      </View>
    </>
  );
};

export default SendResetPasswordScreen;

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
    marginBottom: Sizes.HEIGHT_RATIO * 185,
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
    marginVertical: 18,
  },
  backButton: {
    marginTop: 0,
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
