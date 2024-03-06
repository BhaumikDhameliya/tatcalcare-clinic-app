import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Rtext } from '../../../../components/Rtext'
import { Apptheme, BoldColor, Danger } from '../../../../config/Colors'
import LineSeparator from '../../../../components/LineSeparator'
import moment from 'moment-timezone'
import Rloader from '../../../../components/Rloader'
import { currency } from '../../../../config/Constant'
import FooterLoader from '../../../../components/FooterLoader'
import NoDataFound from '../../../../components/NoDataFound'
import { SCREEN_HEIGHT } from '../../../../utility'

const func_toAddZero = (number) => {
    return number < 10 ? "0" + number : number
}
const CompleteAndCancelBookingCard = ({ data = [], title = '', cancel = false, totalcount, totalEaring, lb_loaderForCompleted = "", lb_loaderForCanncelled = "", }) => {
    return (
        <View style={[]}> 
            { data.length==0? <Rloader /> : <View style={[styles.boxbackgroundCommon, { height: SCREEN_HEIGHT / 2.50 }]}>
                <View >
                    <View style={styles.boxouterView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Rtext fontFamily='Ubuntu-Medium' style={[styles.appoinmentText, { color: cancel ? Danger : Apptheme }]}>
                                {title}
                            </Rtext>
                            <View style={[styles.bookingNumber, { backgroundColor: cancel ? '#F4A0AE' : Apptheme }]}>
                                <Rtext
                                    fontSize={11.5}
                                    style={{ color: 'white', textAlign: 'center' }}>
                                    {func_toAddZero(totalcount)}
                                </Rtext>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Rtext fontSize={11.5} fontFamily='Ubuntu-Medium' style={{ color: cancel ? Danger : Apptheme }}>{currency} </Rtext>
                            <Rtext fontSize={14.5} fontFamily='Ubuntu-Medium' style={{ color: cancel ? Danger : BoldColor ,paddingRight:7}}>{func_toAddZero(totalEaring)}</Rtext>
                        </View>
                    </View>
                    <LineSeparator style={{ marginVertical: 17 }} />
                </View>
                {cancel ? <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        !lb_loaderForCompleted && (
                            <NoDataFound bodyText={'No  record found'} />
                        )
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Card styles={styles} data={data} item={item} index={index} cancel={cancel} />
                            </View>
                        );
                    }}
                />
                    : <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            !lb_loaderForCanncelled && (
                                <NoDataFound bodyText={'No  record found'} />
                            )
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <View >
                                    <Card styles={styles} data={data} item={item} index={index} cancel={cancel} />
                                </View>
                            );
                        }}
                    />
                }


            </View>}
        </View>
    )
}

const Card = ({ styles, data = [], item = {}, index = 0, cancel = false }) => {
    return (
        <View style={{ paddingHorizontal: 21, paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.iconStyle, { backgroundColor: cancel ? '#FFD8DB' : '#E5F9FA', }]}>
                        <Rtext fontSize={11.5} style={{ color: cancel ? Danger : BoldColor }}>
                            {func_toAddZero(index+1)}
                        </Rtext>
                    </View>
                    <View style={{ marginStart: 10 }}>
                        <Rtext fontSize={14.5}>
                            {item?.patient?.name}
                        </Rtext>
                        <Rtext fontSize={11.5} style={{ color: cancel ? Danger : Apptheme, top: 5 }}>
                            {moment(item?.doctor_booking_slot_details?.booking_from).format("Do MMM YY")} | {moment(item?.doctor_booking_slot_details?.booking_from).format('hh:mm A')}
                        </Rtext>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Rtext fontSize={11.5} fontFamily='Ubuntu-Medium' style={{ color: cancel ? Danger : Apptheme }}>{currency} </Rtext>
                    <Rtext fontSize={14.5} fontFamily='Ubuntu-Medium' style={{ color: cancel ? Danger : BoldColor }}>{func_toAddZero(item?.revenue_amount)}</Rtext>
                </View>
            </View>
            {index !== data?.length - 1 &&
                <LineSeparator style={{ marginVertical: 0, marginTop: 10 }} />}
        </View>
    )
}
export default CompleteAndCancelBookingCard

const styles = StyleSheet.create({
    boxouterView: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 17,
        justifyContent: 'space-between',
    },
    appoinmentText: {
        // paddingLeft: 10,
    },
    bookingNumber: {
        justifyContent: 'center',
        padding: 3,
        paddingHorizontal: 4,
        borderRadius: 6,
    },
    boxbackgroundCommon: {

        backgroundColor: '#FFFFFF', elevation: 10,
        borderRadius: 15, marginTop: 20, paddingBottom: 5,
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
    },
    iconStyle: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        bottom: 5
    },
})