import { Image, Linking, Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Apptheme, Grey, White } from '../../../../../../config/Colors';
import { normalizeSize, showFlashMessage } from '../../../../../../utility';
import { TouchableOpacity } from 'react-native';
import { Rtext } from '../../../../../../components/Rtext';
import LineSeparator from '../../../../../../components/LineSeparator';
import TimeLaps from '../../../../../../assets/icons/TimeLaps.svg';
import { request } from '../../../../../../services';

const PatientDetailsModal = ({
  bottomSheet,
  patientModalData = {},
  patientStatus = '',
  consultationStatus = true,
  appoientmentId = '',
  patientMorePage = false,
  ls_statusForOnlineOrOffline = '',
  ls_tokenNumber = '',
  getDoctorBookingSlot = () => { },
  formDate,
  previouspatientStatus = ""
}) => {
  const [colorindex, setColorIndex] = useState(-1);

  const handleClickOnStatus = async (status, inx) => {
    setColorIndex(inx);
    let statusObj = { 
      status:
        status == 'Cancel'
          ? 'CANCELLED'
          : status == 'complete'
            ? 'COMPLETED'
            : 'DELAY',
    };
    // console.log('statusObj', statusObj);
    try {
      let response = await request(
        'put',
        'appointments/' + appoientmentId,
        statusObj,
      );
      if (response) {
        bottomSheet.current.close();
        getDoctorBookingSlot();
      }
    } catch ({ response }) {
      console.log('error', response?.data?.error);
      bottomSheet.current.close();
      showFlashMessage(response?.data?.error, '', 'danger');
    }
  };

  const handleClickOnDial = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${patientModalData.mobile}`;
    } else {
      number = `tel:${patientModalData.mobile}`;
    }
    console.log('number', number);
    Linking.openURL(number);
  };

  let pateint_status = [
    {
      status: 'Cancel',
      icon: (
        <View
          style={[bookingHeaderModalStyle.crossview, { bottom: 0, padding: 1 }]}>
          <Entypo
            name={'cross'}
            // color={colorindex == 0 ? 'white' : Apptheme}
            color={White}
            size={normalizeSize(12)}
          />
        </View>
      ),
    },
    {
      status: 'complete',
      icon: (
        <Ionicons
          name={'ios-checkmark-circle'}
          size={normalizeSize(17)}
          color={colorindex == 1 ? 'white' : Apptheme}
        />
      ),
    },
    { status: 'Delay', icon: <TimeLaps fill={Grey} /> },
  ];
  let currentDate = new Date();
  console.log("previouspatientStatus", previouspatientStatus);
  const arrayToMap = previouspatientStatus !== "PENDING" ? pateint_status : previouspatientStatus == "PENDING" ? pateint_status.slice(0, 1) : formDate?.getTime() < currentDate.setHours(23, 59, 0, 0) ? pateint_status : pateint_status.slice(0, 1);


  return (
    <View>
      <View style={bookingHeaderModalStyle.upperview}>
        <View style={bookingHeaderModalStyle.upperinnerview}>
          <Rtext
            style={{ color: Apptheme, bottom: 5 }}
            fontFamily={'Ubuntu-Medium'}
            fontSize={14.5}>
            Patient details
          </Rtext>
          <TouchableOpacity
            style={bookingHeaderModalStyle.crossview}
            onPress={() => bottomSheet.current.close()}>
            <Entypo name={'cross'} color={'white'} size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <LineSeparator style={{ marginVertical: 0 }} />
      <View style={{ paddingHorizontal: 21, paddingVertical: 15 }}>
        <View style={bookingHeaderModalStyle.useAvatarStyle}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={{ height: normalizeSize(25), width: normalizeSize(25) }}
          />
          <Rtext
            style={{ paddingLeft: 10 }}
            fontFamily={'Ubuntu-Medium'}
            fontSize={14.5}>
            {Object.keys(patientModalData)?.length > 0 ? patientModalData?.name : 'Aunsu'}
          </Rtext>
        </View>
        <View
          style={[
            {
              paddingVertical: 5,
            },
            bookingHeaderModalStyle.upperinnerview,
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={bookingHeaderModalStyle.genderStyle}>
              <Rtext fontSize={12.5} style={{ color: Apptheme }}>
                Gender: &nbsp;
              </Rtext>
              <Rtext fontSize={12.5}>
                {Object.keys(patientModalData)?.length > 0 ? patientModalData?.gender?.charAt(0).toUpperCase() +
                  patientModalData?.gender?.slice(1).toLowerCase() : 'Male'}
              </Rtext>
            </View>
            <View style={bookingHeaderModalStyle.ageStyle}>
              <Rtext fontSize={12.5} style={{ color: Apptheme }}>
                Age: &nbsp;
              </Rtext>
              <Rtext fontSize={12.5}>{Object.keys(patientModalData) > 0 ? patientModalData?.age : 25}</Rtext>
            </View>
          </View>

          <TouchableOpacity
            style={bookingHeaderModalStyle.callnowOuterview}
            onPress={handleClickOnDial}>
            <Ionicons name={'call'} color={White} size={normalizeSize(13)} />
            <Rtext
              style={{ paddingLeft: 5, color: White }}
              fontSize={12.5}
              fontFamily={'Ubuntu-Medium'}>
              Call Now
            </Rtext>
          </TouchableOpacity>
        </View>
        {/* {patientModalData.description && (
          <View style={{flexDirection: 'row', width: 280}}>
            <Rtext fontSize={12.5}>Description:</Rtext>
            <Rtext
              style={{color: Apptheme}}
              fontSize={12.5}>{` ${patientModalData.description}`}</Rtext>
          </View>
        )} */}

        {ls_tokenNumber !== '' && (
          <View style={[bookingHeaderModalStyle.status, { paddingTop: 0, paddingBottom: 15 }]}>
            <Rtext fontSize={12.5}>Token Number: &nbsp;</Rtext>
            <Rtext
              style={{ color: Apptheme }}
              fontFamily={'Ubuntu-Medium'}
              fontSize={12.5}>
              {ls_tokenNumber}
            </Rtext>
          </View>
        )}

       {Object.keys(patientModalData).length !== 0 && (
        <View style={{ flexDirection: 'row', width: 280 }}>
          <Rtext fontSize={12.5}>Description: &nbsp;</Rtext>
          <Rtext
            style={{ color: Apptheme }}
            fontSize={12.5}>{Object.keys(patientModalData).length > 0 ? patientModalData.description : " iridkfjd"}</Rtext>
        </View>
       )}

        {patientMorePage && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Rtext fontSize={12.5}>Status :</Rtext>

            <View
              style={[
                {
                  backgroundColor:
                    patientStatus == 'CANCELLED'
                      ? '#FFD8DB'
                      : patientStatus == 'PENDING' || patientStatus == 'PENDING'
                        ? '#EEF2F5'
                        : '#E5F9FA',
                },
                bookingHeaderModalStyle.statusStyle,
              ]}>
              <Rtext
                style={{
                  color:
                    patientStatus == 'CANCELLED'
                      ? '#DB4437'
                      : patientStatus == 'DELAY' || patientStatus == 'PENDING'
                        ? '#747474'
                        : Apptheme,
                }}
                fontSize={11.5}>
                {patientStatus}
              </Rtext>
            </View>
          </View>
        )}

        {ls_statusForOnlineOrOffline !== '' && (
          <View style={bookingHeaderModalStyle.status}>
              <Rtext fontSize={12.5}>Consultation Status: &nbsp;</Rtext>
              <MaterialCommunityIcons
                name={'circle-double'}
                color={Apptheme}
                // style={{ paddingLeft: 13 }}
              />
              <Rtext
                style={{ color: Apptheme, paddingLeft: 2 }}
                fontFamily={'Ubuntu-Medium'}
                fontSize={12.5}>
                {/* Offline */}
                {ls_statusForOnlineOrOffline == 'CLINIC' ? 'Offline' : 'Online'}
              </Rtext>
          </View>
        )}

        {/* {consultationStatus && (
          <View style={bookingHeaderModalStyle.status}>
            <Rtext fontSize={12.5}>Consultation Status:</Rtext>
            <MaterialCommunityIcons
              name={'circle-double'}
              color={Apptheme}
              style={{ paddingLeft: 13 }}
            />
            <Rtext
              style={{ color: Apptheme, paddingLeft: 2 }}
              fontFamily={'Ubuntu-Medium'}
              fontSize={12.5}>
              Offline
            </Rtext>
          </View>
        )} */}

        {!patientMorePage &&
          (patientStatus == 'DELAY' || patientStatus == 'PENDING') && (
            <View style={[bookingHeaderModalStyle.boxouterview]}>
              {arrayToMap.map((item, inx) => {
                return (
                  <TouchableOpacity
                    key={inx}
                    style={[
                      bookingHeaderModalStyle.boxStyle,
                      {
                        // backgroundColor:
                        //   item?.status === 'Delay'
                        //     ? Apptheme
                        //     : colorindex === inx
                        //     ? Apptheme
                        //     : White,
                        backgroundColor: colorindex === inx ? Apptheme : White,
                      },
                    ]}
                    onPress={() => handleClickOnStatus(item.status, inx)}>
                    {item?.icon}
                    <Rtext
                      style={{
                        paddingLeft: 5,
                        color: colorindex == inx ? White : 'black',
                        // color:
                        //   item?.status === 'Delay'
                        //     ? White
                        //     : colorindex === inx
                        //     ? White
                        //     : 'black',
                      }}
                      fontSize={12.5}>
                      {item?.status}
                    </Rtext>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
      </View>
    </View>
  );
};
export default PatientDetailsModal;

const bookingHeaderModalStyle = StyleSheet.create({
  upperview: {
    paddingHorizontal: 21,
    paddingVertical: 12,
  },
  upperinnerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossview: {
    backgroundColor: '#F4A0AE',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    padding: 2,
  },
  lineseparator: {
    borderColor: 'pink',
    borderWidth: 0.2,
  },
  useAvatarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#daf3f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  ageStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#daf3f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 5,
  },
  callnowOuterview: {
    backgroundColor: 'red',
    backgroundColor: Apptheme,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  status: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxouterview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  boxStyle: {
    height: normalizeSize(36),

    borderRadius: 10,
    elevation: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 17,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  statusStyle: {
    paddingVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
});
