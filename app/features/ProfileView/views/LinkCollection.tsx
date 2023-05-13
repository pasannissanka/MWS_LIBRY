import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import data from '../dummyData/data';
import Collapsible from 'react-native-collapsible';
type SectionProps = PropsWithChildren<{
  style?: object;
}>;
const LinkCollection = ({style}: SectionProps): React.JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <View style={{...styles.parentView, ...style}}>
      <Collapsible collapsed={expanded} style={styles.collapsibleView}>
        {data.links.slice(0, 2).map((item, index) => (
          <TouchableOpacity style={styles.touchableLink}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.link}
            </Text>
          </TouchableOpacity>
        ))}
      </Collapsible>
      <Collapsible collapsed={!expanded} style={styles.collapsibleView}>
        <Text style={styles.discriptionText}>
          {
            'The official Sky Sports account, featuring highlights from every game of the season, as well as exclusive player access - only on Sky Sports!'
          }
        </Text>
        {data.links.map((item, index) => (
          <TouchableOpacity style={styles.touchableLink}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.link}
            </Text>
          </TouchableOpacity>
        ))}
      </Collapsible>
      <View style={styles.expandButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            setExpanded(!expanded);
          }}>
          <Image
            source={require('../../../assets/images/expand-icon/expand-icon.png')}
            style={expanded ? styles.collapseIcon : styles.expandIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkCollection;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
  },
  discriptionText: {
    fontFamily: 'Myriad Pro Bold',
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
    fontFamily: 'Myriad Pro Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '400',
    color: '#1F1F1F',
    marginVertical: 8,
  },
  collapsibleView: {
    width: '100%',
    alignItems: 'center',
  },
  expandIcon: {
    width: 12,
    height: 6,
    marginTop: 4,
  },
  collapseIcon: {
    width: 12,
    height: 6,
    transform: [{rotate: '180deg'}],
    margin: 4,
  },
  expandButtonContainer: {
    width: '100%',
    alignItems: 'center',
    margin: 4,
  },
});
