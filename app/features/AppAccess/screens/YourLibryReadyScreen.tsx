import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';

const YourLibryReadyScreen = () => {
  const {t} = useTranslation();

  const onPressNext = () => {
    RootNavigation.navigate('PublishFirstIdeaScreen');
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const FEATURES = [
    {
      title: 'Ideas',
      description: 'Text here Text hereText hereText hereText hereText here',
    },
    {
      title: 'Collabs',
      description: 'Text here Text hereText hereText hereText hereText here',
    },
    {
      title: 'Collections',
      description: 'Text here Text hereText hereText hereText hereText here',
    },
  ];
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={8} uncompleted={1} />
        <View style={styles.primaryContentContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />
          <PrimaryContainer>
            <View style={styles.middleContainer}>
              <Image style={styles.titleImage} resizeMode="contain" />
              <Text style={styles.title}>
                {t('appAccess.yourLibryReadyScreen.title')}
              </Text>

              <View style={styles.featureContainer}>
                {FEATURES.map((item, index) => (
                  <View style={styles.featureRow} key={index}>
                    <Image style={styles.featureImage} />
                    <View style={styles.featureTextContainer}>
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <Text style={styles.featureDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </PrimaryContainer>
          <PrimaryButton
            text={t('appAccess.yourLibryReadyScreen.next')}
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

export default YourLibryReadyScreen;

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
  middleContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: Sizes.HEIGHT_RATIO * 16,
  },
  titleImage: {
    width: Sizes.HEIGHT_RATIO * 76,
    height: Sizes.HEIGHT_RATIO * 76,
    backgroundColor: '#DB8724',
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 48,
    fontWeight: '600',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginVertical: Sizes.HEIGHT_RATIO * 24,
  },
  featureContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  featureImage: {
    width: 64,
    height: 64,
    backgroundColor: '#DB8724',
  },
  featureTitle: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: 5,
  },
  featureDescription: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
  },
  button: {
    marginBottom: 20,
  },
});
