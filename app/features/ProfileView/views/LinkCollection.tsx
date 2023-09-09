import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import data from '../dummyData/data';
type SectionProps = PropsWithChildren<{
  style?: object;
}>;
const LinkCollection = ({style}: SectionProps): React.JSX.Element => {
  return (
    <View style={{...styles.parentView, ...style}}>
      <Text style={styles.discriptionText}>
        {
          'The official Sky Sports account, featuring highlights from every game of the season, as well as exclusive player access - only on Sky Sports!'
        }
      </Text>
      {data.links.map((item, index) => (
        <TouchableOpacity style={styles.touchableLink} key={index}>
          <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
            {item.link}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LinkCollection;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
  },
  discriptionText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  touchableLink: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#06D30F',
    backgroundColor: '#FFFFFF',
  },
  linkText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '400',
    color: '#1F1F1F',
    marginVertical: 8,
  },
});
