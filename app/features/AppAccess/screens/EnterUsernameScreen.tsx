import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import ProgressBar from '../components/ProgressBar';
import {Colors, Sizes} from '../../../theme';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import EndPointError from '../../../components/views/EndPointError';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryTextInput from '../components/PrimaryTextInput';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Collapsible from 'react-native-collapsible';
import {validateUsername} from '../../../helper/formatters';
import {
  getVerifyUsernameResponse,
  setUsernameValidation,
} from '../redux/action/action';

const EnterUsernameScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const UsernameValidation = useSelector(
    (state: any) => state.appAccessReducer.usernameValidation,
  );

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const ref = useRef<any>();
  const [username, onChangeUsername] = useState('');

  const onPressBack = () => {
    dispatch(setUsernameValidation('VALID'));
    RootNavigation.replace('EnterMobileNumberScreen');
  };

  const onPressNext = () => {
    const valid = validateUsername(username);

    if (valid) {
      dispatch(setUsernameValidation('VALID'));
      dispatch(getVerifyUsernameResponse(username));
    } else {
      ref.current.focus();
      dispatch(setUsernameValidation('INVALID'));
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
        <ProgressBar completed={4} uncompleted={6} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />
          {EndPointErrorVisibility ? (
            <EndPointError onPressBack={onPressBack} />
          ) : (
            <>
              <PrimaryContainer>
                <View style={styles.usernameInputContainer}>
                  <Text style={styles.title}>
                    {t('appAccess.enterUsernameScreen.title')}
                  </Text>

                  <Text style={styles.description}>
                    {t('appAccess.enterUsernameScreen.description')}
                  </Text>

                  <PrimaryTextInput
                    reference={ref}
                    value={username}
                    inputMode="text"
                    keyboardType="default"
                    onChangeText={onChangeUsername}
                    error={UsernameValidation === 'INVALID'}
                  />

                  <Collapsible
                    collapsed={UsernameValidation === 'VALID'}
                    style={styles.collapsibleView}
                    duration={500}>
                    <Text style={styles.warning}>
                      {UsernameValidation === 'INVALID'
                        ? t(
                            'appAccess.enterUsernameScreen.warnings.incorrectUsernameFormat',
                          )
                        : UsernameValidation === 'TAKEN'
                        ? t(
                            'appAccess.enterUsernameScreen.warnings.usernameTaken',
                          )
                        : ''}
                    </Text>
                  </Collapsible>
                </View>
              </PrimaryContainer>
              <PrimaryButton
                text={t('appAccess.enterUsernameScreen.next')}
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

export default EnterUsernameScreen;

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
  usernameInputContainer: {
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
});
