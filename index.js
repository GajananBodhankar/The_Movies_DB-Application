/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
var SQLite = require('react-native-sqlite-storage');
AppRegistry.registerComponent(appName, () => App);
