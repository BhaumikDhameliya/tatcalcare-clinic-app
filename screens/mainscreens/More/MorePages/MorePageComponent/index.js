import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Rtext} from '../../../../../components/Rtext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {Apptheme, BoldColor, Grey, White} from '../../../../../config/Colors';
import {request} from '../../../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  logoutSuccess,
  setCmsPage,
  setDynamicCmspage,
} from '../../../../../store/common';
import {logout, normalizeSize, showFlashMessage} from '../../../../../utility';
import GestureRecognizer from 'react-native-swipe-gestures';
import Amodal from '../../../../../components/Amodal';
import Abutton from '../../../../../components/Abutton';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import CalendarPicker from 'react-native-calendar-picker';

const MorePageComponenet = ({page_arr, daterange = 30}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [lo_selectedDate, setSelectedDate] = useState({
    from_date: moment(new Date()).add(-daterange, 'days'),
    to_date: new Date(),
  });
  const [calnderStatus, setCalenderStatus] = useState(false);
  const handclickMorePages = item => {
    // if (item?.pageName == 'Disabled Clinic') {
    //   setCalenderStatus(true);
    // } else {
      if (item.pageName == 'Log out') {
        logOut();
      } else if (item.cms) {
        dispatch(setDynamicCmspage(item.pageName));
        navigation.navigate('comongcmspage', {navigateBackTo: 'More'});
      } else {
        navigation.navigate(item.navigate, {navigateBackTo: 'More'});
      }
    // }
  };
  const logOut = async () => {
    // logoutSuccess

    try {
      // const token = await AsyncStorage.getItem('token');
      // console.log("token",token);
      let response = await request('post', 'common/logout');
      console.log("response",response?.data?.data);
      logout();
      dispatch(setCmsPage([]));

      // showFlashMessage(response.data.message, '', 'success');
      // setTimeout(() => {
      //   dispatch(logoutSuccess());
      // }, 1000);
    } catch (error) {
      console.log('error2', error);

      // setTimeout(() => {
      //   dispatch(logoutSuccess());
      // }, 1000);
    }
  };
  const onDateChange = (date, type) => {
    setSelectedDate(prevState => ({
      ...prevState,
      [type]: date,
    }));
  };
  const handleClickOnSet = async () => {
    console.log('lo_selectedDate', lo_selectedDate);
    try {
      let response = await request(
        'post',
        'clinics/disable-clinic',
        lo_selectedDate,
      );
      showFlashMessage(response.data?.message)
    } catch (error) {
      console.log('error2', error);
    }
    setCalenderStatus(false);
  };
  return (
    <View>
      {page_arr.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              style={morepagecomponentStyle.boxOuterView}
              onPress={() => handclickMorePages(item)}>
              <View style={morepagecomponentStyle.pageNameStyle}>
                <View
                  style={[
                    morepagecomponentStyle.iconStyle,
                    {
                      backgroundColor:
                        item.pageName == 'Log out' ? '#FFD8DB' : '#E5F9FA',
                      paddingHorizontal:
                        item.pageName == 'Disabled Doctor'
                          ? 5
                          : item.pageName == 'Terms & Conditions'
                          ? 10
                          : 7,
                    },
                  ]}>
                  <View>{item.icon}</View>
                </View>
                <Rtext fontSize={14.5} style={{paddingLeft: 14}}>
                  {item.pageName}
                </Rtext>
              </View>
              <View style={{flex: 0.05}}>
                <Entypo color={Grey} name={'chevron-thin-right'} />
              </View>
            </TouchableOpacity>
            {index !== page_arr.length - 1 && (
              <View style={morepagecomponentStyle.borderDeisgn}></View>
            )}
          </View>
        );
      })}
      {/* <GestureRecognizer
        style={{flex: 1}}
        config={{gestureIsClickThreshold: 20}}
        onSwipeDown={() => setCalenderStatus(false)}>
        <Amodal
          modalVisible={calnderStatus}
          close={false}
          style={{backgroundColor: White}}>
          <Header />
          <View style={{alignSelf: 'center', padding: 15}}>
            <CalendarPicker
              textStyle={{color: BoldColor}}
              initialDate={lo_selectedDate.from_date}
              width={340}
              onDateChange={onDateChange}
              startFromMonday={true}
              allowRangeSelection={true}
              maxDate={new Date()}
              allowBackwardRangeSelect={true}
              selectedStartDate={lo_selectedDate.from_date}
              selectedEndDate={lo_selectedDate.to_date}
              disabledDatesTextStyle={{opacity: 0.5}}
              selectedRangeStyle={{backgroundColor: Apptheme}}
            />
          </View>
          <Abutton
            name="Set"
            onPress={handleClickOnSet}
            size={13}
            style={{width: '20%', height: 35, marginBottom: 15}}
          />
        </Amodal>
      </GestureRecognizer> */}
    </View>
  );
};
const Header = ({}) => {
  return (
    <View style={morepagecomponentStyle.header}>
      <Rtext fontSize={15}>{'Drag Down to Close'}</Rtext>
      <LottieView
        colorFilters={[
          {
            keypath: 'scroll_up',
            color: Grey,
          },
        ]}
        style={{
          height: normalizeSize(35),
          width: normalizeSize(35),
        }}
        source={require('../../../../../assets/animation/swipeDown.json')}
        autoPlay
      />
    </View>
  );
};
export default MorePageComponenet;
const morepagecomponentStyle = StyleSheet.create({
  boxOuterView: {
    paddingHorizontal: 26,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNameStyle: {
    flexDirection: 'row',
    flex: 0.95,
    alignItems: 'center',
  },
  borderDeisgn: {
    borderColor: '#EEF2F5',
    borderWidth: 0.6,
    marginHorizontal: 26,
  },
  iconStyle: {
    // width: 20,
    // height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
});
