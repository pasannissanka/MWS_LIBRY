import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const DummyScreen = (): React.JSX.Element => {
  const {t, i18n} = useTranslation();
  return (
    <View>
      <Text
        style={{color: 'black'}}
        onPress={() => {
          i18n.changeLanguage('es');
        }}>
        {t('dummyScreens.dummyScreenOne.title')}
      </Text>
    </View>
  );
};

export default DummyScreen;

const styles = StyleSheet.create({});
