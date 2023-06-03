import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from './navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';

const Root = (): React.JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={'#012674'}
        barStyle={'default'}
      />
      <SafeAreaView style={styles.parentSafeAreaView} />
      <SafeAreaView style={styles.childSafeAreaView}>
        <LinearGradient
          colors={['#012674', '#222322']}
          style={styles.linearGradient}>
          <NavigationContainer ref={navigationRef}>
            <NavigationStack />
          </NavigationContainer>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  parentSafeAreaView: {
    flex: 0,
    backgroundColor: '#012674',
  },
  childSafeAreaView: {
    flex: 1,
    backgroundColor: '#222322',
  },
  linearGradient: {
    flex: 1,
  },
});
