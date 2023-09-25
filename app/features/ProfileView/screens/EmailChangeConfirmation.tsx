import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';
import {emailFormatevalidate} from '../../../helper/formatters';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
import {getEmailChangeResponse} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

const EmailChangeConfirmation = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const emailRef = useRef<any>();

  const USER_PROFILE = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );

  const SpinnerVisibility = useSelector(
    (state: any) => state.commonReducer.spinnerVisibility,
  );
  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [email, onChnageEmail] = useState(USER_PROFILE.email);

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
      const requestBody = {
        email: email,
      };
      const payload = {
        requestBody: requestBody,
        translation: t,
      };

      dispatch(getEmailChangeResponse(payload));
    } else {
      emailRef.current.focus();
      emailChangingAlert = {
        visible: true,
        title: t(
          'profileView.EmailChangeConfirmationScreen.emailChangingAlertOne.title',
        ),
        description: t(
          'profileView.EmailChangeConfirmationScreen.emailChangingAlertOne.description',
        ),
        button: t(
          'profileView.EmailChangeConfirmationScreen.emailChangingAlertOne.button',
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
    EndPointErrorVisibility || emailRef.current.focus();
  }, [EndPointErrorVisibility, SpinnerVisibility]);

  const saveButtonVisibility = USER_PROFILE.email !== email;

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      {EndPointErrorVisibility ? (
        <View style={styles.endPointErrorViewContainer}>
          <EndPointError onPressBack={onPressBack} />
        </View>
      ) : (
        <View style={styles.parentView}>
          <Header
            style={styles.header}
            onPressBack={onPressBack}
            title={t('profileView.EmailChangeConfirmationScreen.screenTitle')}
            rightButton={
              saveButtonVisibility
                ? t(
                    'profileView.EmailChangeConfirmationScreen.headerRightButton',
                  )
                : null
            }
            onPressRightButton={onPressSaveButton}
          />

          <PrimaryContainer style={styles.contentContainer}>
            <View style={styles.confirmationContainer}>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {t(
                    'profileView.EmailChangeConfirmationScreen.emailInputLabel',
                  )}
                </Text>
                <TextInput
                  ref={emailRef}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                  placeholder={t(
                    'profileView.EmailChangeConfirmationScreen.emailInputPlaceholder',
                  )}
                  keyboardType="email-address"
                  inputMode="email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={onChnageEmail}
                />
              </View>
            </View>
          </PrimaryContainer>
        </View>
      )}
    </>
  );
};

export default EmailChangeConfirmation;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  endPointErrorViewContainer: {
    flex: 1,
    ackgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
    padding: 15,
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
