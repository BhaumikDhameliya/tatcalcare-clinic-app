import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Styles from '../../../../Styles';
import HeaderCommon from '../../../../components/HeaderCommon';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import Ainput from '../../../../components/Ainput';
import { useForm } from 'react-hook-form';
import { Apptheme, Grey, White } from '../../../../config/Colors';
import { sec_header_tab_list } from '../../Analytics/HeaderTabList';
import HeaderTabComponent from '../../Analytics/HeaderTabComponent';
import { normalizeSize } from '../../../../utility';
import SelectDropDown from '../../../../components/SelectDropDown';
import { Rtext } from '../../../../components/Rtext';
import { currency } from '../../../../config/Constant';
import DiagnosisAppointmentCard from './DiagnosisAppointmentCard';


let lb_noMoreFetachData = false
const DiagnosisAppointment = ({route}) => {
    const { control, setValue } = useForm();
    const [currentIndexForDays, setCurrentIndexForDays] = useState(0);
    const [day_limit, setDayLimit] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectdate, setDateRange] = useState({ form_date: '', to_date: '', START_DATE: new Date(), END_DATE: new Date() });
    const [DiagnosisAppointment, setDiagnosisAppointment] = useState([])

    let la_data = [
        { title: 'male', value: 'Male' },
        { title: 'female', value: 'Female' },
        { title: 'others', value: 'Others' },
    ];

    let la_diagnosisAppointment = [{ name: "atanu" }, { name: "shan" }]
    return (
        <ScrollView>
        <LinearGradientComponent>
            <View style={{ flexDirection: 'row' }}>
                <HeaderCommon
                    headerName={route?.params?.pageName=="Diagnostic"? 'Diagnosis Appointment' : "Hospital Appointment"}
                    navigateBackto={'Home'}
                    style={{ top: 20 }}
                />
            </View>
            <View
                style={[Styles.mainBodyStyle, { marginTop: 80, paddingHorizontal: 0 }]}>
                <View style={{ marginTop: -30, paddingHorizontal: 15 }}>
                    <Ainput
                        placeholder="Search patient by Ph no. / Name"
                        name="doctorName"
                        control={control}
                        style={DiagnosisAppointmentStyle.inputStyle}
                        search
                        fontSize={14}
                        color="#747474"
                        searchIconColor={Apptheme}

                    />
                    <View style={[DiagnosisAppointmentStyle.tabOuterView,]}>
                        {sec_header_tab_list?.map((item, inx) => {
                            return (
                                <HeaderTabComponent
                                    tabdetails={item}
                                    today={true}
                                    width={'25%'}
                                    key={inx}
                                    index={inx}
                                    // prevTabSelection={prevTabSelection}
                                    // setPrevTabSelection={setPrevTabSelection}
                                    currentIndexForDays={currentIndexForDays}
                                    setCurrentIndexForDays={setCurrentIndexForDays}
                                    setDayLimit={setDayLimit}
                                    setCurrentPage={setCurrentPage}
                                    lb_noMoreFetachData={lb_noMoreFetachData}
                                    // setAppointmentData={setAppointmentData}
                                    setData={setDiagnosisAppointment}
                                    setDateRange={setDateRange}
                                    selectdate={selectdate}
                                />
                            );
                        })}
                    </View>
                    <View style={DiagnosisAppointmentStyle.dropdownOuterStyle}>
                        <SelectDropDown
                            dropdownButtonStyle={DiagnosisAppointmentStyle.dropdownButtonStyle}
                            control={control}
                            dropDownList={la_data}
                            label="Select Center"
                            name={'symptom_id'}
                            search={true}
                            color={Grey}

                        />
                        <SelectDropDown
                            dropdownButtonStyle={DiagnosisAppointmentStyle.dropdownButtonStyle}
                            control={control}
                            dropDownList={la_data}
                            label="Select Status"
                            name={'symptom_value'}
                            search={true}
                            color={Grey}

                        />
                    </View>
                    <View style={DiagnosisAppointmentStyle.cardView}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{}}>
                                <Rtext style={{ color: White, marginBottom: 4 }} fontFamily='Ubuntu-Medium' fontSize={13}>Total Earning :</Rtext>
                                <Rtext style={{ color: White }} fontSize={12}>Commission Amount</Rtext>
                            </View>
                            <Rtext style={{ color: White }} fontFamily='Ubuntu-Medium'>{`${currency} 259`}</Rtext>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        {la_diagnosisAppointment?.map((item, inx) => <DiagnosisAppointmentCard key={inx} />)}
                    </View>
                </View>

            </View>


        </LinearGradientComponent>
        </ScrollView>
    )
}
export default DiagnosisAppointment;
const DiagnosisAppointmentStyle = StyleSheet.create({
    tabOuterView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        marginLeft: -4,
        marginRight: -4,
    },
    dropdownButtonStyle: {
        height: normalizeSize(43),
        width: '48%',
        backgroundColor: White,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 13,
        marginTop: 5,
        shadowColor: '#a3a3a3',
        elevation: 10,
        borderColor: Apptheme,
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
    },
    inputStyle: {
        borderRadius: 10, shadowColor: '#bdbbbb',
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.84,
    },
    dropdownOuterStyle: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    cardView:{ padding: 10, backgroundColor: "#19E7D2", borderRadius: 10, marginVertical: 3 }
})