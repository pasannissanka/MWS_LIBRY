import {ImageSourcePropType} from 'react-native/types';

export type LibryItemInterface = {
  name: string;
  bio: string;
  image: ImageSourcePropType;
  added: boolean;
};

export type AddLibryItemInterface = {
  item: LibryItemInterface;
  onAction: Function;
};
