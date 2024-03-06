import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FlatList} from 'react-native';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import ArangePicker from '../../../../../components/ArangePicker';
import FooterLoader from '../../../../../components/FooterLoader';
import HeaderCommon from '../../../../../components/HeaderCommon';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import NoDataFound from '../../../../../components/NoDataFound';

import {Rtext} from '../../../../../components/Rtext';
import {White} from '../../../../../config/Colors';
import {request} from '../../../../../services';
import Styles from '../../../../../Styles';
import {normalizeSize} from '../../../../../utility';
import PatientDetailsModal from '../../../Home/BookingDetails/BookingHeader/PatientDetailsModal';
import DisableDoctorListcard from '../DisableDoctor/DisableDoctorListcard';

let lb_noMoreFetachData = false;

const PatientHistory = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const [lb_loadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lb_loader, setLoader] = useState(false);
  const [patientObj,setPatientObj]=useState({})
  const bottomSheet = useRef();

  const [lo_date, setDate] = useState({
    form_date:moment().subtract(1, 'month').toDate(),
    to_date: new Date(),
  });
  const {control, handleSubmit} = useForm();

  useEffect(() => {
    getpatientHistory(currentPage);
  }, [lo_date, currentPage]);

  const onRangeSelect = date => {
    if(date?.rangePicker?.START_DATE && date?.rangePicker?.END_DATE) {
      setDate({
        form_date: date?.rangePicker?.START_DATE,
        to_date: date?.rangePicker?.END_DATE,
      });
      setCurrentPage(1);
    }
    
  };
  const getpatientHistory = async (page = 1) => {
    let form_date = moment(lo_date?.form_date).format('YYYY-MM-DD');
    let to_date = moment(lo_date?.to_date).format('YYYY-MM-DD');

    if (page == 1) lb_noMoreFetachData = false;
    setLoadMore(true);
    setLoader(true);

    if (lb_noMoreFetachData || page == 0) return;
    try {
      let response = await request(
        'get',
        `appointments/patient-history?&form_date=${form_date}&to_date=${to_date}&page=${page}&limit=10`,
      );
      const patient_history = response?.data?.data?.appointments || [];
      setPatientDetails(
        page == 1 ? patient_history : [...patientDetails, ...patient_history],
      );
      if (patient_history.length == 0) lb_noMoreFetachData = true;
    } catch (error) {
      console.log('error', error);
    }
    setLoader(false);
    setLoadMore(false);
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradientComponent>
        <View style={{flexDirection: 'row'}}>
          <HeaderCommon
            headerName={'Patient History'}
            navigateBackto={'More'}
            style={{top: 20}}
          />
        </View>
        <View style={[Styles.mainBodyStyle, {top: normalizeSize(10),height:"100%"}]}>
          <View style={{bottom: 25,}}>
            <ArangePicker
              name="rangePicker"
              control={control}
              maxDate={new Date()}
              onChange={handleSubmit(onRangeSelect)}
              inputStyle={styles.rangePickerStyle}
            />
          </View>
          <View style={styles.boxViewStyle}>
            <FlatList
              data={patientDetails}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (!lb_noMoreFetachData && lb_loadMore == false) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              onEndReachedThreshold={0.1}
              ListFooterComponent={lb_loadMore && <FooterLoader style={{marginTop:"80%"}}/>}
              ListEmptyComponent={() =>
                !lb_loader && (
                  <NoDataFound bodyText={'No patient history found'} />
                )
              }
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={()=>{bottomSheet.current.show(),setPatientObj(item)}}>
                  <DisableDoctorListcard item={item} key={index} />
                </TouchableOpacity>
              )}
              // refreshing={refreshing}
              // onRefresh={handleRefresh}
            />
          </View>

          {/* <ScrollView style={styles.boxViewStyle}>
                  {patientDetails?.map((item, index) => {
                      return (
                          <DisableDoctorListcard
                            item={item}
                            key={index}
                          />
                      )
                  })}
              </ScrollView> */}

          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={normalizeSize(265)}
            radius={30}
            sheetBackgroundColor={White}
            dragIconStyle={{width: normalizeSize(50), height: 2}}>
            <PatientDetailsModal
              bottomSheet={bottomSheet}
              patientModalData={patientObj?.patient}
              appoientmentId={""}
              // availabilitId={route?.params?.availabilit_id}
              patientStatus={patientObj?.status}
              patientMorePage={true}
              // getDoctorBookingSlot={getDoctorBookingSlot}
            />
          </BottomSheet>
        </View>
      </LinearGradientComponent>
    </View>
  );
};
export default PatientHistory;

const styles = StyleSheet.create({
  rangePickerStyle: {
    backgroundColor: White,
    fontSize: normalizeSize(12.5),
  },
  boxViewStyle: {
    backgroundColor: White,
    elevation: 4,
    borderRadius: 15,
    height: '75%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
});
