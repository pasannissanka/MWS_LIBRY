import {Platform} from 'react-native';

const Fonts = {
  RobotoRegular: 'Roboto-Regular',
  MyriadProRegular:
    Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
};

export {Fonts};
