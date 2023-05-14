import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const ProfileDetails = (): React.JSX.Element => {
  const status = {Add: 'Add', Added: 'Added'};
  const [addButton, setAddButton] = useState<string>(status.Add);
  return (
    <View style={styles.parentView}>
      <View style={styles.topRow}>
        <Image
          style={styles.profileImage}
          source={require('../../../assets/dummyImages/skysoport-profile/skysport.png')}
        />
        <View style={styles.topRowLeftContainer}>
          <Text style={styles.profileName}>{'Sky Sports'}</Text>
          <View style={styles.followingButtonRow}>
            <View style={styles.buttonContainerLeft}>
              <TouchableOpacity style={styles.outlinedButton}>
                <Text style={styles.followingButtonText}>{'784 K adds'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerRight}>
              {addButton === status.Added ? (
                <TouchableOpacity
                  style={styles.filledButtonAdded}
                  onPress={() => setAddButton(status.Add)}>
                  <Text style={styles.followingButtonGreenText}>
                    <Image
                      source={require('../../../assets/images/tick-icon/tick.png')}
                      style={styles.tickIcon}
                      resizeMode="contain"
                    />
                    {' ADDED'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.filledButtonAdd}
                  onPress={() => setAddButton(status.Added)}>
                  <Text style={styles.followingButtonText}>{'+ ADD'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 15,
  },
  topRowLeftContainer: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  followingButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonContainerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  outlinedButton: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  filledButtonAdd: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06D30F',
    borderRadius: 20,
  },
  filledButtonAdded: {
    width: 125,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
    borderRadius: 20,
  },
  followingButtonText: {
    flex: 1,
    fontFamily: 'Myriad Pro Bold',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  followingButtonGreenText: {
    //flex: 1,
    fontFamily: 'Myriad Pro Bold',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#06D30F',
  },
  tickIcon: {
    width: 10,
    height: 12,
  },
});
