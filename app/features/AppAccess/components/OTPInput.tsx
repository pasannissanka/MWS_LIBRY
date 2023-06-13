import {StyleSheet, View} from 'react-native';
import React, {PropsWithChildren, useRef, useState} from 'react';
import PrimaryTextInput from './PrimaryTextInput';
import {Colors, Sizes} from '../../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  onChangeOTP?: any;
  //reference?: any;
  error?: boolean;
}>;

const OTPInput = ({style, onChangeOTP, error}: SectionProps) => {
  const [digitOne, onChangeDigitOne] = useState('');
  const [digitTwo, onChangeDigitTwo] = useState('');
  const [digitThree, onChangeDigitThree] = useState('');
  const [digitFour, onChangeDigitFour] = useState('');
  const [digitFive, onChangeDigitFive] = useState('');

  const reference = useRef<any>([]);

  const getOTPdigit = (index: number): string => {
    switch (index) {
      case 0:
        return digitOne;
      case 1:
        return digitTwo;
      case 2:
        return digitThree;
      case 3:
        return digitFour;
      case 4:
        return digitFive;
      default:
        return '';
    }
  };

  const onChangeOTPdigit = (text: string, index: number) => {
    switch (index) {
      case 0:
        onChangeDigitOne(text);
        break;
      case 1:
        onChangeDigitTwo(text);
        break;
      case 2:
        onChangeDigitThree(text);
        break;
      case 3:
        onChangeDigitFour(text);
        break;
      case 4:
        onChangeDigitFive(text);
        break;
      default:
        break;
    }
    onChangeOTP(digitOne + digitTwo + digitThree + digitFour + digitFive);
    if (index < 4 && text !== '') {
      reference.current[index + 1].focus();
    }
  };
  return (
    <View style={{...styles.otpInput, ...style}}>
      <View style={styles.textInputContainer}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View key={index.toString()}>
            <PrimaryTextInput
              error={error}
              reference={(el: any) => (reference.current[index] = el)}
              value={getOTPdigit(index)}
              style={styles.textInput}
              inputMode="numeric"
              keyboardType="phone-pad"
              onChangeText={(text: string) => onChangeOTPdigit(text, index)}
              maxLength={1}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpInput: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 24,
    flexDirection: 'row',
  },
  textInputContainer: {
    width: Sizes.WIDTH_RATIO * 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: Sizes.WIDTH_RATIO * 32,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  countryCode: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: Colors.PRIMARY_TEXT_INPUT_BORDER_COLOR,
    marginRight: 8,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
  },
});
