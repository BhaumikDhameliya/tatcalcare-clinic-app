import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Linking,
} from 'react-native';
import BookingDetailsStar from '../../../../assets/icons/BookingDetailsStar.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BookingDetailsPNG from '../../../../assets/images/BookingDetailsPNG.png';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Rtext} from '../../../../components/Rtext';
import {Apptheme, White} from '../../../../config/Colors';
import Abutton from '../../../../components/Abutton';
import {normalizeSize} from '../../../../utility';
import Styles from '../../../../Styles';
import BedCategoryIcon from '../../../../assets/icons/BedCategoryIcon.svg';

const BookingConfirmed = ({route}) => {
  const navigation = useNavigation()
  let address =
    'Module 905, BN4 Webel, Kolkata, West- Bengal 700091.Module 905, BN4 Webel, Kolkata, West- Bengal 700091. Module 905, BN4 Webel, Kolkata,West- Bengal 700091.Module 905, BN4 Webel, Kolkata, West- Bengal700091.';
  return (
    <View style={{backgroundColor: White}}>
      <ImageBackground
        source={BookingDetailsPNG}
        imageStyle={BookingConfirmedStyle.imageStyle}>
        {/* <View style={{flexDirection: 'row'}}>
          <CommonHeader
            headerText={'Booking Details'}
            navigateBackto={'Home'}
          />
        </View> */}
        <View style={BookingConfirmedStyle.upperPreantView}>
          <BookingDetailsStar />
          <View style={BookingConfirmedStyle.doneView}>
            <MaterialIcons name={'done'} color={Apptheme} size={30} />
          </View>
          <Rtext
            style={{color: White, marginTop: 15}}
            fontSize={20}
            fontFamily={'Ubuntu-Medium'}>
            Booking Confirmed
          </Rtext>
          <View style={BookingConfirmedStyle.ThankUViewStyle}>
            <Rtext
              fontFamily={'Ubuntu-Medium'}
              style={{color: Apptheme}}
              fontSize={14}>
              Thank You
            </Rtext>
          </View>
          <Rtext
            style={{marginTop: 15, color: White}}
            fontFamily={'Ubuntu-Medium'}>
            {/* Diagnosis 1 */}
            {route?.params?.statusForBookingConfirmPage ? 'Hospital 1' : 'Diagnosis 1'}
          </Rtext>
          <Rtext style={{color: White, marginTop: 5}} fontSize={12}>
            {address?.length > 90 ? `${address.substring(0, 90)}...` : address}
          </Rtext>
        </View>
      </ImageBackground>

      <View style={[Styles.mainBodyStyle, {marginTop: 0}]}>
        <View style={{paddingVertical: 15, flex: 1}}>
          <View
            style={{
              // flex: 0.5,
              height: '49%',
            }}>
            <ScrollView>
              <View style={[BookingConfirmedStyle.lowerBox, {margin: 5}]}>
                <View style={BookingConfirmedStyle.innerStyle}>
                  <View style={BookingConfirmedStyle.alignMentStyle}>
                    <Image
                      height={normalizeSize(16)}
                      width={normalizeSize(16)}
                      style={{borderRadius: 10}}
                      source={{
                        uri: 'data:image/png;base64,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',
                      }}
                    />
                    <Rtext style={{paddingLeft: 10}} fontSize={12}>
                      {'Patient Details'}
                    </Rtext>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Rtext
                      style={{color: '#212129', paddingBottom: 3}}
                      fontFamily={'Ubuntu-Medium'}
                      fontSize={12}>
                      Shabir Ali
                    </Rtext>
                    <Rtext style={{color: '#747474'}} fontSize={12}>
                      Male | 29 | 9874563210
                    </Rtext>
                  </View>
                </View>
              </View>

              <View style={[BookingConfirmedStyle.lowerBox, {margin: 5}]}>
                <View
                  style={[
                    BookingConfirmedStyle.innerStyle,
                    {paddingVertical: 9},
                  ]}>
                  <View style={BookingConfirmedStyle.alignMentStyle}>
                    <FontAwesome name={'calendar'} color={Apptheme} />
                    <Rtext style={{paddingLeft: 10}} fontSize={12}>
                      Booking Date
                    </Rtext>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Rtext
                      fontFamily={'Ubuntu-Medium'}
                      style={{color: Apptheme}}
                      fontSize={12}>
                      {moment(new Date()).format('DD MMM YYYY')}
                    </Rtext>
                  </View>
                </View>
              </View>

              {route?.params?.statusForBookingConfirmPage && (
                <View style={[BookingConfirmedStyle.lowerBox, {margin: 5}]}>
                <View
                  style={[
                    BookingConfirmedStyle.innerStyle,
                    {paddingVertical: 9},
                  ]}>
                  <View style={BookingConfirmedStyle.alignMentStyle}>
                    {/* <FontAwesome name={'calendar'} color={Apptheme} /> */}
                    <BedCategoryIcon
                      height={normalizeSize(15)}
                      width={normalizeSize(15)}
                    />
                    <Rtext style={{paddingLeft: 10}} fontSize={12}>
                      Bed Category
                    </Rtext>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Rtext
                      fontFamily={'Ubuntu-Medium'}
                      style={{color: Apptheme}}
                      fontSize={12}>
                      ICU
                    </Rtext>
                  </View>
                </View>
              </View>
              )}
            </ScrollView>
          </View>

          <View
            style={
              {
                // flex: 0.5
              }
            }>
            <Abutton
              // onPress={() => {
              //   const url = `https://www.google.com/maps/search/?api=1&query=${lo_bookingData?.clinic_details?.lat},${lo_bookingData?.clinic_details?.lon}`;
              //   Linking.openURL(url);
              // }}
              location={true}
              style={{backgroundColor: Apptheme, bottom: 22}}
              name={'Done'}
              size={14}
              fontFamily="Ubuntu-Medium"
              onPress={()=>navigation.navigate("Home")}
              // onPress={() => navigation.navigate('BottomTabNav')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default BookingConfirmed;

const BookingConfirmedStyle = StyleSheet.create({
  lowerBox: {
    backgroundColor: White,
    paddingVertical: 10,
    paddingHorizontal: 8,
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  innerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upperPreantView: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 58,
    // backgroundColor: 'green',
  },
  doneView: {
    height: normalizeSize(42),
    width: normalizeSize(42),
    backgroundColor: White,
    borderRadius: normalizeSize(42),
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThankUViewStyle: {
    backgroundColor: White,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
  },
  stethoscopeView: {
    borderRadius: 8,
    backgroundColor: Apptheme,
    height: normalizeSize(20),
    width: normalizeSize(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignMentStyle: {flexDirection: 'row', alignItems: 'center'},
  docConsultFeesStyle: {
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
    // marginTop: 25,
    // paddingHorizontal: 15,
  },
  casePendingViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#e1fafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 12,
  },
  imgStyle: {
    borderRadius: 8,
    height: normalizeSize(64),
    width: normalizeSize(44),
  },
  imageStyle: {
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    marginBottom: normalizeSize(5),
  },
});
