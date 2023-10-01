import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {Colors, Images} from '../../../theme';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {UserProfileAttribute} from '../interfaces';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileDetails = (): React.JSX.Element => {
  const {t} = useTranslation();
  const USER_PROFILE: UserProfileAttribute = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );
  const ProfileInfoUpdatedRefKey: number = useSelector(
    (state: any) => state.profileViewReducer.linkUpdatedRefKey,
  );

  const FollowersCount =
    `${
      USER_PROFILE.followersCount >= 1000
        ? Math.round(USER_PROFILE.followersCount / 1000) / 1000 + ' K'
        : USER_PROFILE.followersCount
    }` + t('profileView.profileViewScreen.detailsView.addsButton');

  const FollowingCount =
    `${
      USER_PROFILE.followersCount >= 1000
        ? Math.round(USER_PROFILE.followersCount / 1000) / 1000 + ' K'
        : USER_PROFILE.followingCount
    }` + t('profileView.profileViewScreen.detailsView.addingsButton');

  const status = {Add: 'Add', Added: 'Added', Addings: 'Addings'};
  const [addButton, setAddButton] = useState<string>(status.Addings);

  return (
    <View style={styles.parentView} key={ProfileInfoUpdatedRefKey}>
      <View style={styles.topRow}>
        <Image
          resizeMode="cover"
          style={styles.profileImage}
          source={{uri: USER_PROFILE.profilePicture.s3Url}}
        />
        <View style={styles.topRowLeftContainer}>
          <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
          <View style={styles.followingButtonRow}>
            <View style={styles.buttonContainerLeft}>
              <TouchableOpacity style={styles.outlinedButton}>
                <Text style={styles.followingButtonText}>{FollowersCount}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerRight}>
              {addButton === status.Addings ? (
                <TouchableOpacity
                  style={styles.filledButtonAddings}
                  onPress={() => {}}>
                  <Text style={styles.followingButtonText}>
                    {FollowingCount}
                  </Text>
                </TouchableOpacity>
              ) : addButton === status.Added ? (
                <TouchableOpacity
                  style={styles.filledButtonAdded}
                  onPress={() => setAddButton(status.Add)}>
                  <Image
                    source={Images.icons.tick_icon}
                    style={styles.tickIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.followingButtonGreenText}>
                    {t('profileView.profileViewScreen.detailsView.addedButton')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.filledButtonAdd}
                  onPress={() => setAddButton(status.Added)}>
                  <Text style={styles.followingButtonText}>
                    {t('profileView.profileViewScreen.detailsView.addButton')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  parentView: {
    paddingTop: 16,
    width: (windowWidth < windowHeight ? windowWidth : windowHeight) - 30,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 15,
    backgroundColor: Colors.SCREEN_INACTIVE_COLOR,
  },
  topRowLeftContainer: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '600',
    color: Colors.text.PRIMARY_COLOR,
  },
  followingButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonContainerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  outlinedButton: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  filledButtonAdd: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ACTIVE_GREEN_COLOR,
    borderRadius: 20,
  },
  filledButtonAdded: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
    borderRadius: 20,
  },
  filledButtonAddings: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ACTIVE_GREEN_COLOR,
    borderRadius: 20,
  },
  followingButtonText: {
    flex: 1,
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.text.PRIMARY_COLOR,
  },
  followingButtonGreenText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.text.GREEN_TEXT_COLOR,
  },
  tickIcon: {
    width: 10,
    height: 12,
    marginBottom: 3,
    marginRight: 6,
  },
});
