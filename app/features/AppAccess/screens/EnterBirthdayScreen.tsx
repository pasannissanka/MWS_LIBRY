import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryTextInput from '../components/PrimaryTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {setUserEnteredBirthDate} from '../../../redux/action/action';
import {getAddNameBirthDateResponse} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

const EnterBirthdayScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const ref = useRef<any>();
  const [birthday, setBirthday] = useState('');
  const [warning, setWarning] = useState(false);

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onChangeBirthday = (text: string) => {
    // Remove all non-digit characters from the input
    const digitsOnly = text.replace(/\D/g, '');

    // Split the input into groups of two digits
    const groups = digitsOnly.match(/(\d{1,2})/g);

    // Join the groups with a "/"
    const formatted = groups ? groups.join('/') : '';
    setBirthday(formatted);
  };

  const onPressNext = () => {
    if (birthday.trim().length > 0) {
      setWarning(false);
      dispatch(setUserEnteredBirthDate(birthday.trim()));
      dispatch(getAddNameBirthDateResponse());
    } else {
      setWarning(true);
      ref.current.focus();
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
        <ProgressBar completed={8} uncompleted={2} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />

          {EndPointErrorVisibility ? (
            <EndPointError onPressBack={onPressBack} />
          ) : (
            <>
              <PrimaryContainer>
                <View style={styles.birthdayInputContainer}>
                  <>
                    <Text style={styles.title}>
                      {t('appAccess.enterBirthdayScreen.title')}
                    </Text>
                    <PrimaryTextInput
                      reference={ref}
                      placeholder={t(
                        'appAccess.enterBirthdayScreen.placeholder',
                      )}
                      value={birthday}
                      inputMode="numeric"
                      keyboardType="phone-pad"
                      onChangeText={(text: string) => {
                        onChangeBirthday(text);
                      }}
                      error={warning}
                      maxLength={8}
                    />

                    <Text style={styles.description}>
                      {t('appAccess.enterBirthdayScreen.description')}
                    </Text>
                  </>
                  <View style={styles.bottomSpace} />
                </View>
              </PrimaryContainer>
              <PrimaryButton
                text={t('appAccess.enterBirthdayScreen.next')}
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

export default EnterBirthdayScreen;

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
    marginTop: 20,
  },
  birthdayInputContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    marginTop: Sizes.HEIGHT_RATIO * 36,
  },
  bottomSpace: {
    flex: 1,
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
    marginTop: 40,
  },
  button: {
    marginBottom: 20,
  },
});
