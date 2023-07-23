import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import Collapsible from 'react-native-collapsible';
import PrimaryTextInput from '../components/PrimaryTextInput';
import {emailFormatevalidate} from '../../../helper/formatters';
import AgreementRow from '../components/AgreementRow';
import {useDispatch, useSelector} from 'react-redux';
import {setUserEmail} from '../../../redux/action/action';
import {
  getSignUpEmailResponse,
  setEmailValidation,
} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

const EnterEmailScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );
  const EmailValidation = useSelector(
    (state: any) => state.appAccessReducer.emailValidation,
  );

  const ref = useRef<any>();
  const [email, onChangeEmail] = useState('');
  const [checked, setChecked] = useState(true);

  const onPressBack = () => {
    dispatch(setEmailValidation('VALID'));
    RootNavigation.replace('EnterMobileNumberScreen');
  };

  const onPressNext = () => {
    const valid = emailFormatevalidate(email);
    if (valid) {
      dispatch(setEmailValidation('VALID'));
      if (checked) {
        dispatch(setUserEmail(email));
        dispatch(getSignUpEmailResponse());
      }
    } else {
      ref.current.focus();
      dispatch(setEmailValidation('INVALID'));
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
        <ProgressBar completed={3} uncompleted={6} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />
          {EndPointErrorVisibility ? (
            <EndPointError onPressBack={onPressBack} />
          ) : (
            <>
              <PrimaryContainer>
                <View style={styles.emailInputContainer}>
                  <Text style={styles.title}>
                    {t('appAccess.enterEmailScreen.title')}
                  </Text>

                  <Text style={styles.description}>
                    {t('appAccess.enterEmailScreen.description')}
                  </Text>

                  <PrimaryTextInput
                    reference={ref}
                    value={email}
                    inputMode="email"
                    keyboardType="default"
                    onChangeText={onChangeEmail}
                    error={EmailValidation !== 'VALID'}
                  />

                  <Collapsible
                    collapsed={EmailValidation === 'VALID'}
                    style={styles.collapsibleView}
                    duration={500}>
                    <Text style={styles.warning}>
                      {EmailValidation === 'INVALID' &&
                        t(
                          'appAccess.enterEmailScreen.warnings.incorrectEmailFormat',
                        )}

                      {EmailValidation === 'REGISTERED' &&
                        t(
                          'appAccess.enterEmailScreen.warnings.registeredEmail',
                        )}
                    </Text>
                  </Collapsible>
                  <AgreementRow
                    checked={checked}
                    style={styles.agreementRow}
                    description={t('appAccess.enterEmailScreen.agreement')}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
              </PrimaryContainer>
              <PrimaryButton
                text={t('appAccess.enterEmailScreen.next')}
                color="green"
                style={styles.button}
                onPress={() => {
                  onPressNext();
                }}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default EnterEmailScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContentContainer: {
    flex: 1,
    paddingHorizontal: 28,
  },
  header: {
    marginTop: 10,
  },
  emailInputContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    marginTop: Sizes.HEIGHT_RATIO * 36,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '600',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: 24,
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: 16,
  },
  button: {
    marginBottom: 20,
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
  agreementRow: {
    marginTop: 24,
  },
});
