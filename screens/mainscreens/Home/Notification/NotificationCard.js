import {StyleSheet, View} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Rtext} from '../../../../components/Rtext';
import {normalizeSize} from '../../../../utility';
import {Apptheme, BoldColor, Grey} from '../../../../config/Colors';
import Like from '../../../../assets/icons/Like.svg';
import Calendar from '../../../../assets/icons/Calendar.svg';
import moment from 'moment-timezone';
import { TouchableOpacity } from 'react-native';
import { request } from '../../../../services';
import { useNavigation } from '@react-navigation/native';

const NotiFicationCard = ({item = {},getNotificationCount,getNotificationList}) => {

  const navigation =useNavigation();

  
  const handleClickOnNotificationCard = async notificationObj => {
    console.log("notificationObj",notificationObj);
    // setLoader(true)
    try {
      let res = await request('put', `notifications/${notificationObj?._id}`);
      // console.log("resres",JSON.parse(res.data.data.extra_data)?.availablity_id)
      console.log("resres",JSON.parse(res.data.data.extra_data));

      let data = JSON.parse(res.data.data.extra_data);
      let page_name = data?.page_name || '';
      let from_date_for_search;
      let to_date_for_search;
      if (page_name == 'DisabledClinic') {
        from_date_for_search = data?.from_date_for_search;
        to_date_for_search = data?.to_date_for_search;
      }
      let availability_id =  data?.availablity_id || '';
      navigation.navigate(page_name, { availabilit_id: availability_id, ...(page_name === 'DisabledClinic' && {from_date_for_search: from_date_for_search, to_date_for_search: to_date_for_search})});

      // navigation.navigate('BookingDetails', {
      //   // navigateBack: "",
      //   availabilit_id: JSON.parse(res.data.data.extra_data)?.availablity_id
      // })
      getNotificationCount()
      getNotificationList()
      // setLoader(false)
    } catch ({response}) {
      console.log('response', response?.data?.error);
    }
    // setLoader(false)

  };

  return (
    <TouchableOpacity
      onPress={() => handleClickOnNotificationCard(item)}
      style={[
        styles.mainViewStyle,
        {backgroundColor: item.status == 'UNREAD' ? '' : '#EEF2F5'},
      ]}>
      <Rtext
        style={{color: Apptheme, paddingVertical: 5}}
        fontFamily="Ubuntu-Medium"
        fontSize={15}>
        {item?.title}
      </Rtext>
      <View style={styles.descriptionViewStyl}>
        <View style={{width: '80%'}}>
          <Rtext
            fontSize={13}
            // numberOfLines={2}
            style={{color: BoldColor, paddingBottom: 8}}>
            {item?.description}
          </Rtext>
        </View>
        {item.status=="UNREAD" ? (
          <Like style={{bottom: 14}} />
        ) : (
          <Calendar style={{bottom: 14}} />
        )}
      </View>
      <View style={styles.dateViewStyle}>
        <Fontisto size={normalizeSize(12)} color={Grey} name="calendar" />
        <Rtext style={{color: Grey, left: 10}} fontSize={11.5}>
        {moment(item?.createdAt).format('DD MMM YYYY')}
        </Rtext>
      </View>
      </TouchableOpacity>

  );
};

export default NotiFicationCard;

const styles = StyleSheet.create({
  mainViewStyle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  descriptionViewStyl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
