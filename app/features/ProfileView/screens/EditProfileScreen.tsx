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
import React, {useRef, useState} from 'react';
import {Colors, Fonts, Images} from '../../../theme';
import Header from '../../../components/header/Header';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
import {
  getProfileImageUploadedResponse,
  getUserInfoUpdateResponse,
} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {GetProfileImgUploadUrlRequest} from '../../../services/models/requests';
import {ImageInterface} from '../interfaces/ImageInterface';
import {UserProfileAttribute} from '../interfaces';

export default function EditProfileScreen() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const usernameRef = useRef<any>();
  const nameRef = useRef<any>();
  const bioRef = useRef<any>();

  const USER_PROFILE: UserProfileAttribute = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const RefKeyVlaue: number = useSelector(
    (state: any) => state.profileViewReducer.linkUpdatedRefKey,
  );

  const profilePicAvailability = USER_PROFILE.profilePicture ? true : false;
  const numOfLinks = USER_PROFILE.links.length;
  const ProfileInfoUpdatedRefKey: number = useSelector(
    (state: any) => state.profileViewReducer.linkUpdatedRefKey,
  );

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

  const onPressSaveButtonForProfInfo = async () => {
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

  const onPressSaveButtonForProfImage = async () => {
    if (selectedProfileImage) {
      const param: GetProfileImgUploadUrlRequest = {
        'file-type': selectedProfileImage.filename?.toString().split('.')[1],
      };
      const response = await fetch(selectedProfileImage.path);
      const imageBody = await response.blob();

      const payload = {
        param: param,
        imageBody: imageBody,
      };

      dispatch(getProfileImageUploadedResponse(payload));
      setSelectedProfileImage(undefined);
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

  const onGallery = async () => {
    ImagePicker.openPicker({
      width: 320,
      height: 320,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
    }).then(async image => {
      const selectedImage: ImageInterface = {
        filename: image.filename,
        path: image.path,
      };
      setSelectedProfileImage(selectedImage);
    });
  };

  const profileImagePreview = () => {
    return selectedProfileImage?.path
      ? {uri: selectedProfileImage.path}
      : {uri: USER_PROFILE.profilePicture.s3Url};
  };

  const [username, onChangeUsername] = useState(USER_PROFILE.username);
  const [name, onChangeName] = useState(USER_PROFILE.name);
  const [bio, onChangeBio] = useState(USER_PROFILE.description);
  const [selectedProfileImage, setSelectedProfileImage] =
    useState<ImageInterface>();

  const profInfoChanged =
    name !== USER_PROFILE.name ||
    bio !== USER_PROFILE.description ||
    username !== USER_PROFILE.username;

  const saveButtonVisibility = profInfoChanged || selectedProfileImage;

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
        <View style={styles.parentView} key={ProfileInfoUpdatedRefKey}>
          <Header
            style={styles.header}
            onPressBack={onPressBack}
            title={t('profileView.EditProfileScreen.screenTitle')}
            rightButton={
              saveButtonVisibility
                ? t('profileView.EditProfileScreen.headerRightButton')
                : null
            }
            onPressRightButton={() => {
              if (profInfoChanged && selectedProfileImage) {
                onPressSaveButtonForProfImage();
                onPressSaveButtonForProfInfo();
              } else if (profInfoChanged && !selectedProfileImage) {
                onPressSaveButtonForProfInfo();
              } else if (!profInfoChanged && selectedProfileImage) {
                onPressSaveButtonForProfImage();
              } else {
              }
            }}
          />

          <PrimaryContainer style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.profileImageTouchable}
              onPress={addProfileImage}>
              <Image
                defaultSource={Images.icons.edit_profile_icon}
                style={styles.profileImage}
                resizeMode="cover"
                source={profileImagePreview()}
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
                  <View style={styles.linkCountContainer} key={RefKeyVlaue}>
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
                  keyboardType="default"
                  inputMode="text"
                  autoCapitalize="none"
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
                  keyboardType="default"
                  inputMode="text"
                  autoCapitalize="none"
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
                  keyboardType="default"
                  inputMode="text"
                  autoCapitalize="none"
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
    borderTopWidth: 0.5,
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
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
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
