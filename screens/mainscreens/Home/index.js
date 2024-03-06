import { StyleSheet, View, FlatList, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HomeHeader from './HomeHeader';
import { normalizeSize, SCREEN_HEIGHT } from '../../../utility';
import { ScrollView } from 'react-native-gesture-handler';
import Facility from './Facility';
import ProfileDetails from './ProfileDetails';
import NewsVideo from './NewsVideo';
import FewTips from './FewTips';
import DoctorVideoPlayer from './DoctorVideoPlayer';
import AppointmentList from '../../../components/AppoinmentList';
import LinearGradientComponent from '../../../components/LinearGradientCom';
import { useDispatch } from 'react-redux';
import { setPageOffSetValue } from '../../../store/common';
import { useFocusEffect } from '@react-navigation/core';
import { request } from '../../../services';
import YouTube from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import Paginator from '../../../components/Paginator';

const Home = () => {
  const ONESIGNAL_APP_ID = 'f5e25bb6-36d5-461f-aeed-6d744dc3bb6b';
  const [bannerArray, setbannnerArray] = useState({});
  const [textArray, setTextArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  const [notificationCount, setNotificationCount] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loaderForDisable, setLoaderForDisable] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setPageOffSetValue('Home'));
    }, []),
  );

  const outerScrollViewRef = useRef();
  const innerScrollViewRef = useRef();
  const scrollx = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThresold: 500 }).current;

  useEffect(() => {
    getBannerList();
    getlinicapphomapagedata();
    getNotificationCount();
    deviceIdSend();
    getPushNotifications();
  }, []);

  const deviceIdSend = async () => {
    let userId = await AsyncStorage.getItem('push_user_id');
    try {
      const response = await request('put', `auth-tokens/push-token/${userId}`);
      console.log('response', response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPushNotifications = () => {
    OneSignal.setAppId(ONESIGNAL_APP_ID);
    OneSignal.setNotificationOpenedHandler(notification => {
      let data = notification?.notification?.additionalData;
      let page_name = data?.page_name || '';
      let from_date_for_search;
      let to_date_for_search;
      if (page_name == 'DisabledClinic') {
        from_date_for_search = data?.from_date_for_search;
        to_date_for_search = data?.to_date_for_search;
      }
      let availability_id = data?.availablity_id || '';
      navigation.navigate(page_name, { availabilit_id: availability_id, ...(page_name === 'DisabledClinic' && { from_date_for_search: from_date_for_search, to_date_for_search: to_date_for_search }) });
    });
  };

  const getBannerList = async () => {
    try {
      let res = await request('post', `banners/get-banner-details/name`, {
        name: ['clinic-app-banner'],
      });

      let clinic_banner = res.data?.data['clinic-app-banner'];
      console.log('data25', clinic_banner);
      setbannnerArray(clinic_banner);
    } catch (e) {
      console.log('eroooors', e);
    }
  };

  const getlinicapphomapagedata = async () => {
    try {
      let res = await request(
        'get',
        `global-settings/name/clinic-app-homapage-data`,
      );
      const textObjectsArray = res.data.data?.value
        .filter(item => item.type === 'TEXT')
        .map(item => ({
          title: item.title,
          description: item.description,
        }));
      const videoObjectsArray = res.data.data?.value
        .filter(item => item.type === 'VIDEO')
        .map(item => ({
          title: item.title,
          description: item.description,
        }));
      setTextArray(textObjectsArray);
      setVideoArray(videoObjectsArray);
    } catch (e) {
      console.log('eroooor', e);
    }
  };

  const getNotificationCount = async () => {
    try {
      const res = await request('get', 'notifications/notification-count');
      setNotificationCount(res?.data?.data);
    } catch ({ response }) {
      console.log('error from getNotificationCount', response?.data?.data);
    }
  };
  //

  // if(lb_loader)
  //   return <Rloader/>

  return (
    <ScrollView
      // refreshControl={handleRefresh}
      showsVerticalScrollIndicator={false}
      ref={outerScrollViewRef}
      // onScroll={handleOuterScroll}
      scrollEventThrottle={16}
      // scrollEnabled
      nestedScrollEnabled={true}>
      <LinearGradientComponent>
        <HomeHeader
          notificationCount={notificationCount}
          getNotificationCount={getNotificationCount}
        />
        <ProfileDetails />
        <View style={homeMainStyle.homeBodyStyle}>
          <View
            style={[
              homeMainStyle.facilityOuterView,
              homeMainStyle.boxbackgroundCommon,
            ]}>
            <Facility />
          </View>
          <View style={[homeMainStyle.commonboxStyle]}>
            <View style={[homeMainStyle.boxbackgroundCommon]}>
              <AppointmentList
                // appointmentList={la_appointmentList}
                title={'Today Appointment'}
                Header={true}
                navigateBackto={'Home'}
                refference={innerScrollViewRef}
                loaderForDisable={loaderForDisable}
                setLoaderForDisable={setLoaderForDisable}
              // lb_loader={lb_loader}
              />
            </View>
          </View>
          <View>
            {/* {bannerArray.map(item => ( */}
            {/* {bannerArray?.banners?.length !== 0 && ( */}
            <View style={homeMainStyle.commonboxStyle}>
              <View
                style={[
                  homeMainStyle.boxbackgroundCommon,
                  { alignItems: 'center', paddingBottom: 10 },
                ]}>
                <FlatList
                  data={bannerArray?.banners}
                  nestedScrollEnabled
                  ref={innerScrollViewRef}
                  keyExtractor={(item, inx) => inx.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        key={index}
                        style={{
                          paddingRight: 16, left: 16,
                          paddingVertical: 16 
                        }}>
                        <NewsVideo imagePath={item} />
                      </View>
                    );
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollx } } }],
                    {
                      useNativeDriver: false,
                    },
                  )}
                  viewabilityConfig={viewConfig}
                  pagingEnabled
                />
                <Paginator
                  data={bannerArray?.banners}
                  scrollX={scrollx}
                  marginTop={0}
                />
              </View>
            </View>
            {/* )} */}

            {/* ))} */}
            {/* {Object.keys(bannerArray).length !== 0 && */}
            {textArray.map((item, inx) => (
              <View style={homeMainStyle.commonboxStyle} key={inx}>
                <View style={homeMainStyle.boxbackgroundCommon}>
                  <FewTips footerData={item} />
                </View>
              </View>
            ))}
            {/* } */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <FlatList
                data={videoArray}
                nestedScrollEnabled
                ref={innerScrollViewRef}
                keyExtractor={(item, inx) => inx.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={[
                        homeMainStyle.commonboxStyle,
                        homeMainStyle.extraStyleForYoutube,
                      ]}>
                      <YouTube
                        videoId={item?.description}
                        width={normalizeSize(300)}
                        height={normalizeSize(160)}
                      />
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </LinearGradientComponent>
    </ScrollView>
  );
};

export default Home;
const homeMainStyle = StyleSheet.create({
  profileView: {
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  homeBodyStyle: {
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: SCREEN_HEIGHT - normalizeSize(330),
    marginTop: 63,
    paddingHorizontal: 20,
  },
  facilityOuterView: {
    paddingVertical: 10,
    marginTop: -50,
    // bottom:50
  },
  commonboxStyle: {
    marginTop: 24,
    paddingBottom: 5,
  },
  boxbackgroundCommon: {
    backgroundColor: '#FFFFFF',
    elevation: 10,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    // paddingTop: 10,
  },
  extraStyleForYoutube: {
    paddingBottom: 0,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
