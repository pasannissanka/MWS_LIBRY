import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors, Fonts} from '../../../theme';
import {SearchViewerProps, SearchedUserItemProps} from '../interfaces';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {GetUsersBySearchResponse} from '../../../services/models/responses';

type ActiveCatagory = 'POST' | 'PROFILE';

const SearchViewer = ({onPressItem, reference}: SearchViewerProps) => {
  const [activeCatagory, setActiveCatagory] =
    useState<ActiveCatagory>('PROFILE');

  const SearchedResponse: GetUsersBySearchResponse = useSelector(
    (state: any) => state.DashboardReducer.searchedUsersResponse,
  );

  const UsersList = SearchedResponse.data;

  useEffect(() => {
    slideIn();
  }, []);

  const slideIn = () => {
    reference.current?.bounceInUp(2000);
  };

  const UserItem = ({item, index}: SearchedUserItemProps) => {
    return (
      <TouchableOpacity style={styles.userItemRow} onPress={onPressItem}>
        {item.profilePicture.s3Url ? (
          <Image
            source={{uri: item.profilePicture.s3Url}}
            style={styles.userProfImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.userProfImageFallback}>
            <Text style={styles.userProfImageFallbackText}>
              {item.name.charAt(0)}
            </Text>
          </View>
        )}

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
      <LinearGradient
        colors={[
          Colors.SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
          Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
        ]}
        style={styles.gradientView}>
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
            data={UsersList}
            renderItem={({item, index}) => (
              <UserItem item={item} index={index} />
            )}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </LinearGradient>
    </Animatable.View>
  );
};

export default SearchViewer;

const styles = StyleSheet.create({
  animationView: {
    flex: 1,
  },
  gradientView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: Colors.COMPONENTS_BACKGROUNDS.GRAY,
  },
  userProfImageFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: Colors.COMPONENTS_BORDER.GRAY,
    backgroundColor: Colors.COMPONENTS_BACKGROUNDS.GRAY,
    alignItems: 'center',
  },
  userProfImageFallbackText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.TRANSPARENT_ON_SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
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
