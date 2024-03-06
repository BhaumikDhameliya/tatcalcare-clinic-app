import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Rtext} from '../../../../../components/Rtext';
import Entypo from 'react-native-vector-icons/Entypo';
import LineSeparator from '../../../../../components/LineSeparator';
import {RadioButton} from 'react-native-paper';
import {Apptheme} from '../../../../../config/Colors';
import moment from 'moment-timezone';
import Abutton from '../../../../../components/Abutton';
import {request} from '../../../../../services';
import {showFlashMessage} from '../../../../../utility';
import { TouchableOpacity } from 'react-native';
const SlotAddForm = ({la_availabilty, bottomSheet, getAvailabiltyAndSlots,ls_errorMessage="",setErrorMessage=()=>{}}) => {
  const [selectedValue, setSelectedValue] = useState('');
  console.log("ls_errorMessage",ls_errorMessage);
  const [btnloader, setbtnLoader] = useState(false);
  const handleRadioButtonChange = value => {
    setSelectedValue(value);
    setErrorMessage("")
  };
  const la_time = [
    {time: 'From 04.18PM - To 05.18PM', value: 1},
    {time: 'From 06.18PM - To 08.18PM', value: 2},
  ];
  const clickOnSubmit = async () => {


    setbtnLoader(true);
    try {
      let response = await request(
        'put',
        `doctor-booking-slots/add-slot/${selectedValue}`,
      );
      console.log('response', response);
      if (response) {
        setbtnLoader(false);
        bottomSheet.current.close();
        getAvailabiltyAndSlots();
        showFlashMessage('Successfully created the slot');
      }
    } catch ({response}) {
      setErrorMessage(`* ${response?.data?.error}`);
      // showFlashMessage(response?.data?.error,"","danger")
    }
    setbtnLoader(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.77}}>
        <View style={{paddingHorizontal: 20}}>
          <View style={slotAddFormStyle.headerView}>
            <Rtext
              style={{color: Apptheme}}
              fontSize={14.5}
              fontFamily="Ubuntu-Medium">
              Select Availability :
            </Rtext>
            <Entypo
              size={22}
              color="#FF617B"
              name="circle-with-cross"
              onPress={() => bottomSheet.current.close()}
            />
          </View>
        </View>
        <LineSeparator style={{height: 2}} />
        <View style={{paddingHorizontal: 20}}>
          {la_availabilty.map((item,inx) => (
            <TouchableOpacity
              onPress={()=>handleRadioButtonChange(item?._id)}
              style={slotAddFormStyle.directionStyle} key={inx}>
              <View style={{flexDirection: 'row'}}>
                <Rtext>{`From ${moment(item.form_date).format(
                  'hh:mm A',
                )} - `}</Rtext>
                <Rtext>{`To ${moment(item.to_date).format('hh:mm A')}`}</Rtext>
              </View>
              <RadioButton.Group
                onValueChange={(value) => handleRadioButtonChange(value)} 
                value={selectedValue}>
                <RadioButton value={item._id} color={Apptheme} />
              </RadioButton.Group>
            </TouchableOpacity>
          ))}
           {ls_errorMessage && <View style={{}}>
          <Rtext style={{ color: "red" }} fontSize={12} fontFamily={"ubuntu-Medium"}>{ls_errorMessage}</Rtext>
        </View>}
        </View>
      </View>
      <View style={{flex: 0.23, paddingHorizontal: 20}}>
        <Abutton
          style={{backgroundColor: Apptheme}}
          name={'Add Slot'}
          fontFamily="Ubuntu-Medium"
          loader={btnloader}
          size={15}
          onPress={() => clickOnSubmit()}
          disble={selectedValue? false :true}
        />
      </View>
    </View>
  );
};
export default SlotAddForm;

const slotAddFormStyle = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingTop: 8,
  },
  radioButton: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  directionStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  }
});
