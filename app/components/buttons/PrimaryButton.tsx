import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/types';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {Colors} from '../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  text?: any;
  color: 'green' | 'black';
  onPress?: any;
  icon?: ImageSourcePropType | undefined;
}>;
const PrimaryButton = ({
  style,
  text,
  color,
  onPress,
  icon,
}: SectionProps): React.JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        ...styles.parentView,
        ...(color === 'green' ? styles.greenButton : styles.blackButton),
        ...style,
      }}>
      <Text
        style={{
          ...styles.text,
          ...(color === 'green' ? styles.greenText : styles.whiteText),
        }}>
        {text}
      </Text>
      {icon && <Image source={icon} resizeMode="contain" style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  greenButton: {
    backgroundColor: Colors.PRIMARY_BUTTON_GREEN_COLOR,
  },
  blackButton: {
    backgroundColor: Colors.PRIMARY_BUTTON_BLACK_COLOR,
  },
  text: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: Colors.text.PRIMARY_COLOR,
  },
  greenText: {
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
  },
  whiteText: {
    color: Colors.text.PRIMARY_BUTTON_GREEN_COLOR,
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
});
