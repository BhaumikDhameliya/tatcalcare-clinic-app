import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { Rtext } from '../../../../components/Rtext';
import { normalizeSize } from '../../../../utility';
import { useNavigation } from '@react-navigation/native';
import Opd from '../../../../assets/icons/Opd.svg'
import LabTest from '../../../../assets/icons/LabTest.svg'
import Hospital from '../../../../assets/icons/Hospital.svg'
import Pharmacy from '../../../../assets/icons/Pharmacy.svg'
import { BoldColor, White } from '../../../../config/Colors';
import { useDispatch } from 'react-redux';
import { setPageOffSetValue } from '../../../../store/common';

const Facility = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const navigationFunc = (item) => {
    navigation.navigate(item.navigate, { pageName: item?.name })
    dispatch(setPageOffSetValue("Appointment"))
  }
  let facilities_arr = [
    {
      name: 'Clinic',
      navigate: 'Appointment',
      icon: <Opd width={normalizeSize(97)} height={normalizeSize(26)}/>,
    },
    {
      name: 'Diagnostic',
      navigate: 'Diagnostic',
      icon: <LabTest width={normalizeSize(97)} height={normalizeSize(26)}/>
    },
    {
      name: 'Hospital',
      navigate: 'Diagnostic',
      icon: <Hospital width={normalizeSize(97)} height={normalizeSize(26)}/>
    },
    {
      name: 'Pharmacy',
      navigate: '',
      icon: <Pharmacy width={normalizeSize(97)} height={normalizeSize(26)}/>
    },
  ];

  return (
    <View style={{ flexDirection: 'row' }}>
      {facilities_arr.map((item, inx) => (
        <View style={facilitiesStyle.outerview} key={inx}>
          <TouchableOpacity style={[facilitiesStyle.boxStyle]} onPress={() => navigationFunc(item)}>
            {item.icon}
          </TouchableOpacity>
          <Rtext fontSize={10.5} style={facilitiesStyle.nameStyle} >
            {item.name}
          </Rtext>
        </View>
      ))}
    </View>
  );
};
export default Facility;

const facilitiesStyle = StyleSheet.create({
  outerview: {
    paddingHorizontal: 13,
    flex: 0.25
  },
  boxStyle: {
    height: normalizeSize(50),
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: White,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nameStyle: {
    color: BoldColor,
    textAlign: 'center',
    paddingTop: 7,
  },
});
