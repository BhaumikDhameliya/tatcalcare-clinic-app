import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Rtext } from '../../../components/Rtext';
import { Apptheme, BoldColor, Grey, White } from '../../../config/Colors';
import PlusIcon from '../../../assets/icons/PlusIcon.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import { normalizeSize, SCREEN_HEIGHT, showFlashMessage } from '../../../utility';
import RpopupMenu from '../../../components/RpopupMenu';
import { useNavigation } from '@react-navigation/native';
import LineSeparator from '../../../components/LineSeparator';
import {
  Aws_Base_url,
  base_upload_image_folder,
  currency,
} from '../../../config/Constant';
import { request } from '../../../services';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import DoctorDetailsSubModal from './DoctorDetailsSubModal';
import { Dialog, Portal, Button } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import Amodal from '../../../components/Amodal';
import CalendarPicker from 'react-native-calendar-picker';
import Abutton from '../../../components/Abutton';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlertPopUp from '../../../components/AlertPopUp';

const DoctorDetailsCard = ({
  item = {},
  getDoctorList,
  // la_languageList,
  // la_departmntslist,
  // la_symptomlist,
  daterange = 0,
}) => {

  const [la_languageList, setLanguageList] = useState([]);
  const [la_departmntslist, setDepartmntslist] = useState([]);
  const [la_symptomlist, setSymptomslist] = useState([]);
 
  useEffect(()=>{getDepartmentAndLanguageAndSymptomList()},[])


  const getDepartmentAndLanguageAndSymptomList = async () => {
    try {
      let tempDepartmentList = [];
      let response = await request('get', 'departments');
      response.data?.data?.map((item, index) => {
        tempDepartmentList.push({
          value: item.name,
          _id: item._id,
        });
        setDepartmntslist(tempDepartmentList);
      });
    } catch (e) {
      console.log('e', e?.response?.data?.error);
    }

    try {
      let tempLanguageList = [];
      let response = await request('get', 'languages');
      response.data?.data?.map((item, index) => {
        tempLanguageList.push({
          value: item.name,
          _id: item._id,
        });
        setLanguageList(tempLanguageList);
      });
    } catch (e) {
      console.log('e', e?.response?.data?.error);
    }

    try {
      let tempSymptomList = [];
      let response = await request('get', 'symptoms?sort_by=name&sort_type=ascend');
      // console.log("response...", response?.data?.data);
      response?.data?.data?.map((item, index) => {
        tempSymptomList.push({
          value: item.name,
          _id: item._id,
        })
      });
      setSymptomslist(tempSymptomList);
    } catch (e) {
      console.log('e', e?.response?.data?.error);
    }
  };




  const options = [
    {
      lable: 'Edit Doctor',
      value: 'Edit',
      icon: (
        <MaterialIcons
          name={'edit'}
          size={normalizeSize(14)}
          color={Grey}
          style={{right: 5}}
        />
      ),
    },
    {
      lable: 'Edit Availability',
      value: 'EditAvailability',
      // icon: 'add-task',
      icon: (
        <MaterialIcons
          name={'add-task'}
          size={normalizeSize(14)}
          color={Grey}
          style={{right: 5}}
        />
      ),
    },
    {
      lable: 'Delete Doctor',
      value: 'Delete',
      //  icon: 'delete'
      icon: (
        <MaterialIcons
          name={'delete'}
          size={normalizeSize(14)}
          color={'red'}
          style={{right: 5}}
        />
      ),
    },
  ]

  const [PopUpMenuStatus, setPopUpMenuStatus] = useState(false);
  const [Status, setStatus] = useState(false);
  const [popUpmenuindex, setPopUpStatusIndex] = useState(-1);
  // const [dialogStatus, setDialogStatus] = useState(false);
  const [calandermodalstatus, setCalandermodalstatus] = useState(false);
  const [lo_selectedDate, setSelectedDate] = useState({
    START_DATE: new Date(),
    END_DATE: new Date(),
  });
  const [errormessage, setErrorMessage] = useState('');
  const [alertPopUpStatus, setAlertPopUpStatus] = useState(false);
  const [alertPopUpStatusForDate, setAlertPopUpStatusForDate] = useState(false);

  const navigation = useNavigation();
  const bottomSheet = useRef();

  const clickOnProfile = () => {
    bottomSheet.current.show();
  };

  const handleOnSelectOption = async (value, index) => {
    setPopUpStatusIndex(index);
    if (value == 'EditAvailability') {
      navigation.navigate('SlotBookingSubForm', {
        doctorData: item,
        doctorId: item?._id,
        getDoctorList,
        edit: true,
      });
    } else if (value == 'Edit') {
      try {
        let response = await request('get', `doctors/${item?._id}`);
       
        let doctor_data = response.data.data;
        // console.log('doctor_data', doctor_data);
        let selectLanguageList = [];
        let selectList = [];
        let selectSymptomList = [];
        let tempselectedLanguageValue = [];
        let tempselectedDepartmentValue = [];
        let tempselectedSymptomValue = [];

        doctor_data.languages?.map(item => {
          selectLanguageList.push({ _id: item._id, value: item?.name });
          tempselectedLanguageValue.push(item?.name);
        });
        // console.log("tempselectedLanguageValue", tempselectedLanguageValue);
        doctor_data?.departments?.map(item => {
          selectList.push({ _id: item?._id, value: item?.name }),
            tempselectedDepartmentValue.push(item.name);
        });
        doctor_data?.additional_symptom_details?.map(item => {
          selectSymptomList.push({ _id: item?._id, value: item?.name }),
          tempselectedSymptomValue.push(item.name);
        });
        navigation.navigate('DoctorForm', {
          getDoctorList,
          data: {
            data: doctor_data,
            selectedList: tempselectedDepartmentValue,
            departmentList: la_departmntslist,
            selectedId: selectList,

            languageList: la_languageList,
            selectedLanguageList: tempselectedLanguageValue,
            selectedLanguageId: selectLanguageList,

            selectedSymptomList: tempselectedSymptomValue,
            symptomList: la_symptomlist,
            selectedSymptomId: selectSymptomList,
          },
          bottomSheet: '',
          editStatus: true,
        });
      } catch (e) {
        console.log('error', e);
      }
    } else {
      // setDialogStatus(true);
      setAlertPopUpStatus(true);
    }
    setPopUpMenuStatus(false);
    setStatus(false);
    setPopUpStatusIndex(-1);
  };

  const onPressPlusIcon = () => {
    navigation.navigate('SlotBooking', { doctorId: item?._id });
  };

  let max_length = 70;
  const departmentsString = item?.departments
    ?.map(department => department.name)
    .join(', ');

  const deleteFuncForDoctor = async () => {
    try {
      let response = await request('delete', `doctors/${item?._id}`);
      getDoctorList();
      // setDialogStatus(false);
      setAlertPopUpStatus(false)
      showFlashMessage(response?.data?.message);
    } catch (error) {
      console.log('error', error);
    }
    setAlertPopUpStatus(false)
  };
  const handleDisableDoctor = () => {
    setCalandermodalstatus(true);
  };

  const onDateChange = (date, type) => {
    setSelectedDate(prevState => ({
      ...prevState,
      [type]: date,
    }));

    setErrorMessage('');
  };
  const handleClickOnSet = () => {
    if (lo_selectedDate.START_DATE && lo_selectedDate.END_DATE) {
      // let fincalDateSelction = { from_date: lo_selectedDate["START_DATE"], to_date: lo_selectedDate["END_DATE"] }
      // try {
      //   let response = await request(
      //     'post',
      //     `doctors/disable-doctor/${item?._id}`,
      //     fincalDateSelction,
      //   );
      //   showFlashMessage(response?.data?.message);
      // } catch ({response}) {
      //   showFlashMessage(response?.data?.error,"","danger")
      //   console.log('error',response?.data?.error);
      // }
      setAlertPopUpStatusForDate(true);

      setCalandermodalstatus(false);

      setErrorMessage('');
    }
    else {
      setErrorMessage("* Please Select date range")
      // showFlashMessage("Please Select date range","","danger")
    }
  };

  const clickOnCloseButton = async() => {
    let fincalDateSelction = { from_date: lo_selectedDate["START_DATE"], to_date: lo_selectedDate["END_DATE"] }
    try {
      let response = await request(
        'post',
        `doctors/disable-doctor/${item?._id}`,
        fincalDateSelction,
      );
      showFlashMessage(response?.data?.message);
      setAlertPopUpStatusForDate(false);
    } catch ({response}) {
      showFlashMessage(response?.data?.error,"","danger")
      console.log('error',response?.data?.error);
    }
    setAlertPopUpStatusForDate(false);
  }

  return (
    <View>
      <View style={styles.boxView}>
        <TouchableOpacity
          style={styles.leftView}
          onPress={() => clickOnProfile()}>
          {item?.profile_image ? (
            <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${item?.profile_image}`,
              }}
              style={styles.imagerView}
            />
          ) : (
            <Image
              style={styles.imagerView}
              source={{
                uri: 'https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg',
              }}
            />
          )}
          <View style={{ paddingLeft: 10 }}>
            <Rtext fontFamily="Ubuntu-Medium">{item.name}</Rtext>
            <View style={{ flexDirection: 'row', width: 190 }}>
              <Rtext style={{ color: Grey }} fontSize={11}>
                {departmentsString.length > max_length
                  ? `${departmentsString
                    .substring(0, max_length - 3)
                    .trim()}...`
                  : departmentsString}
              </Rtext>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.righterView}>
          <TouchableOpacity onPress={onPressPlusIcon}>
            <PlusIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockStyle}
            onPress={handleDisableDoctor}>
            <Entypo
              style={{ color: White }}
              name={'block'}
              size={normalizeSize(12)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setStatus(true);
            }}>
            <Entypo
              style={{ color: '#747474', left: 6 }}
              name={'dots-three-vertical'}
              size={normalizeSize(15)}
            />
          </TouchableOpacity>
        </View>
        <RpopupMenu
          option={options}
          status={Status}
          onOpen={() => setPopUpMenuStatus(true)}
          onClose={() => {
            setPopUpMenuStatus(false);
            setStatus(false);
          }}
          popUpmenuindex={popUpmenuindex}
          onSelectValue={(value, index) =>
            handleOnSelectOption(value.value, index)
          }
        />
      </View>
      <LineSeparator />

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={normalizeSize(220)}
        radius={30}
        sheetBackgroundColor={White}
        dragIconStyle={{ width: normalizeSize(50), height: 2 }}>
        <DoctorDetailsSubModal item={item} bottomSheet={bottomSheet} />
      </BottomSheet>

      <AlertPopUp title={'Do you want to disable this doctor?'} dialogStatus={alertPopUpStatus} deleteFunc={deleteFuncForDoctor} setDialogStatus={setAlertPopUpStatus} style={{borderRadius: 10}}/>
      <AlertPopUp title={'Disabling Doctor within these days will lead in the cancellation of previously booked appointments.'} dialogStatus={alertPopUpStatusForDate} deleteFunc={clickOnCloseButton} setDialogStatus={setAlertPopUpStatusForDate} style={{borderRadius: 10}}/>

      <GestureRecognizer
        style={{ flex: 1 }}
        config={{ gestureIsClickThreshold: 20 }}
        onSwipeDown={() => setCalandermodalstatus(false)}>
        <Amodal
          modalVisible={calandermodalstatus}
          close={false}
          style={{ backgroundColor: White }}>
          <Header />
          <View style={{ alignSelf: 'center', padding: 15 }}>
            <CalendarPicker
              textStyle={{ color: BoldColor }}
              initialDate={lo_selectedDate.START_DATE}
              width={340}
              onDateChange={onDateChange}
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              // maxDate={new Date()}
              allowBackwardRangeSelect={true}
              selectedStartDate={lo_selectedDate.START_DATE}
              selectedEndDate={lo_selectedDate.END_DATE}
              disabledDatesTextStyle={{ opacity: 0.5 }}
              selectedRangeStyle={{ backgroundColor: Apptheme }}
            />
          </View>
          {errormessage && (
            <Rtext fontSize={13} style={{ color: 'red' }}>
              {errormessage}
            </Rtext>
          )}

          <Abutton
            name="Save"
            onPress={handleClickOnSet}
            size={13}
            style={{ width: Platform.OS =='ios' && SCREEN_HEIGHT < 800 ? '30%' : '20%', height: 35, marginBottom: 15 }}
          />
        </Amodal>
      </GestureRecognizer>
    </View>
  );
};
const Header = ({ Styles }) => {
  return (
    <View style={styles.header}>
      <Rtext fontSize={15}>{'Drag Down to Close'}</Rtext>
      <LottieView
        colorFilters={[
          {
            keypath: 'scroll_up',
            color: Grey,
          },
        ]}
        style={{
          height: normalizeSize(35),
          width: normalizeSize(35),
        }}
        source={require('../../../assets/animation/swipeDown.json')}
        autoPlay
      />
    </View>
  );
};
export default DoctorDetailsCard;

const styles = StyleSheet.create({
  boxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
    flex: 0.7,
    alignItems: 'center',
  },
  imagerView: {
    borderRadius: 30,
    borderColor: Apptheme,
    borderWidth: 0.8,
    height: normalizeSize(32),
    width: normalizeSize(32),
  },
  righterView: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blockStyle: {
    backgroundColor: '#F4A0AE',
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    padding: 4,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modalProfileImage: {
    height: normalizeSize(80),
    width: normalizeSize(55),
    borderRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    alignItems: 'center',
  },
});
