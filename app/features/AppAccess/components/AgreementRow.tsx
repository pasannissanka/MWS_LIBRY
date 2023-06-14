import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors, Images} from '../../../theme';

type SectionProps = PropsWithChildren<{
  style?: any;
  onPress?: any;
  checked: boolean;
  description?: string | null;
}>;
const AgreementRow = ({style, onPress, checked, description}: SectionProps) => {
  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity style={styles.checkbox} onPress={onPress}>
        {checked && (
          <Image
            source={Images.icons.agreement_tick_icon}
            resizeMode="contain"
            style={styles.tickIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.agreement}>{description}</Text>
    </View>
  );
};

export default AgreementRow;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Colors.CHECKBOX_BORDER_COLOR,
    backgroundColor: Colors.CHECKBOX_BACKGROUND_COLOR,
    marginRight: 14,
  },
  tickIcon: {
    width: 15,
    height: 13,
  },
  agreement: {
    flex: 1,
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
});
