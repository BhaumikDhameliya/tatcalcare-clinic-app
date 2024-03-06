/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';

const Main = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider> 
              <App />
            </Provider>
        </GestureHandlerRootView>
    )
}
AppRegistry.registerComponent(appName, () => Main);
