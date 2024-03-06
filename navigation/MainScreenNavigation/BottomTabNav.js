import {Animated, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/mainscreens/Home';
import {normalizeSize, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility';
import {Apptheme, Grey} from '../../config/Colors';
import {Rtext} from '../../components/Rtext';
import Doctors from '../../screens/mainscreens/Doctors';
import Appointment from '../../screens/mainscreens/Appointment';
import Analytics from '../../screens/mainscreens/Analytics';
import More from '../../screens/mainscreens/More';
import DoctorS from '../../assets/icons/DoctorS.svg';
import Appointments from '../../assets/icons/Appointments.svg';
import Analytic from '../../assets/icons/Analytic.svg';
import Moree from '../../assets/icons/Moree.svg';
import Doctor from '../../assets/icons/Doctor.svg';
import AppointmentsS from '../../assets/icons/AppointmentsS.svg';
import AnalyticS from '../../assets/icons/AnalyticS.svg';
import MoreeS from '../../assets/icons/MoreeS';
import Logo from '../../assets/icons/Logo.svg';
import LogoS from '../../assets/icons/LogoS.svg';
import {useSelector} from 'react-redux';

const BottomTabNav = () => {
  const [tabBarStyle, setTabBarStyle] = useState({});
  const Tab = createBottomTabNavigator();
  const pageOffSetValue = useSelector(state => state.common.pageOffSetValue);

  useEffect(() => {
        switch (pageOffSetValue) {
          case 'Home':
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
            break;
          case 'Doctors':
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start();
            break;
          case 'Appointment':
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() *2,
                  useNativeDriver: true,
                }).start();
            break;
          case 'Analytics':
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth()* 3,
                  useNativeDriver: true,
                }).start();
             break;
          case 'More':
            Animated.spring(tabOffsetValue, {
              toValue: getWidth()*4,
              useNativeDriver: true,
            }).start();
            break;
          default:
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            break;
    }
  }, [pageOffSetValue]);
  
  useEffect(() => {
    if (SCREEN_WIDTH > 600) setTabBarStyle({height: SCREEN_HEIGHT / 10});
  }, []);

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const getWidth = () => {
    width = SCREEN_WIDTH - normalizeSize (70);
    return width / 4;
  };
  
  const getGeaderOptions = title => {
    return {
      headerShown: false,
      title: title,
      headerTitleStyle: {
        fontSize: normalizeSize(18),
        left: 20,
      },
      tabBarShowLabel: true,
      tabBarLabelPosition: 'below-icon',
      tabBarLabel: ({focused}) => (
        <Rtext
          style={{
            color: focused ? Apptheme : Grey,
            fontSize:Platform.OS == 'android'? normalizeSize(11.5) : normalizeSize(10),
            marginBottom: 5,
          }}>
          {title}
        </Rtext>
      ),
      tabBarIcon: ({focused}) =>
        title == 'Home' ? (
          focused ? (
            <LogoS />
          ) : (
            <Logo />
          )
        ) : title == 'Doctors' ? (
          focused ? (
            <DoctorS />
          ) : (
            <Doctor />
          )
        ) : title == 'Appointment' ? (
          focused ? (
            <AppointmentsS />
          ) : (
            <Appointments />
          )
        ) : title == 'Analytics' ? (
          focused ? (
            <AnalyticS />
          ) : (
            <Analytic />
          )
        ) : focused ? (
          <MoreeS />
        ) : (
          <Moree />
        ),
    };
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarIconStyle: {marginTop: 8},
          // headerStyle:{
          //  backgroundColor:'black'
          // },
          tabBarStyle: [
            tabBarStyle,
            {
              height: Platform.OS == 'android' ? 56 : normalizeSize(60),
              borderTopColor: 'rgba(0, 194, 193, 0.15)',
            },
          ],
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            ...getGeaderOptions('Home'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Doctors"
          component={Doctors}
          options={{
            ...getGeaderOptions('Doctors'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Appointment"
          component={Appointment}
          options={{
            ...getGeaderOptions('Appointment'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            ...getGeaderOptions('Analytics'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            ...getGeaderOptions('More'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.animatedViewStyle,
          {
            width: getWidth() - normalizeSize (15),
            transform: [
              {
                translateX: tabOffsetValue,
              },
            ],
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  animatedViewStyle: {
    height: 3,
    backgroundColor: Apptheme,
    position: 'absolute',
    bottom: Platform.OS == 'android' ? 53 : normalizeSize(58),
    left: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
export default BottomTabNav;
