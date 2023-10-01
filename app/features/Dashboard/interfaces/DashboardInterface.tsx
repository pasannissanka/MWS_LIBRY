export type DashboardScreens =
  | 'HomeViewer'
  | 'ProfileViewer'
  | 'none'
  | 'SearchViewer';

export type NavigationTabsProps = {
  InitialViewer: string;
  onChangeScreen: (e: any) => void;
};
