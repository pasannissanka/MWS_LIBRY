import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors} from '../../../theme';

type OptionCardProps = PropsWithChildren<{
  style?: ViewStyle;
  children?: React.ReactNode;
}>;

const OptionCard: React.FC<OptionCardProps> = ({style, children}) => {
  return <View style={{...styles.container, ...style}}>{children}</View>;
};

export default OptionCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.USER_INFO_BOTTOM_SHEET_OPTION_BACKGROUND,
  },
});
