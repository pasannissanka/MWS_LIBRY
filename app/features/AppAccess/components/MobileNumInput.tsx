import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useRef, useState} from 'react';
import PrimaryTextInput from './PrimaryTextInput';
import {Colors, Images} from '../../../theme';
import CountryCodeDropdown from './CountryCodeDropdown';

type SectionProps = PropsWithChildren<{
  style?: object;
  onChangeMobileNum?: any;
  value: string;
  secureTextEntry?: boolean;
  reference?: any;
  error?: boolean;
}>;

const MobileNumInput = ({
  style,
  onChangeMobileNum,
  value,
  reference,
  error,
}: SectionProps) => {
  const [countryObj, onChangeContryObj] = useState({
    name: 'France',
    dial_code: '+33',
    code: 'FR',
  });
  const dropdownRef = useRef<any>();

  const onPressCountyCode = () => {
    dropdownRef.current.open();
  };
  return (
    <>
      <View style={{...styles.mobileNumInput, ...style}}>
        <View style={styles.countryCode}>
          <TouchableOpacity
            style={styles.countryCodeTouchable}
            onPress={onPressCountyCode}>
            <Text style={styles.countryCodeText}>
              {countryObj.code} {countryObj.dial_code}
            </Text>
            <Image
              source={Images.icons.dropdown_icon}
              resizeMode="contain"
              style={styles.downIcon}
            />
          </TouchableOpacity>
        </View>
        <PrimaryTextInput
          error={error}
          reference={reference}
          value={value}
          style={styles.textInput}
          inputMode="numeric"
          keyboardType="phone-pad"
          onChangeText={onChangeMobileNum}
        />
      </View>
      <CountryCodeDropdown
        reference={dropdownRef}
        onPressItem={onChangeContryObj}
      />
    </>
  );
};

export default MobileNumInput;

const styles = StyleSheet.create({
  mobileNumInput: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 24,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
  },
  countryCode: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: Colors.PRIMARY_TEXT_INPUT_BORDER_COLOR,
    marginRight: 8,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
  },
  countryCodeTouchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
  },
  countryCodeText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: Colors.text.SECONDARY_COLOR,
  },
  downIcon: {
    width: 12,
    height: 8,
    marginLeft: 5,
  },
});
