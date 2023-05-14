import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import React from 'react';
import {navigationRef} from './navigation/RootNavigation';

const Root = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar translucent backgroundColor={'#012674'} />
      <NavigationContainer ref={navigationRef}>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

});
