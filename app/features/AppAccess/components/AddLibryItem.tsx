import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Sizes} from '../../../theme';
import {useTranslation} from 'react-i18next';
import {AddLibryItemInterface} from '../interfaces';
import {useDispatch} from 'react-redux';
import {followUserResponse, unfollowUserResponse} from '../redux/action/action';

const AddLibryItem = ({item, onAction}: AddLibryItemInterface) => {
  const [buttonStatus, setButtonStatus] = useState(item.isFollowed);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onClickAdd = (id: string) => {
    buttonStatus
      ? dispatch(unfollowUserResponse(id))
      : dispatch(followUserResponse(id));
    setButtonStatus(!buttonStatus);
    buttonStatus ? onAction(1) : onAction(-1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={Images.logos.app_logo}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.textContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.bio} numberOfLines={3} ellipsizeMode="tail">
            {
              'Their bio goes in heredsksd d ddsd sd sds dsd ds dsd ds ds ddssd dsf ff f df f fd f fd'
            }
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          onClickAdd(item.id);
        }}
        style={buttonStatus ? styles.addedButton : styles.addButton}>
        {buttonStatus ? (
          <View style={styles.addedTextContainer}>
            <Image
              source={Images.icons.green_tick_icon}
              style={styles.tickIcon}
              resizeMode="stretch"
            />
            <Text
              style={styles.addedText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {t('appAccess.addYourLibryScreen.added')}
            </Text>
          </View>
        ) : (
          <Text style={styles.addText} numberOfLines={1} ellipsizeMode="tail">
            {t('appAccess.addYourLibryScreen.add')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddLibryItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 41,
    marginRight: 16,
    backgroundColor: 'gray',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.text.PRIMARY_BUTTON_WHITE_COLOR,
    marginBottom: 4,
  },
  bio: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.GRAY_TEXT_COLOR,
  },
  addButton: {
    width: Sizes.WIDTH_RATIO * 183,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.button.ADD_BUTTON_GREEN,
  },
  addedButton: {
    width: Sizes.WIDTH_RATIO * 183,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.button.ADDED_BUTTON_GRAY,
  },
  addText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    color: Colors.text.PRIMARY_COLOR,
  },
  addedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedText: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    color: Colors.text.GREEN_TEXT_COLOR,
  },
  tickIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
    marginBottom: 3,
  },
});
