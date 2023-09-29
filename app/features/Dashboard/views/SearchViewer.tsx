import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors, Fonts, Images} from '../../../theme';
import {SearchViewerProps} from '../interfaces';

type ActiveCatagory = 'POST' | 'PROFILE';
type UserItemProps = {
  item: {
    name: string;
    image: ImageSourcePropType;
    username: string;
  };
  index: number;
};

const SearchViewer = ({onPressItem, reference}: SearchViewerProps) => {
  const [activeCatagory, setActiveCatagory] =
    useState<ActiveCatagory>('PROFILE');

  const data = [
    {
      image: Images.image.opening_placeholder,
      name: 'Hasitha',
      username: 'Hasitha97',
    },
    {
      image: Images.image.opening_placeholder,
      name: 'Hasitha',
      username: 'Hasitha97',
    },
    {
      image: Images.image.opening_placeholder,
      name: 'Hasitha',
      username: 'Hasitha97',
    },
    {
      image: Images.image.opening_placeholder,
      name: 'Hasitha',
      username: 'Hasitha97',
    },
    {
      image: Images.image.opening_placeholder,
      name: 'Hasitha',
      username: 'Hasitha97',
    },
  ];

  useEffect(() => {
    slideIn();
  }, []);

  const slideIn = () => {
    reference.current?.bounceInUp(2000);
  };

  const UserItem = ({item, index}: UserItemProps) => {
    return (
      <TouchableOpacity style={styles.userItemRow} onPress={onPressItem}>
        <Image
          source={item.image}
          style={styles.userProfImage}
          resizeMode="cover"
        />

        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userUsername}>{item.username}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animatable.View
      style={styles.animationView}
      animation="fadeIn"
      duration={2000}
      ref={reference}>
      <View style={styles.container}>
        <View style={styles.catagoryRow}>
          <TouchableOpacity
            style={
              activeCatagory === 'POST'
                ? styles.catagoryActiveTouchable
                : styles.catagoryTouchable
            }
            onPress={() => {
              setActiveCatagory('POST');
            }}>
            <Text
              style={
                activeCatagory === 'POST'
                  ? styles.catagoryActiveText
                  : styles.catagoryText
              }>
              {'Posts'}
            </Text>
          </TouchableOpacity>

          <View style={styles.catagorySeparator} />

          <TouchableOpacity
            style={
              activeCatagory === 'PROFILE'
                ? styles.catagoryActiveTouchable
                : styles.catagoryTouchable
            }
            onPress={() => {
              setActiveCatagory('PROFILE');
            }}>
            <Text
              style={
                activeCatagory === 'PROFILE'
                  ? styles.catagoryActiveText
                  : styles.catagoryText
              }>
              {'Profiles'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => <UserItem item={item} index={index} />}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
    </Animatable.View>
  );
};

export default SearchViewer;

const styles = StyleSheet.create({
  animationView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  catagoryRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  catagoryTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.COMPONENTS_BORDER.GRAY,
  },
  catagoryActiveTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.COMPONENTS_BACKGROUNDS.BLUE,
    backgroundColor: Colors.COMPONENTS_BACKGROUNDS.BLUE,
  },
  catagoryText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.PRIMARY_COLOR,
  },
  catagoryActiveText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.TRANSPARENT_ON_SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
  },
  catagorySeparator: {
    width: 10,
    height: '100%',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  flatListContentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  userItemRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userProfImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.MyriadProRegular,
    fontWeight: '700',
    lineHeight: 20,
    color: Colors.text.PRIMARY_COLOR,
  },
  userUsername: {
    fontSize: 15,
    fontFamily: Fonts.MyriadProRegular,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.text.GRAY_TEXT_COLOR,
  },
});
