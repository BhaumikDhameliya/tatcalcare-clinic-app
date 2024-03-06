import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Styles from '../../../../Styles';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../components/HeaderCommon';
import SlotBookingHeader from './SlotBookingHeader';
import {Apptheme, BoldColor, Grey, White} from '../../../../config/Colors';
import Availability from '../../../../assets/icons/Availability.svg';
import {Rtext} from '../../../../components/Rtext';
import {normalizeSize, showFlashMessage} from '../../../../utility';
import ScheduleView from './ScheduleView';
import CommonSelectSlotHeader from './ScheduleView/CommonSelectSlotHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FooterView from './FooterView';
import {request} from '../../../../services';
import moment from 'moment-timezone';
import NoDataFound from '../../../../components/NoDataFound';
import FooterLoader from '../../../../components/FooterLoader';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import PlusIcon from '../../../../assets/icons/PlusIcon.svg';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import SlotAddForm from './SlotAddForm';
const SlotBooking = ({route}) => {
  const doctorId = route?.params?.doctorId;
  const bottomSheet = useRef();
  const [lo_doctorDetails, setDoctorBookingDetails] = useState({});
  const [la_morningSlot, setMorningSlot] = useState([]);
  const [la_afternoonSlot, setAfterSlot] = useState([]);
  const [la_eveningSlot, setEveningSlot] = useState([]);
  const [la_availabilty, setAvailabilty] = useState([]);
  const [slot_fees, setDoctorSlotFees] = useState('');
  const [loading, setLoading] = useState(false);
  const [ls_selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [lb_loader, setLoader] = useState(false);
  const [lb_headerLoader, setheaderLoader] = useState(false);
  const [slotId, setSlotId] = useState('');
  const [ls_errorMessage, setErrorMessage] = useState('');
  const sel_date = date => {
    setSelectedDate(date);
  };
  useEffect(() => {
    getIndividualDoctorDetails();
  }, []);
  // console.log("la_morningSlot", la_morningSlot, la_afternoonSlot, la_eveningSlot);
  useEffect(() => {
    getAvailabiltyAndSlots();
  }, [ls_selectedDate]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getAvailabiltyAndSlots();
  //   }, [ls_selectedDate]),
  // );

  const getIndividualDoctorDetails = async () => {
    setheaderLoader(true);
    try {
      let response = await request('get', `doctors/${doctorId}`);
      let doctor_list = response.data.data;
      setDoctorBookingDetails(doctor_list);
    } catch (e) {
      console.log('e', e);
    }
    setheaderLoader(false);
  };

  const getAvailabiltyAndSlots = async () => {
    // console.log('getAvailabiltyAndSlots', `doctors/booking/get-slots?doctor_id=${doctorId}&specific_date=${ls_selectedDate}`);
    setLoader(true);
    // console.log("ls_selectedDate", ls_selectedDate);
    setMorningSlot([]);
    setAfterSlot([]);
    setEveningSlot([]);
    setAvailabilty([]);
    try {
      let res = await request(
        'get',
        `doctors/booking/get-slots?doctor_id=${doctorId}&specific_date=${ls_selectedDate}`,
      );
      // console.log("data", res?.data);
      // console.log("data56", typeof res?.data);
      //  setMorningSlot([]);
      //  setAfterSlot([]);
      //  setEveningSlot([]);
      // let slot = res?.data?.data?.all_slots
      // if(res?.data?.data.length==0){

      // }
      // if (res?.data?.data.length!==0)
      if (!Array.isArray(res?.data?.data)) {
        console.log('hiiiii');
        let mornigSlot = res?.data?.data?.all_slots?.morning;
        let afternoonSlot = res?.data?.data?.all_slots?.afternoon;
        let eveningSlot = res?.data?.data?.all_slots?.evening;
        let availabilityData = res?.data?.data?.doctor_availablity_date_wise;
        setMorningSlot(mornigSlot || []);
        setAfterSlot(afternoonSlot || []);
        setEveningSlot(eveningSlot || []);
        setAvailabilty(availabilityData || []);
        setLoader(false);
      }
    } catch ({response}) {
      console.log('e', response?.data?.error);
    }
    setLoader(false);
  };
  const AvailabiltyComponent = ({styles, item = []}) => {
    return (
      <View style={styles.boxViewStyle}>
        <View style={{width: '70%'}}>
          <Rtext fontFamily="Ubuntu-Bold" fontSize={16.5} style={{bottom: 2}}>
            Availability
          </Rtext>
          {item?.length == 0 ? (
            <Rtext>Not Available </Rtext>
          ) : (
            item.map((item, index) => (
              <View key={index}>
                <Rtext fontSize={13.5} style={{color: Grey, top: 3}}>
                  {`From ${moment(item.form_date).format(
                    'hh:mm A',
                  )} - To ${moment(item.to_date).format('hh:mm A')}`}
                </Rtext>
              </View>
            ))
          )}
        </View>
        <Availability
          style={{position: 'absolute', right: 0}}
          height={item.length == 2 ? normalizeSize(100) : normalizeSize(70)}
        />
      </View>
    );
  };

  const SlotCard = ({styles, item = {}}) => {
    const handlePressOnSlotCard = () => {
      if (item.booking_status !== 'BOOKED' && !item?.is_time_expired) {
        setSlotId(item?._id);
        setDoctorSlotFees(item?.slot_fees);
      } else if (item?.is_time_expired) {
        showFlashMessage(
          'This slot time is no longer available.',
          '',
          'danger',
        );
      } else {
        showFlashMessage('This slot is already booked', '', 'danger');
      }
    };

    return (
      <View style={[styles.mainViewStyle, {}]}>
        <TouchableOpacity
          style={{
            padding: 6,
            elevation: 4,
            backgroundColor:
              item.booking_status == 'BOOKED'
                ? '#7b9c9c'
                : item?.is_time_expired
                ? '#eeeeee'
                : slotId == item?._id
                ? Apptheme
                : White,
            borderRadius: 6,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6.0,
          }}
          onPress={() => handlePressOnSlotCard(item)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name={'clockcircle'}
              size={normalizeSize(14)}
              color={
                item.booking_status == 'BOOKED'
                  ? White
                  : item?.is_time_expired
                  ? Grey
                  : slotId == item?._id
                  ? White
                  : Apptheme
              }
              style={{bottom: 8}}
            />
            <View style={{start: 6}}>
              <Rtext
                style={{
                  color:
                    item.booking_status == 'BOOKED'
                      ? White
                      : item?.is_time_expired
                      ? Grey
                      : slotId == item?._id
                      ? White
                      : BoldColor,
                  bottom: 1,
                }}
                fontSize={11.5}>
                {moment(item?.booking_from).format('hh:mm A')}
              </Rtext>
              <Rtext
                fontSize={11.5}
                style={{
                  color:
                    item.booking_status == 'BOOKED'
                      ? White
                      : item?.is_time_expired
                      ? Grey
                      : slotId == item?._id
                      ? White
                      : Apptheme,
                }}>
                Token {item?.token_number}
              </Rtext>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const clickOnAddSlot = async () => {
    if (loading) {
      showFlashMessage('Wait for the response', '', 'danger');
    }
    setLoading(true);
    if (la_availabilty.length == 1) {
      try {
        let response = await request(
          'put',
          `doctor-booking-slots/add-slot/${la_availabilty[0]?._id}`,
        );
        console.log('response', response);
        if (response) {
          getAvailabiltyAndSlots();
          showFlashMessage('Successfully created the slot');
          setLoading(false);
        }
      } catch ({response}) {
        showFlashMessage(response?.data?.error, '', 'danger');
      }
    } else {
      setErrorMessage('');
      bottomSheet.current.show();
    }
    setLoading(false);
  };

  const renderSlotFlatList = (data, time, icon = null, top = 0) => {
    return (
      <View style={{paddingHorizontal: 24, top}}>
        {data?.length !== 0 && (
          <>
            {data?.length != 0 && (
              <View style={{paddingBottom: 15}}>
                <CommonSelectSlotHeader time={time} icon={icon} />
              </View>
            )}
            <FlatList
              data={data}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <SlotCard styles={styles} item={item} />
              )}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={'Slot Booking'}
          style={{top: 15}}
          navigateBackto={route?.params?.navigateBack}
        />
      </View>
      <SlotBookingHeader
        doctorbookingDetails={lo_doctorDetails}
        // lb_loader={lb_headerLoader}
      />
      <View style={[Styles.mainBodyStyle, styles.mainViewBodyStyle]}>
        {/* <View style={{ height: '75%', backgroundColor: 'orange' }}> */}
        <View style={{paddingHorizontal: 24}}>
          <AvailabiltyComponent styles={styles} item={la_availabilty} />
          <ScheduleView
            sel_date={sel_date}
            setSlotId={setSlotId}
            lb_loader={lb_loader}
          />
        </View>
        {lb_loader ? (
          <FooterLoader style={{justifyContent: 'center', height: '50%'}} />
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: slotId == '' ? 1 : 0.85,
              }}>
              {(la_morningSlot?.length != 0 ||
                la_afternoonSlot?.length != 0 ||
                la_eveningSlot?.length != 0) && (
                <View
                  style={{
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                  }}>
                  <Rtext
                    style={{color: Apptheme}}
                    fontSize={14.5}
                    fontFamily="Ubuntu-Medium">
                    Select Slot
                  </Rtext>
                  {loading ? (
                    <Rtext style={{color: Apptheme}}>Loading...</Rtext>
                  ) : (
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={clickOnAddSlot}>
                      <PlusIcon style={{right: 5}} height={16} />
                      <Rtext
                        fontFamily="Ubuntu-Medium"
                        fontSize={11.5}
                        style={{color: Apptheme}}>
                        Add slot
                      </Rtext>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled
                style={{
                  paddingHorizontal: 0,
                  // height: 50,
                  // height: slotId !== '' ? '40%' : '30%',
                }}>
                <View style={{paddingBottom: 50}}>
                  {la_morningSlot?.length != 0 ||
                  la_afternoonSlot?.length != 0 ||
                  la_eveningSlot?.length != 0 ? (
                    <View style={{}}>
                      {renderSlotFlatList(
                        la_morningSlot,
                        'Morning',
                        'sunrise',
                        10,
                      )}
                      {renderSlotFlatList(
                        la_afternoonSlot,
                        'Afternoon',
                        'sun',
                        10,
                      )}
                      {renderSlotFlatList(la_eveningSlot, 'Evening', null, 10)}
                    </View>
                  ) : (
                    <NoDataFound
                      style={{height: '100%'}}
                      bodyText="No Slots available for today"
                    />
                  )}
                </View>
              </ScrollView>
            </View>

            {(la_morningSlot?.length != 0 ||
              la_afternoonSlot?.length != 0 ||
              la_eveningSlot?.length != 0) &&
              slotId !== '' && (
                <View style={styles.footerStyle}>
                  <FooterView
                    slotId={slotId}
                    lo_doctorDetails={lo_doctorDetails}
                    lb_headerLoader={lb_headerLoader}
                    top={0}
                    fees={slot_fees}
                    setSlotId={setSlotId}
                    getAvailabiltyAndSlots={getAvailabiltyAndSlots}
                  />
                </View>
              )}
          </View>
        )}
        {/* </View> */}
      </View>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={la_availabilty?.length * 100}
        radius={30}
        sheetBackgroundColor={White}
        dragIconStyle={{width: normalizeSize(50), height: 2}}>
        <SlotAddForm
          bottomSheet={bottomSheet}
          la_availabilty={la_availabilty}
          getAvailabiltyAndSlots={getAvailabiltyAndSlots}
          setErrorMessage={setErrorMessage}
          ls_errorMessage={ls_errorMessage}
        />
      </BottomSheet>
    </LinearGradientComponent>
  );
};

export default SlotBooking;

const styles = StyleSheet.create({
  boxViewStyle: {
    backgroundColor: White,
    elevation: 4,
    borderRadius: 15,
    flexDirection: 'row',
    paddingLeft: 10,
    // paddingHorizontal: 24,
    paddingVertical: 21,
    // overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  mainViewStyle: {
    width: '33%',
    // elevation: 4,

    paddingHorizontal: normalizeSize(6),
    paddingVertical: 10,
    overflow: 'hidden',
    // marginEnd: normalizeSize(10),
    // marginVertical: 10,
    // backgroundColor: 'yellow',
  },
  mainViewBodyStyle: {
    marginTop: 20,
    // paddingVertical: 24,
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 0,
    // height: '100%',
    flex: 1,
    paddingHorizontal: 0,
  },
  footerStyle: {
    justifyContent: 'flex-end',
    // position: 'absolute',
    // left: 0,
    width: '100%',
    // bottom: 0,
    // height: '13%',
    flex: 0.15,
  },
});