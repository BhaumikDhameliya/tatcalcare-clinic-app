import { StyleSheet,View } from 'react-native';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import moment from 'moment-timezone';
import { normalizeSize, showFlashMessage } from '../../utility';
import { Card, TouchableRipple } from 'react-native-paper';
import Amodal from '../Amodal';
import Abutton from '../Abutton';
import CalendarPicker from 'react-native-calendar-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Rtext } from '../Rtext';
import { useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import { Apptheme, BoldColor, Grey, White } from '../../config/Colors';
import AlertPopUp from '../AlertPopUp';

const d = new Date();
d.setDate(1);

const ArangePicker = ({
  name = '',
  inputStyle = {},
  control,
  lview = true,
  editable = true,
  onChange = () => { },
  maxDate,
  fieldValue = new Date(),
  iconsize = 16,
  daterange = 30,
  from_date_for_search = '',
  to_date_for_search = '',
  adddays=false
  // alertPopUpStatus,
  // setAlertPopUpStatus
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  adddays
  const [lo_selectedDate, setSelectedDate] = useState({
    'START_DATE': adddays ? moment().format('YYYY-MM-DD') : moment().subtract(1, 'month').format('YYYY-MM-DD'),
    'END_DATE': adddays ? moment().add(1, 'month').endOf('month').format('YYYY-MM-DD') : new Date(),
  })
  const [errormessage,setErrorMessage]=useState("")
  // const [alertPopUpStatus, setAlertPopUpStatus] = useState(false);

  useEffect(() => {
    field.onChange(lo_selectedDate)
  }, [lo_selectedDate.END_DATE])

  const { field } = useController({
    control,
    defaultValue: fieldValue,
    name,
  });

  const onDateClick = () => {
    setModalVisible(true)
  };

  const onClose = () => {
    if(lo_selectedDate.START_DATE && lo_selectedDate.END_DATE){
      // setAlertPopUpStatus(true)
      setModalVisible(false)
      setTimeout(onChange, 500)
      setErrorMessage("")
    }
    else{
      setErrorMessage("* Please Select date range")
      // setAlertPopUpStatus(false)
      // showFlashMessage("Please Select date range","","danger")
    }
  }

  const onDateChange = (date, type) => {
    setSelectedDate(prevState => ({
      ...prevState,
      [type]: date
    }))
    setErrorMessage("")
  }
  const AdateTimePickerStyles = getStyles();

  return (
      <View style={{ opacity: editable ? 1 : 0.5 }}>
            <TouchableRipple onPress={() => onDateClick()}>
                <Card style={[AdateTimePickerStyles.dateViewStyle, inputStyle]}>
                    <View style={AdateTimePickerStyles.textViewStyle}>
                            <Rtext  fontSize={12.5}>
                              {moment(from_date_for_search ? from_date_for_search : lo_selectedDate.START_DATE).format('DD/MM/YYYY')} - {moment(to_date_for_search ? to_date_for_search : lo_selectedDate.END_DATE).format('DD/MM/YYYY')}
                            </Rtext>
                            {lview && <Fontisto
                              name="calendar"
                              size={normalizeSize(iconsize)}
                              color={Grey}
                            />}
                    </View>
                </Card>
            </TouchableRipple>
        {editable && modalVisible && (
            <GestureRecognizer
              style={{ flex: 1 }}
              config={{ gestureIsClickThreshold: 20 }}
              onSwipeDown={() => setModalVisible(false)}>
                  <Amodal
                    modalVisible={modalVisible}
                    close={false}
                    style={{ backgroundColor: White }}>
                            <Header Styles={AdateTimePickerStyles} />
                        <View style={{ alignSelf: 'center', padding: 15 }}>
                              <CalendarPicker
                                textStyle={{ color: BoldColor }}
                                initialDate={lo_selectedDate.START_DATE}
                                width={340}
                                onDateChange={onDateChange}
                                startFromMonday={true}
                                allowRangeSelection={true}
                                // maxDate={maxDate}
                                allowBackwardRangeSelect={true}
                                selectedStartDate={lo_selectedDate.START_DATE}
                                selectedEndDate={lo_selectedDate.END_DATE}
                                disabledDatesTextStyle={{ opacity: 0.5 }}
                                selectedRangeStyle={{ backgroundColor: Apptheme }}
                              />
                        </View>
                      {errormessage && <Rtext fontSize={13} style={{color:"red"}}>{errormessage}</Rtext>}
                    <Abutton onPress={onClose} name="Submit" size={13} style={{ width: '40%', height: 40, marginBottom: 15 }} />

                  </Amodal>
            </GestureRecognizer>
        )}
        {/* <AlertPopUp title={'Do you want to disable this doctor?'} dialogStatus={alertPopUpStatus} deleteFunc={() => setTimeout(onChange, 500)} setDialogStatus={setAlertPopUpStatus} style={{borderRadius: 10}}/> */}
      </View>
  );
};

const Header = ({ Styles }) => {
  return (
        <View style={Styles.header}>
            <Rtext fontSize={15}>
                {'Drag Down to Close'}
            </Rtext>
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
              source={require('../../assets/animation/swipeDown.json')}
              autoPlay
            />
        </View>
  )
}

export default ArangePicker;

const getStyles = () =>
  StyleSheet.create({
    dateViewStyle: {
      backgroundColor: White,
      padding: 13,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 20,
      alignItems: 'center',
    },
    textViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between'
    }
  });
