import {FlatList, StyleSheet} from 'react-native';
import React, {} from 'react';
import {Colors} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import data from '../../ProfileView/dummyData/data';
import ExtendedArticalThumbnail from '../../../components/cards/ExtendedArticalThumbnail';
import {ExtendedArticalInterface} from '../interfaces/DashboardInterface';

const HomeViewer = () => {
  const GradientColors = [
    Colors.SCREEN_PRIMARY_DARK_BACKGROUND_COLOR,
    Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  ];

  const renderArtical = ({item, index}: ExtendedArticalInterface) => {
    return <ExtendedArticalThumbnail item={item} index={index} />;
  };
  return (
    <LinearGradient colors={GradientColors} style={styles.gradientView}>
      <FlatList
        style={styles.flatList}
        data={data.contents}
        showsHorizontalScrollIndicator={false}
        renderItem={renderArtical}
        keyExtractor={(item, index) => index.toString()}
        extraData={data.contents}
        numColumns={2}
        columnWrapperStyle={styles.flatListColumWrapperStyle}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default HomeViewer;

const styles = StyleSheet.create({
  gradientView: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  flatListColumWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
});
