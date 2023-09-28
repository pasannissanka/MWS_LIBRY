import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import OptionCard from '../views/OptionCard';
import UpdateDetailsAlert from '../components/UpdateDetailsAlert';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
import {UpdateDetailsAlertType} from '../interfaces';
import {useFocusEffect} from '@react-navigation/native';

type RouteParams = PropsWithChildren<{
  alertType: UpdateDetailsAlertType;
}>;

const AccountSettingsScreen: React.FC<{route: {params: RouteParams}}> = ({
  route,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const USER_PROFILE = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );
  const isEmailVerified = USER_PROFILE.email_verified;
  const [verifiyEmailAlertVisibility, setVerifiyEmailAlertVisibility] =
    useState(false);
  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [alertType, setAlertType] = useState<UpdateDetailsAlertType>('none');

  useFocusEffect(
    React.useCallback(() => {
      setAlertType(
        route.params && route.params.alertType
          ? route.params.alertType
          : 'none',
      );
      setTimeout(() => {
        setAlertType('none');
      }, 5000);
    }, [route.params]),
  );

  const onPressOption1 = () => {
    RootNavigation.navigate('PasswordChangeConfirmation');
  };
  const onPressOption2 = () => {
    if (isEmailVerified) {
      setVerifiyEmailAlertVisibility(false);
      RootNavigation.navigate('EmailChangeConfirmation');
    } else {
      setVerifiyEmailAlertVisibility(true);
    }
  };

  const onPressOption3 = () => {
    const deleteConfirmation = {
      visible: true,
      title: t('profileView.accountSettingsScreen.deleteConfirmation.title'),
      description: t(
        'profileView.accountSettingsScreen.deleteConfirmation.description',
      ),
      button: t('profileView.accountSettingsScreen.deleteConfirmation.button'),
      negativeButton: t(
        'profileView.accountSettingsScreen.deleteConfirmation.negativeButton',
      ),
      onPress: () => {},
      onPressNegative: () => {},
      buttonTextStyle: {color: Colors.text.WARNING_RED_COLOR},
    };

    dispatch(setAlertBoxVisibility(deleteConfirmation));
  };

  const onPressOption4 = () => {
    setVerifiyEmailAlertVisibility(false);
  };

  const onPressOption5 = () => {
    RootNavigation.navigate('EditProfileScreen');
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <Header
          style={styles.header}
          onPressBack={onPressBack}
          title={t('profileView.accountSettingsScreen.screenTitle')}
        />

        <UpdateDetailsAlert alertType={alertType} />
        <View style={styles.primaryContentContainer}>
          <PrimaryContainer style={styles.optionCardContainer}>
            <OptionCard>
              <TouchableOpacity
                style={styles.optionTouchable}
                onPress={onPressOption1}>
                <Text style={styles.optionText}>
                  {t('profileView.accountSettingsScreen.option1')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.optionTouchable}
                onPress={onPressOption2}>
                <Text style={styles.optionText}>
                  {t('profileView.accountSettingsScreen.option2')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.optionTouchable}
                onPress={onPressOption5}>
                <Text style={styles.optionText}>
                  {t('profileView.accountSettingsScreen.option5')}
                </Text>
                <Image
                  source={Images.icons.back_icon}
                  resizeMode="contain"
                  style={styles.optionRightIcon}
                />
              </TouchableOpacity>
              <Collapsible
                style={styles.verifyEmailCollapsible}
                collapsed={!verifiyEmailAlertVisibility}>
                <Image
                  source={Images.icons.info_icon}
                  resizeMode="contain"
                  style={styles.verifyEmailInfo}
                />
                <View style={styles.verifyEmailCollapsRightContainer}>
                  <Text style={styles.optionText}>
                    {t('profileView.accountSettingsScreen.option4')}
                  </Text>
                  <TouchableOpacity onPress={onPressOption4}>
                    <Text style={styles.linkedText}>
                      {t(
                        'profileView.accountSettingsScreen.option4_lined_text',
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Collapsible>
            </OptionCard>

            <TouchableOpacity
              style={styles.deleteTouchable}
              onPress={onPressOption3}>
              <Text style={styles.linkedText}>
                {t('profileView.accountSettingsScreen.option3')}
              </Text>
            </TouchableOpacity>
          </PrimaryContainer>
        </View>
      </View>
    </>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  primaryContentContainer: {
    flex: 1,
    paddingBottom: 10,
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
    height: 1,
    backgroundColor: Colors.LINE_BRAKER_COLOR,
  },
  optionRightIcon: {
    width: 16,
    height: 16,
    marginLeft: 16,
    transform: [{rotate: '180deg'}],
  },
  deleteTouchable: {
    height: 18,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  linkedText: {
    flex: 1,
    fontFamily: Fonts.MyriadProRegular,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.LINK_TEXT_COLOR,
  },
  verifyEmailCollapsible: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  verifyEmailInfo: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  verifyEmailCollapsRightContainer: {
    flex: 1,
  },
});
