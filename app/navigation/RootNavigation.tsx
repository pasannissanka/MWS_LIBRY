import {
  createNavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function replace(name: string, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function navigate(name: string, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function jumpTo(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(TabActions.jumpTo(name));
  }
}

export function pop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(1));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
