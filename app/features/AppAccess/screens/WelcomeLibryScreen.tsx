import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import * as RootNavigation from '../../../navigation/RootNavigation';

const WelcomeLibryScreen = () => {
  const {t} = useTranslation();

  const onPressContinue = () => {
    RootNavigation.navigate('EnterNameScreen');
  };
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={5} uncompleted={4} />
        <PrimaryContainer style={styles.primaryContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>
              {t('appAccess.welcomeLibryScreen.title')}
            </Text>

            <Image style={styles.imagePlaceholder} resizeMode="contain" />

            <Text style={styles.description}>
              {t('appAccess.welcomeLibryScreen.description')}
            </Text>
          </View>

          <PrimaryButton
            text={t('appAccess.welcomeLibryScreen.next')}
            color="green"
            style={styles.button}
            onPress={() => {
              onPressContinue();
            }}
          />
        </PrimaryContainer>
      </View>
    </>
  );
};

export default WelcomeLibryScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },

  primaryContainer: {
    paddingHorizontal: 28,
  },
  welcomeContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    marginTop: Sizes.HEIGHT_RATIO * 79,
    marginBottom: Sizes.HEIGHT_RATIO * 130,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '600',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: Sizes.HEIGHT_RATIO * 77,
  },
  imagePlaceholder: {
    width: Sizes.WIDTH_RATIO * 224,
    height: Sizes.HEIGHT_RATIO * 226,
    backgroundColor: '#FF781A',
    alignSelf: 'center',
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginTop: Sizes.HEIGHT_RATIO * 88,
  },
  button: {
    marginBottom: 20,
  },
});
