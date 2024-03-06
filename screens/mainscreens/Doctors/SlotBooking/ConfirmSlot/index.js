import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../../components/HeaderCommon';
import SlotBookingHeader from '../SlotBookingHeader';
import Styles from '../../../../../Styles';
import { Apptheme, Grey, White } from '../../../../../config/Colors';
import { useForm } from 'react-hook-form';
import Ainput from '../../../../../components/Ainput';
import Abutton from '../../../../../components/Abutton';
import {
  normalizeSize,
  showFlashMessage,
  showYupFormValidationError,
} from '../../../../../utility';
import SelectDropDown from '../../../../../components/SelectDropDown';
import { request } from '../../../../../services';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native';
import CustomRadioButton from '../../DoctorForm/CustomRadioButton';
import { debounce } from 'lodash';
import { Rtext } from '../../../../../components/Rtext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ConfirmSlot = ({ route }) => {
  const [loader, setLoader] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [la_validationMessage, setValidationMessage] = useState(false);

  const patientFormSchema = yup
    .object({
      symptom_id: yup.string().required('Symptom is required'),
      name:yup.string().required('Name is required'),
      mobile: yup
      .string()
      .required('Phone number is required')
      .min(10)
      .max(10),
      age: yup
        .number()
        .typeError('Please enter a valid age')
        .required('Age is required')
        .integer('Age must be an integer')
        .min(1, 'Age must be greater than or equal to 1')
        .max(99, 'Age must be less than or equal to 99'),
        gender: yup.string().required('Gender is required'),
        // description:yup.string().required('Description is required')
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(patientFormSchema) });

  const navigation = useNavigation();

  let la_data = [
    { _id: 'male', value: 'Male' },
    { _id: 'female', value: 'Female' },
    { _id: 'others', value: 'Others' },
  ];

  useEffect(() => {
    showYupFormValidationError(errors);
  }, [errors]);

  useEffect(() => {
    getSymptomsList();
  }, []);

  const getSymptomsList = async () => {
    let la_symptoms = [];
    try {
      let res = await request('get', 'symptoms?sort_by=name&sort_type=ascend');
      res?.data?.data.map(item =>
        la_symptoms.push({ title: item?.name, value: item?._id }),
      );
      setSymptoms(la_symptoms);
    } catch ({ response }) {
      console.log('e', response?.data);
      // showFlashMessage(response?.data?.error, '', 'danger');
    }
  };

  const onSubmit = async data => {
    // console.log("calllllllllllllllllllllllllll");
    if (!la_validationMessage && data?.mobile != "") {
      setLoader(true);
      let pateintDetailsData = { ...data, age: parseInt(data?.age) };
      let patient_form = {
        patient: pateintDetailsData,
        doctor_booking_slot_id: route?.params?.slotId,
        symptom_id: data?.symptom_id,
      };
      try {
        let res = await request('post', 'appointments', patient_form);
        if (res) {
          // console.log('res?.data?.data....', res?.data?.message);
          // showFlashMessage('Patient created successfully!');
          showFlashMessage(res?.data?.message);
          route?.params?.getAvailabiltyAndSlots();
          route?.params?.setSlotId('');
          navigation.goBack();
          setLoader(false);
        }
      } catch ({ response }) {
        console.log('e', response?.data?.error);
        showFlashMessage(response?.data?.error, '', 'danger');
      }
      setLoader(false);
    } else {
      showFlashMessage('Please enter valid phone number', "", "danger")
    }
  };

  const handleValidationOnPhnNum = e => {
    // const phoneNumberRegex = /^[5-9]\d{0,9}$/;
    const phoneNumberRegex=/^[5-9]\d{9}$/
    e.length == 0
      ? setValidationMessage(false)
      : phoneNumberRegex.test(e)
        ? setValidationMessage(false)
        : setValidationMessage(true);
  };

  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={'Patient Details'}
          style={{ top: 15 }}
          navigateBackto={'SlotBooking'}
        />
      </View>
      <SlotBookingHeader
        doctorbookingDetails={route?.params?.lo_doctorDetails}
        lb_loader={route?.params?.lb_headerLoader}
      />
    
      <ScrollView
          style={[
            Styles.mainBodyStyle,
            { marginTop: 20,  paddingHorizontal: 0},
          ]}>
          <View style={{ paddingHorizontal: 24, flex: 1 }}>
            <View style={{ height: "88%"}}>
              <View style={{ marginTop: 15 }}>
                <SelectDropDown
                  dropdownButtonStyle={styles.dropdownButtonStyle}
                  control={control}
                  dropDownList={symptoms}
                  label="Select Symptoms"
                  name={'symptom_id'}
                  search={true}
                  color={Grey}
                  labelKey="title"
                  valueKey="value"
                />
                <Ainput
                  placeholder="Patient Name *"
                  name="name"
                  roundness={12}
                  control={control}
                  style={styles.inputStyle}
                  fontSize={14.5}
                  color={Grey}
                  label={'Patient Name *'}
                  activeOutlineColor={Apptheme}
                />
              </View>
              <Ainput
                placeholder="Patient Mobile No. *"
                name="mobile"
                roundness={12}
                control={control}
                style={styles.inputStyle}
                fontSize={14.5}
                color={Grey}
                keyboardType="numeric"
                maxLength={10}
                label={'Mobile No *'}
                activeOutlineColor={Apptheme}
                fieldValue={e => handleValidationOnPhnNum(e)}
              // onChange={e => console.log(e)}
              // debounce(handleSubmit(handleValidationOnPhnNum), 500)
              />
              {la_validationMessage && (
                <View style={{marginBottom:3}}>
                  <Rtext fontSize={13} style={{color: '#FF617B'}}>
                    * Please enter valid phone number
                  </Rtext>
                </View>
              )}
              <Ainput
                placeholder="Patient Age *"
                name="age"
                roundness={12}
                control={control}
                style={styles.inputStyle}
                fontSize={14.5}
                color={Grey}
                keyboardType="numeric"
                maxLength={3}
                label={'Patient Age *'}
                activeOutlineColor={Apptheme}
              />
              {/* {errors?.age && (
                <Rtext
                  fontFamily="Ubuntu"
                  style={styles.errorMsgStyle}
                  fontSize={12}>
                  {errors?.age?.message}
                </Rtext>
              )} */}
              <View style={{ paddingBottom: 5 }}>
                <CustomRadioButton
                  name="gender"
                  control={control}
                  radioList={[
                    { title: 'Male', value: 'male' },
                    { title: 'Female', value: 'female' },
                    { title: 'Others', value: 'others' },
                  ]}
                  title={'Select Gender'}
                />
              </View>

              <Ainput
                placeholder="Patient Description"
                name="description"
                roundness={12}
                control={control}
                multiline={true}
                numberOfLines={3}
                style={[styles.inputStyle, { height: normalizeSize(100) }]}
                fontSize={14.5}
                color={Grey}
                label={'Patient Description'}
                activeOutlineColor={Apptheme}
              />
            </View>
            <View style={{ height: '12%'}}>
              <Abutton
                style={{ backgroundColor: Apptheme }}
                name={'Proceed'}
                size={16.5}
                onPress={handleSubmit(onSubmit)}
                loader={loader}
              />
            </View>
          </View>
      </ScrollView> 
    </LinearGradientComponent>
  );
};

export default ConfirmSlot;

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: 10,
    shadowColor: '#bdbbbb',
    elevation: 10,
    borderRadius: 12,
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
    marginBottom: 13,
    marginTop: 5,
    shadowColor: '#a3a3a3',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  errorMsgStyle: {
    color: '#FF6863',
    paddingLeft: 4,
    marginTop: -9,
    marginBottom: 9,
  },
});
