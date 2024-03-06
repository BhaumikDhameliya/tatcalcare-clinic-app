import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Rtext } from '../../../components/Rtext';
import LineSeparator from '../../../components/LineSeparator';
import { Aws_Base_url, base_upload_image_folder, currency } from '../../../config/Constant';
import { normalizeSize } from '../../../utility';
import Entypo from 'react-native-vector-icons/Entypo';
import { Apptheme, White } from '../../../config/Colors';




const DoctorDetailsSubModal =({item,bottomSheet})=>{
 
    return (
        <View>
       <View style={{}}>
          <View style={styles.headerView}>
            <Rtext
              style={{justifyContent: 'center',color:Apptheme}}
              fontSize={14.5}
              fontFamily="Ubuntu-Medium">
              Doctor Details
            </Rtext>
            <Entypo
              size={22}
              color="#FF617B"
              name="circle-with-cross"
              onPress={() => bottomSheet.current.close()}
            />
          </View>
          <LineSeparator style={{height: 2}} />
          <View style={{padding: 15,}}>
            <View style={{flexDirection: 'row',}}>
              <View style={{flex: 0.7, flexDirection: 'row'}}>
                <View>
                  {item?.profile_image ? (
                    <Image
                      source={{
                        uri: `${Aws_Base_url}${base_upload_image_folder}${item?.profile_image}`,
                      }}
                      style={styles.modalProfileImage}
                    />
                  ) : (
                    <Image
                      style={styles.modalProfileImage}
                      source={{
                        uri: 'https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg',
                      }}
                    />
                  )}
                </View>
                <View style={{paddingLeft: 10}}>
                  <Rtext style={{color: Apptheme,paddingBottom:5}} fontFamily={'Ubuntu-Medium'}>
                    {item?.name}
                  </Rtext>
                  <Rtext style={{color: '#747474',paddingBottom:5}} fontSize={13}>
                    {item?.qualifications}
                  </Rtext>
                  <Rtext style={{color: '#747474',paddingBottom:5}} fontSize={13}>
                    {item?.departments
                      .map(department => department.name)
                      .join(' | ')}
                  </Rtext>
               <View style={{flexDirection:"row",alignItems:"center"}}>
               <Rtext style={{color:Apptheme}} fontSize={12}fontFamily={'Ubuntu-Medium'}>{currency}</Rtext>
                  <Rtext
                    style={{color: '#212129',paddingLeft:3}}
                    fontFamily={'Ubuntu-Medium'}>
                    {`${Math.round(item?.doctor_fees)}`}
                  </Rtext>
               </View>
                 
                </View>
              </View>
              <View style={styles.startView}>
                 <View style={styles.innerview}>
                    <Rtext style={{color:White}} fontSize={12}>0.0</Rtext>
                    <AntDesign name={"star"} style={{paddingLeft:5}} color={White}/>
                 </View>
              </View>
            </View>
            <View style={styles.sthoscopeView}>
            <View style={styles.innverViewStethoscope}>
                <FontAwesome5 name={"stethoscope"} size={13} color={White}/>
            </View>
            <Rtext style={{paddingLeft:5,color:"#212129"}} fontSize={12} >{`${item?.experience_years} years Experience`}</Rtext>
            </View>
         

          </View>
        </View>
        </View>
    )

}
export default DoctorDetailsSubModal;

const styles = StyleSheet.create({
  
    headerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    modalProfileImage: {
      height: normalizeSize(80),
      width: normalizeSize(55),
      borderRadius: 10,
    },
    startView:{flex: 0.3,flexDirection:"row",justifyContent:'flex-end' ,paddingHorizontal:10,},
    innerview:{backgroundColor:Apptheme,flexDirection:"row",justifyContent:"center",height:normalizeSize(24),width:normalizeSize(48),alignItems:"center",borderRadius:8},
    sthoscopeView :{flexDirection:"row",paddingTop:10,alignItems:"center"},
    innverViewStethoscope:{borderRadius:5,backgroundColor:Apptheme,height:normalizeSize(18),width:normalizeSize(18),flexDirection:"row",alignItems:"center",justifyContent:"center"}
  });