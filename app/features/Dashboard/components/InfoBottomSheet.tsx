import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, RefObject} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Colors, Fonts, Images} from '../../../theme';
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {DashboardScreens} from '../interfaces/DashboardInterface';

type BottomSheetProps = PropsWithChildren<{
  reference?: RefObject<RBSheet>;
  infoType?: DashboardScreens;
}>;

const InfoBottomSheet: React.FC<BottomSheetProps> = ({
  reference,
  infoType = 'none',
}) => {
  const {t} = useTranslation();
  const userInfoOptions = [
    {
      id: 0,
      title: t('dashboard.dashboardScreen.infoBottomSheet.option1'),
      icon: Images.icons.hyperlink_icon,
      onPress: () => {
        Clipboard.setString('hh');
        reference?.current?.close();
      },
    },
    {
      id: 1,
      title: t('dashboard.dashboardScreen.infoBottomSheet.option2'),
      icon: Images.icons.settings_icon,
      onPress: () => {
        reference?.current?.close();
        RootNavigation.navigate('SettingsScreen');
      },
    },
    {
      id: 2,
      title: t('dashboard.dashboardScreen.infoBottomSheet.option3'),
      icon: Images.icons.filled_star_icon_2,
      onPress: () => {
        reference?.current?.close();
      },
    },
  ];

  const someoneInfoOptions = [
    {
      id: 0,
      title: t('dashboard.dashboardScreen.infoBottomSheet.option1'),
      icon: Images.icons.hyperlink_icon,
      onPress: () => {
        Clipboard.setString('hh');
        reference?.current?.close();
      },
    },
  ];

  const infoOption =
    infoType === 'ProfileViewer' ? userInfoOptions : someoneInfoOptions;

  return (
    <RBSheet
      ref={reference}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="slide"
      customStyles={{
        wrapper: {
          backgroundColor: Colors.SCREEN_INACTIVE_COLOR_TRANSPARENT,
        },
        draggableIcon: {
          backgroundColor: Colors.BOTTOM_SHEET_DRAGABLE_ICON,
        },
        container: {...styles.contentContainer},
      }}>
      <View style={styles.optionsContainer}>
        {infoOption.map((item: any, index: number) => (
          <TouchableOpacity
            style={styles.option}
            key={index}
            onPress={item.onPress}>
            <Image
              source={item.icon}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
};

export default InfoBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: 'auto',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  optionsContainer: {
    padding: 18,
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: Colors.USER_INFO_BOTTOM_SHEET_OPTION_BACKGROUND,
  },
  optionIcon: {
    width: 25,
    height: 25,
    marginRight: 22,
  },
  optionText: {
    flex: 1,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
});
