import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {SCREEN_WIDTH, normalizeSize} from '../../../../../utility';
import {Rtext} from '../../../../../components/Rtext';
import {Apptheme} from '../../../../../config/Colors';
import RpopupMenu from '../../../../../components/RpopupMenu';
import LabTest from '../../../../../assets/icons/LabTest.svg';
import Hospital from '../../../../../assets/icons/Hospital.svg';
import { useNavigation } from '@react-navigation/native';

const BookingBodyRightDetails = ({time, status, patient_name}) => {
  const [Status, setStatus] = useState(false);
  const navigation=useNavigation()
  const options = [
    {
      lable: 'Hospital',
      value: 'Hospital',
      icon: (
        <Hospital
          width={normalizeSize(15)}
          height={normalizeSize(15)}
          style={{right: 10}}
        />
      ),
    },
    {
      lable: 'Diagnosis',
      value: 'Diagnosis',
      icon: (
        <LabTest
          width={normalizeSize(15)}
          height={normalizeSize(15)}
          style={{right: 5}}
        />
      ),
    },
  ]


  const handleOnSelectOption =(value,inx)=>{
     navigation.navigate("PrescriptionDetails",{index:inx})
     setStatus(false)

  }

  return (
    <View style={BookingBodyRightDetailsStyle.outerview}>
      <View style={BookingBodyRightDetailsStyle.doctornameStyle}>
        <Rtext fontSize={14.5}>{patient_name}</Rtext>
      </View>
      <View style={BookingBodyRightDetailsStyle.outerviewofright}>
        <View style={BookingBodyRightDetailsStyle.timingStyle}>
          <Rtext
            fontSize={11.5}
            style={{textAlign: 'center', color: '#A99895'}}>
            {time}
          </Rtext>
        </View>
        {status == 'PENDING' ? (
          <View style={{width: 73, backgroundColor: 'red'}}></View>
        ) : (
          <View
            style={[
              {
                backgroundColor:
                  status == 'CANCELLED' || status == 'ARCHIVED'
                    ? '#FFD8DB'
                    : status == 'PENDING'
                    ? '#EEF2F5'
                    : '#E5F9FA',
              },
              BookingBodyRightDetailsStyle.statusStyle,
            ]}>
            <Rtext
              style={{
                color:
                  status == 'CANCELLED' || status == 'ARCHIVED'
                    ? '#DB4437'
                    : status == 'DELAY'
                    ? '#747474'
                    : Apptheme,
              }}
              fontSize={9.5}>
              {status == 'COMPLETED'
                ? 'Complete'
                : status == 'CANCELLED' || status == 'ARCHIVED'
                ? 'Cancel'
                : 'Delay'}
            </Rtext>
          </View>
        )}

       {status == 'COMPLETED' && (
        <TouchableOpacity
          style={{alignContent: 'flex-end', padding:5}}
          onPress={() => {
            setStatus(true);
          }}>
          <Entypo name={'dots-three-vertical'} size={normalizeSize(14)} color={'grey'} />
        </TouchableOpacity>
       )}
      </View>

      <RpopupMenu
        option={options}
        menuContainerWidth = {120}
        menuContainerHeight={true}
        status={Status}
        // onOpen={() => setPopUpMenuStatus(true)}
        onClose={() => {
          // setPopUpMenuStatus(false);
          setStatus(false);
        }}
        // popUpmenuindex={popUpmenuindex}
        onSelectValue={(value, index) =>
          handleOnSelectOption(value.value, index)
        }
      />
    </View>
  );
};
export default BookingBodyRightDetails;

const BookingBodyRightDetailsStyle = StyleSheet.create({
  outerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  doctornameStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH - 273,
  },
  outerviewofright: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timingStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 60,
  },
  statusStyle: {
    paddingVertical: 3,
    width: 60,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 7,
  },
});
