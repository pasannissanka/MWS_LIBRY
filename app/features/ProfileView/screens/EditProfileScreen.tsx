import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Header from '../../../components/header/Header';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
import {getUserInfoUpdateResponse} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default function EditProfileScreen() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const usernameRef = useRef<any>();
  const nameRef = useRef<any>();
  const bioRef = useRef<any>();

  const USER_PROFILE = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );
  const SpinnerVisibility = useSelector(
    (state: any) => state.commonReducer.spinnerVisibility,
  );
  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const profilePicAvailability = USER_PROFILE.profilePicture ? true : false;
  const numOfLinks = USER_PROFILE.links.length;

  let editProfileInfoAlert = {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressLinksRow = () => {
    RootNavigation.navigate('EditLinksOrderScreen');
  };

  const onPressSaveButton = async () => {
    const requestBody = {
      name: name,
      description: bio,
      username: username,
    };

    if (name === USER_PROFILE.name) {
      delete requestBody.name;
    }

    if (bio === USER_PROFILE.description) {
      delete requestBody.description;
    }

    if (username === USER_PROFILE.username) {
      delete requestBody.username;
    }

    if (!username) {
      editProfileInfoAlert = {
        visible: true,
        title: t('profileView.EditProfileScreen.editProfileInfoAlertTwo.title'),
        description: t(
          'profileView.EditProfileScreen.editProfileInfoAlertTwo.description',
        ),
        button: t(
          'profileView.EditProfileScreen.editProfileInfoAlertTwo.button',
        ),
        onPress: () => {},
      };
      showAlert();
    } else if (!name) {
      editProfileInfoAlert = {
        visible: true,
        title: t('profileView.EditProfileScreen.editProfileInfoAlertOne.title'),
        description: t(
          'profileView.EditProfileScreen.editProfileInfoAlertOne.description',
        ),
        button: t(
          'profileView.EditProfileScreen.editProfileInfoAlertOne.button',
        ),
        onPress: () => {},
      };
      showAlert();
    } else {
      const payload = {
        requestBody: requestBody,
        translation: t,
      };
      dispatch(getUserInfoUpdateResponse(payload));
    }
  };

  const showAlert = () => {
    dispatch(setAlertBoxVisibility(editProfileInfoAlert));
  };

  const addProfileImage = () => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            onGallery();
            break;

          default:
            console.log('UNABLE TO PICK IMAGE');
        }
      });
    } else {
      onGallery();
    }
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 320,
      height: 320,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
      setProfileImagePreview(image.path);
    });
  };

  const [username, onChangeUsername] = useState(USER_PROFILE.username);
  const [name, onChangeName] = useState(USER_PROFILE.name);
  const [bio, onChangeBio] = useState(USER_PROFILE.description);
  const [profileImagePreview, setProfileImagePreview] = useState<string>();

  const saveButtonVisibility =
    name !== USER_PROFILE.name ||
    bio !== USER_PROFILE.description ||
    username !== USER_PROFILE.username;

  useEffect(() => {}, [SpinnerVisibility]);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      {EndPointErrorVisibility ? (
        <View style={styles.endPointErrorViewContainer}>
          <EndPointError onPressBack={onPressBack} />
        </View>
      ) : (
        <View style={styles.parentView}>
          <Header
            style={styles.header}
            onPressBack={onPressBack}
            title={t('profileView.EditProfileScreen.screenTitle')}
            rightButton={
              saveButtonVisibility
                ? t('profileView.EditProfileScreen.headerRightButton')
                : null
            }
            onPressRightButton={onPressSaveButton}
          />

          <PrimaryContainer style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.profileImageTouchable}
              onPress={addProfileImage}>
              <Image
                style={styles.profileImage}
                resizeMode="contain"
                source={
                  profileImagePreview
                    ? {uri: profileImagePreview}
                    : Images.icons.edit_profile_icon
                }
              />
            </TouchableOpacity>

            {!profilePicAvailability && (
              <TouchableOpacity style={styles.changePictureTextTouchable}>
                <Text style={styles.changePictureText}>
                  {t('profileView.EditProfileScreen.changePicture')}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.optionRowContainer}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.linkRowTouchable}
                  onPress={onPressLinksRow}>
                  <View style={styles.linkCountContainer}>
                    <Text style={styles.linkCount}>{numOfLinks}</Text>
                  </View>

                  <Text style={styles.linksText}>
                    {t('profileView.EditProfileScreen.links')}
                  </Text>

                  <Image
                    source={Images.icons.right_arrow}
                    resizeMode="contain"
                    style={styles.rightArrow}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <Text style={styles.textInputLabel}>
                  {t('profileView.EditProfileScreen.usernameInputLabel')}
                </Text>
                <TextInput
                  ref={usernameRef}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                  value={username}
                  onChangeText={onChangeUsername}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.textInputLabel}>
                  {t('profileView.EditProfileScreen.nameInputLabel')}
                </Text>
                <TextInput
                  ref={nameRef}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                  value={name}
                  onChangeText={onChangeName}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.textInputLabel}>
                  {t('profileView.EditProfileScreen.bioInputLabel')}
                </Text>
                <TextInput
                  ref={bioRef}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                  value={bio}
                  onChangeText={onChangeBio}
                />
              </View>
            </View>
          </PrimaryContainer>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingVertical: 15,
  },
  endPointErrorViewContainer: {
    flex: 1,
    ackgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
    padding: 15,
  },
  profileImageTouchable: {
    width: 72,
    height: 72,
    borderRadius: 36,
    margin: 10,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  confirmationContainer: {
    width: '100%',
    borderTopWidth: 0.35,
    borderTopColor: Colors.LINE_BRAKER_COLOR,
  },
  changePictureTextTouchable: {
    paddingHorizontal: 10,
    borderRadius: 9,
    marginBottom: 10,
  },
  changePictureText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.LINK_TEXT_COLOR,
  },
  optionRowContainer: {
    width: '100%',
    marginTop: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    padding: 16,
    borderTopColor: Colors.LINE_BRAKER_COLOR,
  },
  linkRowTouchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkCountContainer: {
    minWidth: 24,
    minHeight: 24,
    maxWidth: 'auto',
    maxHeight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: Colors.COMPONENTS_BACKGROUNDS.GRAY,
    borderRadius: 12,
    marginRight: 6,
  },
  linkCount: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.TRANSPARENT_ON_SCREEN_PRIMARY_BACKGROUND,
  },
  linksText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.GRAY_TEXT_COLOR,
  },
  rightArrow: {
    width: 14,
    height: 14,
  },
  textInputLabel: {
    width: 120,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.GRAY_TEXT_COLOR,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.PRIMARY_COLOR,
    marginVertical: 0,
    paddingVertical: 0,
  },
});
