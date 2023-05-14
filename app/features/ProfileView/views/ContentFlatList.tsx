import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import data from '../dummyData/data';

type SectionProps = PropsWithChildren<{
  headerComponent?: any;
  style?: object;
  containerStyle?: object;
}>;

const ContentFlatList = ({
  headerComponent,
  style,
  containerStyle,
}: SectionProps): React.JSX.Element => {
  type ItemProps = PropsWithChildren<{
    item: {
      collobarators: {
        userName: string;
        profileImage: ImageSourcePropType;
      }[];
      artical: {
        image: ImageSourcePropType;
        title: string;
        views: number;
        date: string;
        favorite: boolean;
      };
    };
    index: number;
  }>;

  let CONTENT_DATA = [...data.contents];
  const Item = ({item, index}: ItemProps) => {
    const previousCollobarators =
      index === 0 ? [] : CONTENT_DATA[index - 1].collobarators;
    const currentCollobarators = item.collobarators;

    const sameCollobarators =
      JSON.stringify(previousCollobarators) ===
      JSON.stringify(currentCollobarators);

    return (
      <View style={styles.item}>
        {!sameCollobarators && (
          <View style={styles.collobaratorsRow}>
            <View
              style={{
                ...styles.collobaratorsProfileImageRow,
                width: 20 + (currentCollobarators.length - 1) * 8,
              }}>
              {currentCollobarators.map(
                (collobaratorItem, collobaratorIndex) => (
                  <Image
                    key={collobaratorIndex}
                    source={collobaratorItem.profileImage}
                    style={{
                      ...styles.collobaratorsProfileImage,
                      left: collobaratorIndex * 8,
                    }}
                    resizeMode="contain"
                  />
                ),
              )}
            </View>

            <Text
              style={styles.collobaratorsUserNameText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {currentCollobarators.map(
                (collobaratorItem, collobaratorIndex) => (
                  <Text key={collobaratorIndex}>
                    {collobaratorIndex === 0
                      ? '' + collobaratorItem.userName
                      : ', ' + collobaratorItem.userName}
                  </Text>
                ),
              )}
            </Text>

            {currentCollobarators.length > 1 && (
              <View style={styles.collobaratorIcon}>
                <Text style={styles.collobaratorIconText}>{'C'}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.contentThumbnail}>
          <Image
            style={styles.thumbnailImage}
            source={item.artical.image}
            resizeMode="contain"
          />

          <View style={styles.thumbnailTextContainer}>
            <Text
              style={styles.thumbnailTitle}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.artical.title}
            </Text>
            <Text style={styles.thumbnailViewsText}>
              {item.artical.views + ' views'}
            </Text>
          </View>

          <View style={styles.itemRightContainer}>
            <Text style={styles.dateText}>{item.artical.date}</Text>
            <TouchableOpacity
              onPress={() => {
                CONTENT_DATA[index].artical.favorite = false;
              }}>
              <Image
                source={
                  item.artical.favorite
                    ? require('../../../assets/images/star-icon/star.png')
                    : require('../../../assets/images/filled-star-icon/star.png')
                }
                resizeMode="contain"
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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

  return (
    <View style={{...styles.parentView, ...containerStyle}}>
      <FlatList
        style={{...style}}
        data={CONTENT_DATA}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<>{headerComponent}</>}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

export default ContentFlatList;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
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
    fontFamily: Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
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
    fontFamily: Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
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
    fontFamily: Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
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
    fontFamily: Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
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
