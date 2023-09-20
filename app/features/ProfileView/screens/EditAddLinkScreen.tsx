import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';

type RouteParams = PropsWithChildren<{
  name: string;
  url: string;
}>;

const EditAddLinkScreen: React.FC<{route: {params: RouteParams}}> = ({
  route,
}) => {
  const {t} = useTranslation();
  const nameRef = useRef<any>();
  const urlRef = useRef<any>();
  const item = route.params;

  const [name, onChangeName] = useState(item && item.name ? item.name : '');
  const [url, onChangeUrl] = useState(item && item.url ? item.url : '');

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressDoneButton = () => {};

  useEffect(() => {
    if (!item) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.parentView}>
        <Header
          style={styles.header}
          onPressBack={onPressBack}
          title={
            item
              ? t('profileView.EditAddLinkScreen.editLinkScreenTitle')
              : t('profileView.EditAddLinkScreen.addLinkScreenTitle')
          }
          rightButton={t('profileView.EditAddLinkScreen.headerRightButton')}
          onPressRightButton={onPressDoneButton}
        />

        <PrimaryContainer style={styles.contentContainer}>
          <View style={styles.confirmationContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {t('profileView.EditAddLinkScreen.nameInputLabel')}
              </Text>
              <TextInput
                ref={nameRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                value={name}
                onChangeText={onChangeName}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>
                {t('profileView.EditAddLinkScreen.urlInputLabel')}
              </Text>
              <TextInput
                ref={urlRef}
                style={styles.textInput}
                placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                value={url}
                onChangeText={onChangeUrl}
              />
            </View>
          </View>
        </PrimaryContainer>
      </View>
    </>
  );
};

export default EditAddLinkScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingVertical: 15,
  },
  confirmationContainer: {
    width: '100%',
    borderTopWidth: 0.35,
    borderTopColor: Colors.LINE_BRAKER_COLOR,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 0.35,
    borderBottomColor: Colors.LINE_BRAKER_COLOR,
  },
  text: {
    width: 50,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.GRAY_TEXT_COLOR,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: Fonts.MyriadProRegular,
    color: Colors.text.PRIMARY_COLOR,
    marginVertical: 0,
    paddingVertical: 0,
  },
});
