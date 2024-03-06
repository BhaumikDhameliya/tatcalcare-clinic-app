import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Rtext } from '../../../../../components/Rtext';
import { Apptheme, White } from '../../../../../config/Colors';
import LineSeparator from '../../../../../components/LineSeparator';
import { currency } from '../../../../../config/Constant';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { normalizeSize } from '../../../../../utility';
import ClinicDetailsByBottomSheet from '../../../../../components/ClinicDetailsByBottomSheet';
import PatientDetailsModal from '../../BookingDetails/BookingHeader/PatientDetailsModal';


const DiagnosisAppointmentCard = () => {
    const bottomSheetForClinic = useRef();
    const bottomSheetForPatient = useRef();
    return (
        <View>
            <View style={DiagonsisCardStyle.cardOuterView}>
                <View style={{ padding: 15, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity style={{width: '68%'}} onPress={() => bottomSheetForPatient.current.show()}>
                      <Rtext fontFamily='Ubuntu-Medium' style={{ color: "#212129" }}>Shabir Ali</Rtext>
                    </TouchableOpacity>
                    <View style={{marginLeft: "auto"}}>
                        <View
                            style={[
                                {
                                    backgroundColor: "#E5F9FA"
                                },
                                DiagonsisCardStyle.statusStyle,
                            ]}>
                            <Rtext
                                style={{
                                    color: Apptheme
                                }}
                                fontSize={12}>
                                {"Complete"}
                            </Rtext>
                        </View>

                    </View>
                    </View>
                </View>
                <LineSeparator style={{ marginTop: 0 }} />
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <TouchableOpacity style={DiagonsisCardStyle.directionStyle} onPress={() => bottomSheetForClinic.current.show()}>
                            <Image source={require("../../../../../assets/images/DiagnosisCenter.png")} />
                            <View style={{ paddingLeft: 8 }}>
                                <Rtext style={{ color: Apptheme }} fontFamily='Ubuntu-Medium'>Centre 1</Rtext>
                                <View style={{ flexDirection: "row", paddingVertical: 3, alignItems: "center" }}>
                                    <Rtext style={{ color: Apptheme }}>{currency}</Rtext>
                                    <Rtext>470</Rtext>
                                    <Rtext style={DiagonsisCardStyle.middleRupeesTextStyle} fontSize={12}>
                                        {currency} 503
                                    </Rtext>
                                    <Rtext
                                        style={{
                                            paddingLeft: 5,
                                            color: Apptheme,
                                        }}
                                        fontSize={13} fontFamily='Ubuntu-Medium'>
                                        57% off
                                    </Rtext>
                                </View>
                                <View style={DiagonsisCardStyle.labView}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Rtext style={{ color: Apptheme }} fontSize={11}>Lab Test: </Rtext>
                                        <Rtext style={{ color: Apptheme }} fontSize={11} fontFamily='Ubuntu-Medium'>MRI</Rtext>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 3 }}>
                                    <Rtext style={{ color: Apptheme }} fontFamily='Ubuntu-Medium' fontSize={12}>Commission Amount:</Rtext>
                                    <Rtext style={{ color: "#747474", paddingLeft: 3 }} fontSize={12}>{currency}</Rtext>
                                    <Rtext style={{ color: "#747474" }} fontSize={12}>{100}</Rtext>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", }}>
                            <FontAwesome size={11} name={'calendar'} color={"#747474"} />
                            <Rtext fontSize={9} style={{ color: "#747474", paddingLeft: 5 }}>05 Oct 2023</Rtext>
                        </View>
                    </View>
                    <LineSeparator style={{}} />
                    <View style={[{ paddingBottom: 18 }, DiagonsisCardStyle.directionStyle]}>
                        <View style={DiagonsisCardStyle.calenderView}>
                            <FontAwesome size={11} name={'calendar'} color={Apptheme} />
                        </View>
                        <Rtext style={{ color: "#AA5D63", paddingLeft: 5 }}>Diagnosis Appointment Date:</Rtext>
                        <Rtext fontSize={13} fontFamily='Ubuntu-Medium' style={{ color: "#212129" }}>12 Oct 2023</Rtext>
                    </View>
                </View>
            </View>

            <BottomSheet
              hasDraggableIcon
              ref={bottomSheetForPatient}
              height={normalizeSize(200)}
              radius={30}
              sheetBackgroundColor={White}
              dragIconStyle={{width: normalizeSize(50), height: 2}}>
              <PatientDetailsModal
                bottomSheet={bottomSheetForPatient}
                consultationStatus={false}
                // patientModalData={patientModalData}
                // appoientmentId={appoientmentId}
                // availabilitId={route?.params?.availabilit_id}
                // patientMorePage={false}
                // patientStatus={patientStatus}
                // getDoctorBookingSlot={getDoctorBookingSlot}
              />
            </BottomSheet>
            <BottomSheet
                hasDraggableIcon
                ref={bottomSheetForClinic}
                height={normalizeSize(230)}
                radius={30}
                sheetBackgroundColor={White}
                dragIconStyle={{ width: normalizeSize(50), height: 2 }}>
                <ClinicDetailsByBottomSheet bottomSheet={bottomSheetForClinic} />
            </BottomSheet>
        </View>
    )
}
export default DiagnosisAppointmentCard;

const DiagonsisCardStyle = StyleSheet.create({
    statusStyle: {
        paddingVertical: 3,
        height: normalizeSize(20),
        // width: 60,
        borderRadius: 5,
        alignItems: 'center',
        // marginHorizontal: 7,
        paddingHorizontal: 5,
    },
    cardOuterView: {
        backgroundColor: White,
        // marginTop: 12,
        // paddingVertical: 14,
        borderRadius: 10,
        elevation: 5,
        // marginHorizontal: 24,
        marginBottom: 15,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
    },
    labView: { padding: 3, backgroundColor: "#D6FCFD", flexDirection: "row", alignSelf: "flex-start", borderRadius: 5 },
    directionStyle: { flexDirection: "row", alignItems: "center" }, calenderView: { padding: 5, backgroundColor: "#E5F9FA", alignSelf: "flex-start", borderRadius: 15 }
    , middleRupeesTextStyle: {
        paddingLeft: 5,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: Apptheme,
    },
})