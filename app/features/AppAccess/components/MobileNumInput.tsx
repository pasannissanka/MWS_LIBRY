import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
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
  secureTextEntry?: boolean;
  reference?: any;
  error?: boolean;
}>;

const MobileNumInput = ({
  style,
  onChangeMobileNum,
  reference,
  error,
}: SectionProps) => {
  const [number, setNumber] = useState('');
  const [countryObj, setCountryObj] = useState({
    name: 'France',
    dial_code: '+33',
    code: 'FR',
  });
  const dropdownRef = useRef<any>();

  const onPressCountyCode = () => {
    dropdownRef.current.open();
  };

  const onChangeNumber = (text: string) => {
    setNumber(text);
    onChangeMobileNum(countryObj.dial_code + text);
  };

  const onChangeContryCode = (obj: {
    name: string;
    dial_code: string;
    code: string;
  }) => {
    setCountryObj(obj);
    onChangeMobileNum(obj.dial_code + number);
  };
  return (
    <>
      <View style={{...styles.mobileNumInput, ...style}}>
        <TouchableOpacity
          style={styles.countryCode}
          onPress={onPressCountyCode}>
          <TextInput editable={false} style={styles.countryCodeInput}>
            {countryObj.code} {countryObj.dial_code}
          </TextInput>
          <Image
            source={Images.icons.dropdown_icon}
            resizeMode="contain"
            style={styles.downIcon}
          />
        </TouchableOpacity>
        <PrimaryTextInput
          error={error}
          reference={reference}
          value={number}
          style={styles.textInput}
          inputMode="numeric"
          keyboardType="phone-pad"
          onChangeText={(text: string) => onChangeNumber(text)}
        />
      </View>
      <CountryCodeDropdown
        reference={dropdownRef}
        onPressItem={(obj: {name: string; dial_code: string; code: string}) =>
          onChangeContryCode(obj)
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: Colors.PRIMARY_TEXT_INPUT_BORDER_COLOR,
  },
  countryCodeInput: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.SECONDARY_COLOR,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
  },
  downIcon: {
    width: 12,
    height: 8,
    marginLeft: 5,
  },
});
