import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LogoS from '../../../../assets/icons/LogoS.svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {normalizeSize} from '../../../../utility';
import {Rtext} from '../../../../components/Rtext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Apptheme, Grey, White} from '../../../../config/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HomeHeader = ({notificationCount,getNotificationCount}) => {
  console.log("notificationCount",notificationCount);
  const navigation = useNavigation();
  const user = useSelector(state => state.common.user);
  let address = user?.clinic_id?.address?.geo_address;
  return (
    <View style={homeheader.outerview}>
      <View style={homeheader.headerViewStyle}>
        <View style={homeheader.headerContentViewStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <Image
              source={require('../../../../assets/images/menu.png')}
              style={{height: 16, width: 21, marginLeft: 6}}
            />
          </TouchableOpacity>

          <LogoS width={32} height={32} />
          <View style={homeheader.headerSubContentTextViewStyle}>
            <FontAwesome5 name="map-marker-alt" size={15} color={Apptheme}/>
            <Rtext
              style={{color: '#212129', paddingLeft: 10}}
              fontWeight={'bold'}
              fontSize={13}>
              {address.length > 13
                ? address?.substring(0, 13) + '...'
                : address}
            </Rtext>
            <AntDesign name="down" size={normalizeSize(13)} color={Grey} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Notification', {navigateBackTo: 'Home',getNotificationCount:getNotificationCount})
        }>
        <Fontisto name="bell-alt" size={19} color={Apptheme} />
        {notificationCount!=0 &&  <View style={homeheader.notificationiconStyle}>
          <Rtext style={homeheader.notificationTextStyle}>
            {notificationCount}
          </Rtext>
        </View> }
       
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const homeheader = StyleSheet.create({
  outerview: {
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationiconStyle: {
    position: 'absolute',
    backgroundColor: '#F75869',
    width: normalizeSize(14),
    height: normalizeSize(14),
    borderRadius: 15 / 2,
    left: 10,
    bottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: White,
  },
  notificationTextStyle: {
    justifyContent: 'center',
    color: White,
    fontSize: 8,
    textAlign: 'center',
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContentViewStyle: {
    flex: 0.81,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubContentTextViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
