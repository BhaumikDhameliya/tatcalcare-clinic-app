import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Abutton from '../../../../../components/Abutton';
import {Apptheme, Grey, White} from '../../../../../config/Colors';
import SelectDropDown from '../../../../../components/SelectDropDown';
import Entypo from 'react-native-vector-icons/Entypo';
import {normalizeSize, showFlashMessage} from '../../../../../utility';
import {Rtext} from '../../../../../components/Rtext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import LineSeparator from '../../../../../components/LineSeparator';
import TimeLaps from '../../../../../assets/icons/TimeLaps.svg';
import TimeLapsW from '../../../../../assets/icons/TimeLapsW.svg';
import {TouchableOpacity} from 'react-native';
import {request} from '../../../../../services';
import moment from 'moment';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../../config/Constant';

const DoctorStatusModal = ({
  bottomSheet,
  availiabiltyId = '',
  doctorBookingSlot = {},
  setDelayTime,
  getDoctorBookingSlot,
}) => {
  const {control, handleSubmit, setValue} = useForm();
  const [colorindex, setColorIndex] = useState();
  const [tabData, setTabData] = useState('');
  const la_data = [
    {title: '1 hour delay', value: '60'},
    {title: '2 hour delay', value: '120'},
    {title: '3 hour delay', value: '180'},
    {title: '4 hour delay', value: '240'},
  ];
  const data = [{time: '15'}, {time: '30'}, {time: '45'}];
  const handleClickOnDelay_Func = (item, index) => {
    setValue('delay', '');
    setColorIndex(index);
    setTabData(item?.time);
  };

  const handleChangingDropDownValue = value => {
    if (value) {
      setColorIndex(4);
      setTabData('');
    }
  };
  const clickOnSubmit = async data => {
    let delayInMInt = {
      delay_in_minutes:
        data?.delay == '' ? parseInt(tabData) : parseInt(data?.delay),
    };
    try {
      let res = await request(
        'post',
        `doctor-booking-slots/update-booking-details/${availiabiltyId}`,
        delayInMInt,
      );
      showFlashMessage(res?.data?.message);
      getDoctorBookingSlot();
      bottomSheet.current.close();
    } catch ({response}) {
      console.log('e', response?.data?.error);
      // showFlashMessage(response?.data?.error, '', 'danger')
    }
  };
console.log('colorindex', colorindex);
  return (
    <View>
      <View style={StatusModalStyle.outerviewModalStyle}>
        <Rtext
          fontFamily={'Ubuntu-Medium'}
          style={{color: Apptheme}}
          fontSize={14.5}>
          Doctor Current status
        </Rtext>
        <TouchableOpacity
          style={StatusModalStyle.crossview}
          onPress={() => bottomSheet.current.close()}>
          <Entypo name={'cross'} color={'white'} size={normalizeSize(14)} />
        </TouchableOpacity>
      </View>
      <LineSeparator style={{marginVertical: 15}} />
      <View style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          {doctorBookingSlot?.doctor_details?.profile_image ? (
            <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${doctorBookingSlot?.doctor_details?.profile_image}`,
              }}
              style={{
                height: normalizeSize(65),
                width: normalizeSize(45),
                borderRadius: 8,
              }}
            />
          ) : (
            <Image
              style={StatusModalStyle.imageAvatar}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
              }}
            />
          )}

          <View style={{paddingLeft: 12}}>
            <Rtext fontFamily="Ubuntu-Medium" fontSize={14.5}>
              {doctorBookingSlot?.doctor_details?.name}
            </Rtext>
            <Rtext
              fontSize={12.5}
              style={{color: Grey, paddingVertical: 7, width: 250}}>
              {doctorBookingSlot?.doctor_details?.department_details.join(', ')}
            </Rtext>
            <View style={{flexDirection: 'row', alignItems: 'center', top: 4}}>
              <View style={StatusModalStyle.calenderView}>
                <FontAwesome size={11} name={'calendar'} color={White} />
              </View>
              <Rtext fontSize={11.5} style={{paddingLeft: 10}}>
                {`${moment(doctorBookingSlot?.form_date).format(
                  'Do MMMM YYYY',
                )} | ${moment(doctorBookingSlot?.form_date).format(
                  'hh:mm A',
                )} - ${moment(doctorBookingSlot?.to_date).format('hh:mm A')}`}
              </Rtext>
            </View>
          </View>
        </View>
        <View style={StatusModalStyle.boxDesign}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleClickOnDelay_Func(item, index)}
              key={index}
              style={[
                StatusModalStyle.innerViewbox,
                {backgroundColor: colorindex === index ? Apptheme : White},
              ]}>
              {/* <TimeLapsW
                fill={colorindex == index ? White : Grey}
                color={colorindex == index ? Apptheme : Grey}
              /> */}
              {colorindex == index ? <TimeLapsW /> : <TimeLaps fill={Grey} />}
              <Rtext
                fontSize={11.5}
                style={{
                  color: colorindex === index ? White : 'black',
                  paddingLeft: 3,
                }}>
                {`${item?.time} Min delay`}
              </Rtext>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{paddingTop: 12}}>
          <SelectDropDown
            dropdownButtonStyle={StatusModalStyle.dropdownButtonStyle}
            control={control}
            dropDownList={la_data}
            label="Time Delay"
            name={'delay'}
            labelKey={'title'}
            valueKey={'value'}
            rightIcon={false}
            color={Grey}
            setStateChanging={e => handleChangingDropDownValue(e)}
          />
        </View>
        <View style={{paddingTop: 25}}>
          <Abutton
            style={{backgroundColor: Apptheme}}
            name={'Submit'}
            fontFamily="Ubuntu-Medium"
            size={16}
            disble={colorindex > -1 ? false : true}
            onPress={handleSubmit(clickOnSubmit)}
          />
        </View>
      </View>
    </View>
  );
};
export default DoctorStatusModal;

const StatusModalStyle = StyleSheet.create({
  outerviewModalStyle: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  crossview: {
    backgroundColor: '#F4A0AE',
    borderRadius: 25,
    padding: 2,
  },
  calenderView: {
    borderRadius: 5,
    backgroundColor: '#19E7D2',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
  },
  boxDesign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 25,
    alignItems: 'center',
  },
  innerViewbox: {
    width: '31%',
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  dropdownButtonStyle: {
    height: normalizeSize(43),
    width: '100%',
    backgroundColor: White,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#a3a3a3',
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  imageAvatar: {
    height: normalizeSize(70),
    width: normalizeSize(45),
    borderRadius: 12,
    backgroundColor: 'grey',
  },
});
