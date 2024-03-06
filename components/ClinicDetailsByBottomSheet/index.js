import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Aws_Base_url, base_upload_image_folder} from '../../config/Constant';
import {Rtext} from '../Rtext';
import LineSeparator from '../LineSeparator';
import {Apptheme, White} from '../../config/Colors';
import {normalizeSize} from '../../utility';
import FooterLoader from '../FooterLoader';

const ClinicDetailsByBottomSheet = ({item, bottomSheet}) => {
  //   const [clinicData, setClinicData] = useState(null);

  //   useEffect(() => {
  //     getClinicDetails();
  //   }, []);
  //   console.log('call');
  //   const getClinicDetails = async () => {
  //     try {
  //       let response = await request('get', `clinics/${item?._id}`);
  //       console.log('response // ../..', response?.data?.data);
  //       const clinicData = response?.data?.data;
  //       setClinicData(clinicData);
  //     } catch (error) {
  //       console.log('Error from getClinicDetails', error);
  //     }
  //   };

  let address =
    'Module 905, BN4 Webel, Kolkata, West- Bengal 700091.Module 905, BN4 Webel, Kolkata, West- Bengal 700091. Module 905, BN4 Webel, Kolkata,West- Bengal 700091.Module 905, BN4 Webel, Kolkata, West- Bengal700091.';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Rtext
          style={styles.headerText}
          fontSize={14.5}
          fontFamily="Ubuntu-Medium">
          Clinic Details
        </Rtext>
        <Entypo
          size={22}
          color="#FF617B"
          name="circle-with-cross"
          onPress={() => bottomSheet.current.close()}
        />
      </View>
      <LineSeparator />

      {/* {clinicData ? ( */}
      <View>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              {/* {clinicData?.clinic_logo ? (
                <Image
                  source={{
                    uri: `${Aws_Base_url}${base_upload_image_folder}${clinicData?.clinic_logo}`,
                  }}
                  style={styles.modalProfileImage}
                />
              ) : ( */}
              <Image
                style={styles.modalProfileImage}
                source={require('../../assets/images/clinic.jpeg')}
              />
              {/* )} */}
            </View>
            <View style={styles.details}>
              <View style={{flexDirection: 'row'}}>
                <Rtext style={styles.clinicName} fontFamily="Ubuntu-Medium">
                  {/* {clinicData?.name} */}
                  Ausnu Fresh Clinic
                </Rtext>
              </View>
              {/* {clinicData?.contact_number?.length !== 0 && ( */}
              <View
                style={{
                  paddingBottom: 5,
                }}>
                <Rtext style={styles.detailLabel}>Phone Number:</Rtext>
                <Rtext
                  style={{
                    color: '#747474',
                    width: normalizeSize(209),
                    // backgroundColor: 'red',
                  }}
                  fontSize={12}>
                  {/* {clinicData?.contact_number.join(' | ')} */}
                  9876789989 | 898778877
                </Rtext>
              </View>
              {/* )} */}
              {/* {clinicData?.address?.geo_address && ( */}
              <View
                style={{
                  paddingBottom: 5,
                }}>
                <Rtext style={styles.detailLabel} fontSize={12}>
                  Address:
                </Rtext>
                <Rtext
                  style={[styles.detailValue, {paddingLeft: 0}]}
                  fontSize={12}>
                  {/* {clinicData?.address?.geo_address} */}
                  {/* {address?.length > 90
                    ? `${address.substring(0, 90)}...`
                    : address} */}
                  {address}
                </Rtext>
              </View>
              {/* )} */}
            </View>
          </View>
        </View>
      </View>
      {/* ) : ( */}
      {/* <FooterLoader style={{marginTop: '35%'}} /> */}
      {/* )} */}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  headerText: {
    color: Apptheme,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.3,
  },
  modalProfileImage: {
    marginTop: 5,
    height: normalizeSize(90),
    width: normalizeSize(85),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Apptheme,
  },
  details: {
    flex: 0.7,
  },
  clinicName: {
    color: Apptheme,
    paddingBottom: 5,
    width: normalizeSize(152),
    fontSize: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  detailLabel: {
    color: Apptheme,
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
  },
  detailValue: {
    color: '#747474',
    paddingLeft: 5,
  },
  statusviewStyle: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 'auto',
    height: 21,
  },
  clinicUserImgStyle: {
    marginTop: 8,
    height: normalizeSize(65),
    width: normalizeSize(55),
    borderRadius: 14,
  },
  labelOuterViewStyle: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
  },
  separator: {
    height: 1.7,
    marginVertical: 3.5,
  },
});

export default ClinicDetailsByBottomSheet;
