import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../../screens/authscreens/LogIn';
import OtpVerification from '../../screens/authscreens/OtpVerfication';

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer independent={true}>
         <Stack.Navigator initialRouteName='LogIn'>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerification}
            options={{headerShown: false}}
         />
         </Stack.Navigator>
      </NavigationContainer>
  )
}

export default AuthNavigation
