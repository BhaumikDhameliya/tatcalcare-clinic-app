import React, {useEffect, useState} from 'react';
import {BackHandler, Image, StyleSheet} from 'react-native';
import {View} from 'react-native';
import HeaderCommon from '../../../../../components/HeaderCommon';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import {Rtext} from '../../../../../components/Rtext';
import {
  Aws_Base_url,
  base_upload_image_folder,
  dateFormat,
  minimumtimedelay,
} from '../../../../../config/Constant';
import Styles from '../../../../../Styles';
import {
  normalizeSize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
  showYupFormValidationError,
} from '../../../../../utility';
import DoctorFormAvatar from '../DoctorFormAvatar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Apptheme, Grey, White} from '../../../../../config/Colors';
import CustomRadioButton from '../CustomRadioButton';
import {useForm} from 'react-hook-form';
import SelectDropDown from '../../../../../components/SelectDropDown';
import {TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ainput from '../../../../../components/Ainput';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Abutton from '../../../../../components/Abutton';
import moment, {utc} from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {request} from '../../../../../services';
import {useNavigation} from '@react-navigation/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dialog, Portal, Button} from 'react-native-paper';
import MultiSelectBox from '../../../../../components/MultiSelectBox';
const SlotBookingSubForm = ({route}) => {
  const doctorId = route?.params?.doctorId;
  let edit = route?.params?.edit;
  const {getDoctorList = () => {}} = route.params;
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timepickerstartModal, setTimepickerStartModal] = useState(false);
  const [timepickercloseModal, setTimepickerCloseModal] = useState(false);
  const [availibilitesRadio, setAvailibilitesRadio] = useState('recurring');
  const [slotArray, setSlotArray] = useState([]);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [addLoader, setAddLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [editAvalibiltyarray, setEditAvalibiltyarray] = useState([]);
  const [modalVisoble, setModalVisible] = useState(false);
  const [removeItem, setRemoveItem] = useState({});
  const [avalibiltyFormArray, setAvailibilityFormArray] = useState([]);
  const [starttimeMode, setstartTimeMode] = useState(new Date());
  const [endtimeMode, setendTimeMode] = useState(new Date());
  const [onTimeDateMode, setOnTimeDateMode] = useState(new Date());
  const [daySelectList, setSelectDayList] = useState([]);
  const [la_days, setLa_days] = useState([
    {
      _id: '1',
      value: 'Sunday',
    },
    {
      _id: '2',
      value: 'Monday',
    },
    {
      _id: '3',
      value: 'Tuesday',
    },
    {
      _id: '4',
      value: 'Wednesday',
    },
    {
      _id: '5',
      value: 'Thursday',
    },
    {
      _id: '6',
      value: 'Friday',
    },
    {
      _id: '7',
      value: 'Saturday',
    },
  ]);
  // console.log('startTime', startTime);
  const navigation = useNavigation();

  const lb_loginSchema = yup
    .object({
      day:
        availibilitesRadio !== 'recurring' &&
        selectDate == '' &&
        yup
          .string()
          .required('*Oops! You forgot to select a day. Please choose one.'),
      capacity: yup
        .string()
        .required(
          'Oops! You forgot to fill in the number of patients. Please provide the count.',
        ),
    })
    .required();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(lb_loginSchema)});

  useEffect(() => {
    if (edit) {
      getAvailibilty_list();
    }
  }, [edit]);

  const StructureAvailibilty = la_availibiltyArray => {
    let avaliblity_arr = [];
    la_availibiltyArray?.map(item =>
      avaliblity_arr.push({
        capacity: item?.capacity,
        date: item?.type == 'recurring' ? '' : item?.from,
        day: item?.type == 'recurring' ? item?.day : -1,
        type: item?.type,
        from: item?.from,
        to: item?.to,
        startTime: item?.from,
        endTime: item?.to,
        edit_status: true,
        availability_id: item?._id,
      }),
    );
    return avaliblity_arr;
  };

  const getAvailibilty_list = async () => {
    let response = await request(
      'get',
      `doctors/availability-listing/${doctorId}`,
    );
    // console.log('response', response.data.data?.availability);
    if (response) {
      let avaliblity_arr = StructureAvailibilty(
        response.data.data?.availability,
      );
      setSlotArray(avaliblity_arr);
    }
  };

  const handleChageRadioBtn = e => {
    console.log('e', e);
    setAvailibilitesRadio(e);
    if (e == 'onetime') {
      setValue('day', '');
    } else {
      setSelectDate('');
    }
  };

  const commonDateValidationCheckFunc = (date, type) => {
    if (selectDate != '') {
      if (
        selectDate.getFullYear() === new Date().getFullYear() &&
        selectDate.getMonth() === new Date().getMonth() &&
        selectDate.getDate() === new Date().getDate()
      ) {
        if (
          date.getTime() >
          new Date().getTime() + parseInt(minimumtimedelay) * 60000
        ) {
          if (type == 'StartTime') {
            setStartTime(date);
            setstartTimeMode(date);
          } else {
            setEndTime(date);
            setendTimeMode(date);
          }
        } else {
          showFlashMessage(
            `Please Select slot after ${minimumtimedelay} minutes`,
            '',
            'danger',
          );
        }
      } else {
        if (type == 'StartTime') {
          setStartTime(date);
          setstartTimeMode(date);
        } else {
          setEndTime(date);
          setendTimeMode(date);
        }
      }
    } else {
      if (type == 'StartTime') {
        setStartTime(date);
        setstartTimeMode(date);
      } else {
        setEndTime(date);
        setendTimeMode(date);
      }
    }
  };
  const handleConfirmstartPicker = date => {
    setTimepickerStartModal(false);
    let hour1 = date.getHours();
    let minute1 = date.getMinutes();
    let second1 = date.getSeconds();
    let hour2 = endTime && endTime.getHours();
    let minute2 = endTime && endTime.getMinutes();
    let second2 = endTime && endTime.getSeconds();

    if (hour1 == hour2 && minute1 == minute2 && second1 == second2) {
      showFlashMessage(
        'Invalid Time Selection! The start time should be earlier than the end time and should not be same.',
        '',
        'danger',
      );
    }  
    // else if(hour1>hour2) {
    //   console.log("big");
    // }
    else {
      if (availibilitesRadio == 'onetime') {
        commonDateValidationCheckFunc(date, 'StartTime');
      } else {
        setStartTime(date);
        setstartTimeMode(date);
      }
    }
  };

  const handleConfirmEndPicker = date => {
    setTimepickerCloseModal(false);
    // (date <= startTime) -> give error
    let hour1 = date.getHours();
    let minute1 = date.getMinutes();
    let second1 = date.getSeconds();

    let hour2 = startTime && startTime.getHours();
    let minute2 = startTime && startTime.getMinutes();
    let second2 = startTime && startTime.getSeconds();

    if (hour1 == hour2 && minute1 == minute2 && second1 == second2) {
      showFlashMessage(
        'Invalid Time Selection! The start time should be earlier than the end time and should not be same.',
        '',
        'danger',
      );
    }  
    //  else if(hour1<hour2) {
    //   console.log("big");
    // }
    else {
      if (availibilitesRadio == 'onetime') {
        commonDateValidationCheckFunc(date, 'EndTime');
      } else {
        setEndTime(date);
        setendTimeMode(date);
      }
    }
  };

  useEffect(() => {
    setValue('type', 'recurring');
  }, []);

  // let la_days = [
  //   {title: 'Sunday', value: 1},
  //   {title: 'Monday', value: 2},
  //   {title: 'Tuesday', value: 3},
  //   {title: 'Wednesday', value: 4},
  //   {title: 'Thursday', value: 5},
  //   {title: 'Friday', value: 6},
  //   {title: 'Saturday', value: 7},
  // ];

  let doctorData = route?.params?.doctorData;
  useEffect(() => {
    showYupFormValidationError(errors);
  }, [errors]);
  useEffect(() => {
    if (!edit) {
      const backAction = () => {
        navigation.goBack();
        getDoctorList(1);
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [edit == false]);

  const comonnFuncForSlotAdd = async (data, day, capacity) => {
    setSelectDayList([]);
    let slot_form_obj = {};
    let from = `${moment(selectDate).format('YYYY-MM-DD')}T${
      startTime?.toISOString()?.split('T')[1]
    }`;
    let to = `${moment(selectDate).format('YYYY-MM-DD')}T${
      endTime?.toISOString()?.split('T')[1]
    }`;
    slot_form_obj = {
      ...data,
      from: availibilitesRadio == 'recurring' ? startTime : from,
      to: availibilitesRadio == 'recurring' ? endTime : to,
      startTime: startTime,
      endTime: endTime,
      date: selectDate !== '' ? selectDate : '',
      day: day ? parseInt(day) - 1 : -1,
      capacity: parseInt(capacity),
      edit_status: false,
      availability_id: '',
    };

    slotArray.push(slot_form_obj);
    setValue('day', '');
    setValue('capacity', '');
    setStartTime('');
    setEndTime('');
    setSelectDate('');
    setSelectDayList([]);
    avalibiltyFormArray.push(slot_form_obj);
    if (edit) {
      editAvalibiltyarray.push(slot_form_obj);
    }
  };

  const addFunc = async data => {
    let capacity = data?.capacity;
    setAddLoader(true);

    if (startTime !== '' && endTime !== '') {
      if(startTime<endTime) {
        if (availibilitesRadio == 'recurring') {
          if (daySelectList.length == 0) {
            showFlashMessage(
              'Oops! You forgot to select a day. Please choose one or more.',
              '',
              'danger',
            );
          }
          daySelectList.map(item => {
            comonnFuncForSlotAdd(data, item, capacity);
          });
        } else {
          comonnFuncForSlotAdd(data, data.day, capacity);
          setAddLoader(false);
        }
      }
      else{
        showFlashMessage(
          // 'Invalid Time Selection! The start time and end time should not be same.',
          'Invalid Time Selection!',
          '',
          'danger',
        );
        console.log("called");
      }
     
      setAddLoader(false);
    } else {
      showFlashMessage('Choose the time duarion', '', 'danger');
    }
    setAddLoader(false);
  };
  const handleConfrimDatePicker = date => {
    console.log('date', date);

    // if (date >= new Date()) {
    setTimePickerVisible(false);
    setSelectDate(date);
    setOnTimeDateMode(date);
    // }
  };
  const removeSlot = (item, index) => {
    if (item?.edit_status) {
      setModalVisible(true);
      setRemoveItem(item);
    } else {
      const newArray = [...slotArray];
      newArray.splice(index, 1);
      setSlotArray(newArray);
      const deleteArray = [...editAvalibiltyarray];
      deleteArray.splice(index, 1);
      setEditAvalibiltyarray(deleteArray);
      const deleteditAvalibiltyarray = [...avalibiltyFormArray];
      deleteditAvalibiltyarray.splice(index, 1);
      setAvailibilityFormArray(deleteditAvalibiltyarray);
    }
  };
  const deleteSlot_func = async () => {
    try {
      const data = await request(
        'patch',
        'doctors/availability-delete/' + removeItem?.availability_id,
      );
      if (data) {
        let avaliblity_arr = StructureAvailibilty(data.data.data.availability);
        const mergedArray = [...avaliblity_arr, ...avalibiltyFormArray];
        setSlotArray(mergedArray);
        setModalVisible(false);
      }
    } catch ({response}) {
      // console.log('respose', response);
      // showFlashMessage(response.data.error, '', 'danger');
    }
  };

  const selectedDayListdata = la_list => {
    let tempdeselectDayId = [];
    la_list.map(i => tempdeselectDayId.push(i._id));
    // console.log('tempdeselectDayId', tempdeselectDayId);
    setSelectDayList(tempdeselectDayId);
  };

  const clickOnSubmit = async () => {
    setSubmitLoader(true);
    let doctor_data = {
      doctor_id: doctorId,
      availabilitys: edit ? editAvalibiltyarray : slotArray,
    };
    if (doctor_data?.availabilitys?.length == 0) {
      showFlashMessage(
        'Oops! Please complete at least one availability before submitting.',
        '',
        'danger',
      );
    } else {
      try {
        const data = await request(
          'post',
          'doctors/add-availability',
          doctor_data,
        );
        if (data) {
          console.log('data', data.data);
          showFlashMessage('Doctor Availability Created');
          navigation.navigate('Doctors');
          getDoctorList(1);
          setSubmitLoader(false);
        }
      } catch ({response}) {
        console.log('respose', response.data);
        showFlashMessage(response.data.error, '', 'danger');
      }
    }
    setSubmitLoader(false);
  };
  const commonFuncFordateFormat = time => {
    const timeString = moment(time).format('h:mm a');
    const [hour, minute] = timeString.split(':');
    // console.log('time', timeString.split(':')[0].length);
    let formattedTime = timeString;
    if (timeString.split(':')[0].length == 1) {
      formattedTime = `${hour.padStart(2, '0')}:${minute.padEnd(2, '0')}`;
    }
    return formattedTime;
  };

  const SlotCard = ({item, inx}) => {
    let startTime = commonFuncFordateFormat(item?.startTime);
    let endTime = commonFuncFordateFormat(item?.endTime);

    return (
      <View style={SlotBookingStyle.slotCardOuterView}>
        <View style={SlotBookingStyle.SlotCardinnerview}>
          <View style={{width: '5%'}}>
            <Fontisto name="calendar" size={normalizeSize(14)} color={Grey} />
          </View>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Rtext fontFamily="Ubuntu-Medium" fontSize={12}>
              {item?.day >= 0
                ? la_days[item?.day]?.value
                : item?.date
                ? moment(item?.date).format(dateFormat)
                : ''}
            </Rtext>
          </View>

          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Rtext fontSize={11.5} style={{color: Grey}}>
              {`| ${startTime} - ${endTime} |`}
            </Rtext>
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Rtext fontSize={11.5} style={{color: Apptheme}}>
              {`${item?.capacity} Patient`}
            </Rtext>
          </View>

          <TouchableOpacity
            style={SlotBookingStyle.crossview}
            onPress={() => removeSlot(item, inx)}>
            <Entypo name={'cross'} color={'white'} size={normalizeSize(14)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon 
          headerName={'Manage Availabilities'}
          navigateBackto={'Doctors'}
          style={{top: 20}}
        />
      </View>
      <View
        style={[
          Styles.mainBodyStyle,
          SlotBookingStyle.outerview,
          {marginTop: 75},
        ]}>   
        <View style={{flex: 1}}>
          <View style={{flex: 0.87}}>
            <View style={SlotBookingStyle.profileImageViewer}>
              {doctorData?.profile_image ? (
                <Image
                  source={{
                    uri: `${Aws_Base_url}${base_upload_image_folder}${doctorData?.profile_image}`,
                  }}
                  height={normalizeSize(70)}
                  width={normalizeSize(70)}
                  style={{borderRadius: normalizeSize(65), marginTop: -38}}
                />
              ) : (
                <View style={SlotBookingStyle.avatarViewStyle}>
                  <FontAwesome5
                    name={'user-alt'}
                    size={normalizeSize(37)}
                    color={'#747474'}
                  />
                </View>
              )}
            </View>
            <ScrollView>
              <View style={{paddingHorizontal: 24}}>
                <Rtext
                  fontFamily={'Ubuntu-Medium'}
                  style={{textAlign: 'center', color: '#101010'}}>
                  {doctorData?.name}
                </Rtext>
                <View style={{paddingVertical: 15}}>
                  <CustomRadioButton
                    name="type"
                    control={control}
                    radioList={[
                      {title: 'Recurring', value: 'recurring'},
                      {title: 'Onetime', value: 'onetime'},
                    ]}
                    setShowAddClass={handleChageRadioBtn}
                    title="Availability type"
                  />
                </View>
                <View>
                  <View style={SlotBookingStyle.selectdayouterview}>
                    <View style={SlotBookingStyle.boxView}>
                      {availibilitesRadio == 'recurring' ? (
                        // <SelectDropDown
                        //   dropdownButtonStyle={SlotBookingStyle.dropdownButtonStyle}
                        //   control={control}
                        //   dropDownList={la_days}
                        //   label="Select Day"
                        //   name={'day'}
                        //   // labelKey={'_id'}
                        //   // valueKey={'value'}
                        //   search={false}
                        //   color={Grey}
                        // />
                        <MultiSelectBox
                          la_subjectList={la_days}
                          label={'Select Days'}
                          defaultValue={daySelectList.length == 0 && 'Select Days'}
                          selectedId={''}
                          selectedValue={''}
                          disabled={false}
                          selectedData={list => selectedDayListdata(list)}
                          hideSearchBarStatus={true}
                        />
                      ) : (
                        <View style={SlotBookingStyle.dateViewer}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              setTimePickerVisible(!timePickerVisible)
                            }>
                            <Rtext fontSize={14} style={{color: Grey}}>
                              {selectDate == ''
                                ? 'Select Date'
                                : moment(selectDate)
                                    .format('DD-MM-YYYY')
                                    .toString()}
                            </Rtext>
                            <FontAwesome
                              name={'calendar-check-o'}
                              color={Grey}
                              size={15}
                            />
                          </TouchableOpacity>
                        </View>
                      )}

                      <View
                        style={[
                          SlotBookingStyle.commonrowStyle,
                          {paddingVertical: 12},
                        ]}>
                        <TouchableOpacity
                          style={SlotBookingStyle.timeboxOuterView}
                          onPress={() =>
                            setTimepickerStartModal(!timepickerstartModal)
                          }>
                          <View style={SlotBookingStyle.dateInsiteStyle}>
                            <Rtext style={{color: '#747474'}}>
                              {startTime == ''
                                ? 'Start Time'
                                : moment(startTime).format('h:mm a')}
                            </Rtext>
                            <SimpleLineIcons name={'clock'} color={Grey} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={SlotBookingStyle.timeboxOuterView}
                          onPress={() =>
                            setTimepickerCloseModal(!timepickercloseModal)
                          }>
                          <View style={SlotBookingStyle.dateInsiteStyle}>
                            <Rtext style={{color: '#747474'}}>
                              {endTime == ''
                                ? 'End Time'
                                : moment(endTime).format('h:mm a')}
                            </Rtext>
                            <SimpleLineIcons name={'clock'} color={Grey} />
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={[SlotBookingStyle.flexbox]}>
                        <View style={{width: '69%'}}>
                          <Ainput
                            label={'No. of Patient'}
                            placeholder={'No. of Patient'}
                            name={'capacity'}
                            control={control}
                            style={[
                              SlotBookingStyle.ainputStyle,
                              {backgroundColor: White},
                            ]}
                            color={Grey}
                            fontSize={14.5}
                            keyboardType={'number-pad'}
                            activeOutlineColor={'#c5c6c7'}
                            textColor={Grey}
                          />
                        </View>
                        <Abutton
                          style={[
                            SlotBookingStyle.addButton,
                            {backgroundColor: Apptheme},
                          ]}
                          name={'Add'}
                          size={14}
                          loader={addLoader}
                          onPress={handleSubmit(addFunc)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{paddingVertical: 20}}>
                  {slotArray.length == 0 ? (
                    <View
                      style={{
                        padding: 15,
                        backgroundColor: White,
                        elevation: 5,
                        borderRadius: 12,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 6.0,
                      }}>
                      <Rtext
                        style={{
                          textAlign: 'center',
                          color: Grey,
                          paddingVertical: 10,
                        }}
                        fontSize={14}>
                        No Availability Found
                      </Rtext>
                    </View>
                  ) : (
                    slotArray.map((item, inx) => (
                      <View style={{paddingBottom: 15}} key={inx}>
                        <SlotCard item={item} inx={inx} />
                      </View>
                    ))
                  )}
                  {/* <Rtext style={{textAlign:"center",color:Grey,paddingVertical:10}}>Not found any availability</Rtext> */}
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{flex: 0.13, paddingHorizontal: 15}}>
            <Abutton
              style={{backgroundColor: Apptheme}}
              name={'Submit'}
              fontFamily="Ubuntu-Medium"
              loader={submitLoader}
              size={16}
              onPress={() => clickOnSubmit()}
            />
          </View>
        </View>
        <Portal>
          <Dialog
            visible={modalVisoble}
            dismissable={false}
            style={{
              borderRadius: 10,
              width: SCREEN_WIDTH / 1.15,
              height: SCREEN_HEIGHT / 4.5,
            }}>
            {/* <Dialog.Title style={{fontSize: 16}}>
              {`${
                removeItem?.day >= 0
                  ? la_days[removeItem?.day]?.title
                  : removeItem?.date
                  ? moment(removeItem?.date).format(dateFormat)
                  : ''
              } ${ moment(removeItem?.startTime).format('h:mm a')} - ${ moment(removeItem?.endTime).format('h:mm a')
                }`}
            </Dialog.Title> */}
            <Dialog.Content>
              <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Rtext fontSize={15} fontFamily={'Ubuntu-Medium'}>
                  {removeItem?.day >= 0
                    ? la_days[removeItem?.day]?.value
                    : removeItem?.date
                    ? moment(removeItem?.date).format(dateFormat)
                    : ''}
                </Rtext>
                <Rtext
                  fontSize={15}
                  style={{paddingLeft: 2}}
                  fontFamily={'Ubuntu-Medium'}>
                  {`(${moment(removeItem?.startTime).format(
                    'h:mm a',
                  )} - ${moment(removeItem?.endTime).format('h:mm a')})`}
                </Rtext>
              </View>
              <Rtext style={{color: 'black'}}>
                {`Would you like to clear all slots and upcoming appointments linked to this availability?
`}
              </Rtext>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{paddingRight: 25}}>
                  <Rtext style={{color: Apptheme}} fontWeight="bold">
                    Cancel
                  </Rtext>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteSlot_func}>
                  <Rtext style={{color: '#c2786b'}} fontWeight="bold">
                    Confirm
                  </Rtext>
                </TouchableOpacity>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <DateTimePickerModal
          isVisible={timepickerstartModal}
          mode="time"
          onConfirm={handleConfirmstartPicker}
          onCancel={() => setTimepickerStartModal(false)}
          date={starttimeMode}
        />
        <DateTimePickerModal
          isVisible={timepickercloseModal}
          mode="time"
          onConfirm={handleConfirmEndPicker}
          onCancel={() => setTimepickerCloseModal(false)}
          date={endtimeMode}
        />
        <DateTimePickerModal
          isVisible={timePickerVisible}
          onCancel={() => setTimePickerVisible(!timePickerVisible)}
          mode="date"
          onConfirm={handleConfrimDatePicker}
          date={onTimeDateMode}
          minimumDate={new Date()}
        />
      </View>
    </LinearGradientComponent>
  );
};

