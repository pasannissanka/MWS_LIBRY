import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../theme';

const ProfileScreen = () => {
  return (
    <View style={styles.parentView}>
      <Text>Your</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContainer: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: 'pink',
  },
  header: {
    marginTop: 10,
  },
});
