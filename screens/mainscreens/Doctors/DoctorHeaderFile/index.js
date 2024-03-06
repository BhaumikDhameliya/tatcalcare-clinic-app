import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Rtext } from '../../../../components/Rtext';
import Avatar from '../../../../assets/icons/Avatar.svg';
import { normalizeSize, showFlashMessage } from '../../../../utility';
import { Apptheme, White } from '../../../../config/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import PlusIcon from '../../../../assets/icons/PlusIcon.svg';
import Ainput from '../../../../components/Ainput';
import { useForm } from 'react-hook-form';
import LineSeparator from '../../../../components/LineSeparator';
import Entypo from 'react-native-vector-icons/Entypo';
import { request } from '../../../../services';
import { debounce } from 'lodash';
import RBSheet from "react-native-raw-bottom-sheet";

// import BottomSheet from 'react-native-gesture-bottom-sheet';
import Abutton from '../../../../components/Abutton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DoctorHeaderFile = ({
  getDoctorList = () => { },
  // la_languageList,
  // la_departmntslist,
  // la_symptomlist
}) => {
  const bottomSheet = useRef();
  const navigation = useNavigation();
  const { control, handleSubmit, reset } = useForm();
  const [buttonStatus, setButtonStatus] = useState(true)
  const [la_languageList, setLanguageList] = useState([]);
  const [la_departmntslist, setDepartmntslist] = useState([]);
  const [la_symptomlist, setSymptomslist] = useState([]);
  // const [la_languageList, setLanguageList] = useState([]);
  // const [la_departmntslist, setDepartmntslist] = useState([]);
  const [loader, setLoader] = useState(false);
  const [msgvalidation, setMsgValidation] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  useEffect(() => {
    // getDepartmentAndLanguageList();
    getDepartmentAndLanguageAndSymptomList()
    reset();
  }, []);



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

  const onChangeNumber = value => {
    console.log('value.search', value);
    console.log('value.searchLength', value.search.length);
    setFieldValue(value.search);
    // let exp=/^\d{10}$/
    let exp = /^[5-9]\d{9}$/
    if (!exp.test(value?.search)) {
      setButtonStatus(true)
      // setTimeout(() => {
      setMsgValidation('* Please enter valid phone number');
    } else {
      setMsgValidation('');
      setButtonStatus(false)

    }
    if (value.search.length == 0) {
      setMsgValidation('');
      setButtonStatus(true)
    }


    // if (value?.phNumber.length !== 10) {
    //   setTimeout(() => {
    //     setTextValidation(true);
    //   }, 1500);
    // }

    // else {
    //   setTextValidation(false);
    // }
  };

  // const getDepartmentAndLanguageList = async () => {
  //   try {
  //     let tempDepartmentList = [];
  //     let response = await request('get', 'departments');
  //     response.data?.data?.map((item, index) => {
  //       tempDepartmentList.push({
  //         value: item.name,
  //         _id: item._id,
  //       });
  //       setDepartmntslist(tempDepartmentList);
  //     });
  //   } catch (e) {
  //     console.log('e', e?.response?.data?.error);
  //   }

  //   try {
  //     let tempLanguageList = [];
  //     let response = await request('get', 'languages');
  //     response.data?.data?.map((item, index) => {
  //       tempLanguageList.push({
  //         value: item.name,
  //         _id: item._id,
  //       });
  //       setLanguageList(tempLanguageList);
  //     });
  //   } catch (e) {
  //     console.log('e', e?.response?.data?.error);
  //   }
  // };

  const onSearch = async (search = '') => {
    if (search.search.length == 10) {

      setLoader(true);
      try {
        let res = await request('get', `doctors/phone/${search.search}`);
        // console.log("res.....",res.data.data);
        let selectList = la_departmntslist.filter(obj => {
          if (res.data.data?.departments.includes(obj._id)) {
            return obj;
          }
        });
        // console.log("selectList........", selectList);
        let tempselectedDepartmentValue = [];
        selectList.map(i => tempselectedDepartmentValue.push(i.value));

        let selectLanguageList = la_languageList.filter(obj => {
          if (res.data.data?.languages.includes(obj._id)) {
            return obj;
          }
        });

        let tempselectedLanguageValue = [];
        selectLanguageList.map(i => tempselectedLanguageValue.push(i.value));

        let selectSymptomList = la_symptomlist.filter(obj => {
          if (res.data.data?.additional_symptoms.includes(obj._id)) {
            return obj;
          }
        });

        let tempselectedSymptomValue = [];
        selectSymptomList.map(i => tempselectedSymptomValue.push(i.value));


        setLoader(false);
        navigation.navigate('DoctorForm', {
          getDoctorList,
          data: {
            data: res.data.data,
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
          bottomSheet: bottomSheet,
          editStatus: false,
        });
      } catch (e) {
        // console.log('error', e?.response?.data?.error);
        navigation.navigate('DoctorForm', {
          getDoctorList,
          data: {
            departmentList: la_departmntslist,
            languageList: la_languageList,
            symptomList: la_symptomlist,
            phone: search.search,
          },
          bottomSheet: bottomSheet,
          editStatus: false,
        });
        setLoader(false);
      }
      setLoader(false);
    } else {
      setMsgValidation('* Please enter valid phone number');
      // showFlashMessage("Please enter valid phone number","","danger")
    }
  };
  return (
    <View style={DoctorHeaderStyle.outerview}>
      <View style={DoctorHeaderStyle.leftview}>
        <View style={DoctorHeaderStyle.box}>
          <Avatar />
        </View>
        <Rtext
          style={{ color: 'white', paddingLeft: 12 }}
          fontSize={14.5}
          fontFamily="Ubuntu-Medium">
          Doctor List
        </Rtext>
      </View>
      <View style={{ flex: 0.40 }}>
        <TouchableOpacity
          style={DoctorHeaderStyle.righterView}
          onPress={() => {
            bottomSheet.current.open(), reset(), setMsgValidation('');
            setButtonStatus(true);
            getDepartmentAndLanguageAndSymptomList()
            // getDepartmentAndLanguageAndSymptomList()
          }}>
          <PlusIcon height={normalizeSize(14)} width={normalizeSize(14)} />
          <Rtext
            style={{ color: Apptheme }}
            fontFamily="Ubuntu-Medium"
            fontSize={12}>
            Add New Doctor
          </Rtext>
        </TouchableOpacity>




        <RBSheet
          bottomSheet
          ref={bottomSheet}
          height={normalizeSize(210)}
          openDuration={250}
          customStyles={{
            container: {
              borderTopRightRadius:30,borderTopLeftRadius:30
              // borderRadius:30
            }
          }}
        >
         <View style={{marginTop:20}}>
              <View style={DoctorHeaderStyle.headerView}>
                <Rtext
                  style={{ justifyContent: 'center', color: Apptheme }}
                  fontSize={14.5}
                  fontFamily="Ubuntu-Medium">
                  Search Doctor By Mobile Number
                </Rtext>
                <Entypo
                  size={22}
                  color="#FF617B"
                  name="circle-with-cross"
                  onPress={() => bottomSheet.current.close()}
                />
              </View>
              <LineSeparator style={{ height: 2 }} />
              <View style={{ paddingHorizontal: 20 }}>
                <Ainput
                  placeholder="Doctor Mobile Number"
                  name="search"
                  lview={true}
                  control={control}
                  style={DoctorHeaderStyle.inputStyle}
                  search
                  fontSize={15}
                  keyboardType="numeric"
                  maxLength={10}
                  // onChange={e => setMsgValidation('')}
                  onChange={debounce(handleSubmit(onChangeNumber), 500)}
                // fieldValue={(e)=>setFieldValue(e)}
                />
                <View style={{ paddingTop: 15 }}>
                  {msgvalidation && (
                    <Rtext fontSize={13} style={{ color: '#FF617B' }}>
                      {msgvalidation}
                    </Rtext>
                  )}
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Abutton
                    style={{ backgroundColor: Apptheme, height: normalizeSize(40) }}
                    name={'Next'}
                    size={14}
                    fontFamily="Ubuntu-Medium"
                    onPress={handleSubmit(onSearch)}
                    loader={loader}
                    disble={!buttonStatus ? false : true}
                  />
                </View>
              </View>
            </View>
        </RBSheet>







        {/* <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={normalizeSize(210)}
          radius={30}
          sheetBackgroundColor={White}
          dragIconStyle={{ width: normalizeSize(50), height: 2 }}>
            <View style={{}}>
              <View style={DoctorHeaderStyle.headerView}>
                <Rtext
                  style={{ justifyContent: 'center', color: Apptheme }}
                  fontSize={14.5}
                  fontFamily="Ubuntu-Medium">
                  Search Doctor By Mobile Number
                </Rtext>
                <Entypo
                  size={22}
                  color="#FF617B"
                  name="circle-with-cross"
                  onPress={() => bottomSheet.current.close()}
                />
              </View>
              <LineSeparator style={{ height: 2 }} />
              <View style={{ paddingHorizontal: 20 }}>
                <Ainput
                  placeholder="Doctor Mobile Number"
                  name="search"
                  lview={true}
                  control={control}
                  style={DoctorHeaderStyle.inputStyle}
                  search
                  fontSize={15}
                  keyboardType="numeric"
                  maxLength={10}
                  // onChange={e => setMsgValidation('')}
                  onChange={debounce(handleSubmit(onChangeNumber), 500)}
                // fieldValue={(e)=>setFieldValue(e)}
                />
                <View style={{ paddingTop: 15 }}>
                  {msgvalidation && (
                    <Rtext fontSize={13} style={{ color: '#FF617B' }}>
                      {msgvalidation}
                    </Rtext>
                  )}
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Abutton
                    style={{ backgroundColor: Apptheme, height: normalizeSize(40) }}
                    name={'Next'}
                    size={14}
                    fontFamily="Ubuntu-Medium"
                    onPress={handleSubmit(onSearch)}
                    loader={loader}
                    disble={!buttonStatus ? false : true}
                  />
                </View>
              </View>
            </View>
        </BottomSheet> */}
      </View>
    </View>
  );
};
const KeyBoardAvoidView = ({ children }) => {
  if (Platform.OS == 'ios') {
      return <KeyboardAvoidingView style={{ flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 40}
              >   
              {children}
             </KeyboardAvoidingView>
  }
  return children;
}

export default DoctorHeaderFile;

const DoctorHeaderStyle = StyleSheet.create({
  outerview: {
    marginTop: 55,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  leftview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.60,
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
    justifyContent: "space-around",
    // paddingHorizontal:14,
    // paddingVertical:7
    padding: 8,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 5,
    paddingHorizontal: 20,
    marginBottom:5
    // marginTop: ,
  },
  inputStyle: {
    // elevation: 5,
    shadowColor: '#bdbbbb',
    elevation: 10,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
  },
});
