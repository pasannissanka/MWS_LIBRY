import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {Colors, Images} from '../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  onPressBack?: any;
  title?: string;
  skipButton?: boolean;
  onPressSkip?: any;
}>;

const Header = ({
  style,
  onPressBack,
  title,
  skipButton,
  onPressSkip,
}: SectionProps): React.JSX.Element => {
  const [text, setText] = useState<string>('skysports');

  return (
    <View style={{...styles.parentView, ...style}}>
      <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
        <Image
          style={styles.backArrow}
          resizeMode="contain"
          source={Images.icons.back_icon}
        />
      </TouchableOpacity>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      )}

      {skipButton && (
        <>
          <View style={styles.flexOne} />
          <TouchableOpacity onPress={onPressSkip} >
          <Text style={styles.skipButton}>SKIP</Text>
          </TouchableOpacity>
         
        </>
      )}

      {false && (
        <>
          <View style={styles.searchBar}>
            <TouchableOpacity>
              <Image
                style={styles.searchIcon}
                resizeMode="contain"
                //source={require('../../../assets/images/search-icon/search-icon.png')}
              />
            </TouchableOpacity>

            <Image
              style={styles.profileImage}
              resizeMode="contain"
              //source={require('../../../assets/dummyImages/skysoport-profile/skysport.png')}
            />
            <TextInput
              //ref={}
              placeholderTextColor={'#B3B3B3'}
              placeholder="Search Libry"
              style={styles.textInput}
              onChangeText={(value: React.SetStateAction<string>) =>
                setText(value)
              }
              value={text}
              // onBlur={}
              // onFocus={}
              keyboardType="default"
              returnKeyType="done"
              numberOfLines={1}
            />
          </View>

          <TouchableOpacity>
            <Image style={styles.bellIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.meatballsIcon} resizeMode="contain" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
    borderRadius: 4,
  },
  backArrow: {
    width: 8,
    height: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 32,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.text.PRIMARY_COLOR,
  },
  searchBar: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#1D1D1D',
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
    paddingVertical: 0,
    color: '#B3B3B3',
  },
  bellIcon: {
    width: 20,
    height: 24,
    marginHorizontal: 10,
  },
  meatballsIcon: {
    height: 6,
    width: 28,
  },
  flexOne: {
    flex: 1,
  },
  skipButton: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'right',
    fontWeight: '600',
    color: Colors.text.GRAY_TEXT_COLOR,
  },
});
