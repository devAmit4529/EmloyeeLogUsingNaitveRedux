/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import store from './store';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
