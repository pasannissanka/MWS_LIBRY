import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Images, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';

const PublishFirstIdeaScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const UserProfile = useSelector(
    (state: any) => state.appAccessReducer.addNameBirthDateResponse,
  );
  const verifyEmailAlertBoxVisibility = {
    visible: true,
    title: 'Verify your email',
    description:
      'We have sent an email to your email address to verify your email addrss.',
    button: 'OK',
    onPress: () => {},
  };
  const onPressNext = () => {
    if (!UserProfile.email_verified) {
      dispatch(setAlertBoxVisibility(verifyEmailAlertBoxVisibility));
    }
    RootNavigation.replace('DashboardScreen');
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };
  const onPressSkip = () => {
    if (!UserProfile.email_verified) {
      dispatch(setAlertBoxVisibility(verifyEmailAlertBoxVisibility));
    }
    RootNavigation.replace('DashboardScreen');
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={10} uncompleted={0} />

        <View style={styles.primaryContentContainer}>
          <Header
            style={styles.header}
            onPressBack={onPressBack}
            skipButton={true}
            onPressSkip={onPressSkip}
          />
          <PrimaryContainer>
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

              <Image
                source={require('./../../../assets/dummyImages/orange-placeholder/orange-placeholder.png')}
                style={styles.image}
                resizeMode="contain"
              />

              <Text style={styles.description}>
                {t('appAccess.publishFirstIdeaScreen.descriptionBottom')}
              </Text>
            </View>
          </PrimaryContainer>
          <PrimaryButton
            text={t('appAccess.publishFirstIdeaScreen.next')}
            color="green"
            style={styles.button}
            icon={Images.icons.right_arrow}
            onPress={() => {
              onPressNext();
            }}
          />
        </View>
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
    paddingHorizontal: 4,
    marginTop: Sizes.HEIGHT_RATIO * 20,
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
