import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Header = (): React.JSX.Element => {
  const [text, setText] = useState<string>('skysports');
  return (
    <View style={styles.parentView}>
      <TouchableOpacity style={styles.backButton}>
        <Image
          style={styles.backArrow}
          resizeMode="contain"
          source={require('../../../assets/images/back-arrow/back-arrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Image
            style={styles.searchIcon}
            resizeMode="contain"
            source={require('../../../assets/images/search-icon/search-icon.png')}
          />
        </TouchableOpacity>

        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={require('../../../assets/dummyImages/skysoport-profile/skysport.png')}
        />
        <TextInput
          //ref={}
          placeholderTextColor={'#B3B3B3'}
          placeholder="Search Libry"
          style={styles.textInput}
          onChangeText={(value: React.SetStateAction<string>) => setText(value)}
          value={text}
          // onBlur={}
          // onFocus={}
          keyboardType="default"
          returnKeyType="done"
          numberOfLines={1}
        />
      </View>
      <TouchableOpacity>
        <Image
          style={styles.bellIcon}
          resizeMode="contain"
          source={require('../../../assets/images/bell-icon/bell-icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.meatballsIcon}
          resizeMode="contain"
          source={require('../../../assets/images/meatballs-icon/meatballs-icon.png')}
        />
      </TouchableOpacity>
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
});
