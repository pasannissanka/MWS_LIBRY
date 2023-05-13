import {StyleSheet, Text, View} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import React from 'react';
import CollectionFlatList from '../views/CollectionFlatList';
import PrimaryContainer from '../views/PrimaryContainer';
import Header from '../views/Header';

const ProfileScreen = (): React.JSX.Element => {
  return (
    <View style={styles.parentView}>
      <PrimaryContainer>
        <View style={styles.blueView}>
          <Header />

          <CollectionFlatList />
        </View>
        <View style={styles.blackView}></View>
      </PrimaryContainer>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: '#012674',
  },
  blueView: {
    width: '100%',
    paddingHorizontal: 15,
  },
});
