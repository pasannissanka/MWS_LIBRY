import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getAddLinkResponse, getEditLinkResponse} from '../redux/action/action';
import EndPointError from '../../../components/views/EndPointError';

type RouteParams = PropsWithChildren<{
  id: string;
  url: string;
  title: string;
  createdAt: string;
  order: number;
}>;

const EditAddLinkScreen: React.FC<{route: {params: RouteParams}}> = ({
  route,
}) => {
  const {t} = useTranslation();
  const titleRef = useRef<any>();
  const urlRef = useRef<any>();
  const dispatch = useDispatch();
  const item = route.params;

  const [title, onChangeName] = useState(item && item.title ? item.title : '');
  const [url, onChangeUrl] = useState(item && item.url ? item.url : '');

  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressDoneButton = () => {
    const requestBody = {
      title: title,
      url: url,
    };
    const id = item && item.id ? item.id : '';

    if (title && url) {
      if (item) {
        const payload = {
          requestBody: requestBody,
          id: id,
        };

        dispatch(getEditLinkResponse(payload));
      } else {
        dispatch(getAddLinkResponse(requestBody));
      }
    }
  };

  useEffect(() => {
    if (!item) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      {EndPointErrorVisibility ? (
        <View style={styles.endPointErrorViewContainer}>
          <EndPointError onPressBack={onPressBack} />
        </View>
      ) : (
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
                  ref={titleRef}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text.GRAY_TEXT_COLOR}
                  value={title}
                  onChangeText={onChangeName}
                  keyboardType="default"
                  inputMode="text"
                  autoCapitalize="none"
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
                  keyboardType="default"
                  inputMode="url"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </PrimaryContainer>
        </View>
      )}
    </>
  );
};

export default EditAddLinkScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  endPointErrorViewContainer: {
    flex: 1,
    ackgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
    padding: 15,
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
