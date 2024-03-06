import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import { NavigationContainer } from '@react-navigation/native';
import { normalizeSize } from '../../utility';
import Notification from '../../screens/mainscreens/Home/Notification';
import Department from '../../screens/mainscreens/More/Options/Department';
import Profile from '../../screens/mainscreens/More/Options/Profile';
import EditProfile from '../../screens/mainscreens/More/Options/Profile/EditProfile';
import DisableDoctor from '../../screens/mainscreens/More/Options/DisableDoctor';
import DoctorForm from '../../screens/mainscreens/Doctors/DoctorForm';
import QrCode from '../../screens/mainscreens/More/Options/QrCode';
import SlotBooking from '../../screens/mainscreens/Doctors/SlotBooking';
import ConfirmSlot from '../../screens/mainscreens/Doctors/SlotBooking/ConfirmSlot';
import DoctorBookingDetails from '../../screens/mainscreens/Analytics/DoctorBookingDetails';
import BookingDetails from '../../screens/mainscreens/Home/BookingDetails';
import ClicnicProfile from '../../screens/mainscreens/More/Options/ClinicProfile';
import SlotBookingSubForm from '../../screens/mainscreens/Doctors/DoctorForm/SlotBookingSubForm';
import { useSelector } from 'react-redux';
import CommonCmsPage from '../../screens/mainscreens/More/Options/CommonCmsPage';
import PatientHistory from '../../screens/mainscreens/More/Options/PatientHistory';
import DisabledClinic from '../../screens/mainscreens/More/Options/DisabledClinic';
import Diagnostic from '../../screens/mainscreens/Home/Diagnostic';
import DiagnosisAppointment from '../../screens/mainscreens/Home/Diagnosis Appointment';
import PrescriptionDetails from '../../screens/mainscreens/Home/PrescriptionDetails';
import BookingConfirmed from '../../screens/mainscreens/Home/BookingConfirmed';
import BedCategory from '../../screens/mainscreens/Home/BedCategory';
import Doctors from '../../screens/mainscreens/Doctors';

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const GetCommonOption = title => {
    return {
      title: title,
      // animation: 'slide_from_bottom',
      headerShown: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'black',
        height: normalizeSize(43),
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: normalizeSize(14),
      },
    };
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: '#323943',
          tabBarInactiveBackgroundColor: '#323943',
          tabBarShowLabel: false,
          tabBarStyle: { height: 60 },
        }}>
        <Stack.Screen
          name="BottomTabNav"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={({ route }) => ({
            ...GetCommonOption('Notification'),
          })}
        />

        <Stack.Screen
          name="Department"
          component={Department}
          options={({ route }) => ({
            ...GetCommonOption('Department'),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            ...GetCommonOption('Profile'),
          })}
        />
        <Stack.Screen
          name="ClicnicProfile"
          component={ClicnicProfile}
          options={({ route }) => ({
            ...GetCommonOption('ClicnicProfile'),
          })}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ route }) => ({
            ...GetCommonOption('EditProfile'),
          })}
        />
        <Stack.Screen
          name="DisableDoctor"
          component={DisableDoctor}
          options={({ route }) => ({
            ...GetCommonOption('DisableDoctor'),
          })}
        />
        <Stack.Screen
          name="DoctorForm"
          component={DoctorForm}
          options={({ route }) => ({
            ...GetCommonOption('DoctorForm'),
          })}
        />

        <Stack.Screen
          name="QrCode"
          component={QrCode}
          options={({ route }) => ({
            ...GetCommonOption('QrCode'),
          })}
        />
        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={({ route }) => ({
            ...GetCommonOption('BookingDetails'),
          })}
        />
        <Stack.Screen
          name="SlotBooking"
          component={SlotBooking}
          options={({ route }) => ({
            ...GetCommonOption('SlotBooking'),
          })}
        />
        <Stack.Screen
          name="ConfirmSlot"
          component={ConfirmSlot}
          options={({ route }) => ({
            ...GetCommonOption('ConfirmSlot'),
          })}
        />
        <Stack.Screen
          name="DoctorBookingDetails"
          component={DoctorBookingDetails}
          options={({ route }) => ({
            ...GetCommonOption('DoctorBookingDetails'),
          })}
        />
        <Stack.Screen
          name="SlotBookingSubForm"
          component={SlotBookingSubForm}
          options={({ route }) => ({
            ...GetCommonOption('SlotBookingSubForm'),
          })}
        />
        {/* <Stack.Screen
          name="RefundPolicy"
          component={RefundPolicy}
          options={({route}) => ({
            ...GetCommonOption('RefundPolicy'),
          })}
        />

        <Stack.Screen
          name={"comongcmspage"}
          component={CommonCmsPage}
          options={({route}) => ({
            ...GetCommonOption("comongcmspage"),
          })}
        />

        {/* TermsCondtion */}
        <Stack.Screen
          name={'comongcmspage'}
          component={CommonCmsPage}
          options={({ route }) => ({
            ...GetCommonOption('comongcmspage'),
          })}
        />
        <Stack.Screen
          name={'PatientHistory'}
          component={PatientHistory}
          options={({ route }) => ({
            ...GetCommonOption('Patient History'),
          })}
        />
        <Stack.Screen
          name={'DisabledClinic'}
          component={DisabledClinic}
          options={({ route }) => ({
            ...GetCommonOption('Disabled Clinic'),
          })}
        />
        <Stack.Screen
          name="Diagnostic"
          component={Diagnostic}
          options={({ route }) => ({
            ...GetCommonOption('Diagnostic'),
          })}
        />

        <Stack.Screen
          name="BookingConfirmed"
          component={BookingConfirmed}
          options={({ route }) => ({
            ...GetCommonOption('BookingConfirmed'),
          })}
        />
        <Stack.Screen
          name={"PrescriptionDetails"}
          component={PrescriptionDetails}
          options={({ route }) => ({
            ...GetCommonOption("Prescription Details"),
          })}
        />
        <Stack.Screen
          name={"DiagnosisAppointment"}
          component={DiagnosisAppointment}
          options={({ route }) => ({
            ...GetCommonOption("Diagnosis Appointment"),
          })}
        />
        <Stack.Screen
          name={"BedCategory"}
          component={BedCategory}
          options={({ route }) => ({
            ...GetCommonOption("Bed Category"),
          })}
        />
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* PatientHistory */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;

const styles = StyleSheet.create({});
