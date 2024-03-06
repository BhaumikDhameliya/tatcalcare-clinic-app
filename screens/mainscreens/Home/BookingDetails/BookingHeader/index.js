import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {normalizeSize} from '../../../../../utility';
import {Rtext} from '../../../../../components/Rtext';
import {White} from '../../../../../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import DoctorStatusModal from '../DoctorStatusModal';
import moment from 'moment';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../../config/Constant';

const BookingHeader = ({
  doctorBookingSlot = {},
  availiabiltyId,
  getDoctorBookingSlot,
}) => {
  const [delayTime, setDelayTime] = useState('');
  useEffect(() => {
    if (doctorBookingSlot?.delay_from_time != undefined) {
      var toDate = new Date(doctorBookingSlot?.form_date);
      var fromDate = new Date(doctorBookingSlot?.delay_from_time);
      var timeDiffInMilliseconds = toDate - fromDate; // Calculate the time difference in milliseconds
      console.log('timeDiffInMilliseconds', timeDiffInMilliseconds);
      var timeDiffInMinutes = timeDiffInMilliseconds / 60000;
      // Example time difference in minutes
      let finalminute = Math.abs(Math.floor(timeDiffInMinutes));
      if (finalminute >= 60) {
        var hours = Math.floor(finalminute / 60); // Calculate the number of hours
        var remainingMinutes = finalminute % 60; // Calculate the remaining minutes
      console.log("hours",hours+remainingMinutes);
        remainingMinutes
          ? setDelayTime(`${hours} h ${remainingMinutes} min`)
          : setDelayTime(`${hours} h`);
      } else {
        setDelayTime(`${finalminute} min`);
      }

      // Convert milliseconds to minutes
    }
  }, [doctorBookingSlot]);

  const bottomSheet = useRef();
  return (
    <View style={{}}>
      <View style={BookingHeaderStyle.imagerViewer}>
        <View style={{width: '25%'}}>
          {doctorBookingSlot?.doctor_details?.profile_image ? (
            <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${doctorBookingSlot?.doctor_details?.profile_image}`,
              }}
              style={BookingHeaderStyle.imagetagStyle}
            />
          ) : (
            <Image
              style={BookingHeaderStyle.imageAvatar}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
              }}
            />
          )}
        </View>

        <View style={{marginLeft: 23, width: '75%'}}>
          <Rtext
            fontSize={24.5}
            fontFamily="Ubuntu-Medium"
            style={{color: White, bottom: 7}}>
            {doctorBookingSlot?.doctor_details?.name}
          </Rtext>
          <Rtext style={{color: White, bottom: 7}} fontSize={14.5}>
            {doctorBookingSlot?.doctor_details?.department_details.join(', ')}
          </Rtext>
          <View style={BookingHeaderStyle.calenderViewer}>
            <View style={BookingHeaderStyle.calenderInner}>
              <FontAwesome
                name={'calendar'}
                size={normalizeSize(14)}
                color={White}
              />
            </View>
            <View style={{paddingLeft: 10}}>
              <Rtext
                style={{color: White}}
                fontFamily="Ubuntu-Medium"
                fontSize={11.5}>
                {moment(doctorBookingSlot?.form_date).format('Do MMMM YYYY')}
              </Rtext>
              <Rtext
                style={{color: White}}
                fontFamily="Ubuntu-Medium"
                fontSize={11.5}>
                {`${moment(doctorBookingSlot?.form_date).format(
                  'h:mm A',
                )}- ${moment(doctorBookingSlot?.to_date).format('h:mm A')}`}
              </Rtext>
            </View>
          </View>
          <TouchableOpacity
            style={BookingHeaderStyle.onTimeStyle}
            onPress={() => bottomSheet.current.show()}>
            <View style={BookingHeaderStyle.innerViewTime}>
              <Octicons name={'clock'} size={normalizeSize(14)} color={White} />
              <Rtext
                style={{color: White}}
                fontSize={12.5}
                fontFamily="Ubuntu-Medium">
                {delayTime ? `${delayTime}` : 'On Time'}
              </Rtext>
              <SimpleLineIcons
                name={'arrow-right'}
                size={normalizeSize(12)}
                color={White}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={normalizeSize(328)}
        radius={30}
        sheetBackgroundColor={White}
        dragIconStyle={{width: normalizeSize(50), height: 2}}>
        <DoctorStatusModal
          bottomSheet={bottomSheet}
          availiabiltyId={availiabiltyId}
          doctorBookingSlot={doctorBookingSlot}
          setDelayTime={setDelayTime}
          getDoctorBookingSlot={getDoctorBookingSlot}
        />
      </BottomSheet>
    </View>
  );
};
export default BookingHeader;

const BookingHeaderStyle = StyleSheet.create({
  imagerViewer: {
    paddingHorizontal: 25,
    paddingTop: 40,
    flexDirection: 'row',
    width: '100%',
  },
  imagetagStyle: {
    height: normalizeSize(110),
    width: normalizeSize(80),
    borderRadius: 12,
    backgroundColor: 'grey',
  },
  calenderViewer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  calenderInner: {
    backgroundColor: '#19E7D2',
    borderRadius: 8,
    padding: 8,
  },
  onTimeStyle: {
    paddingVertical: 10,
    backgroundColor: '#19E7D2',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 4,
    width: '50%',
  },
  innerViewTime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageAvatar:{
    height: normalizeSize(110),
    width: normalizeSize(80),
    borderRadius: 12,
    backgroundColor: 'grey',
  }
});
