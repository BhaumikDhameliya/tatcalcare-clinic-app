import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { normalizeSize } from '../../utility';
import { Rtext } from '../Rtext';
import { Apptheme, Grey } from '../../config/Colors';
import LineSeparator from '../LineSeparator';
import PlusIcon from '../../assets/icons/PlusIcon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { FlatList } from 'react-native';
import { Aws_Base_url, base_upload_image_folder } from '../../config/Constant';
import moment from 'moment-timezone';
import NoDataFound from '../NoDataFound';
import FooterLoader from '../FooterLoader';
import { request } from '../../services';
import { useFocusEffect } from '@react-navigation/core';
import DisablePlus from '../../assets/icons/DisablePlus.svg';

const AppointmentList = ({
  title = '',
  Header = false,
  refference,
  Appointment = false,
  navigateBackto = '',
  style,
  ls_selectedDate, ls_selectedMonth, ls_doctorId,
  loaderForDisable = false,
  setLoaderForDisable = () => {},
}) => {
  const navigation = useNavigation();
  const [la_appointmentList, setAppointmentList] = useState([])
  // const [lb_loader, setLoader] = useState(true)
  console.log("loaderForDisable",loaderForDisable);

  useFocusEffect(
    React.useCallback(() => {
      if (!Appointment) { getAppointmentList() }
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (Appointment) {
        getAppointmentListBySpecificDate()
      }
    },
      [ls_selectedDate, ls_selectedMonth, ls_doctorId]),
  );

  const getAppointmentList = async () => {
    // setLoader(true);
    setLoaderForDisable(true);
    const ls_date = moment(new Date()).format('YYYY-MM-DD');
    try {
      let res = await request('get', `doctors/appointments/${ls_date}`);
      setAppointmentList(res?.data?.data);
      // setLoader(false);
      setLoaderForDisable(false);
    } catch (e) {
      console.log('e', e);
    }
    // setLoader(false);
    setLoaderForDisable(false);
  };

  const getAppointmentListBySpecificDate = async () => {
    // setLoader(true);
    setLoaderForDisable(true)
    setAppointmentList([])
    try {
      let res = await request('get', `doctors/appointments/${ls_selectedDate}?doctor_id=${ls_doctorId}`);
      setAppointmentList(res?.data?.data || [])
      // setLoader(false)
      setLoaderForDisable(false)
    }
    catch (e) {
      console.log('e', e?.response?.data);
    }
    // setLoader(false)
    setLoaderForDisable(false)
  }



  return (
    <View>
      {Header && (
        <View>
          <View style={appoimentStyle.boxouterView}>
            <SimpleLineIcons
              name="calendar"
              size={normalizeSize(17)}
              color={Apptheme}
              // onPress={() => navigation.navigate("PrescriptionDetails")}
            />
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={appoimentStyle.appoinmentText}>
              {title}
            </Rtext>
          </View>
          <LineSeparator style={{ marginVertical: 0 }} />
        </View>
      )}

      <View
        style={[
          style,
          {
            minHeight:0,
            maxHeight: Appointment ? normalizeSize(350):normalizeSize(250),
            // height: Appointment ? normalizeSize(0) : normalizeSize(250),
            paddingVertical: 10,
          },
        ]}>
        <FlatList
          data={la_appointmentList}
          ref={refference}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={lb_loader && <FooterLoader style={{ marginTop: Appointment ? "50%" : "5%" }} />}
          // ListEmptyComponent={!lb_loader && <NoDataFound style={{ height: "100%" }} />}
          ListFooterComponent={loaderForDisable && <FooterLoader style={{ marginTop: Appointment ? "50%" : "5%" }} />}
          ListEmptyComponent={!loaderForDisable && <NoDataFound style={{ height: "100%" }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <AppointmentCard
                item={item}
                appoimentStyle={appoimentStyle}
                index={index}
                doctorAppoimentList={la_appointmentList}
                navigateBackto={navigateBackto}
                navigation={navigation}
              />
            );
          }}
        />
      </View>

    </View>
  );
};