export default SlotBookingSubForm;
const SlotBookingStyle = StyleSheet.create({
  avatarViewStyle: {
    padding: 16,
    backgroundColor: '#EEF2F5',
    borderRadius: 40,
    marginTop: -38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectdayouterview: {
    borderRadius: 14,
    backgroundColor: White,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
    // marginVertical: 13,
  },
  dropdownButtonStyle: {
    height: normalizeSize(43),
    width: '100%',
    backgroundColor: White,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 10,
    shadowColor: '#a3a3a3',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  commonrowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeboxOuterView: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    // shadowColor: '#bdbbbb',
    elevation: 3,
    backgroundColor: White,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  flexbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInsiteStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ainputStyle: {
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: '#bdbbbb',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
    // backgroundColor: White
  },
  addButton: {
    width: '29%',
    backgroundColor: Apptheme,
    bottom: 2,
  },
  crossview: {
    backgroundColor: '#F4A0AE',
    borderRadius: 25,
    padding: 2,
  },
  outerview: {
    paddingHorizontal: 0,
    height: '90%',
    flex: 1,
    backgroundColor: '#fafafa',
  },
  profileImageViewer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  slotCardOuterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SlotCardinnerview: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 14,
  },
  dateViewer: {
    padding: 16,
    backgroundColor: White,
    elevation: 5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
});
