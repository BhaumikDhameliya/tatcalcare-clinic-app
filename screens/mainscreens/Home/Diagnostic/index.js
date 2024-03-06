import { FlatList, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../components/HeaderCommon';
import SelectDropDown from '../../../../components/SelectDropDown';
import Styles from '../../../../Styles';
import ScheduleView from '../../Doctors/SlotBooking/ScheduleView';
import { SCREEN_HEIGHT, normalizeSize } from '../../../../utility';
import { Apptheme, White } from '../../../../config/Colors';
import ClinicListCard from './ClinicListCard';
import { useState } from 'react';
import moment from 'moment';

const Diagnostic = ({route}) => {
  let pageName=route?.params?.pageName;
  console.log("pageName45",pageName);
  const [la_bookingSlots, setBookingSlots] = useState([])
  const [ls_selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [ls_selectedMonth, setSelectedMonth] = useState(moment(new Date()).format('YYYY-MM'))
  const sel_date = (date) => {
    setSelectedDate(date)
  }
  const sel_month = (month) => {
    setSelectedMonth(moment(month).format('YYYY-MM'))
  }

  const options = [
    {
      name: 'Centre 1',
      bookingNumber: '06',
    },
    {
      name: 'Centre 2',
      bookingNumber: '11',
    },
    {
      name: 'Centre 3',
      bookingNumber: '02',
    },
    {
      name: 'Centre 4',
      bookingNumber: '04',
    },
    {
      name: 'Centre 5',
      bookingNumber: '09',
    },
    {
      name: 'Centre 6',
      bookingNumber: '06',
    },
  ];

  const { control } = useForm();

  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={pageName}
          style={{ top: 20 }}
          navigateBackto={'Home'}
        />
      </View>
      <View style={[Styles.mainBodyStyle, { marginTop: 70 }]}>
        <View style={{ top: -25, shadowColor: '#828282', elevation: 10 }}>
          <SelectDropDown
            dropdownButtonStyle={styles.dropdownButtonStyle}
            control={control}
            // dropDownList={la_doctorList}
            label="All Center"
            name={'alldoctor'}
            labelKey={'value'}
            valueKey={'_id'}
            color={Apptheme}
            fontFamily="Ubuntu-Medium"
          // setStateChanging={onSubmitDoctorId}
          />
          <ScheduleView
            Appointment={true}
            sel_date={sel_date}
            sel_month={sel_month}
            bookingSlots={la_bookingSlots}
          />
          <View style={styles.AppointlistViewStyle}>
            <View style={{ paddingVertical: 10 }}>
              <FlatList
                data={options}
                // showsVerticalScrollIndicator
                // nestedScrollEnabled
                // showsVerticalScrollIndicator={false}
                //   ListEmptyComponent={<NoDataFound style={{height: '100%'}} />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return <ClinicListCard item={item} index={index} pageName={pageName}/>;
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradientComponent>
  );
};

export default Diagnostic;

const styles = StyleSheet.create({
  AppointlistViewStyle: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    borderRadius: 15,
    top: 10,
    height: SCREEN_HEIGHT - normalizeSize(310),
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
});
