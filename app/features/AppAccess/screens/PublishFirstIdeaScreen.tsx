import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';

const PublishFirstIdeaScreen = () => {
  const {t} = useTranslation();

  const onPressNext = () => {
    RootNavigation.navigate('DashboardScreen');
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };
  const onPressSkip = () => {
    RootNavigation.navigate('DashboardScreen');
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={9} uncompleted={0} />
        <PrimaryContainer style={styles.primaryContainer}>
          <Header
            style={styles.header}
            onPressBack={onPressBack}
            skipButton={true}
            onPressSkip={onPressSkip}
          />
          <View style={styles.middleContainer}>
            <Text style={styles.title}>
              {t('appAccess.publishFirstIdeaScreen.title')}
            </Text>

            <Text style={styles.description}>
              {t('appAccess.publishFirstIdeaScreen.descriptionTop')}
            </Text>

            <Text style={styles.description}>
              {t('appAccess.publishFirstIdeaScreen.descriptionMiddle')}
            </Text>

            <Image style={styles.image} resizeMode="contain" />

            <Text style={styles.description}>
              {t('appAccess.publishFirstIdeaScreen.descriptionBottom')}
            </Text>
          </View>

          <PrimaryButton
            text={t('appAccess.publishFirstIdeaScreen.next')}
            color="green"
            style={styles.button}
            onPress={() => {
              onPressNext();
            }}
          />
        </PrimaryContainer>
      </View>
    </>
  );
};

export default PublishFirstIdeaScreen;

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
  middleContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: Sizes.HEIGHT_RATIO * 20,
    marginBottom: Sizes.HEIGHT_RATIO * 50,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginVertical: Sizes.HEIGHT_RATIO * 24,
  },
  image: {
    width: Sizes.HEIGHT_RATIO * 243,
    height: Sizes.HEIGHT_RATIO * 215,
    marginTop: Sizes.HEIGHT_RATIO * 12,
    marginBottom: Sizes.HEIGHT_RATIO * 40,
    backgroundColor: '#DB8724',
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.GRAY_TEXT_COLOR,
    marginBottom: 8,
  },
  button: {
    marginBottom: 20,
  },
});
