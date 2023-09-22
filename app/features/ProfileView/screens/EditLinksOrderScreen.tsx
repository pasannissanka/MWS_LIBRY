import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {Colors, Fonts} from '../../../theme';
import Header from '../../../components/header/Header';
import {useTranslation} from 'react-i18next';
import EditLinkOrderDragableList from '../views/EditLinkOrderDraggableList';
import {useSelector} from 'react-redux';
import EndPointError from '../../../components/views/EndPointError';

const EditLinksOrderScreen = () => {
  const {t} = useTranslation();
  const EndPointErrorVisibility = useSelector(
    (state: any) => state.commonReducer.endPointErrorVisibility,
  );

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  const onPressAddLink = () => {
    RootNavigation.navigate('EditAddLinkScreen');
  };

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
          title={t('profileView.EditLinksOrderScreen.screenTitle')}
        />
        <View style={styles.contentContainer}>
          {EndPointErrorVisibility ? (
            <View style={styles.endPointErrorViewContainer}>
              <EndPointError onPressBack={onPressBack} />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.addLinkTouchable}
                onPress={onPressAddLink}>
                <Text style={styles.addLinkText}>
                  {t('profileView.EditLinksOrderScreen.addLink')}
                </Text>
              </TouchableOpacity>

              <EditLinkOrderDragableList />
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default EditLinksOrderScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  endPointErrorViewContainer: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  addLinkTouchable: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.button.ADDED_BUTTON_GRAY,
  },
  addLinkText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.MyriadProRegular,
    lineHeight: 19,
    fontWeight: '700',
    color: Colors.text.GREEN_TEXT_COLOR,
  },
});
