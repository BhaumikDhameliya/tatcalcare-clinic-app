import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AppointmentList from '../../../components/AppoinmentList'
import { Apptheme, White } from '../../../config/Colors';
import GestureDropDown from '../../../components/GestureDropDown'
import LinearGradientComponent from '../../../components/LinearGradientCom';
import HeaderCommon from '../../../components/HeaderCommon';
import Styles from '../../../Styles';
import ScheduleView from '../Doctors/SlotBooking/ScheduleView';
import { normalizeSize, SCREEN_HEIGHT } from '../../../utility';
import { useFocusEffect } from '@react-navigation/core';
import { setPageOffSetValue } from '../../../store/common';
import { useDispatch } from 'react-redux';
import SelectDropDown from '../../../components/SelectDropDown';
import { request } from '../../../services';
import moment from 'moment-timezone';
import FooterLoader from '../../../components/FooterLoader';

const Appointment = () => {
  const { control } = useForm();
  const [ls_selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [ls_selectedMonth, setSelectedMonth] = useState(moment(new Date()).format('YYYY-MM'))
  const [la_bookingSlots, setBookingSlots] = useState([])
  const [lb_loader, setLoader] = useState(false)
  const [loaderForDisable, setLoaderForDisable] = useState(false)
  const [la_doctorList, setDoctorList] = useState([])
  const [ls_doctorId, setDoctorId] = useState('')
  const dispatch = useDispatch()
  const sel_date = (date) => {
    setSelectedDate(date)
  }
  const sel_month = (month) => {
    setSelectedMonth(moment(month).format('YYYY-MM'))
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setPageOffSetValue("Appointment"))
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      getDoctorBookingSlotsBySpecificMonth()
    }, [ls_selectedDate, ls_selectedMonth, ls_doctorId]),
  );


  useEffect(() => {
    getAllDoctors()
  }, [])

  const onSubmitDoctorId = (id) => {
    if (id != 1) {
      setDoctorId(id)
    }
    else {
      setDoctorId("")
    }

  }

  const getDoctorBookingSlotsBySpecificMonth = async () => {
    setLoader(true)
    try {
      let res = await request('get', `doctor-booking-slots/appointments-per-day/${ls_selectedMonth}?doctor_id=${ls_doctorId}`);
      setBookingSlots(res?.data?.data)
    }
    catch (e) {
      console.log('e', e);
    }
    setLoader(false)
  }
  const getAllDoctors = async () => {
    setLoader(true)
    try {
      let res = await request('get', `doctors?page=1&limit=50`);
      let la_doctors = res?.data?.data?.doctors;
      let tempDoctorList = []
      tempDoctorList.push({ value: "All Doctor", _id: 1 })
      la_doctors?.map((item, index) => {
        tempDoctorList.push({
          value: item?.name,
          _id: item?._id,
        })
      })
      setDoctorList(tempDoctorList)
    }
    catch (e) {
      console.log('e', e);
    }
    setLoader(false)
  }
  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon headerName={'Appointment Report'} style={{ top: 20 }}
          navigateBackto={"Home"} />
      </View> 
      <View style={[Styles.mainBodyStyle,{height:"100%"}]}>
        <View style={{
          top: -20, shadowColor: '#828282',
          elevation: 10,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
        }}>
          <SelectDropDown
            dropdownButtonStyle={styles.dropdownButtonStyle}
            control={control}
            dropDownList={la_doctorList}
            label="All Doctor"
            name={'alldoctor'}
            labelKey={'value'}
            valueKey={'_id'}
            color={Apptheme}
            fontFamily='Ubuntu-Medium'
            setStateChanging={onSubmitDoctorId}
          />
          <ScheduleView Appointment={true} sel_date={sel_date} sel_month={sel_month} bookingSlots={la_bookingSlots} lb_loader={loaderForDisable} />
          <View style={styles.AppointlistViewStyle}>
            <AppointmentList Appointment={true} navigateBackto={"Appointment"}
              ls_selectedDate={ls_selectedDate}
              ls_selectedMonth={ls_selectedMonth}
              ls_doctorId={ls_doctorId}
              loaderForDisable={loaderForDisable}
              setLoaderForDisable={setLoaderForDisable}
             />
            {/* } */}
          </View>
        </View>
      </View>
    </LinearGradientComponent>
  )
}

export default Appointment

const styles = StyleSheet.create({
  AppointlistViewStyle: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    borderRadius: 15,
    top: 10,
    height: "60%",
    minHeight: SCREEN_HEIGHT - normalizeSize(600),
    maxHeight: SCREEN_HEIGHT - normalizeSize(320),
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
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
})