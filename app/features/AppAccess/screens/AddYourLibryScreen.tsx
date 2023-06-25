import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import AddLibryItem from '../components/AddLibryItem';
import {useSelector} from 'react-redux';

const AddYourLibryScreen = () => {
  const {t} = useTranslation();
  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [selectedCount, setSelectedCount] = useState(0);
  const onPressPrimaryButton = () => {
    RootNavigation.navigate('YourLibryReadyScreen');
  };

  const onSelectionChange = (count: number) => {
    setSelectedCount(selectedCount + count);
  };
  const DATA = useSelector(
    (state: any) => state.appAccessReducer.suggestUserProfils,
  );
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <ProgressBar completed={7} uncompleted={2} />
        <View style={styles.primaryContainer}>
          <Header style={styles.header} onPressBack={onPressBack} />

          <View style={styles.addLibryContainer}>
            <View style={styles.addLibryTopContainer}>
              <Text style={styles.title}>
                {t('appAccess.addYourLibryScreen.title')}
              </Text>

              <Text style={styles.description}>
                {t('appAccess.addYourLibryScreen.description')}
              </Text>
            </View>
            <FlatList
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <AddLibryItem item={item} onAction={onSelectionChange} />
              )}
              showsVerticalScrollIndicator
              scrollIndicatorInsets={{right: 0, left: 1, top: 1, bottom: 1}}
              extraData={DATA}
              style={styles.flatList}
            />
          </View>

          <PrimaryButton
            text={
              selectedCount === 0
                ? t('appAccess.addYourLibryScreen.skip')
                : t('appAccess.addYourLibryScreen.next')
            }
            color="green"
            style={styles.button}
            onPress={() => {
              onPressPrimaryButton();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AddYourLibryScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  primaryContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  header: {
    marginTop: 10,
  },
  addLibryContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 4,
    marginTop: Sizes.HEIGHT_RATIO * 36,
    marginBottom: Sizes.HEIGHT_RATIO * 27,
  },
  addLibryTopContainer: {
    paddingHorizontal: 8,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '600',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: 24,
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
  },
  flatList: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
  button: {
    marginBottom: 20,
  },
});
