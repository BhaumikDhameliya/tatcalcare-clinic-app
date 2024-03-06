import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Rtext} from '../../../../components/Rtext';
import {Apptheme, White} from '../../../../config/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import CustomRangePicker from '../../../../components/CustomRangePicker';

const HeaderTabComponent = ({
  tabdetails,
  width,
  color = Apptheme,
  currentIndexForDays,
  setCurrentIndexForDays,
  index,
  setDayLimit,
  setCurrentPage,
  lb_noMoreFetachData,
  // setAppointmentData,
  setData,
  setDateRange,
  selectdate,
  today=false
}) => {
  const [lb_modalVisible, setModalVisible] = useState(false);
  const [prevTabSelection, setPrevTabSelection] = useState(currentIndexForDays);
  const [lo_onChangeDate, setOnChangeDate] = useState({
    START_DATE: new Date(),
    END_DATE: new Date(),
  });
  const [errormessage, setErrorMessage] = useState('');

  const handleOnPress = (index, tab) => {
    if (index == 3) {
      setModalVisible(true);
      setPrevTabSelection(currentIndexForDays);
      // setOnChangeDate({START_DATE:new Date(),END_DATE:new Date()});
    } else {
      const currentDate = new Date();
      // Update lo_onChangeDate directly with new START_DATE and END_DATE
      setOnChangeDate({
        ...lo_onChangeDate,
        START_DATE: currentDate,
        END_DATE: currentDate,
      });
  
      setDateRange({
        form_date: '',
        to_date: '',
        START_DATE: currentDate,
        END_DATE: currentDate,
      });
  
      setDayLimit(tab?.tabname);
      setCurrentPage(1);
      setData(0);
      setTimeout(() => {
        lb_noMoreFetachData = false;
        setCurrentPage(1);
      }, 100);
    }
  
    setCurrentIndexForDays(index);
  };

  const onRangeSelect = selectDate => {
    if (selectDate?.START_DATE && selectDate?.END_DATE) {
      setDateRange({
        form_date: moment(selectDate?.START_DATE).format('YYYY-MM-DD'),
        to_date: moment(selectDate?.END_DATE).format('YYYY-MM-DD'),
        START_DATE:selectDate?.START_DATE,
        END_DATE:selectDate?.END_DATE
      });
      // setOnChangeDate({START_DATE:selectDate?.START_DATE,END_DATE:selectDate?.END_DATE});
      setDayLimit('');
      setModalVisible(false);
      setCurrentPage(1);
      setData(0);
      setPrevTabSelection(3);
    }
    else{
      setErrorMessage("* Please Select date range")
    }
  };

  return (
    <View style={{width: width, paddingHorizontal: 4}}>
      <TouchableOpacity
        style={[
          styles.mainViewStyle,
          // {backgroundColor: tabdetails.selected ? Apptheme : White},
          {
            backgroundColor: index == currentIndexForDays ? Apptheme : White,
          },
        ]}
        // onPress={() => setCurrentIndexForDays(index)}
        onPress={() => handleOnPress(index, tabdetails)}>
        <Rtext
          fontFamily="Ubuntu-Medium"
          style={[
            {
              textAlign: 'center',
              // color: tabdetails?.selected ? White : color,
              color: index == currentIndexForDays ? White : color,
            },
          ]}
          fontSize={11}>
          {tabdetails.tabname != -1
            ? today && index==0 ? "Today": `Last ${tabdetails.tabname} Days`
            : selectdate?.form_date && selectdate?.to_date
            ? `${moment(selectdate?.START_DATE).format(
                'Do MMM YY',
              )}     ${moment(selectdate?.END_DATE).format(
                'Do MMM YY',
              )}`
            : 'Custom'}
        </Rtext>
      </TouchableOpacity>

      <CustomRangePicker
        nameType={true}
        calandermodalstatus={lb_modalVisible}
        onClose={() => {
          setModalVisible(false);
          setCurrentIndexForDays(prevTabSelection);
        }}
        onRangeSelect={onRangeSelect}
        lo_onChangeDate={lo_onChangeDate}
        setOnChangeDate={setOnChangeDate}
        // onRangeSelect={() => onRangeSelect(index)}
        selectdate={selectdate}
        setErrorMessage={setErrorMessage}
        errormessage={errormessage}
        // inputStyle={DisabledClinicStyles.rangePickerStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderRadius: 12,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
});
export default HeaderTabComponent;
