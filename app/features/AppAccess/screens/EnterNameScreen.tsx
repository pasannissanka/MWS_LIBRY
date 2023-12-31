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
import {useDispatch} from 'react-redux';
import {setUserEnteredName} from '../../../redux/action/action';

const EnterNameScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const ref = useRef<any>();
  const [name, onChangeName] = useState('');
  const [warning, setWarning] = useState(false);

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressNext = () => {
    if (name.trim().length > 0) {
      setWarning(false);
      dispatch(setUserEnteredName(name.trim()));
      RootNavigation.navigate('EnterBirthdayScreen');
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
        <ProgressBar completed={7} uncompleted={3} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />
          <PrimaryContainer>
            <View style={styles.nameInputContainer}>
              <Text style={styles.title}>
                {t('appAccess.enterNameScreen.title')}
              </Text>

              <Text style={styles.description}>
                {t('appAccess.enterNameScreen.description')}
              </Text>

              <PrimaryTextInput
                reference={ref}
                value={name}
                inputMode="text"
                keyboardType="default"
                onChangeText={onChangeName}
                error={warning}
              />
            </View>
          </PrimaryContainer>
          <PrimaryButton
            text={t('appAccess.enterNameScreen.next')}
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

export default EnterNameScreen;

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
  nameInputContainer: {
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
});
