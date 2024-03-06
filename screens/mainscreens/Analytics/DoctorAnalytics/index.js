import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Apptheme, White } from '../../../../config/Colors';
import { Rtext } from '../../../../components/Rtext';
import { normalizeSize, SCREEN_WIDTH } from '../../../../utility';
import LineSeparator from '../../../../components/LineSeparator';
import { Aws_Base_url, base_upload_image_folder, currency } from '../../../../config/Constant';

const DoctorAnalytics = ({ item = {}, index, anayliticsListLength }) => {
  
  const func_toAddZero = (number) => {
    return number < 10 ? "0" + number : number
  }


  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item?.doctor_details?.profile_image ?
          <Image
            style={styles.imageViewStyle}
            source={{
              uri: `${Aws_Base_url}${base_upload_image_folder}${item?.doctor_details?.profile_image}`,
            }}
          /> : <Image
            source={require('../../../../assets/images/doctorPic.png')}
            style={styles.imageViewStyle}
          />}

        <View style={{ width: SCREEN_WIDTH - 120, paddingLeft: 10 }}>
          <View style={styles.firstTextViewStyle}>
            <Rtext fontFamily='Ubuntu-Medium'>{item?.doctor_details?.name}</Rtext>
            <View style={styles.amountViewStyle}>
              <Rtext style={{ color: Apptheme, paddingRight: 2 }}>
                {currency}
              </Rtext>
              <Rtext fontSize={13} fontWeight={700}>{item?.total_clinic_earning_by_doctor?.toFixed(2)}</Rtext>
            </View>
          </View>
          <View style={styles.secondTextViewStyle}>
            <View style={styles.bookingViewStyle}>
              <View style={styles.BookingIdBackgroundViewStyle}>
                <Rtext fontSize={11.5} style={{ color: White }}>
                  {/* item.bookingId */}
                  {func_toAddZero(item?.total_bookings)}
                </Rtext>
              </View>
              <Rtext style={{ paddingLeft: 6, color: Apptheme }} fontSize={11.5}>
                Bookings
              </Rtext>
            </View>
            <View style={styles.completeViewStyle}>
              <Rtext style={{ color: Apptheme }} fontSize={11}>
                {`${func_toAddZero(item.completed_count)} Complete`}
              </Rtext>
            </View>
            <View style={styles.canceledViewStyle}>
              <Rtext style={{ color: '#DB4437' }} fontSize={11}>
                {`${func_toAddZero(item.cancelled_count)} Cancelled`}
              </Rtext>
            </View>
          </View>
        </View>
      </View>
      {index !== anayliticsListLength - 1 && (
        <LineSeparator style={{ marginVertical: 15 }} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  imageViewStyle: {
    borderRadius: 25,
    height: normalizeSize(38),
    width: normalizeSize(38),
    borderWidth: 1,
    borderColor: Apptheme
  },
  amountViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  firstTextViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BookingIdBackgroundViewStyle: {
    backgroundColor: Apptheme,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 2.5,
    paddingVertical: 3
  },
  bookingViewStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  secondTextViewStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  completeViewStyle: {
    backgroundColor: '#E5F9FA',
    marginRight: 7.5,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: 'center'
  },
  canceledViewStyle: {
    backgroundColor: '#FFD8DB',
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: 'center'
  }
});
export default DoctorAnalytics;
