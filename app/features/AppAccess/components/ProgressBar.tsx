import {StyleSheet, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors} from '../../../theme';

type SectionProps = PropsWithChildren<{
  completed: number;
  uncompleted: number;
}>;

const ProgressBar = ({completed, uncompleted}: SectionProps) => {
  return (
    <View style={styles.progressBar}>
      <View style={{...styles.completed, flex: completed}} />
      <View style={{...styles.uncompleted, flex: uncompleted}} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 10,
    flexDirection: 'row',
    backgroundColor: Colors.ONBOARDING_PROGRESS_BAR_BACKGROUND_COLOR,
  },
  completed: {
    backgroundColor: Colors.ONBOARDING_PROGRESS_BAR_GREEN,
  },
  uncompleted: {
    backgroundColor: Colors.ONBOARDING_PROGRESS_BAR_BACKGROUND_COLOR,
  },
});
