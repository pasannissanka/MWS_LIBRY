import {Image, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Collapsible from 'react-native-collapsible';
import {useTranslation} from 'react-i18next';
import {UpdateDetailsAlertType} from '../interfaces';

type UpdateDetailsAlertProps = PropsWithChildren<{
  alertType: UpdateDetailsAlertType;
}>;

const UpdateDetailsAlert: React.FC<UpdateDetailsAlertProps> = ({alertType}) => {
  const {t} = useTranslation();

  const AlertDescriptions = [
    t('profileView.accountSettingsScreen.detailsUpdateAlert.description1'),
    t('profileView.accountSettingsScreen.detailsUpdateAlert.description2'),
    t('profileView.accountSettingsScreen.detailsUpdateAlert.description3'),
  ];

  const AlertDescription =
    alertType === 'passwordUpdated'
      ? AlertDescriptions[0]
      : alertType === 'emailUpdated'
      ? AlertDescriptions[1]
      : alertType === 'verificationSent'
      ? AlertDescriptions[2]
      : '';

  return (
    <Collapsible style={styles.container} collapsed={alertType === 'none'}>
      <View style={styles.iconContainer}>
        <Image
          source={Images.icons.tick_white_icon}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
      <Text style={styles.description}>{AlertDescription}</Text>
    </Collapsible>
  );
};

export default UpdateDetailsAlert;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    padding: 16,
    backgroundColor: Colors.ACCOUNT_DETAILS_UPDATE_ALERT_BACKGROUND,
  },
  iconContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    marginRight: 10,
    backgroundColor: Colors.SCREEN_INACTIVE_COLOR,
  },
  icon: {
    width: 10,
    height: 10,
  },
  description: {
    flex: 1,
    fontFamily: Fonts.MyriadProRegular,
    textAlignVertical: 'center',
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
});
