import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

const Root = (): React.JSX.Element => {
  return <SafeAreaView style={styles.safeAreaView}></SafeAreaView>;
};

export default Root;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
