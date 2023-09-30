import {MutableRefObject} from 'react';
import * as Animatable from 'react-native-animatable';

export type SearchViewerProps = {
  onPressItem: () => void;
  reference?: MutableRefObject<Animatable.View>;
};

export type SearchedUserItemProps = {
  item: {
    id: string;
    email: string;
    username: string;
    phone_number: string;
    description: string;
    name: string;
    birth_date: string;
    userConfirmed: boolean;
    email_verified: boolean;
    phone_number_verified: boolean;
    followersCount: number;
    followingCount: number;
    isFollowed: boolean;
    profilePicture: {
      bucket: string;
      key: string;
      mediaType: any;
      type: string;
      s3Url: string;
    };
  };
  index: number;
};
