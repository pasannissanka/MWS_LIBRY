import {
  BackHandler,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts, Images} from '../../theme';
import {useDispatch} from 'react-redux';
import {setEndPointErrorVisible} from '../../redux/action/action';
import {HeaderProps} from '../Interfaces';

const Header = ({
  style,
  onPressBack,
  title,
  skipButton,
  onPressSkip,
  searchBar = false,
  searchBarImageUri = '',
  searchBarRightIcon = 'none',
  onChangeSearchBarText,
  searchBarValue = '',
  onFocusSearchBar,
  onBlurSearchBar,
  searchBarRef,
  onPressHamburger,
  onPressMeatballs,
  rightButton = '',
  onPressRightButton,
  screenType = 'none',
}: HeaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      onPressBackArrow();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onPressBackArrow = () => {
    dispatch(setEndPointErrorVisible(false));
    onPressBack();
  };

  return (
    <View style={{...styles.parentView, ...style}}>
      {screenType === 'homeViewer' ? (
        <TouchableOpacity onPress={onPressBackArrow}>
          <Image
            source={Images.logos.app_logo_header}
            resizeMode="contain"
            style={styles.libryIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.backButton} onPress={onPressBackArrow}>
          <Image
            style={styles.backArrow}
            resizeMode="contain"
            source={Images.icons.back_icon}
          />
        </TouchableOpacity>
      )}

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
          <TouchableOpacity onPress={onPressSkip}>
            <Text style={styles.skipButton}>SKIP</Text>
          </TouchableOpacity>
        </>
      )}

      {searchBar && (
        <>
          <View style={styles.searchBar}>
            <TouchableOpacity>
              <Image
                style={styles.searchIcon}
                resizeMode="contain"
                source={Images.icons.search_icon}
              />
            </TouchableOpacity>

            {searchBarImageUri && (
              <Image
                style={styles.profileImage}
                resizeMode="contain"
                source={{
                  uri: searchBarImageUri,
                }}
              />
            )}
            <TextInput
              ref={searchBarRef}
              placeholderTextColor={'#B3B3B3'}
              placeholder="Search Libry"
              style={styles.textInput}
              onChangeText={onChangeSearchBarText}
              value={searchBarValue}
              onBlur={onBlurSearchBar}
              onFocus={onFocusSearchBar}
              keyboardType="default"
              returnKeyType="done"
              numberOfLines={1}
            />
          </View>

          <TouchableOpacity>
            <Image
              style={styles.bellIcon}
              resizeMode="contain"
              source={Images.icons.bell_icon}
            />
          </TouchableOpacity>
          {searchBarRightIcon === 'hamburger' ? (
            <TouchableOpacity
              onPress={onPressHamburger}
              style={styles.rightIconTouchable}>
              <Image
                style={styles.hamburgerIcons}
                resizeMode="contain"
                source={Images.icons.hamburger_icons}
              />
            </TouchableOpacity>
          ) : searchBarRightIcon === 'meatballs' ? (
            <TouchableOpacity
              onPress={onPressMeatballs}
              style={styles.rightIconTouchable}>
              <Image
                style={styles.meatballsIcon}
                resizeMode="contain"
                source={Images.icons.meatballs_icon}
              />
            </TouchableOpacity>
          ) : null}
        </>
      )}

      {rightButton && title ? (
        <TouchableOpacity onPress={onPressRightButton}>
          <Text style={styles.rightButtonText}>{rightButton}</Text>
        </TouchableOpacity>
      ) : title ? (
        <View style={styles.rightButtonSpace} />
      ) : (
        <View />
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
    paddingBottom: 4,
  },
  backButton: {
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
    borderRadius: 4,
  },
  libryIcon: {
    width: 64,
    height: 32,
  },
  backArrow: {
    width: 8,
    height: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
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
    marginLeft: 10,
  },
  rightIconTouchable: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  meatballsIcon: {
    height: 6,
    width: 24,
  },
  hamburgerIcons: {
    height: 16,
    width: 24,
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
  rightButtonText: {
    fontSize: 20,
    fontFamily: Fonts.MyriadProRegular,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'right',
    color: Colors.text.LINK_TEXT_COLOR,
  },
  rightButtonSpace: {
    width: 24,
    height: 32,
    borderRadius: 4,
  },
});
