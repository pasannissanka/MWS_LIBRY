import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import data from '../dummyData/data';
import ArticalThumbnail from '../../../components/cards/ArticalThumbnail';
import {Colors} from '../../../theme';
import {ArticalInterface} from '../interfaces/ProfileViewInterface';

type SectionProps = PropsWithChildren<{
  headerComponent?: any;
  style?: object;
  containerStyle?: object;
}>;

const ProfileViewerFlatList = ({
  headerComponent,
  style,
  containerStyle,
}: SectionProps): React.JSX.Element => {
  const footerComponent = () => {
    return (
      <View style={styles.viewAllContainer}>
        <TouchableOpacity style={styles.viewAllTouchable}>
          <Text style={styles.viewAllText}>{'View all content'}</Text>
          <Image
            resizeMode="contain"
            style={styles.viewAllRightArrow}
            source={require('../../../assets/images/right-arrow/right-arrow.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderArtical = ({item, index}: ArticalInterface) => {
    return <ArticalThumbnail item={item} index={index} />;
  };

  return (
    <View style={{...styles.parentView, ...containerStyle}}>
      <FlatList
        style={{...style}}
        data={data.contents}
        showsHorizontalScrollIndicator={false}
        renderItem={renderArtical}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<>{headerComponent}</>}
        ListFooterComponent={footerComponent}
        extraData={data.contents}
        numColumns={2}
        columnWrapperStyle={styles.flatListColumWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileViewerFlatList;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
  },
  flatListColumWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 16,
    backgroundColor: Colors.SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
  },
  item: {
    width: '100%',
    backgroundColor: '#181818',
  },
  collobaratorsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  collobaratorsProfileImageRow: {
    height: 20,
    marginRight: 7,
  },
  collobaratorsProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
  collobaratorsUserNameText: {
    flex: 1,
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  collobaratorIcon: {
    width: 22,
    height: 16,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  collobaratorIconText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 11,
    lineHeight: 13,
    textAlign: 'center',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentThumbnail: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  thumbnailImage: {
    width: 60,
    height: 50,
    borderRadius: 10,
  },
  thumbnailTextContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  thumbnailTitle: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  thumbnailViewsText: {
    fontFamily: 'Myriad Pro Bold',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'left',
    fontWeight: '400',
    color: '#9BA0A5',
    marginTop: 6,
  },
  itemRightContainer: {
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 22,
    height: 22,
    marginTop: 20,
  },
  dateText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '400',
    color: '#9BA0A5',
  },
  viewAllContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 135,
    backgroundColor: '#1F1F1F',
  },
  viewAllTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FFFFFF',
  },
  viewAllRightArrow: {
    width: 12,
    height: 12,
    marginLeft: 6,
  },
});
