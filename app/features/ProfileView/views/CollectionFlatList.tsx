import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
    image: ImageSourcePropType;
  };
  index: number;
}>;

const CollectionFlatList = ({style}: SectionProps): React.JSX.Element => {
  const Item = ({item}: ItemProps) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={styles.imageShadow}>
        <Image style={styles.image} resizeMode="stretch" source={item.image} />
      </View>
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
    backgroundColor: '#012674',
    borderRadius: 4,
  },
  imageShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
