import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderCommon from '../../../components/HeaderCommon';
import { Grey, White } from '../../../config/Colors';
import { normalizeSize, SCREEN_HEIGHT } from '../../../utility';
import { first_header_tab_list, sec_header_tab_list } from './HeaderTabList';
import HeaderTabComponent from './HeaderTabComponent';
import RevenueEarned from './RevenueEarned';
import DoctorAnalytics from './DoctorAnalytics';
import LinearGradientComponent from '../../../components/LinearGradientCom';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPageOffSetValue } from '../../../store/common';
import { request } from '../../../services';
import NoDataFound from '../../../components/NoDataFound';
import FooterLoader from '../../../components/FooterLoader';
let lb_noMoreFetachData = false;

const Analytics = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [currentIndexForDays, setCurrentIndexForDays] = useState(0);
  const [day_limit, setDayLimit] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectdate, setDateRange] = useState({ form_date: '', to_date: '', START_DATE: new Date(), END_DATE: new Date() });
  const [analyticsData, setAnalyticsData] = useState([])
  const [lb_loadMore, setLoadMore] = useState(false);
  const [lb_loader, setLoader] = useState(false);
  const [clinicRevenueDetails,setCinicRevenueDetails]=useState({})
  useEffect(() => {

    getAnalyticsList(currentPage, day_limit, selectdate);

  }, [currentPage, day_limit, selectdate])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setPageOffSetValue("Analytics"))
    }, []),
  );

  // console.log("analyticsData",analyticsData);   
  const getAnalyticsList = async (
    page = 1,
    daterange,
    selectedDate,
  ) => {
    if (page == 1) lb_noMoreFetachData = false;
    console.log("page", page);
    setLoadMore(true);
    setLoader(true);
    if (lb_noMoreFetachData || page == 0) return;
    try {
      let response = await request(
        'get',
        `appointments/clinic-analytics?from_date=${selectedDate?.form_date}&to_date=${selectedDate?.to_date}&days=${daterange}&page=${page}&limit=10`,
      );

      const analyticsRcdList = response?.data?.data["doctors"] || [];
      console.log("analyticsRcdList",response?.data?.data["clinic"]);
      setCinicRevenueDetails(response?.data?.data["clinic"])
      setAnalyticsData(
        page == 1 ? analyticsRcdList : [...analyticsData, ...analyticsRcdList],
      );
      // setDoctorList(analyticsRcdList);
      if (analyticsRcdList.length == 0) lb_noMoreFetachData = true;
    } catch (e) {
      console.log('response error from health record', e);
    }

    setLoader(false);
    setLoadMore(false);
  };

  return (
    <LinearGradientComponent>
        <View style={{ flexDirection: 'row' }}>
          <HeaderCommon
            headerName={'Analytics'}
            navigateBackto={'Home'}
            style={{ top: 20 }}
          />
        </View>
        <View style={analyticsStyle.whiteOuterView}>
          {/* <View style={[analyticsStyle.tabOuterView, {top: 12}]}>
            {first_header_tab_list.map((item, inx) => {
              return (
                <HeaderTabComponent
                  key={inx}
                  tabdetails={item}
                  width={'25%'}
                  color={Grey}
                />
              );
            })}
          </View> */}
          {/* <View style={[analyticsStyle.tabOuterView, {top: 12}]}>
            {sec_header_tab_list.map((item,inx) => {
              return <HeaderTabComponent tabdetails={item} width={'25%'} key={inx}/>;
            })}
          </View> */}

          <View style={[analyticsStyle.tabOuterView, { top: 12 }]}>
            {sec_header_tab_list.map((item, inx) => {
              return (
                <HeaderTabComponent
                  tabdetails={item}
                  width={'25%'}
                  key={inx}
                  index={inx}
                  // prevTabSelection={prevTabSelection}
                  // setPrevTabSelection={setPrevTabSelection}
                  currentIndexForDays={currentIndexForDays}
                  setCurrentIndexForDays={setCurrentIndexForDays}
                  setDayLimit={setDayLimit}
                  setCurrentPage={setCurrentPage}
                  lb_noMoreFetachData={lb_noMoreFetachData}
                  // setAppointmentData={setAppointmentData}
                  setData={setAnalyticsData}
                  setDateRange={setDateRange}
                  selectdate={selectdate}
                />
              );
            })}
          </View>

          {/* <View style={{flex: 1}}> */}
            {/* <View style={{flex: 0.40}}> */}
              <RevenueEarned RevenueEarned={clinicRevenueDetails} />
            {/* </View> */}
            <View style={analyticsStyle.mainViewStyle}>
              <FlatList
                data={analyticsData}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                  if (!lb_noMoreFetachData && lb_loadMore == false) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={lb_loadMore && <FooterLoader style={{ marginTop: "20%" }} />}
                ListEmptyComponent={() =>
                  !lb_loader && (
                    <NoDataFound style={{height: '100%'}}
                    bodyText={'No analytics history found'} />
                  )
                }
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => navigation.navigate('DoctorBookingDetails', { doctor_id: item._id, day_limit: day_limit, selectdate: selectdate, doctor_name: item?.doctor_details?.name })}>
                      <DoctorAnalytics
                        item={item}
                        index={index}
                        anayliticsListLength={analyticsData?.length}
                      // doctorAnalyticsList={doctorAnalyticsList}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          {/* </View> */}
        </View>
   
    </LinearGradientComponent>
  );
};

export default Analytics;

const analyticsStyle = StyleSheet.create({
  whiteOuterView: {
    backgroundColor: White,
    flex: 1,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // minHeight: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  tabOuterView: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
    marginLeft: -4,
    marginRight: -4,
  },
  mainViewStyle: {
    flex: 0.88,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: White,
    elevation: 4,
    borderRadius: 14,
    marginTop: 20,
    // height: "55%",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,

    // minHeight: SCREEN_HEIGHT - normalizeSize(700),
    // maxHeight: SCREEN_HEIGHT - normalizeSize(370)
  },
});