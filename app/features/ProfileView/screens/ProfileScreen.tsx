import {StyleSheet, Text, View} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';
import React from 'react';

const ProfileScreen = (): React.JSX.Element => {
  return (
    <View>
      <Text
        style={{color: 'black'}}
        onPress={() => {
          RootNavigation.navigate('DummyScreen');
        }}>
        ProfileScreen
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
