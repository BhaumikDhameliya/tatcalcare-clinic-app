import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import { Rtext } from '../../../../../components/Rtext';
import { Apptheme, BoldColor, Grey, White } from '../../../../../config/Colors';
import { normalizeSize } from '../../../../../utility';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import PatientDetailsModal from '../../BookingDetails/BookingHeader/PatientDetailsModal';

const DoctorHeaderCard = () => {
    const bottomSheet = useRef();

    return (
        <View>
          <TouchableOpacity activeOpacity={1} style={styles.headerOuterView} onPress={() => bottomSheet.current.show()}>
            <View style={styles.mainViewStyle}>
                <Image style={{ height: 60, width: 60, borderRadius: 60, backgroundColor: "grey" }} source={require("../../../../../assets/images/patinetAvatar.png")} />
                <View style={styles.mainViewStyle}>
                    <View style={styles.textViewStyle}>
                        <Rtext
                            style={{ color: BoldColor }}
                            fontSize={16}
                            fontFamily="Ubuntu-Bold">
                            {"Atanu Saha"}
                        </Rtext>
                        <View style={styles.innerview}>
                            <Feather
                                name="phone-call"
                                color={Apptheme}
                                size={normalizeSize(12)}
                            />
                            <Rtext style={{ paddingLeft: 5 }} fontSize={12}>
                                {"+91 7319434831"}
                            </Rtext>
                        </View>
                    </View>
                    <View style={styles.iconViewStyle}>
                        <Entypo color={Grey} name={'chevron-thin-right'} />
                    </View>
                </View>
            </View>
          </TouchableOpacity>

          <BottomSheet
              hasDraggableIcon
              ref={bottomSheet}
              height={normalizeSize(200)}
              radius={30}
              sheetBackgroundColor={White}
              dragIconStyle={{width: normalizeSize(50), height: 2}}>
              <PatientDetailsModal
                bottomSheet={bottomSheet}
                consultationStatus={false}
                // patientModalData={patientModalData}
                // appoientmentId={appoientmentId}
                // // availabilitId={route?.params?.availabilit_id}
                // patientMorePage={false}
                // patientStatus={patientStatus}
                // getDoctorBookingSlot={getDoctorBookingSlot}
              />
            </BottomSheet>
        </View>
    )
}
export default DoctorHeaderCard;

const styles = StyleSheet.create({
    headerOuterView: {
        backgroundColor: White,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 20,
        flexDirection: 'row',
        elevation: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 5,
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
        paddingTop: 3,
    },
    mainViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    textViewStyle: {
        flex: 0.9,
        paddingLeft: 15
    },
    iconViewStyle: {
        flex: 0.1,
        alignItems: 'flex-end',
        paddingRight: 3
    }
});