import {StyleSheet, Text, View} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import React from 'react';
import CollectionFlatList from '../views/CollectionFlatList';
import Header from '../views/Header';
import ProfileDetails from '../views/ProfileDetails';
import LinkCollection from '../views/LinkCollection';
import ContentFlatList from '../views/ContentFlatList';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = (): React.JSX.Element => {
  return (
    <View style={styles.parentView}>
      <LinearGradient
        colors={['#012674', '#222322']}
        style={styles.linearGradient}>
        <View style={styles.contentFlatListStyle}>
          <ContentFlatList
            headerComponent={
              <View style={styles.blueView}>
                <Header />
                <CollectionFlatList style={styles.collectionFlatList} />
                <ProfileDetails />
                <LinkCollection style={styles.linkCollection} />
              </View>
            }
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  blueView: {
    width: '100%',
    paddingTop: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#012674',
  },
  collectionFlatList: {
    marginTop: 10,
    marginBottom: 15,
  },
  linkCollection: {
    marginTop: 20,
    marginBottom: 10,
  },
  contentFlatListStyle: {
    width: '100%',
  },
});
