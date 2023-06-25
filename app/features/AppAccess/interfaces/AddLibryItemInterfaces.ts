//import {ImageSourcePropType} from 'react-native/types';

export type LibryItemInterface = {
  id: string;
  email: string;
  phone_number: string;
  name: string;
  birth_date: string;
  userConfirmed: boolean;
  email_verified: boolean;
  phone_number_verified: boolean;
  followers: [];
  following: [];
};

export type AddLibryItemInterface = {
  item: LibryItemInterface;
  onAction: Function;
};
