import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Sizes} from '../../theme';
import {ExtendedArticalInterface} from '../../features/Dashboard/interfaces/DashboardInterface';

const ExtendedArticalThumbnail = ({item, index}: ExtendedArticalInterface) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={item.artical.image}
        style={styles.ideaImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={3}>
          {
            'An easy and simple to use React Native component to render a custom high performant masonry layout for images.'
          }
        </Text>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText} numberOfLines={1}>
            {'174 views'}
          </Text>
          <Text style={styles.bottomDotSeparator}>{'•'}</Text>
          <Text style={styles.bottomText} numberOfLines={1}>
            {'Yest'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExtendedArticalThumbnail;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: (Sizes.DEVICE_SCREEN_WIDTH - 42) / 2,
    height: Sizes.HEIGHT_RATIO * 225,
    borderRadius: 30,
    marginHorizontal: 6,
    marginTop: 16,
    padding: 4,
    backgroundColor: Colors.CARDS.ARTICAL_THUMBNAIL_BACKGROUND_COLOR,
  },
  ideaImage: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
  },
  textContainer: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  titleText: {
    fontFamily: Fonts.MyriadProRegular,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  bottomTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomText: {
    flex: 1,
    fontFamily: Fonts.MyriadProRegular,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.GRAY_TEXT_COLOR,
  },
  bottomDotSeparator: {
    fontFamily: Fonts.MyriadProRegular,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 6,
    color: Colors.text.GRAY_TEXT_COLOR,
  },
});
