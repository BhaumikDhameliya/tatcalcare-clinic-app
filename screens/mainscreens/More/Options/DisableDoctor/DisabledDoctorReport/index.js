import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Rtext} from '../../../../../../components/Rtext';
import moment from 'moment';
import {Apptheme, Grey, lightGrey} from '../../../../../../config/Colors';
import {normalizeSize} from '../../../../../../utility';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Aws_Base_url, base_upload_image_folder } from '../../../../../../config/Constant';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const DisbaledDoctorReport = ({item}) => {
  return (
    <View>
      <View style={DisbaledDoctorReportStyle.doctorlistStyle}>
        <View style={{flexDirection: 'row',alignItems:"center"}}>
          <View>
            {item?.doctor_id?.profile_image ? (
              <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${item?.doctor_id?.profile_image}`,
              }}
              style={{
                height: normalizeSize(25),
                width: normalizeSize(25),
                borderRadius: 25,
              }}
             />
            ) : (
              <Image
                style={{
                  height: normalizeSize(25),
                  width: normalizeSize(25),
                  borderRadius: 25,
                }}
                source={{
                  uri: 'data:image/png;base64,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',
                }}
              />
            )}
          </View>
          <Rtext
            fontFamily="Ubuntu-Medium"
            style={{color: Apptheme, paddingLeft: 5,width:120,
            }}
            fontSize={14.5}>
            {item?.doctor_id?.name}
          </Rtext>
        </View>

        <View>
          <View style={DisbaledDoctorReportStyle.dateViewStyle}>
            <Fontisto
              name="calendar"
              size={normalizeSize(11)}
              color={Grey}
              style={{right: 5}}
            />
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={{color: '#101010'}}
              fontSize={11.5}>
              {moment(item?.from_date).format('DD/MM/YYYY')} -&nbsp;
            </Rtext>
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={{color: '#101010'}}
              fontSize={11.5}>
              {moment(item?.to_date).format('DD/MM/YYYY')}
            </Rtext>
          </View>
          
          <Rtext
            fontSize={11.5}
            style={{marginTop: 3, color: lightGrey, textAlign: 'right'}}>
          </Rtext>
        </View>
      </View>
      <View
        style={[
          {
            marginHorizontal: 17,
          },
          DisbaledDoctorReportStyle.borderStyle,
        ]}
      />
    </View>
  );
};
export default DisbaledDoctorReport;

const DisbaledDoctorReportStyle = StyleSheet.create({
  borderStyle: {
    borderColor: '#EEF2F5',
    borderWidth: 0.7,
  },
  doctorlistStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    height: normalizeSize(36),
    width: normalizeSize(36),
    borderRadius: 25,
    borderColor: Apptheme,
    borderWidth: 0.8,
  },
  dateViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
