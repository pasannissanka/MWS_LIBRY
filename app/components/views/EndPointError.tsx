import {BackHandler, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import {Colors, Images} from '../../theme';
import {useTranslation} from 'react-i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import {useDispatch} from 'react-redux';
import {setEndPointErrorVisible} from '../../redux/action/action';

type SectionProps = PropsWithChildren<{
  onPressBack?: any;
}>;

const EndPointError = ({onPressBack}: SectionProps) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      onPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onPress = () => {
    dispatch(setEndPointErrorVisible(false));
    onPressBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSpace} />
      <Image
        source={Images.icons.warning}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text style={styles.description}>
        {t('commonComponents.endPointErrorView.description')}
      </Text>
      <View style={styles.middleSpace} />
      <PrimaryButton
        onPress={onPress}
        color="green"
        text={t('commonComponents.endPointErrorView.button')}
      />
      <View style={styles.bottomSpace} />
    </View>
  );
};

export default EndPointError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSpace: {
    flex: 2.5,
  },
  middleSpace: {
    flex: 1,
  },
  bottomSpace: {
    flex: 3.3,
  },
  icon: {
    width: 146,
    height: 146,
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.text.GRAY_TEXT_COLOR,
  },
});
