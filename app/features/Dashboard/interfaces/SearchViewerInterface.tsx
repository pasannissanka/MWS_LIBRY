import {MutableRefObject} from 'react';
import * as Animatable from 'react-native-animatable';

export type SearchViewerProps = {
  onPressItem: () => void;
  reference?: MutableRefObject<Animatable.View>;
};
