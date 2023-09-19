import React, {PropsWithChildren, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Colors, Images} from '../../../theme';

type ItemRowProps = PropsWithChildren<{
  item: string;
  drag: any;
  isActive: boolean;
}>;
const EditLinkOrderDraggableList = () => {
  const initialData = [
    'Productivity Planner: 18 Ways',
    'Productivity Planner: 18 Ways',
    'Productivity Planner: 18 Ways',
    'Productivity Planner: 18 Ways',
  ];
  const [data, setData] = useState(initialData);

  const renderItem: React.FC<ItemRowProps> = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <View style={styles.row}>
          <Text style={styles.text}>{item}</Text>
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
          <TouchableOpacity>
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
