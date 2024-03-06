import {Platform, StatusBar, StyleSheet, useColorScheme,SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import AuthNavigation from './navigation/AuthScreenNavigation/AuthNavigation';
import MainStackNavigation from './navigation/MainScreenNavigation/MainStackNavigation';
import {MenuProvider} from 'react-native-popup-menu';
import store, {persistor} from './store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import { Apptheme, PlaceholderTextColor } from './config/Colors';
import fontConfig from './paperFontConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import PrescriptionDetails from './screens/mainscreens/Home/PrescriptionDetails';

const App = () => {
  const theme = { 
    ...DefaultTheme,
    roundness: 12, // Adjust the value as per your requirement
  };
  return (
    <Provider store={store} theme={theme}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};
const MyStatusBar = ({backgroundColor, ...props}) => (
  <SafeAreaView style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </SafeAreaView>
);

const Main = props => {
  const token = useSelector(state => state.common.token);
  const isDarkMode = useColorScheme() === 'dark';
  const PaperTheme = isDarkMode ? PaperDarkTheme : PaperDefaultTheme;
  const ONESIGNAL_APP_ID = 'f5e25bb6-36d5-461f-aeed-6d744dc3bb6b';

  useEffect(() => {
    OneSignalConfig();
    SplashScreen.hide();

  }, []);
 
  const OneSignalConfig = async () => {
    OneSignal.setAppId(ONESIGNAL_APP_ID);
    OneSignal.promptForPushNotificationsWithUserResponse();
    const deviceState = await OneSignal?.getDeviceState();
 
    await onPushIds(deviceState);
    OneSignal.addSubscriptionObserver(async event => {
      await onPushIds(event.to);
    });
  };

  const onPushIds = async device => {
    if (!device?.userId) return;
    AsyncStorage.setItem('push_user_id', device.userId);
  };
console.log("token",token);    
 
  const theme = {
    ...PaperTheme,
    fonts: configureFonts(fontConfig),
  };
  return (
    <MenuProvider> 
       {Platform.OS == 'ios'? <MyStatusBar backgroundColor={Apptheme}  />:
         <StatusBar backgroundColor={Apptheme}/>}
      <PaperProvider  theme={theme}>
        <FlashMessage position="top" />
        {token ? <MainStackNavigation /> : <AuthNavigation />}
      </PaperProvider>
    </MenuProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
