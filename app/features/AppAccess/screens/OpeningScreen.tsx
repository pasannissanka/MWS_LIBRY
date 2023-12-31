import {
  BackHandler,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Sizes, Images} from '../../../theme';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';

const OpeningScreen = () => {
  const {t} = useTranslation();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <PrimaryContainer style={styles.primaryContainer}>
          <TouchableOpacity style={styles.languageSelection}>
            <Text style={styles.languageSelectionText}>English</Text>
            <Image
              source={Images.icons.expand_icon}
              style={styles.expandIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <View style={styles.topSpace}>
              <Image
                style={styles.openingPlaceholder}
                source={Images.image.opening_placeholder}
              />
            </View>
            <>
              <Image
                source={Images.logos.app_logo}
                resizeMode="contain"
                style={styles.logo}
              />
              <Text style={styles.description}>
                <Text>{t('appAccess.openingScreen.descriptionPartOne')}</Text>
                <Text style={styles.underlinedDescription}>
                  {t('appAccess.openingScreen.descriptionPartTwo')}
                </Text>
                <Text>{t('appAccess.openingScreen.descriptionPartThree')}</Text>
                <Text style={styles.underlinedDescription}>
                  {t('appAccess.openingScreen.descriptionPartFour')}
                </Text>
                <Text>{t('appAccess.openingScreen.descriptionPartFive')}</Text>
                <Text style={styles.underlinedDescription}>
                  {t('appAccess.openingScreen.descriptionPartSix')}
                </Text>
                <Text>{t('appAccess.openingScreen.descriptionPartSeven')}</Text>
              </Text>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={() => {
                    RootNavigation.navigate('EnterMobileNumberScreen');
                  }}
                  text={t('appAccess.openingScreen.signUp')}
                  color="green"
                  style={styles.button}
                />
                <PrimaryButton
                  onPress={() => {
                    RootNavigation.navigate('LoginScreen');
                  }}
                  text={t('appAccess.openingScreen.logIn')}
                  color="black"
                  style={styles.button}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  RootNavigation.navigate('SendResetPasswordScreen');
                }}>
                <Text style={styles.troubleSignInText}>
                  {t('appAccess.openingScreen.troubleSigningIn')}
                </Text>
              </TouchableOpacity>
            </>
            <View style={styles.bottomSpace} />
          </View>
        </PrimaryContainer>
      </View>
    </>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContainer: {
    paddingHorizontal: 28,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  topSpace: {
    flex: 3.8,
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  openingPlaceholder: {
    width: 290,
    height: 250,
    marginBottom: 10,
  },
  bottomSpace: {
    flex: 1,
    height: 16,
  },
  logo: {
    width: 155,
    height: 80,
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
    marginTop: Sizes.HEIGHT_RATIO * 77,
  },
  underlinedDescription: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    marginVertical: 7,
  },
  troubleSignInText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  languageSelection: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: 24,
    right: 28,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  languageSelectionText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'right',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  expandIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
    transform: [{rotate: '180deg'}],
  },
});
