import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import { UserProfileAttribute } from '../interfaces';
type SectionProps = PropsWithChildren<{
  style?: object;
}>;
const LinkCollection = ({style}: SectionProps): React.JSX.Element => {
  const USER_PROFILE: UserProfileAttribute = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );
  const Description = USER_PROFILE.description;
  const LinksAvailability = USER_PROFILE.links.length > 0;

  const Links = USER_PROFILE.links;
  return (
    <View style={{...styles.parentView, ...style}}>
      {Description && (
        <Text style={styles.discriptionText} numberOfLines={3}>
          {Description}
        </Text>
      )}
      {LinksAvailability &&
        Links.map((item: any, index: number) => (
          <TouchableOpacity style={styles.touchableLink} key={index}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
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
