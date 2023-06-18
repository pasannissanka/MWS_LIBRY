import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from './navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Colors} from './theme';
import {useSelector} from 'react-redux';

const Root = (): React.JSX.Element => {
  const SpinnerVisibility = useSelector(
    (state: any) => state.commonReducer.spinnerVisibility,
  );
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
      <Spinner
        visible={SpinnerVisibility}
        overlayColor={Colors.SPINNER_OVERLAY_COLOR}
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
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  childSafeAreaView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  linearGradient: {
    flex: 1,
  },
});
