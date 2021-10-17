import {AppRegistry} from 'react-native';
import {LogBox} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