const AppointmentCard = ({
  item = {},
  index = 0,
  appoimentStyle,
  doctorAppoimentList = [],
  navigateBackto = '',
  navigation,
}) => {

  return (
    <View key={index} style={{ bottom: 10 }}>
      <TouchableOpacity
        onPress={() =>
         { 
          
          navigation.navigate('BookingDetails', {
            navigateBack: navigateBackto,
            availabilit_id: item?.doctor_availablity_date_wise?._id,
          })
        }
        }>
        <View style={appoimentStyle.doctorlistStyle}>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
            }}>
            <View style={{}}>
              {item?.profile_image ? (
                <Image
                  source={{
                    uri: `${Aws_Base_url}${base_upload_image_folder}${item?.profile_image}`,
                  }}
                  style={appoimentStyle.imageStyle}
                />
              ) : (
                <Image
                  style={appoimentStyle.imageStyle}
                  source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
                  }}
                />
              )}
            </View>

            <View style={{ paddingLeft: 5, flex: 1 }}>
              <Rtext fontFamily="Ubuntu-Medium" style={{ color: '#101010' }}>
                {item?.name}
              </Rtext>
              <Rtext fontSize={11} style={{ marginTop: 2, color: Grey }}>
                {item?.departments?.map(department => department).join(', ')
                  .length > 40
                  ? item?.departments
                    ?.map(department => department)
                    .join(', ')
                    ?.substring(0, 40) + '...'
                  : item?.departments?.map(department => department).join(', ')}
              </Rtext>
            </View>
          </View>
          {/* </View> */}
          <View
            style={{
              flex: 0.4,
              marginStart: normalizeSize(8),
            }}>
            <View style={appoimentStyle.bookingOverView}>
              <View style={appoimentStyle.bookingNumber}>
                <Rtext
                  fontSize={11}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    paddingHorizontal: 3,
                  }}>
                  {item?.doctor_availablity_date_wise?.slot_count}
                </Rtext>
              </View>
              <Rtext style={{ color: Apptheme, paddingLeft: 6 }} fontSize={11}>
                Bookings
              </Rtext>
            </View>
            <Rtext style={{ color: '#AA5D63' }} fontSize={11}>
              {`${moment(item.doctor_availablity_date_wise?.form_date).format(
                'hh:mm A',
              )} - ${moment(item?.doctor_availablity_date_wise?.to_date).format(
                'hh:mm A',
              )}`}
            </Rtext>
          </View>
          <View
            style={{
              flex: 0.1,
            }}>
            <TouchableOpacity
              style={appoimentStyle.plusBoxStyle}
              activeOpacity={1}
              onPress={() =>
              { 
                item?.doctor_availablity_date_wise?.availablity_status=="AVAILABLE" && 
                navigation.navigate('SlotBooking', {
                  navigateBack: navigateBackto,
                  doctorId: item?._id,
                })
              }
              }>
                {item?.doctor_availablity_date_wise?.availablity_status=="AVAILABLE" ?<PlusIcon/> : <DisablePlus/>  }
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {index !== doctorAppoimentList.length - 1 && (
        <View style={[appoimentStyle.borderStyle]}></View>
      )}
    </View>
  );
};
export default AppointmentList;
const appoimentStyle = StyleSheet.create({
  boxouterView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  appoinmentText: {
    color: Apptheme,
    paddingLeft: 10,
  },
  borderStyle: {
    borderColor: '#EEF2F5',
    borderWidth: 0.3,
  },
  doctorlistStyle: {
    paddingHorizontal: 15,
    paddingVertical: 17,
    flexDirection: 'row',
    // flex: 1,
  },
  bookingOverView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
    // paddingLeft: 10,
  },
  plusBoxStyle: {
    alignSelf: 'flex-end',
  },
  bookingNumber: {
    backgroundColor: Apptheme,
    justifyContent: 'center',
    paddingHorizontal: 2.5,
    paddingVertical: 4,
    borderRadius: 6,
  },
  imageStyle: {
    height: 34,
    width: 34,
    borderRadius: 20,
    borderColor: Apptheme,
    borderWidth: 0.8,
  },
});
