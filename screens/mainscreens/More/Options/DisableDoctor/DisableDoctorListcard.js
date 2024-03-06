import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Rtext } from '../../../../../components/Rtext'
import { Apptheme, Grey, lightGrey } from '../../../../../config/Colors'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { normalizeSize } from '../../../../../utility'
import moment from 'moment'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const DisableDoctorListcard = ({ item = {} }) => {
    return (
        <View>
            <View style={styles.doctorlistStyle}>
        
                    <View style={{ }}>
                        <Rtext fontFamily='Ubuntu-Medium' style={{ color: Apptheme }} fontSize={14.5} >
                            {item?.user_details?.name}
                        </Rtext>
                        <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
                            <Rtext fontSize={11.5} style={{ marginTop: 2, color: Grey }} >
                                {`${item?.patient?.age} Years | `}
                            </Rtext>
                            <Rtext fontSize={11.5} style={{ marginTop: 2, color: Grey }}>{item?.patient?.mobile}</Rtext>
                        </View>
                    </View>
               
                <View>
                    <View style={styles.dateViewStyle}>
                        <Fontisto
                            name="calendar"
                            size={normalizeSize(11)}
                            color={Grey}
                            style={{ right: 5 }}
                        />
                        <Rtext fontFamily='Ubuntu-Medium' style={{ color: '#101010' }} fontSize={11.5}>
                            {moment(item.doctor_booking_slot_details?.booking_from).format("DD/MM/YYYY")}
                        </Rtext>
                    </View>
                    <View style={{flexDirection:"row",marginTop:3,alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <MaterialCommunityIcons name={'clock-time-five-outline'} color={lightGrey} style={{top:1,paddingRight:3}} size={normalizeSize(13)}/>
                            <Rtext fontSize={11.5} style={{ marginTop: 3, color: lightGrey }}>
                                {`${moment(item.doctor_booking_slot_details?.booking_from).format("hh:mm a")} -`}
                            </Rtext>
                        </View>
                       
                        <Rtext fontSize={11.5} style={{ marginTop: 3, color: lightGrey }}>
                            {moment(item.doctor_booking_slot_details?.booking_to).format("hh:mm a")}
                        </Rtext>
                    </View>
                </View>
            </View>
            <View
                style={[
                    {
                        marginHorizontal: 17,
                    },
                    styles.borderStyle,
                ]}/>
        </View>
    )
}

export default DisableDoctorListcard

const styles = StyleSheet.create({
    borderStyle: {
        borderColor: '#EEF2F5',
        borderWidth: 0.7,
    },
    doctorlistStyle: {
        paddingHorizontal: 24,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    imageStyle: {
        height:normalizeSize( 36),
        width:normalizeSize( 36),
        borderRadius: 25,
        borderColor: Apptheme,
        borderWidth: 0.8
    },
    dateViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
     
    }
})