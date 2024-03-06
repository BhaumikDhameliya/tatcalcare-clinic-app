import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Rtext} from '../../../../../../components/Rtext';
import {
  Apptheme,
  BoldColor,
  Grey,
  White,
} from '../../../../../../config/Colors';
import PlusIcon from '../../../../../../assets/icons/PlusIcon.svg';
import {normalizeSize, showFlashMessage} from '../../../../../../utility';
import Fontisto from 'react-native-vector-icons/Fontisto';
import GestureRecognizer from 'react-native-swipe-gestures';
import CalendarPicker from 'react-native-calendar-picker';
import Amodal from '../../../../../../components/Amodal';
import moment from 'moment';
import Abutton from '../../../../../../components/Abutton';
import LottieView from 'lottie-react-native';
import {request} from '../../../../../../services';
import AlertPopUp from '../../../../../../components/AlertPopUp';

const DisabledClinicHeader = ({daterange = 20}) => {
  const [calandermodalstatus, setCalandermodalstatus] = useState(false);
  const [errormessage, setErrorMessage] = useState('');
  const [lo_selectedDate, setSelectedDate] = useState({
    from_date: new Date(),
    to_date: new Date(),
  });
  const [alertPopUpStatusForDate, setAlertPopUpStatusForDate] = useState(false);

  const onDateChange = (date, type) => {
    setSelectedDate(prevState => ({
      ...prevState,
      [type]: date,
    }));
    setErrorMessage("")

  };
  console.log('lo_selectedDate2555', lo_selectedDate);

  const handleClickOnSet = () => {
    console.log('lo_selectedDate', lo_selectedDate);
    if (lo_selectedDate?.START_DATE && lo_selectedDate.END_DATE) {
      // try {
      //   let response = await request(
      //     'post',
      //     'clinics/disable-clinic',
      //     {from_date:lo_selectedDate?.START_DATE ,to_date:lo_selectedDate?.END_DATE},
      //   );
      //   if (response) {
      //     showFlashMessage(response.data?.message);
      //     setErrorMessage('');
      //   }
      // } catch (e) {
      //   showFlashMessage(e?.response?.data?.error, '', 'danger');
      // }
      setAlertPopUpStatusForDate(true);

      setCalandermodalstatus(false);

      setErrorMessage('');
      // clinics/disable-clinic
    } 
    else {
      setErrorMessage('* Please Select date range');
      // showFlashMessage("Please Select date range","","danger")
    }
  };

  const clickOnCloseButton = async() => {
      try {
        let response = await request(
          'post',
          'clinics/disable-clinic',
          {from_date:lo_selectedDate?.START_DATE ,to_date:lo_selectedDate?.END_DATE},
        );
        if (response) {
          showFlashMessage(response.data?.message);
          // setErrorMessage('');
          setAlertPopUpStatusForDate(false);
        }
      } catch (e) {
        showFlashMessage(e?.response?.data?.error, '', 'danger');
      }
    setAlertPopUpStatusForDate(false);
  }

  return (
    <>
      <View style={DisabledClinicHeaderStyle.outerview}>
        <View style={DisabledClinicHeaderStyle.leftview}>
          <View style={DisabledClinicHeaderStyle.box}>
            <Fontisto name={'paralysis-disability'} color={Apptheme} />
          </View>
          <Rtext
            style={{color: 'white', paddingLeft: 12}}
            fontSize={14.5}
            fontFamily="Ubuntu-Medium">
            Disable requests
          </Rtext>
        </View>
        <View style={{flex: 0.45}}>
          <TouchableOpacity
            style={DisabledClinicHeaderStyle.righterView}
            onPress={() => setCalandermodalstatus(true)}>
            <PlusIcon height={normalizeSize(14)} width={normalizeSize(14)} />
            <Rtext
              style={{ color: Apptheme,}}
              fontFamily="Ubuntu-Medium"
              fontSize={11.5}>
              Request Disability
            </Rtext>
          </TouchableOpacity>
        </View>
      </View>

      <AlertPopUp title={'Disabling Clinic within these days will lead in the cancellation of previously booked appointments.'} dialogStatus={alertPopUpStatusForDate} deleteFunc={clickOnCloseButton} setDialogStatus={setAlertPopUpStatusForDate} style={{borderRadius: 10}}/>

      <GestureRecognizer
        style={{flex: 1}}
        config={{gestureIsClickThreshold: 20}}
        onSwipe={() => setCalandermodalstatus(false)}>
        <Amodal
          modalVisible={calandermodalstatus}
          close={false}
          style={{backgroundColor: White}}>
          <Header />
          <View style={{alignSelf: 'center', padding: 15}}>
            <CalendarPicker
              textStyle={{color: BoldColor}}
              initialDate={lo_selectedDate.from_date}
              width={340}
              onDateChange={onDateChange}
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              // maxDate={new Date()}
              allowBackwardRangeSelect={true}
              //   selectedStartDate={lo_selectedDate.from_date}
              //   selectedEndDate={lo_selectedDate.to_date}
              disabledDatesTextStyle={{opacity: 0.5}}
              selectedRangeStyle={{backgroundColor: Apptheme}}
            />
          </View>
          {errormessage && (
            <Rtext fontSize={13} style={{color: 'red'}}>
              {errormessage}
            </Rtext>
          )}
          <Abutton
            name="Submit"
            onPress={() => handleClickOnSet()}
            size={13}
            style={{width: '40%', height: 40, marginBottom: 15}}
          />
        </Amodal>
      </GestureRecognizer>
    </>
  );
};
const Header = ({Styles}) => {
  return (
    <View style={DisabledClinicHeaderStyle.header}>
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
        source={require('../../../../../../assets/animation/swipeDown.json')}
        autoPlay
      />
    </View>
  );
};
export default DisabledClinicHeader;

const DisabledClinicHeaderStyle = StyleSheet.create({
  outerview: {
    marginTop: 58,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 24,
    flex:1
  },
  leftview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.55,
  },
  box: {
    backgroundColor: White,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  righterView: {
    backgroundColor: White,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    padding: 8,
    justifyContent:"space-evenly"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    alignItems: 'center',
  },
});
