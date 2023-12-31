import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import OTPModal from '../components/OTPModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSignUpResponse,
  getSignUpResponseVerify,
  setOtpModalVisible,
  setOtpValidation,
} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

const EnterOTPScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const ModalVisibility = useSelector(
    (state: any) => state.appAccessReducer.otpModalVisibility,
  );

  const ValidOTP = useSelector((state: any) => state.appAccessReducer.validOtp);

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const ALERTS = [
    {
      title: t('appAccess.enterOTPScreen.alerts.cannotSendCode.title'),
      description: t(
        'appAccess.enterOTPScreen.alerts.cannotSendCode.description',
      ),
      button: t('appAccess.enterOTPScreen.alerts.cannotSendCode.button'),
      action: () => {
        dispatch(setOtpModalVisible('invisible'));
      },
    },
    {
      title: t('appAccess.enterOTPScreen.alerts.sentCode.title'),
      description: t('appAccess.enterOTPScreen.alerts.sentCode.description'),
      button: t('appAccess.enterOTPScreen.alerts.sentCode.button'),
      action: () => {
        dispatch(setOtpModalVisible('invisible'));
      },
    },
    {
      title: '',
      description: '',
      button: '',
      action: () => {},
    },
  ];

  const ModalAlert =
    ModalVisibility === 'cannotSend'
      ? ALERTS[0]
      : ModalVisibility === 'sent'
      ? ALERTS[1]
      : ALERTS[2];

  const [OTP, onChangeOTP] = useState('');

  const onPressBack = () => {
    dispatch(setOtpValidation(true));
    RootNavigation.replace('EnterMobileNumberScreen');
  };

  const onPressNext = () => {
    if (OTP.length === 5) {
      dispatch(setOtpValidation(true));
      dispatch(getSignUpResponseVerify(OTP));
    } else {
      dispatch(setOtpValidation(false));
    }
  };

  useEffect(() => {
    onChangeOTP(OTP);
  }, [OTP]);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={2} uncompleted={8} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />

          {EndPointErrorVisibility ? (
            <EndPointError onPressBack={onPressBack} />
          ) : (
            <>
              <PrimaryContainer>
                <View style={styles.otpInputContainer}>
                  <Text style={styles.title}>
                    {t('appAccess.enterOTPScreen.title')}
                  </Text>
                  <OtpInputs
                    handleChange={code => onChangeOTP(code)}
                    numberOfInputs={5}
                    autofillFromClipboard={false}
                    keyboardType="phone-pad"
                    inputStyles={
                      ValidOTP ? styles.otpInput : styles.otpInputError
                    }
                    style={styles.otpInputComponentContainer}
                  />
                  <Collapsible
                    collapsed={ValidOTP}
                    style={styles.collapsibleView}
                    duration={500}>
                    <Text style={styles.warning}>
                      {t('appAccess.enterOTPScreen.warnings.incorrectCode')}
                    </Text>
                  </Collapsible>

                  <TouchableOpacity
                    style={styles.resendTouchable}
                    onPress={() => {
                      dispatch(getSignUpResponse('EnterOTPScreen'));
                    }}>
                    <Text style={styles.resend}>
                      {t('appAccess.enterOTPScreen.resend')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </PrimaryContainer>
              <PrimaryButton
                text={t('appAccess.enterOTPScreen.next')}
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
      <OTPModal
        visible={ModalVisibility !== 'invisible'}
        title={ModalAlert.title}
        description={ModalAlert.description}
        button={ModalAlert.button}
        onPress={ModalAlert.action}
      />
    </>
  );
};

export default EnterOTPScreen;

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
  otpInputContainer: {
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
    marginBottom: 10,
  },
  otpInputComponentContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 24,
  },
  otpInput: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.SECONDARY_COLOR,
    width: 28,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
    borderColor: Colors.PRIMARY_TEXT_INPUT_BORDER_COLOR,
  },
  otpInputError: {
    width: 28,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
    borderColor: Colors.PRIMARY_TEXT_INPUT_ERROR_BORDER_COLOR,
  },
  resendTouchable: {
    marginTop: 16,
  },
  resend: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.LINK_TEXT_COLOR,
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
  },
});
