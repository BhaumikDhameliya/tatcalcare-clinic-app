import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import Amodal from '../Amodal';
import CalendarPicker from 'react-native-calendar-picker';
import Abutton from '../Abutton';
import { Rtext } from '../Rtext';
import LottieView from 'lottie-react-native';
import { Apptheme, BoldColor, Grey, White } from '../../config/Colors';
import { normalizeSize } from '../../utility';

const CustomRangePicker = ({
    nameType = false,
    calandermodalstatus = false,
    onClose,
    onRangeSelect,
    lo_onChangeDate,
    setOnChangeDate,
    setErrorMessage,
    errormessage
}) => {

    const onDateChange = (date, type) => {
        setOnChangeDate(prevState => ({
            ...prevState,
            [type]: date,
        }));
        setErrorMessage('');
    };
    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            config={{ gestureIsClickThreshold: 20 }}
            onSwipeDown={onClose}>
            <Amodal
                modalVisible={calandermodalstatus}
                close={false}
                style={{ backgroundColor: White }}>
                <Header />
                <View style={{ alignSelf: 'center', padding: 15 }}>
                    <CalendarPicker
                        textStyle={{ color: BoldColor }}
                        initialDate={lo_onChangeDate.START_DATE}
                        width={340}
                        onDateChange={onDateChange}
                        startFromMonday={true}
                        allowRangeSelection={true}
                        // minDate={new Date()}
                        // maxDate={new Date()}
                        allowBackwardRangeSelect={true}
                        selectedStartDate={lo_onChangeDate.START_DATE}
                        selectedEndDate={lo_onChangeDate.END_DATE}
                        disabledDatesTextStyle={{ opacity: 0.5 }}
                        selectedRangeStyle={{ backgroundColor: Apptheme }}
                    />
                </View>
                {errormessage && (
                    <Rtext fontSize={13} style={{ color: 'red' }}>
                        {errormessage}
                    </Rtext>
                )}
                <Abutton
                    name={nameType ? 'Search' : 'Submit'}
                    onPress={() => onRangeSelect(lo_onChangeDate)}
                    size={13}
                    style={{ width: '33%', height: 35, marginBottom: 15 }}
                />
            </Amodal>
        </GestureRecognizer>
    );
};

const Header = ({ Styles }) => {
    return (
        <View style={styles.header}>
            <Rtext fontSize={15}>{'Drag Down to Close'}</Rtext>
            <LottieView
                colorFilters={[
                    {
                        keypath: 'scroll_up',
                        color: Grey,
                    },
                ]}
                style={{
                    height: normalizeSize(35),
                    width: normalizeSize(35),
                }}
                source={require('../../assets/animation/swipeDown.json')}
                autoPlay
            />
        </View>
    );
};

export default CustomRangePicker;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 20,
        alignItems: 'center',
    },
});
