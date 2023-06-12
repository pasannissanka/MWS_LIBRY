import {
  FlatList,
  ImageSourcePropType,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {Colors, Sizes} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import ProgressBar from '../components/ProgressBar';
import Header from '../../../components/header/Header';
import * as RootNavigation from '../../../navigation/RootNavigation';
import AddLibryItem from '../components/AddLibryItem';
import { ScrollView } from 'react-native-gesture-handler';

const AddYourLibryScreen = () => {
  type ItemProps = PropsWithChildren<{
    item: {
      name: string;
      bio: string;
      image: ImageSourcePropType;
      added: boolean;
    };
    index: number;
  }>;

  const {t} = useTranslation();
  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const [itemIndex, setItemIndex] = useState<number>();
  const [toggled, setToggled] = useState(false);

  const onPressNext = () => {
    //RootNavigation.navigate('EnterBirthdayScreen');
  };
  const onPressSkip = () => {
    //RootNavigation.navigate('EnterBirthdayScreen');
  };

  const DATA = [
    {
      name: 'Bilal Pervez',
      bio: 'Their bio goes in heredsksd d ddsd sd sds dsd ds dsd ds ds ddssd dsf ff f df f fd f fd ',
      image: require('../../../assets/dummyImages/content-6/content.png'),
      added: 'false',
    },
    {
      name: 'Bilal Pervez',
      bio: 'Their bio goes in heredsksd d ddsd sd sds dsd ds dsd ds ds ddssd dsf ff f df f fd f fd ',
      image: require('../../../assets/dummyImages/content-6/content.png'),
      added: 'false',
    },
    {
      name: 'Bilal Pervez',
      bio: 'Their bio goes in heredsksd d ddsd sd sds dsd ds dsd ds ds ddssd dsf ff f df f fd f fd ',
      image: require('../../../assets/dummyImages/content-6/content.png'),
      added: 'false',
    },
  ];

  const [data, setData] = useState(DATA);

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
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <AddLibryItem
                  item={item}
                  index={index}
                  onClickAdd={(
                    index: React.SetStateAction<number | undefined>,
                  ) => {
                    setToggled(true);
                    setItemIndex(index);
                    DATA[parseInt(index)].added = !DATA[parseInt(index)].added;
                    setData(DATA);
                  }}
                />
              )}
              showsVerticalScrollIndicator
              scrollIndicatorInsets={{right: 0, left: 1, top: 1, bottom: 1}}
              extraData={data}
              style={styles.flatList}
            />
          </View>

          <PrimaryButton
            text={
              toggled
                ? t('appAccess.addYourLibryScreen.next')
                : t('appAccess.addYourLibryScreen.skip')
            }
            color="green"
            style={styles.button}
            onPress={() => {
              if (toggled) {
                onPressNext();
              } else {
                onPressSkip();
              }
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
    marginTop: 32,
  },
  button: {
    marginBottom: 20,
  },
});
