import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../../components/HeaderCommon';
import Styles from '../../../../../Styles';
import {useForm} from 'react-hook-form';
import ArangePicker from '../../../../../components/ArangePicker';
import {White} from '../../../../../config/Colors';
import {normalizeSize} from '../../../../../utility';
import DisableDoctorListcard from './DisableDoctorListcard';
import {request} from '../../../../../services';
import moment from 'moment';
import DisbaledDoctorReport from './DisabledDoctorReport';
import NoDataFound from '../../../../../components/NoDataFound';
import {FlatList} from 'react-native';
import FooterLoader from '../../../../../components/FooterLoader';
import AlertPopUp from '../../../../../components/AlertPopUp';

let lb_noMoreFetachData = false;

const DisableDoctor = () => {
  const [lo_date, setDate] = useState({
    form_date: new Date(),
    to_date: moment().add(1, 'month').endOf('month').toDate(),
  });
  const [disabledDoctorReport, setDisabledDoctorReport] = useState([]);
  const [lb_loadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lb_loader, setLoader] = useState(false);
  // const [alertPopUpStatus, setAlertPopUpStatus] = useState(false);

  const {control, handleSubmit} = useForm();
  useEffect(() => {
    getDisableDoctorList(currentPage);
  }, [currentPage, lo_date]);

  const onRangeSelect = date => {
    setDate({
      form_date: date?.rangePicker?.START_DATE,
      to_date: date?.rangePicker?.END_DATE,
    });
    setCurrentPage(1)
    // setAlertPopUpStatus(false)
  };

  const getDisableDoctorList = async (page = 1) => {
    let form_date = moment(lo_date?.form_date).format('YYYY-MM-DD');
    let to_date = moment(lo_date?.to_date).format('YYYY-MM-DD');
     console.log("----------------",`/doctors/list/disable-doctor?form_date=${form_date}&to_date=${to_date}&page=${page}&limit=10`);
    if (page == 1) lb_noMoreFetachData = false;
    setLoadMore(true);
    setLoader(true);

    if (lb_noMoreFetachData || page == 0) return;
    try {
      let response = await request(
        'get',
        `/doctors/list/disable-doctor?form_date=${form_date}&to_date=${to_date}&page=${page}&limit=10`,
      );
      // console.log('response?.data?.data ',response?.data?.data);
      const disabled_history_doctor = response?.data?.data || [];
      setDisabledDoctorReport(
        page == 1
          ? disabled_history_doctor
          : [...disabledDoctorReport, ...disabled_history_doctor],
      );
      if (disabled_history_doctor.length == 0) lb_noMoreFetachData = true;
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
            headerName={'Disabled Doctor Report'}
            navigateBackto={'More'}
            style={{top: 20}}
          />
        </View>
        <View style={[Styles.mainBodyStyle, {top: normalizeSize(10),height:"100%"}]}>
          <View style={{bottom: 22}}>
            <ArangePicker
              name="rangePicker"
              control={control}
              onChange={handleSubmit(onRangeSelect)}
              adddays={true}
              // alertPopUpStatus={alertPopUpStatus}  
              // setAlertPopUpStatus={setAlertPopUpStatus}
              inputStyle={styles.rangePickerStyle}

            />
          </View>
          <View style={styles.boxViewStyle}>
            <FlatList
              data={disabledDoctorReport}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (!lb_noMoreFetachData && lb_loadMore == false) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              onEndReachedThreshold={0.1}
              ListFooterComponent={lb_loadMore && <FooterLoader  style={{marginTop:"80%"}}/>}
              ListEmptyComponent={() =>
                !lb_loader && (
                  <NoDataFound bodyText={'No Doctor Disable History Found'} />
                )
              }
              renderItem={({item, index}) => (
                <DisbaledDoctorReport item={item} key={index} />
              )}
            />
          </View>
        </View>

        {/* <AlertPopUp title={'Do you want to disable this doctor?'} dialogStatus={alertPopUpStatus} deleteFunc={handleSubmit(onRangeSelect)} setDialogStatus={setAlertPopUpStatus} style={{borderRadius: 10}}/> */}
      </LinearGradientComponent>
    </View>
  );
};

export default DisableDoctor;

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
