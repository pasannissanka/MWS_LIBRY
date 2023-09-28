import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import OptionCard from '../views/OptionCard';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressOption1 = () => {
    RootNavigation.navigate('AccountSettingsScreen');
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <View style={styles.primaryContentContainer}>
          <Header
            onPressBack={onPressBack}
            title={t('profileView.settingsScreen.screenTitle')}
          />
          <PrimaryContainer style={styles.optionCardContainer}>
            <OptionCard>
              <TouchableOpacity
                style={styles.optionTouchable}
                onPress={onPressOption1}>
                <Text style={styles.optionText}>
                  {t('profileView.settingsScreen.option1')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.optionTouchable}>
                <Text style={styles.optionText}>
                  {t('profileView.settingsScreen.option2')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
            </OptionCard>

            <View style={styles.topSpacer} />

            <OptionCard>
              <TouchableOpacity style={styles.optionTouchable}>
                <Text style={styles.optionText}>
                  {t('profileView.settingsScreen.option3')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.optionTouchable}>
                <Text style={styles.optionText}>
                  {t('profileView.settingsScreen.option4')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
            </OptionCard>

            <View style={styles.middleSpacer} />

            <OptionCard>
              <TouchableOpacity style={styles.optionTouchable}>
                <Image
                  source={Images.icons.logout_icon}
                  resizeMode="contain"
                  style={styles.optionLeftIcon}
                />
                <Text style={styles.optionText}>
                  {t('profileView.settingsScreen.option5')}
                </Text>
              </TouchableOpacity>
            </OptionCard>

            <View style={styles.bottomSpacer} />
          </PrimaryContainer>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContentContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionCardContainer: {
    paddingTop: 15,
  },
  optionTouchable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  optionText: {
    flex: 1,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.LINE_BRAKER_COLOR,
  },
  topSpacer: {
    flex: 0.16,
    maxHeight: 117,
    width: '100%',
  },
  middleSpacer: {
    flex: 0.03,
    maxHeight: 24,
    width: '100%',
  },
  bottomSpacer: {
    flex: 0.42,
    maxHeight: 310,
    width: '100%',
  },
  optionRightIcon: {
    width: 16,
    height: 16,
    marginLeft: 16,
    transform: [{rotate: '180deg'}],
  },
  optionLeftIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
    transform: [{rotate: '180deg'}],
  },
});
