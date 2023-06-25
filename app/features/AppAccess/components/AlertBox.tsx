import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors, Sizes} from '../../../theme';
import {useDispatch} from 'react-redux';
import {setAlertBoxVisibility} from '../../../redux/action/action';
type SectionProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  description?: string;
  button?: string;
  onPress?: any;
}>;
const AlertBox = ({
  visible,
  title,
  description,
  button,
  onPress,
}: SectionProps) => {
  const dispatch = useDispatch();

  const alertBoxVisibility = {
    visible: false,
    title: '',
    description: '',
    button: '',
    onPress: () => {},
  };
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.alert}>
          <View style={styles.alertTop}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.alertBottom}>
            <TouchableOpacity
              onPress={() => {
                onPress();
                dispatch(setAlertBoxVisibility(alertBoxVisibility));
              }}>
              <Text style={styles.button}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertBox;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MODAL_BACKGROUND_COLOR,
  },
  alert: {
    width: Sizes.WIDTH_RATIO * 260,
    backgroundColor: Colors.MODAL_FOREGROUND_COLOR,
    borderRadius: 20,
  },
  alertTop: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 12,
    borderBottomColor: Colors.LINE_BRAKER_COLOR,
    borderBottomWidth: 0.5,
  },
  alertBottom: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '400',
    color: Colors.text.PRIMARY_COLOR,
    marginBottom: 10,
  },
  description: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.text.GRAY_TEXT_COLOR,
  },
  button: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: Colors.text.LINK_TEXT_COLOR,
    margin: 2,
  },
});
