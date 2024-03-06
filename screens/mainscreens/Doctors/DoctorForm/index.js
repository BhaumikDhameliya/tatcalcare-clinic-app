import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Rtext } from '../../../../components/Rtext';
import HeaderCommon from '../../../../components/HeaderCommon';
import { Apptheme, Grey, White } from '../../../../config/Colors';
import Ainput from '../../../../components/Ainput';
import { useForm } from 'react-hook-form';
import Abutton from '../../../../components/Abutton';
import DoctorFormAvatar from './DoctorFormAvatar';
import Styles from '../../../../Styles';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import SelectDropDown from '../../../../components/SelectDropDown';
import {
  normalizeSize,
  showFlashMessage,
  showYupFormValidationError,
} from '../../../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MultiSelectBox from '../../../../components/MultiSelectBox';
import { request } from '../../../../services';
import { useNavigation } from '@react-navigation/native';
import CustomRadioButton from './CustomRadioButton';
import Rloader from '../../../../components/Rloader';
import { Dialog, Portal, Button } from 'react-native-paper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertPopUp from '../../../../components/AlertPopUp';

const DoctorForm = ({ route }) => {
  const {
    getDoctorList = () => { },
    data,
    bottomSheet,
    editStatus,
  } = route.params;
  const [ls_tempImagepath, setTempImagepath] = useState('');
  const [la_language, setLanguage] = useState([]);
  const [lb_buttonLoader, setButtonLoader] = useState(false);
  const [la_departmentListId, setDepartmentListId] = useState([]);
  const [la_SymptompListId, setSymptomListId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [doctorId, setDoctorId] = useState();
  const [doctorData, setDoctorData] = useState({});
  const [loaderForImg, setLoaderForImg] = useState(false);

  const navigation = useNavigation();
  // console.log("la_departmentListId la_language ", la_departmentListId,la_language);

  
  const doctorFormSchema = yup
    .object({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email Id is required'),
      mobile: yup.string().required('Phone number is required'),
      qualifications: yup.string().required("Qualifications is required"),
      experience_years: yup.string().required("Experience years is required"),
      gender: yup.string().required("Gender is required"),
      // address:yup.string().required("Address is required"), 
      //   .string(),
      //   .min(1)
      //   .max(80)
      //   .required('Oops! Please enter a valid number of years for experience.'),
      // experience_years: yup
      // .number()
      // .typeError('Please enter a valid years of experience')
      // .required('experience years is required')
      // .integer('experience years must be an integer')
      // .min(1, 'experience years must be greater than or equal to 1')
      // .max(80, 'experience years must be less than or equal to 99'),
      fees: yup.string().required('Fees is required')
    })


    .required();
  console.log("isValid", isValid);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(doctorFormSchema), });
  console.log("isValid", isValid);

  useEffect(() => {
    showYupFormValidationError(errors);
  }, [errors]);
  console.log("formState.isValid", errors);
  const getImagePath = temp => {
    setTempImagepath(temp);
    if (bottomSheet != '') {
      bottomSheet.current.close();
    }
  };
  useEffect(() => {
    reset(data.data);
    // console.log("data.data.....", data);
    {
      data?.phone && setValue('mobile', data?.phone.toString());
    }
    let map_details=data?.data?.doctor_clinic_map_details
    // console.log("map_details", map_details);
    // map_details && map_details[0] && typeof(map_details[0]?.is_flexible_slot_system) !== undefined &&

    // console.log("is_flexible_slot_system..", data?.data?.doctor_clinic_map_details[0]);
    setValue('experience_years', data?.data?.experience_years.toString());
    if (!editStatus) {
      setValue(
        'is_flexible_slot_system',
        false,
      );
    }
    if (editStatus) {
      setValue(
        'is_flexible_slot_system',
        map_details[0]?.is_flexible_slot_system,
      );
      setValue('fees', data?.data.doctor_clinic_map_details[0].fees.toString());
    }
  }, []);
  const onSubmit = async value => {
    setButtonLoader(true);
    let tempFormValue = {
      ...value,
      profile_image: ls_tempImagepath,
      status: 'A',
      languages: la_language,
      departments: la_departmentListId,
      additional_symptoms: la_SymptompListId
    };
    if (editStatus) {
      try {
        let response = await request(
          'put',
          `doctors/update-doctor-by-clinic/${data?.data?._id}`,
          {
            fees: parseFloat(value?.fees),
            is_flexible_slot_system: value?.is_flexible_slot_system,
          },
        );
        showFlashMessage(response.data.message, '', 'success');
        setButtonLoader(false);
        navigation.goBack();
      } catch (e) {
        console.log('e', e);
      }
    } else {
      try {
        let response = await request('post', 'doctors', tempFormValue);
        if (response) {
          setDoctorData({
            name: response.data.data.name,
            profile_image: response.data.data.profile_image,
          });
          setDoctorId(response.data.data._id);
          showFlashMessage(response.data.message, '', 'success');
          setTimeout(function () {
            setVisible(true);
          }, 2000);
        }
      } catch (e) {
        console.log('error', e?.response?.data?.error);
        showFlashMessage(e?.response?.data?.error, '', 'danger');
      }
    }

    setButtonLoader(false);
  };

  //selected language list
  const selectedListdata = la_list => {
    let tempLanguageListId = [];
    la_list.map(i => tempLanguageListId.push(i._id));
    setLanguage(tempLanguageListId);
  };
  //selected department list
  const selectedDepartmentListdata = la_list => {
    let tempdepartmentId = [];
    la_list.map(i => tempdepartmentId.push(i._id));
    setDepartmentListId(tempdepartmentId);
  };
  //selected symptom list
  const selectedSymptomListdata = la_list => {
    // console.log('la_list...', la_list);
    let tempsymptomId = [];
    la_list.map(i => tempsymptomId.push(i._id));
    setSymptomListId(tempsymptomId);
  }

  const hideDialog = () => {
    getDoctorList();
    navigation.goBack();
    setVisible(false);
  };
  const navigate_Func = () => {
    setVisible(false);
    navigation.navigate('SlotBookingSubForm', {
      doctorData: doctorData,
      doctorId: doctorId,
      getDoctorList,
      edit: false,
    });
  };

  const backDoctorListPage_Func = () => {
    navigation.goBack();
  }

  const commonInputField = (
    placeholder,
    name,
    style,
    label,
    keyboardType,
    multiline = false,
    numberOfLines,
  ) => {
    let edittable;
    if (data?.phone) {
      edittable = data?.phone && name == 'mobile' ? false : true;
    } else {
      edittable = data?.data == undefined || name != 'fees' ? false : true;
    }
    return (
      <Ainput
        label={label}
        placeholder={placeholder}
        name={name}
        control={control}
        style={[style, { backgroundColor: White }]}
        color={Grey}
        fontSize={14.5}
        multiline={multiline}
        activeOutlineColor={Apptheme}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        editable={edittable}
        textColor={!edittable && Grey}
      />
    );
  };

  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={editStatus ? 'Update Doctor' : 'Add Doctor'}
          navigateBackto={'Doctors'}
          style={{ top: 20 }}
        />
      </View>
      <View
        style={[
          Styles.mainBodyStyle,
          {
            paddingHorizontal: 0,
            height: '90%',
            flex: 1,
            backgroundColor: '#fafafa',
          },
        ]}>
        <DoctorFormAvatar
          imagePath={getImagePath}
          profile_image={data?.data?.profile_image}
          updateStatus={data?.selectedId ? false : true}
          editStatus={editStatus}
          // loaderForImg={loaderForImg}
          // setLoaderForImg={setLoaderForImg}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 24 }}>
            {commonInputField(
              'Name *',
              'name',
              [DoctorFormStyle.ainputStyle],
              'Name *',
            )}
            {commonInputField(
              'Email Id *',
              'email',
              DoctorFormStyle.ainputStyle,
              'Email Id *',
            )}
            {commonInputField(
              'Mobile No *',
              'mobile',
              DoctorFormStyle.ainputStyle,
              'Mobile No *',
              'numeric',
            )}
            <CustomRadioButton
              name="gender"
              control={control}
              disabled={data?.data == undefined ? false : true}
              radioList={[
                { title: 'Male', value: 'male' },
                { title: 'Female', value: 'female' },
                { title: 'Others', value: 'others' },
              ]}
              title={'Select Gender *'}
            />
            <MultiSelectBox
              la_subjectList={data?.departmentList}
              label={'Select Department *'}
              defaultValue="Select Department"
              selectedId={data?.selectedId}
              selectedValue={data?.selectedList}
              disabled={data?.data == undefined ? false : true}
              selectedData={list => selectedDepartmentListdata(list)}
            />
            {commonInputField(
              'Education *',
              'qualifications',
              DoctorFormStyle.ainputStyle,
              'Education *',
            )}
            <View style={DoctorFormStyle.commonrowStyle}>
              <View style={{ width: '60%' }}>
                {commonInputField(
                  'Experience (Yrs) *',
                  'experience_years',
                  DoctorFormStyle.ainputStyle,
                  'Experience (Yrs) *',
                  'numeric',
                )}
              </View>
              <View style={{ width: '36%' }}>
                {commonInputField(
                  'Fees *',
                  'fees',
                  DoctorFormStyle.ainputStyle,
                  'Fees *',
                  'numeric',
                )}
              </View>
            </View>

            <MultiSelectBox
              la_subjectList={data?.symptomList}
              label={'Additional Specialisations *'}
              defaultValue="Select Symptom"
              selectedId={data?.selectedSymptomId}
              selectedValue={data?.selectedSymptomList}
              disabled={data?.data == undefined ? false : true}
              selectedData={list => selectedSymptomListdata(list)}
            />
            <MultiSelectBox
              la_subjectList={data?.languageList}
              label={'Select Language *'}
              defaultValue="Select Language"
              selectedId={data?.selectedLanguageId}
              selectedValue={data?.selectedLanguageList}
              selectedData={list => selectedListdata(list)}
              disabled={data?.data == undefined ? false : true}
            />
            <CustomRadioButton
              name="is_flexible_slot_system"
              control={control}
              // disabled={data?.data == undefined ? false : true}
              radioList={[
                { title: 'Yes', value: true },
                { title: 'No', value: false },
              ]}
              title={'Is Flexible'}
            />
            {/* {commonInputField('Advance Fees', 'fees', [DoctorFormStyle.ainputStyle], 'Advance Fees')} */}
            {commonInputField(
              'Address',
              'address',
              [DoctorFormStyle.ainputStyle, { height: normalizeSize(100) }],
              'Address',
              'default',
              true,
              3,
            )}
          </View>
        </ScrollView>
        {/* /&& la_departmentListId?.length==0 && la_language?.length==0 */}
        <View style={{ paddingHorizontal: 24, bottom: 7 }}>
          <Abutton
            style={{ backgroundColor: Apptheme }}
            name={editStatus ? 'Update' : 'Submit'}
            size={14}
            loader={lb_buttonLoader}
            disble={!isValid || la_departmentListId?.length == 0 || la_language?.length == 0 || la_SymptompListId?.length == 0}
            onPress={handleSubmit(onSubmit)}
          />
        </View>


      </View>

      <AlertPopUp cancelColor={'#c2786b'} doneColor={Apptheme} title={"Do you want to add Availability?"} dialogStatus={visible} deleteFunc={navigate_Func} backDoctorListPage_Func={backDoctorListPage_Func} setDialogStatus={setVisible} style={{borderRadius: 10}}/>
   
    </LinearGradientComponent>
  );
};
export default DoctorForm;

