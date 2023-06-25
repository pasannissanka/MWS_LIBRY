import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../theme';
import {useTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import NetInfo from '@react-native-community/netinfo';

const NoNetworkNarrowStrip = () => {
  const {t} = useTranslation();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      const connected = networkState.isInternetReachable;
      if (connected !== null) {
        setIsConnected(connected);
      }
    });
  });

  return (
    <Collapsible collapsed={isConnected}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {t('commonComponents.noNetworkConectionStrip.text')}
        </Text>
      </View>
    </Collapsible>
  );
};

export default NoNetworkNarrowStrip;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 45,
    opacity: 0.5,
    backgroundColor: Colors.NO_CONNECTION_NARROW_STRIP_BACKGROUND_COLOR,
  },
  text: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
});
