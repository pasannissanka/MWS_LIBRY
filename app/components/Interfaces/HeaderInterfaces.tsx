import {RefObject} from 'react';
import {TextInput} from 'react-native';

export type HeaderSearchBarRightIcon = 'meatballs' | 'hamburger' | 'none';

export type HeaderProps = {
  style?: object;
  onPressBack: () => void;
  title?: string | null;
  skipButton?: boolean;
  onPressSkip?: () => void;
  searchBar?: boolean;
  searchBarImageUri?: string;
  searchBarRightIcon?: HeaderSearchBarRightIcon;
  onChangeSearchBarText?: (text: string) => void;
  searchBarValue?: string;
  onFocusSearchBar?: () => void;
  onBlurSearchBar?: () => void;
  searchBarRef?: RefObject<TextInput>;
  onPressHamburger?: () => void;
  onPressMeatballs?: () => void;
  rightButton?: string | null;
  onPressRightButton?: () => void;
  screenType?: 'none' | 'homeViewer' | null | string;
};
