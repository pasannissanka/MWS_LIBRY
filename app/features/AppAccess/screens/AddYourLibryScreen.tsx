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
  const scrollElementHeightPercent = 10;
  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [contentOffset, setContentOffset] = useState({x: 0, y: 0});
  const [contentSize, setContentSize] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

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

  const scrollPerc =
    (contentOffset.y / (contentSize - scrollViewHeight)) *
    (100 - scrollElementHeightPercent);

  const scrollIndicatorTopSpacePerc = Number(
    scrollPerc > 90 ? 90 : scrollPerc < 0 ? 0 : scrollPerc,
  ).toFixed(0);
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
            <View style={styles.flatListContainer}>
              <View
                style={{
                  ...styles.scrollIndicator,
                  top: `${scrollIndicatorTopSpacePerc}%`,
                  height: `${scrollElementHeightPercent}%`,
                }}
              />

              <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <AddLibryItem item={item} onAction={onSelectionChange} />
                )}
                showsVerticalScrollIndicator={false}
                extraData={DATA}
                style={styles.flatList}
                onScroll={e => {
                  setContentOffset(e.nativeEvent.contentOffset);
                }}
                onContentSizeChange={(_, height) => {
                  setContentSize(height);
                }}
                onLayout={e => {
                  setScrollViewHeight(e.nativeEvent.layout.height);
                }}
              />
            </View>
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
    paddingHorizontal: 16,
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
  flatListContainer: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
  flatList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
  },
  scrollIndicator: {
    position: 'absolute',
    right: 0,
    width: 5,
    borderRadius: 5,
    backgroundColor: Colors.SCROLL_IDICATOR_COLOR,
    zIndex: 1,
  },
  button: {
    marginBottom: 20,
  },
});
