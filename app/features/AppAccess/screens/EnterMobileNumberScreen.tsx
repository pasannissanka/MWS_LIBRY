import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import MobileNumInput from '../components/MobileNumInput';
import Collapsible from 'react-native-collapsible';
import {isValidPhoneNumber} from 'react-phone-number-input';
import {useDispatch} from 'react-redux';
import {getSignUpResponse} from '../redux/action/action';
import { setMobileNumber } from '../../../redux/action/action';

const EnterMobileNumberScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [mobileNum, onChangeMobileNum] = useState('');
  const [validMobileNumber, setValidMobileNumber] = useState(true);

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressNext = () => {
    if (isValidPhoneNumber(mobileNum)) {
      setValidMobileNumber(true);
      dispatch(setMobileNumber(mobileNum));
      dispatch(getSignUpResponse('EnterMobileNumberScreen'));
      RootNavigation.navigate('EnterOTPScreen');
    } else {
      setValidMobileNumber(false);
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
        <ProgressBar completed={1} uncompleted={8} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />
          <PrimaryContainer>
            <View style={styles.mobileInputContainer}>
              <Text style={styles.title}>
                {t('appAccess.enterMobileNumberScreen.title')}
              </Text>

              <MobileNumInput
                onChangeMobileNum={onChangeMobileNum}
                error={!validMobileNumber}
              />
              <Collapsible
                collapsed={validMobileNumber}
                style={styles.collapsibleView}
                duration={500}>
                <Text style={styles.warning}>
                  {t(
                    'appAccess.enterMobileNumberScreen.warnings.notRealPhoneNumber',
                  )}
                </Text>
              </Collapsible>

              <Text style={styles.description}>
                {t('appAccess.enterMobileNumberScreen.description')}
              </Text>
            </View>
          </PrimaryContainer>
          <PrimaryButton
            text={t('appAccess.enterMobileNumberScreen.next')}
            color="green"
            style={styles.button}
            onPress={() => {
              onPressNext();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default EnterMobileNumberScreen;

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
  mobileInputContainer: {
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
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginTop: 16,
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
