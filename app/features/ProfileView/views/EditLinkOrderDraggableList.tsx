import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Colors, Images} from '../../../theme';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {getDeleteLinkResponse} from '../redux/action/action';

type ItemRowProps = PropsWithChildren<{
  item: {id: string; url: string; title: string; createdAt: string};
  drag: any;
  isActive: boolean;
}>;
const EditLinkOrderDraggableList = () => {
  const dispatch = useDispatch();
  let USER_PROFILE = useSelector(
    (state: any) => state.appAccessReducer.userProfile,
  );

  const initialData: [
    {
      id: string;
      url: string;
      title: string;
      createdAt: string;
    },
  ] = USER_PROFILE.links;
  const [data, setData] = useState(initialData);

  const onPressItem = (item: {
    id: string;
    url: string;
    title: string;
    createdAt: string;
  }) => {
    RootNavigation.navigate('EditAddLinkScreen', item);
  };

  const onPressDelete = (item: {
    id: string;
    url: string;
    title: string;
    createdAt: string;
  }) => {
    dispatch(getDeleteLinkResponse(item.id));
  };
  const renderItem: React.FC<ItemRowProps> = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <View style={styles.row}>
          <Text
            style={styles.text}
            onPress={() => {
              onPressItem(item);
            }}>
            {item.title}
          </Text>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={styles.dragTouchable}>
            <Image
              style={styles.draggableIcon}
              resizeMode="contain"
              source={Images.icons.hamburger_icons}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressDelete(item);
            }}>
            <Image
              source={Images.icons.delete_icon}
              resizeMode="contain"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({data}) => setData(data)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      style={styles.draggableList}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default EditLinkOrderDraggableList;

const styles = StyleSheet.create({
  draggableList: {
    paddingTop: 36,
    paddingHorizontal: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    paddingVertical: 4,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  dragTouchable: {
    marginHorizontal: 30,
  },
  draggableIcon: {
    width: 20,
    height: 16,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});
