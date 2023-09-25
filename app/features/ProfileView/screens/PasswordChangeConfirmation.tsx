import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';
import {validatePassword} from '../../../helper/formatters';
import {useDispatch} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
import {getPasswordChangeResponse} from '../redux/action/action';

const PasswordChangeConfirmation = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const passwordRef = useRef<any>();
  const conPasswordRef = useRef<any>();
  const currentPasswordRef = useRef<any>();

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [currentPassword, onChangeCurrentPassword] = useState('');
  const [password, onChangePassword] = useState('');
  const [conPassword, onChangeConPassword] = useState('');

  let passwordChangingAlert = {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  };

  const onPressSaveButton = () => {
    const validPassword = validatePassword(password);

    if (currentPassword.length === 0) {
      passwordChangingAlert = {
        visible: true,
        title: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertThree.title',
        ),
        description: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertThree.description',
        ),
        button: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertThree.button',
        ),
        onPress: () => {},
      };
      showAlert();
    } else if (!validPassword) {
      passwordRef.current.focus();
    } else if (password.length === 0) {
      passwordRef.current.focus();
    } else if (conPassword !== password) {
      passwordChangingAlert = {
        visible: true,
        title: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertOne.title',
        ),
        description: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertOne.description',
        ),
        button: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertOne.button',
        ),
        onPress: () => {},
      };
      showAlert();
      conPasswordRef.current.focus();
    } else if (currentPassword === password) {
      passwordChangingAlert = {
        visible: true,
        title: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertTwo.title',
        ),
        description: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertTwo.description',
        ),
        button: t(
          'profileView.PasswordChangeConfirmationScreen.passwordChangingAlertTwo.button',
        ),
        onPress: () => {},
      };
      showAlert();
      conPasswordRef.current.focus();
    } else {
      const requestBody = {
        oldPassword: currentPassword,
        newPassword: password,
      };
      dispatch(getPasswordChangeResponse(requestBody));
    }
  };

  const showAlert = () => {
    dispatch(setAlertBoxVisibility(passwordChangingAlert));
  };
  useEffect(() => {
    currentPasswordRef.current.focus();
  }, []);
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <Header
          style={styles.header}
          onPressBack={onPressBack}
          title={t('profileView.PasswordChangeConfirmationScreen.screenTitle')}
          rightButton={t(
            'profileView.PasswordChangeConfirmationScreen.headerRightButton',
          )}
          onPressRightButton={onPressSaveButton}
        />

        <PrimaryContainer style={styles.contentContainer}>
          <View style={styles.confirmationContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {t(
                  'profileView.PasswordChangeConfirmationScreen.currentPasswordInputLabel',
                )}
              </Text>
              <TextInput
                ref={currentPasswordRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                placeholder={t(
                  'profileView.PasswordChangeConfirmationScreen.currentPasswordInputPlaceholder',
                )}
                value={currentPassword}
                onChangeText={onChangeCurrentPassword}
                secureTextEntry={true}
                inputMode="text"
                autoCapitalize="none"
                keyboardType="visible-password"
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>
                {t(
                  'profileView.PasswordChangeConfirmationScreen.passwordInputLabel',
                )}
              </Text>
              <TextInput
                ref={passwordRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                placeholder={t(
                  'profileView.PasswordChangeConfirmationScreen.passwordInputPlaceholder',
                )}
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                inputMode="text"
                autoCapitalize="none"
                keyboardType="visible-password"
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>
                {t(
                  'profileView.PasswordChangeConfirmationScreen.conPasswordInputLabel',
                )}
              </Text>
              <TextInput
                ref={conPasswordRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                placeholder={t(
                  'profileView.PasswordChangeConfirmationScreen.conPasswordInputPlaceholder',
                )}
                value={conPassword}
                onChangeText={onChangeConPassword}
                secureTextEntry={true}
                inputMode="text"
                autoCapitalize="none"
                keyboardType="visible-password"
              />
            </View>
          </View>
        </PrimaryContainer>
      </View>
    </>
  );
};

export default PasswordChangeConfirmation;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingVertical: 15,
  },
  confirmationContainer: {
    width: '100%',
    borderTopWidth: 0.35,
    borderTopColor: Colors.LINE_BRAKER_COLOR,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LINE_BRAKER_COLOR,
  },
  text: {
    width: 120,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.GRAY_TEXT_COLOR,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.PRIMARY_COLOR,
    marginVertical: 0,
    paddingVertical: 0,
  },
});
