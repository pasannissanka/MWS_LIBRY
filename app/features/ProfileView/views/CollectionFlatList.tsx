import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import data from '../dummyData/data';

type SectionProps = PropsWithChildren<{
  style?: object;
}>;

type ItemProps = PropsWithChildren<{
  item: {
    title: string;
    image: string;
  };
  index: number;
}>;

const CollectionFlatList = ({style}: SectionProps): React.JSX.Element => {
  const Item = ({item}: ItemProps) => (
    <TouchableOpacity style={styles.item}>
      <Image style={styles.image} resizeMode="stretch" source={item.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{...styles.parentView, ...style}}>
      <FlatList
        data={data.collectionList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CollectionFlatList;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
  },
  item: {
    width: 164,
    height: 'auto',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 230,
    marginBottom: 10,
    borderRadius: 4,
  },
  title: {
    fontFamily: 'Myriad Pro Bold',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
