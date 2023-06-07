import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{
  children?: any;
  style?: object;
  containerStyle?: object;
}>;

const PrimaryContainer = ({
  children,
  style,
  containerStyle,
}: SectionProps): React.JSX.Element => {
  return (
    <View style={{...styles.parentView, ...containerStyle}}>
      <SafeAreaView style={styles.PrimaryContainer}>
        <ScrollView
          contentContainerStyle={styles.PrimaryContainer}
          showsVerticalScrollIndicator={false}>
          <View style={{...styles.ContentContainer, ...style}}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PrimaryContainer;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    width: '100%',
  },
  PrimaryContainer: {
    flexGrow: 1,
  },
  ContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
