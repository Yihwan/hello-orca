// import 'node-libs-react-native/globals';
console.log('main.tsx')
import './global';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);