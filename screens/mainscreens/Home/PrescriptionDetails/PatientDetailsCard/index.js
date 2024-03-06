
import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Apptheme, BoldColor, Grey, White } from '../../../../../config/Colors';
import { Aws_Base_url, base_upload_image_folder } from '../../../../../config/Constant';
import { normalizeSize } from '../../../../../utility';
import { Rtext } from '../../../../../components/Rtext';
import Ionicons from "react-native-vector-icons/Ionicons"
import TimeLeft from "../../../../../assets/icons/TimeLeft.svg"
import Fontisto from "react-native-vector-icons/Fontisto"
import LineSeparator from '../../../../../components/LineSeparator';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const PatientDetailsCard = () => {
    let FooterDetails = [{ headerName: " Doctor Name :", bodyname: "   Amitabh Bachchan" }, { headerName: " Doctor Mobile No :", bodyname: "   +91 9887876548" },
    // { headerName: " Center :", bodyname: "   Diagnosis 1" },
     { headerName: " Booking Date :", bodyname: "   12 Oct 2023" }]
    let profileDetails = {}
    return (
        <View style={doctorDetailsCardStyle.headerOuterView}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={doctorDetailsCardStyle.mainViewStyle}>
                    {profileDetails?.profile_image ?
                        <Image
                            source={{ uri: `${Aws_Base_url}${base_upload_image_folder}${profileDetails?.profile_image}` }}
                            height={normalizeSize(65)}
                            width={normalizeSize(65)}
                            style={{ borderRadius: normalizeSize(65) }}
                        />
                        :
                        <Image style={{ height: normalizeSize(70), width: normalizeSize(70), borderRadius: 60, backgroundColor: "grey" }} source={require('../../../../../assets/images/patinetAvatar.png')}
                        />
                    }
                    <View style={[doctorDetailsCardStyle.mainViewStyle,{paddingLeft:6}]}>
                        <View style={doctorDetailsCardStyle.textViewStyle}>
                            <Rtext
                                style={{ color: BoldColor }}
                                fontSize={16}
                                fontFamily="Ubuntu-Bold">
                                {"Atanu Saha"}
                            </Rtext>

                            <View style={doctorDetailsCardStyle.innerview}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TimeLeft />
                                    <Rtext style={{ paddingLeft: 5 }} fontSize={13}>
                                         {" 42"} Year old
                                    </Rtext>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: 10,
                                    }}>
                                    <Ionicons name={'male-female'} color={Apptheme} />
                                    <Rtext fontSize={13} style={{ paddingLeft: 3 }}>
                                         {" Male"}
                                        {/* {`${user?.gender.charAt(0).toUpperCase()}${user?.gender
                                        .slice(1)
                                        .toLowerCase()}`} */}
                                    </Rtext>
                                </View>
                            </View>
                            <View style={doctorDetailsCardStyle.innerview}>
                                <Ionicons
                                    name="call"
                                    color={Apptheme}
                                    size={normalizeSize(12)}
                                />
                                <Rtext style={{ paddingLeft: 5 }} fontSize={13}>
                                    {" +91 7319434831"}
                                </Rtext>
                            </View>
                            <View style={[doctorDetailsCardStyle.innerview,]}>
                                <Fontisto
                                    name="calendar"
                                    color={Apptheme}
                                    size={normalizeSize(12)}
                                />
                                <Rtext style={{ paddingLeft: 5 }} fontSize={13}>
                                    {" 09 Oct 2023"}
                                </Rtext>
                            </View>
                            {/*  */}
                        </View>
                    </View>
                </View>

            </View>
            <LineSeparator style={{marginTop:18}}/>
            {FooterDetails?.map((item, inx) => <View key={inx} style={doctorDetailsCardStyle.directionStyle}>
                <MaterialCommunityIcons
                    name={'circle-double'}
                    color={Apptheme}
                    style={{}}
                />
                <Rtext style={{ color: Apptheme }} fontFamily='Ubuntu-Medium'>{item?.headerName}</Rtext>
                <Rtext style={{ color: "#747474" }}>{item?.bodyname}</Rtext>

            </View>
            )}

        </View>
    )
}
export default PatientDetailsCard;


const doctorDetailsCardStyle = StyleSheet.create({
    headerOuterView: {
        backgroundColor: White,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 20,
        marginTop: -53,
        elevation: 5,

        marginHorizontal: 24,
        marginBottom: 15,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
    },
    innerview: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 7,
    },
    mainViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
  
    },
    textViewStyle: {
        flex: 0.9,
        paddingLeft: 15
    },
    iconViewStyle: {
        flex: 0.1,
        alignItems: 'flex-end',
        paddingRight: 3
    },
    directionStyle: { flexDirection: "row", alignItems: "center", paddingBottom: 8 }
})