const SlotCard = ({ setIsOpen }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Fontisto name="calendar" size={normalizeSize(14)} color={Grey} />
        <Rtext fontFamily="Ubuntu-Medium" fontSize={14.5}>
          {' '}
          Monday{' '}
        </Rtext>
        <Rtext fontSize={11.5} style={{ color: Grey }}>
          {' '}
          {`|   12:00 PM - 02:00 PM    |`}{' '}
        </Rtext>
        <Rtext fontSize={11.5} style={{ color: Apptheme }}>
          {' '}
          25 Patient
        </Rtext>
      </View>
      <TouchableOpacity
        style={DoctorFormStyle.crossview}
        onPress={() => setIsOpen(false)}>
        <Entypo name={'cross'} color={'white'} size={normalizeSize(14)} />
      </TouchableOpacity>
    </View>
  );
};

const DoctorFormStyle = StyleSheet.create({
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
  commonrowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    width: '29%',
    backgroundColor: Apptheme,
    bottom: 2,
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
  timeboxOuterView: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: White,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  selectdayouterview: {
    borderRadius: 14,
    backgroundColor: White,
    elevation: 5,
    marginVertical: 13,
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
  crossview: {
    backgroundColor: '#F4A0AE',
    borderRadius: 25,
    padding: 2,
  },
});
