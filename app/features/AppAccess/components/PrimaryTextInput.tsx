import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors} from '../../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  placeholder?: any;
  keyboardType: 'email-address' | 'default' | 'phone-pad';
  inputMode: 'email' | 'text' | 'numeric';
  onChangeText: any;
  value: string;
  secureTextEntry?: boolean;
  reference?: any;
  error?: boolean;
}>;

const PrimaryTextInput = ({
  style,
  placeholder,
  keyboardType,
  inputMode,
  value,
  onChangeText,
  secureTextEntry = false,
  reference,
  error = false,
}: SectionProps) => {
  return (
    <View style={{...styles.parentView, ...style}}>
      <TextInput
        ref={reference}
        value={value}
        keyboardType={keyboardType}
        inputMode={inputMode}
        placeholder={placeholder}
        style={error ? styles.textInputError : styles.textInput}
        placeholderTextColor={Colors.text.TEXT_INPUT_PLACEHOLDER_COLOR}
        onChangeText={onChangeText}
        numberOfLines={1}
        contextMenuHidden={true}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

export default PrimaryTextInput;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: Colors.text.SECONDARY_COLOR,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: Colors.PRIMARY_TEXT_INPUT_BORDER_COLOR,
    height: 40,
  },
  textInputError: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: Colors.text.SECONDARY_COLOR,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY_TEXT_INPUT_BACKGROUND_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: Colors.PRIMARY_TEXT_INPUT_ERROR_BORDER_COLOR,
    height: 40,
  },
});
