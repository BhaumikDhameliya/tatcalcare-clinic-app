import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rtext} from '../../../../../components/Rtext';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../../components/HeaderCommon';
import Styles from '../../../../../Styles';
import {Apptheme, White} from '../../../../../config/Colors';
import DisabledClinicHeader from './DisabledClinicHeader';
import {normalizeSize} from '../../../../../utility';
import moment from 'moment';
import {request} from '../../../../../services';
import DisabledClinicList from './DisabledClinicList';
import {FlatList} from 'react-native';
import ArangePicker from '../../../../../components/ArangePicker';
import FooterLoader from '../../../../../components/FooterLoader';
import NoDataFound from '../../../../../components/NoDataFound';
import {useForm} from 'react-hook-form';

let lb_noMoreFetachData = false;

const DisabledClinic = ({route}) => {
  const from_date_for_search = route?.params?.from_date_for_search;
  // console.log("route?.params?.from_date_for_search...", from_date_for_search);
  const to_date_for_search = route?.params?.to_date_for_search;
  const {control, handleSubmit} = useForm();
  const [lo_date, setDate] = useState({
    form_date: from_date_for_search ? from_date_for_search : new Date(),
    to_date: to_date_for_search ? to_date_for_search : moment().add(1, 'month').toDate(),
  });
  const [lb_loadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lb_loader, setLoader] = useState(false);
  const [disabledClinicList, setDisabledClinicList] = useState([]);
  const [alertPopUpStatus, setAlertPopUpStatus] = useState(false);

  useEffect(() => {
    getDisableCLinicList(currentPage);
  }, [currentPage, lo_date]);

  const getDisableCLinicList = async (page = 1) => {
    let form_date = moment(lo_date?.form_date).format('YYYY-MM-DD');
    let to_date = moment(lo_date?.to_date).format('YYYY-MM-DD');

    if (page == 1) lb_noMoreFetachData = false;
    setLoadMore(true);
    setLoader(true);

    if (lb_noMoreFetachData || page == 0) return;

    try {
      let response = await request(
        'get',
        `https://tatcalcare.idiosysdev.com/api/clinics/disable-clinic/list?&form_date=${form_date}&to_date=${to_date}&page=${page}&limit=10`,
      );
      const disabled_clinic_history = response?.data?.data || [];
      setDisabledClinicList(
        page == 1
          ? disabled_clinic_history
          : [...disabledClinicList, ...disabled_clinic_history],
      );
      if (disabled_clinic_history.length == 0) lb_noMoreFetachData = true;
      // setDisabledClinicList(response.data.data);
      // console.log("response",response.data.data);
    } catch (e) {
      console.log('e', e);
    }
    setLoader(false);
    setLoadMore(false);
  };
  const onRangeSelect = date => {
    // console.log('hhhh',from_date_for_search);
    setDate({
      form_date: date?.rangePicker?.START_DATE,
      to_date: date?.rangePicker?.END_DATE,
    });
    setCurrentPage(1);
    setAlertPopUpStatus(false);
  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={'Disabled Clinic'}
          style={{top: 18}}
          navigateBackto={'More'}
        />
      </View>
      <DisabledClinicHeader/>
      <View style={[Styles.mainBodyStyle, {marginTop: 120,height:"100%"}]}>
        <View style={{bottom: 22}}>
          <ArangePicker
            name="rangePicker"
            control={control}
            maxDate={new Date()}
            onChange={handleSubmit(onRangeSelect)}
            alertPopUpStatus={alertPopUpStatus}
            setAlertPopUpStatus={setAlertPopUpStatus}
            inputStyle={DisabledClinicStyles.rangePickerStyle}
            from_date_for_search = {from_date_for_search}
            to_date_for_search = {to_date_for_search}
            adddays={true}
          />
        </View>
        {/* <Rtext  fontSize={12.5}>
          {moment("2024-01-25T18:30:00.000Z").format('DD/MM/YYYY')}
        </Rtext> */}
        <View style={DisabledClinicStyles.boxViewStyle}>
          <FlatList
            data={disabledClinicList}
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
              !lb_loader && <NoDataFound bodyText={'No Disable Clinic History found'} />}
              renderItem={({item, index}) => (
              <DisabledClinicList item={item} key={index} />
            )}
          />
        </View>
      </View>
    </LinearGradientComponent>
  );
};
export default DisabledClinic;

const DisabledClinicStyles = StyleSheet.create({
  boxViewStyle: {
    backgroundColor: White,
    elevation: 4,
    borderRadius: 15,
    height: '70%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
   
  },
  rangePickerStyle: {
    backgroundColor: White,
    fontSize: normalizeSize(12.5),
  },
});
