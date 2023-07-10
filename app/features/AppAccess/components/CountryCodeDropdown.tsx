import {Alert, BackHandler, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Colors, Sizes} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {CountryCodes} from '../../../constants/country_codes/CountryCodes';

type SectionProps = PropsWithChildren<{
  reference?: any;
  onPressItem?: any;
}>;

type ItemProps = PropsWithChildren<{
  item: {
    name: string;
    dial_code: string;
    code: string;
  };
  index: number;
}>;

const CountryCodeDropdown = ({
  reference,
  onPressItem,
}: SectionProps): React.JSX.Element => {
  const {t} = useTranslation();
  const _reference = reference;
  const onPressBack = () => {
    _reference.current.close();
  };

  const DATA = CountryCodes;

  const Item = ({item, index}: ItemProps) => (
    <>
      {index === 0 ? (
        <Text style={styles.itemFirstChar}>{item.name.charAt(0)}</Text>
      ) : item.name.charAt(0) === DATA[index - 1].name.charAt(0) ? undefined : (
        <Text style={styles.itemFirstChar}>{item.name.charAt(0)}</Text>
      )}

      <View style={{width: '100%', paddingHorizontal: 10}}>
        <TouchableOpacity
          style={
            index < DATA.length - 1
              ? styles.itemTouchable
              : styles.itemTouchableLast
          }
          onPress={() => {
            onPressItem(item);
            _reference.current.close();
          }}>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.itemDialCode}>{item.dial_code}</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <RBSheet
      ref={_reference}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="slide"
      customStyles={{
        wrapper: {
          backgroundColor: Colors.SCREEN_INACTIVE_COLOR,
        },
        draggableIcon: {
          backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
        },
        container: {...styles.contentContainer},
      }}>
      <Header
        onPressBack={onPressBack}
        title={t('appAccess.enterMobileNumberScreen.dropdown.title')}
        style={styles.header}
      />

      <FlatList
        data={DATA}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </RBSheet>
  );
};

export default CountryCodeDropdown;

const styles = StyleSheet.create({
  contentContainer: {
    height: Sizes.HEIGHT_RATIO * 758,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 16,
    borderTopWidth: 0.35,
    borderColor: Colors.DROPDOWN_LINE_BRAKER_COLOR,
  },
  itemFirstChar: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '600',
    color: Colors.text.PRIMARY_COLOR,
    marginVertical: 14,
  },
  itemTouchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 7,
    borderTopWidth: 0.35,
    borderColor: Colors.DROPDOWN_LINE_BRAKER_COLOR,
  },
  itemTouchableLast: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 7,
    borderTopWidth: 0.35,
    marginBottom: 16,
    borderColor: Colors.DROPDOWN_LINE_BRAKER_COLOR,
  },
  itemName: {
    flex: 1,
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
  },
  itemDialCode: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
    marginLeft: 10,
  },
});
