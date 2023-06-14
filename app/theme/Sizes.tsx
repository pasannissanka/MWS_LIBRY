import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const Sizes = {
  DEVICE_SCREEN_WIDTH: width,
  DEVICE_SCREEN_HEIGHT: height,

  WIDTH_RATIO: width / 375,
  HEIGHT_RATIO: height / 844,
};

export {Sizes};
