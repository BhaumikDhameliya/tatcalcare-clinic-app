import { View, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  normalizeSize,
  SCREEN_HEIGHT,
  showFlashMessage,
} from '../../../../utility';
import { Apptheme, Grey, White } from '../../../../config/Colors';
import { Rtext } from '../../../../components/Rtext';
import BookingHeader from './BookingHeader';
import Timeline from 'react-native-timeline-flatlist';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import PatientDetailsModal from './BookingHeader/PatientDetailsModal';
import BookingBodyRightDetails from './BookingBodyRightDetails';
import Abutton from '../../../../components/Abutton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useForm } from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import HeaderCommon from '../../../../components/HeaderCommon';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import SelectDropDown from '../../../../components/SelectDropDown';
import { useNavigation } from '@react-navigation/native';
import { request } from '../../../../services';
import moment from 'moment';
import Rloader from '../../../../components/Rloader';
import FooterLoader from '../../../../components/FooterLoader';
import NoDataFound from '../../../../components/NoDataFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertPopUp from '../../../../components/AlertPopUp';

const BookingDetails = ({ route }) => {
  const bottomSheet = useRef();
  const [doctorBookingSlot, setDoctorBookingSlot] = useState({});
  const [patient_details, setPatientDetails] = useState([]);
  const [patientModalData, setPatientModalData] = useState({});
  const [patientStatus, setPatientStatus] = useState('');
  const [loader, setLoader] = useState(false);
  const [appoientmentId, setAppointmentId] = useState('');
  const [loaderCloseBtn, setLoaderCloseBtn] = useState(false);
  const [patientStatusValue, setPatientStatusValue] = useState('');
  const [alertPopUpStatus, setAlertPopUpStatus] = useState(false)
  const [formDate, setFormDate] = useState(new Date())
  const [ls_statusForOnlineOrOffline, setStatusForOnlineOrOffline] = useState('');
  const [ls_tokenNumber, setTokenNumber] = useState('');
  const [previouspatientStatus, setPreviousPatientStatus] = useState("")
  // const []

  const { control, setValue } = useForm();
  const navigation = useNavigation();

  let righticon = <MaterialIcons name={'done'} size={13} color={White} />;
  let crossicon = <Entypo name={'cross'} size={18} color={White} />;
  let blankIcon = (
    <MaterialCommunityIcons name={'radiobox-blank'} color={'#D9D9D9'} />
  );
  // console.log("doctorBookingSlot",);
  // console.log("moment().startOf('day').toDate()",moment().startOf('day').toDate());
  // console.log("moment().endOf('day').toDate()",moment().endOf('day').toDate());
  // console.log("formDate",formDate);
  let waitingicon = (
    <Entypo name={'back-in-time'} size={14} color={'#747474'} />
  );
  useEffect(() => {
    getDoctorBookingSlot();
  }, [patientStatusValue]);
  const getDoctorBookingSlot = async () => {
    // 649c237c76a4be030a2084e7
    //route.params.availabilit_id
    setLoader(true);
    try {
      let response = await request(
        'get',
        `doctor-booking-slots/appointments/${route.params.availabilit_id}?status=${patientStatusValue}`,
      );
      if (response) {
        let patient_data = response?.data?.data?.doctor_availablity_date_wise;
        // console.log('patient_data...', patient_data[0]?.appointment);
        // console.log("date",patient_data[0]?.booking_from);
        // console.log("new Dtae",new Date());
        // setHours(23, 59, 0, 0)
        let otherDate = new Date(patient_data && patient_data[0]?.booking_from);
        // console.log("here",otherDate);
        //   otherDate?.setHours(23, 59, 0, 0);
        // console.log("otherDate", otherDate);
        setFormDate(otherDate)
        // console.log("patient_data", patient_data);
        let la_pateint_details = [];

        patient_data.map((item, inx) => {
          // console.log('item...', item);

          la_pateint_details.push({
            time: (
              <View>
                <BookingOrderingComponenet
                  // index={item?.token_number}
                  index={inx + 1}
                  status={item?.appointment?.status}
                />
              </View>
            ),
            title: (
              <BookingBodyRightDetails
                time={moment(item?.booking_from).format('LT')}
                status={item?.appointment?.status}
                patient_name={item?.appointment?.patient?.name}
              />
            ),
            icon:
              item?.appointment?.status === 'COMPLETED'
                ? righticon
                : item?.appointment?.status === 'DELAY'
                  ? waitingicon
                  : item?.appointment?.status === 'PENDING'
                    ? blankIcon
                    : crossicon,
            circleColor:
              item?.appointment?.status === 'COMPLETED'
                ? Apptheme
                : item?.appointment?.status === 'DELAY' ||
                  item?.appointment?.status === 'PENDING'
                  ? '#D9D9D9'
                  : '#DB4437',
            lineColor:
              item?.appointment?.status === 'COMPLETED'
                ? Apptheme
                : item?.appointment?.status === 'PENDING' ||
                  item?.appointment?.status === 'DELAY'
                  ? '#EEF2F5'
                  : '#DB4437',
            patient: item?.appointment?.patient,
            status: item?.appointment?.status,
            statusForOnlineOrOffline: item?.appointment?.booked_by,
            tokenNumber: item?.token_number,
            _id: item?.appointment?._id,
          });
        });


        setPatientDetails(la_pateint_details);
        setDoctorBookingSlot(response?.data?.data);
        setLoader(false);
      }
    } catch (e) {
      console.log('error', e?.response?.data?.error);
      // s
      showFlashMessage(e?.response?.data?.error, '', 'danger');
    }
    setLoader(false);
  };
  const la_data = [
    { title: 'All', value: '' },
    { title: 'Pending', value: 'PENDING' },
    { title: 'Delay', value: 'DELAY' },
    { title: 'Complete', value: 'COMPLETED' },
    { title: 'Cancel', value: 'CANCELLED' },
  ];

  const clickOnCloseButton = async () => {
    setLoaderCloseBtn(true);
    try {
      let response = await request(
        'get',
        `doctor-booking-slots/close-booking/${route.params.availabilit_id}`,
      );
      console.log('response', response);

      if (response) {
        setLoaderCloseBtn(false);
        setAlertPopUpStatus(false);
        navigation.navigate('Home');
      }
    } catch ({ response }) {
      showFlashMessage(response?.data?.error, "", "danger");
    }
    setAlertPopUpStatus(false);
    setLoaderCloseBtn(false);
  };

  const BookingOrderingComponenet = ({ index, status }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={[
            {
              backgroundColor:
                status == 'COMPLETED'
                  ? '#E5F9FA'
                  : status == 'PENDING' || status == 'DELAY'
                    ? '#D9D9D9'
                    : '#e0a9a8',
            },
            bookingDetailsStyle.leftSidebodyView,
          ]}>
          <Rtext
            fontSize={11.5}
            style={{
              color:
                status == 'COMPLETED'
                  ? Apptheme
                  : status == 'CANCELLED'
                    ? '#DB4437'
                    : '#747474',
            }}>
            {index}
          </Rtext>
        </View>
        <Rtext style={{ color: '#747474' }} fontSize={20}>
          &nbsp;&nbsp;-
        </Rtext>
      </View>
    );
  };


  function findPreviousObject(targetId) {
    for (let i = 0; i < patient_details?.length; i++) {
      if (patient_details[i]._id === targetId) {
        console.log("patient_details[i-1", patient_details[i - 1]?.status);
        return patient_details[i - 1]?.status;
      }
    }
    return "";
  }
 
  const handleClickOnDelay_Func = data => {
    console.log('data..', data);
    let previosStatus = findPreviousObject(data?._id)
    setPreviousPatientStatus(previosStatus);
    // let patient_obj=patient_details.find((item)=>item?._id==data?._id)
    bottomSheet.current.show();
    setPatientStatus(data.status);
    setPatientModalData(data?.patient);
    setAppointmentId(data?._id);
    setStatusForOnlineOrOffline(data?.statusForOnlineOrOffline);
    setTokenNumber(data?.tokenNumber);
  };

  // // Get the current date and time
  const currentDate = new Date();

  // // Set the other date (e.g., today at 11:59 PM)
  //  // Set hours to 23 (11 PM), minutes to 59, seconds to 0, and milliseconds to 0

  // // Compare the two dates
  // if (currentDate < otherDate) {
  //   console.log("Current date is before the specified date (today at 11:59 PM).");
  // } else if (currentDate > otherDate) {
  //   console.log("Current date is after the specified date.");
  // } else {
  //   console.log("Current date is equal to the specified date.");
  // }


  let close_booking_btn_status = formDate?.getTime() < currentDate.setHours(0, 0, 0, 0)
  // console.log("close_booking_btn_status",close_booking_btn_status);
  // const arrayToMap =  ? pateint_status : pateint_status.slice(0, 1);


  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <View style={{ flexDirection: 'row' }}>
          <HeaderCommon
            headerName={'Booking details'}
            navigateBackto={route.params.navigateBack}
            style={{ top: 20 }}
          />
        </View>

        {/* {loader ? (
          <Rloader></Rloader>
        ) : ( */}
        <>
          <BookingHeader
            doctorBookingSlot={doctorBookingSlot}
            availiabiltyId={route?.params?.availabilit_id}
            getDoctorBookingSlot={getDoctorBookingSlot}
          />

          <View style={bookingDetailsStyle.bodyparentView}>
           {/* <View style={{flex: 1}}> */}
              <View style={{ flex:Platform.OS=="ios"? 0.60 : doctorBookingSlot?.availablity_status=="AVAILABLE" && !close_booking_btn_status ?  0.82 : 1}}>
                <View style={{ marginTop: -22, paddingHorizontal: 24 }}>
                  <SelectDropDown
                    dropdownButtonStyle={bookingDetailsStyle.dropdownStyle}
                    control={control}
                    dropDownList={la_data}
                    label="All"
                    name="doctorlist"
                    // labelKey={'value'}
                    // valueKey={'_id'}
                    search={false}
                    color={Apptheme}
                    setStateChanging={e => setPatientStatusValue(e)}
                  />
                </View>
                {loader ? (
                  <FooterLoader
                    style={{ justifyContent: 'center', height: '50%', top: 100 }}
                  />
                ) : //
                  patient_details.length == 0 ? (
                    <NoDataFound bodyText={'No scheduled patients'} />
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        // backgroundColor: 'green'
                      }}>
                      <Timeline
                        rowContainerStyle={{
                          paddingTop: 26,
                        }}
                        style={bookingDetailsStyle.timelineStyle}
                        titleStyle={{ color: '#212129', bottom: 32 }}
                        timeStyle={{
                          bottom: 25,
                        }}
                        onEventPress={e => handleClickOnDelay_Func(e)}
                        circleColor={'#D9D9D9'}
                        circleSize={20}
                        innerCircle={'icon'}
                        data={patient_details}
                        lineWidth={3}
                        circleStyle={{ top: 5 }}
                        iconStyle={{
                          height: 13,
                          width: 13,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  )}
              </View>
 
             {doctorBookingSlot?.availablity_status=="AVAILABLE" && !close_booking_btn_status &&  
                <View style={{ flex:Platform.OS=="ios"? 0.40 : 0.18, paddingHorizontal: 24 }}>
                  <Abutton
                    style={{ backgroundColor: Apptheme }}
                    name={'Close Booking'}
                    size={16}
                    fontFamily="Ubuntu-Medium"
                    // onPress={() => clickOnCloseButton()}
                    onPress={() => setAlertPopUpStatus(true)}
                    loader={loaderCloseBtn}
                  />
                </View>
             }

           {/* </View> */}

           <BottomSheet
              hasDraggableIcon
              ref={bottomSheet}
              height={normalizeSize(270)}
              radius={30}
              sheetBackgroundColor={White}
              dragIconStyle={{ width: normalizeSize(50), height: 2 }}>
              <PatientDetailsModal
                bottomSheet={bottomSheet}
                patientModalData={patientModalData}
                appoientmentId={appoientmentId}
                // availabilitId={route?.params?.availabilit_id}
                patientMorePage={false}
                patientStatus={patientStatus}
                ls_statusForOnlineOrOffline={ls_statusForOnlineOrOffline}
                ls_tokenNumber={ls_tokenNumber}
                getDoctorBookingSlot={getDoctorBookingSlot}
                formDate={formDate}
                previouspatientStatus={previouspatientStatus}
              />
            </BottomSheet>

            <AlertPopUp title={"Do you want to close the booking?"} dialogStatus={alertPopUpStatus} deleteFunc={clickOnCloseButton} setDialogStatus={setAlertPopUpStatus} style={{ borderRadius: 10 }} />
          </View>
        </>
        {/* )} */}
      </LinearGradientComponent>
    </View>
  );
};
export default BookingDetails;

const bookingDetailsStyle = StyleSheet.create({
  bodyparentView: {
    backgroundColor: White,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    height: SCREEN_HEIGHT - normalizeSize(70),
    marginTop: 45,
    flex: 1
  },
  dropdownStyle: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: White,
    elevation: 2,
    height: normalizeSize(43),
    shadowColor: '#a3a3a3',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,

  },
  leftSidebodyView: {
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  timelineStyle: {
    marginTop: 18,
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 5,
    // backgroundColor: 'green'
  },
});
