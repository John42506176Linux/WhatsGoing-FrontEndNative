/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure({});

AppRegistry.registerComponent(appName, () => App);
