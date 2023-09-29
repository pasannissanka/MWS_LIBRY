import {ImageSourcePropType} from 'react-native';

export type ArticalInterface = {
  item: {
    id: number;
    collobarators: {
      userName: string;
      profileImage: ImageSourcePropType;
    }[];
    artical: {
      image: ImageSourcePropType;
      title: string;
      views: number;
      date: string;
      favorite: boolean;
    };
  };
  index: number;
  onToggle: any;
};

export type ArticalType = 'IDEA' | 'IMAGE';