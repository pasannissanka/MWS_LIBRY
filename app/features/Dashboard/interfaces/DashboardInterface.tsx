import {ImageSourcePropType} from 'react-native';
export type DashboardScreens =
  | 'HomeViewer'
  | 'ProfileViewer'
  | 'none'
  | 'SearchViewer';

export type NavigationTabsProps = {
  InitialViewer: string;
  onChangeScreen: (e: any) => void;
};

export type ExtendedArticalInterface = {
  item: {
    id: number;
    collobarators: {
      userName: string;
      profileImage: ImageSourcePropType;
    };
    artical: {
      image: ImageSourcePropType;
      title: string;
      views: number;
      date: string;
      favorite: boolean;
    };
  };
  index: number;
};

export type ExtendedArticalType = 'IDEA' | 'IMAGE';
