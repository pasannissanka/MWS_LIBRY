/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import EntryPoint from './app/EntryPoint';
import i18n from './app/languages/i18n';

AppRegistry.registerComponent(appName, () => EntryPoint);
