import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../theme';
import ContentFlatList from '../views/ContentFlatList';
import ProfileDetails from '../views/ProfileDetails';
import LinkCollection from '../views/LinkCollection';

const ProfileScreen = () => {
  return (
    <View style={styles.parentView}>
      <ContentFlatList
        headerComponent={
          <View style={styles.flatListHeader}>
            <ProfileDetails />
            <LinkCollection style={styles.linkCollection} />
          </View>
        }
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  flatListHeader: {
    paddingHorizontal: 15,
  },
  collectionFlatList: {
    marginTop: 10,
    marginBottom: 15,
  },
  linkCollection: {
    marginTop: 15,
    marginBottom: 28,
  },
});
