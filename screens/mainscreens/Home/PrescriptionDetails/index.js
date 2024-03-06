import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../components/HeaderCommon';
import Styles from '../../../../Styles';
import PatientDetailsCard from './PatientDetailsCard';
import SelectDropDown from '../../../../components/SelectDropDown';
import { normalizeSize } from '../../../../utility';
import { Apptheme, Grey, White } from '../../../../config/Colors';
import { useForm } from 'react-hook-form';
import PrescriptionUpload from './PrescriptionUpload';
import Ainput from "../../../../components/Ainput"
import Abutton from "../../../../components/Abutton"
import { useNavigation } from '@react-navigation/native';
import { Rtext } from '../../../../components/Rtext';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { currency } from '../../../../config/Constant';
import Entypo from "react-native-vector-icons/Entypo"

const statusForBookingConfirmPage = true;

const PrescriptionDetails = ({ route }) => {
    let index = route?.params?.index
    const { control, setValue } = useForm();
    const [bedtakenstatus, setBedStatusTaken] = useState(false)
    const navigation = useNavigation()
    let la_data = [
        { title: 'Diagnosis 1', value: 'Male' },
        { title: 'Diagnosis 2', value: 'Female' },
        { title: 'Diagnosis 3', value: 'Others' },
    ];

    return (
        <LinearGradientComponent>
            <ScrollView >
                <View style={{ flexDirection: 'row' }}>
                    <HeaderCommon
                        headerName={index == 0 ? "Choose Hospital" : 'Prescription Details'}
                        navigateBackto={'Home'}
                        style={{ top: 20 }}
                    />
                </View>
                <View
                    style={[Styles.mainBodyStyle, { marginTop: 110, paddingHorizontal: 0 }]}>
                    <PatientDetailsCard />
                    <View style={{ paddingHorizontal: 20, flex: 1, }}>
                        <View style={{ flex: index == 0 ? 0.80 : 0.70, }}>
                            <SelectDropDown
                                dropdownButtonStyle={PrescriptionDetailsStyle.dropdownButtonStyle}
                                control={control}
                                dropDownList={la_data}
                                label={index == 0 ? "Select Hospital" : "Select Diagnosis"}
                                name={'symptom_id'}
                                search={true}
                                color={Grey}
                            />
                            {index == 0 && bedtakenstatus ?
                                <View style={PrescriptionDetailsStyle.bedCatDesign}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <Rtext style={{ color: "#212129" }}>ICU</Rtext>
                                        <View style={{ flexDirection: "row" }}>
                                            <Rtext style={{ color: Apptheme, marginRight: 5 }} fontFamily='Ubuntu-Medium'>{currency}249</Rtext>
                                            <TouchableOpacity 
                                                onPress={()=>setBedStatusTaken(false)}
                                                style={{ backgroundColor: '#DB4437', borderRadius: 25 }}>
                                                <Entypo
                                                    name={'cross'}
                                                    color={'white'}
                                                    size={normalizeSize(18)}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View> : index == 0 ? 

                                <TouchableOpacity style={PrescriptionDetailsStyle.bedCatDesign} onPress={() => navigation.navigate("BedCategory",{setBedStatusTaken:setBedStatusTaken})}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <Rtext fontSize={15} fontFamily='Ubuntu-Medium' style={{ color: Apptheme, }}>Choose bed category</Rtext>
                                        <SimpleLineIcons name='arrow-right' size={normalizeSize(13)} color={"#747474"} />
                                    </View>
                                </TouchableOpacity> : null



                            }
                            <PrescriptionUpload />
                            <Ainput
                                placeholder="Description"
                                name="description"
                                roundness={12}
                                control={control}
                                multiline={true}
                                numberOfLines={3}
                                style={[PrescriptionDetailsStyle.inputStyle, { height: normalizeSize(100) }]}
                                fontSize={14.5}
                                color={Grey}
                                label={'Description'}
                                activeOutlineColor={Apptheme}
                            />
                        </View>
                        <View style={{ flex: index == 0 ? 0.20 : 0.30 }}>
                            <Abutton
                                name={'Submit'}
                                size={16}
                                style={PrescriptionDetailsStyle.btnStyle}
                                onPress={() => {index == 0 ? navigation.navigate("BookingConfirmed", {statusForBookingConfirmPage:statusForBookingConfirmPage}) : navigation.navigate("BookingConfirmed")}}
                            // onPress={()=>navigation.navigate("DiagnosisAppointment")}
                            />
                        </View>


                    </View>

                </View>
            </ScrollView>
        </LinearGradientComponent>
    )
}


export default PrescriptionDetails;
const PrescriptionDetailsStyle = StyleSheet.create({
    dropdownButtonStyle: {
        height: normalizeSize(43),
        width: '100%',
        backgroundColor: White,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 17,
        marginTop: 5,
        shadowColor: '#a3a3a3',
        elevation: 10,
    },
    inputStyle: {
        marginTop: 10,
        shadowColor: '#bdbbbb',
        elevation: 10,
        borderRadius: 12,
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
    },
    btnStyle: {
        height: normalizeSize(43),
        // width: '90%',
        // marginTop: 25,
    },
    bedCatDesign: { borderWidth: 1.5, borderColor: Apptheme, borderRadius: 10, padding: 15, marginBottom: 14 },

})