import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';
import {emailFormatevalidate} from '../../../helper/formatters';
import {useDispatch} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';

const EmailChangeConfirmation = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const emailRef = useRef<any>();

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [email, onChnageEmail] = useState('');

  let emailChangingAlert = {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  };

  const onPressSaveButton = () => {
    const valid = emailFormatevalidate(email);
    if (valid) {
    } else {
      emailRef.current.focus();
      emailChangingAlert = {
        visible: true,
        title: t(
          'profileView.EmailChangeConfirmationScreen.passwordChangingAlertOne.title',
        ),
        description: t(
          'profileView.EmailChangeConfirmationScreen.passwordChangingAlertOne.description',
        ),
        button: t(
          'profileView.EmailChangeConfirmationScreen.passwordChangingAlertOne.button',
        ),
        onPress: () => {},
      };
      showAlert();
    }
  };

  const showAlert = () => {
    dispatch(setAlertBoxVisibility(emailChangingAlert));
  };

  useEffect(() => {
    emailRef.current.focus();
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
          title={t('profileView.EmailChangeConfirmationScreen.screenTitle')}
          rightButton={t(
            'profileView.EmailChangeConfirmationScreen.headerRightButton',
          )}
          onPressRightButton={onPressSaveButton}
        />

        <PrimaryContainer style={styles.contentContainer}>
          <View style={styles.confirmationContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {t('profileView.EmailChangeConfirmationScreen.emailInputLabel')}
              </Text>
              <TextInput
                ref={emailRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                placeholder={t(
                  'profileView.EmailChangeConfirmationScreen.emailInputPlaceholder',
                )}
                value={email}
                onChangeText={onChnageEmail}
                secureTextEntry={true}
              />
            </View>
          </View>
        </PrimaryContainer>
      </View>
    </>
  );
};

export default EmailChangeConfirmation;

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
    borderBottomWidth: 0.35,
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
