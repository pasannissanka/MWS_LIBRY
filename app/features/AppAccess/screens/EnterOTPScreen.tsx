import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OTPInput from '../components/OTPInput';
import OTPModal from '../components/OTPModal';

const EnterOTPScreen = () => {
  const {t} = useTranslation();

  const warnings = {
    IncorrectCode: 'IncorrectCode',
  };

  const ALERTS = [
    {
      title: t('appAccess.enterOTPScreen.alerts.cannotSendCode.title'),
      description: t(
        'appAccess.enterOTPScreen.alerts.cannotSendCode.description',
      ),
      button: t('appAccess.enterOTPScreen.alerts.cannotSendCode.button'),
      action: () => {
        setModalVisible(false);
      },
    },
    {
      title: t('appAccess.enterOTPScreen.alerts.sentCode.title'),
      description: t('appAccess.enterOTPScreen.alerts.sentCode.description'),
      button: t('appAccess.enterOTPScreen.alerts.sentCode.button'),
      action: () => {
        setModalVisible(false);
      },
    },
  ];

  const [OTP, onChangeOTP] = useState('');
  const [alert, setAlert] = useState(ALERTS[0]);
  const [warning, setWarning] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressNext = () => {
    if (OTP.length === 5) {
      setWarning('');
      RootNavigation.navigate('EnterOTPScreen');
    } else {
      setWarning(warnings.IncorrectCode);
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
        <ProgressBar completed={2} uncompleted={7} />
        <PrimaryContainer style={styles.primaryContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />

          <View style={styles.otpInputContainer}>
            <Text style={styles.title}>
              {t('appAccess.enterOTPScreen.title')}
            </Text>

            <OTPInput onChangeOTP={onChangeOTP} error={warning !== ''} />

            <Collapsible
              collapsed={warning === ''}
              style={styles.collapsibleView}
              duration={500}>
              <Text style={styles.warning}>
                {t('appAccess.enterOTPScreen.warnings.incorrectCode')}
              </Text>
            </Collapsible>

            <TouchableOpacity
              style={styles.resendTouchable}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.resend}>
                {t('appAccess.enterOTPScreen.resend')}
              </Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            text={t('appAccess.enterOTPScreen.next')}
            color="green"
            style={styles.button}
            onPress={() => {
              onPressNext();
            }}
          />
        </PrimaryContainer>
      </View>
      <OTPModal
        visible={modalVisible}
        title={alert.title}
        description={alert.description}
        button={alert.button}
        onPress={alert.action}
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
  primaryContainer: {
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
    marginBottom: Sizes.HEIGHT_RATIO * 107,
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
