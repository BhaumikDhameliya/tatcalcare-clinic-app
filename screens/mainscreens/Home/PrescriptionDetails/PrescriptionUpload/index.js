import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Apptheme, White } from '../../../../../config/Colors';
import { Rtext } from '../../../../../components/Rtext';
import Octicons from "react-native-vector-icons/Octicons"
import { normalizeSize } from '../../../../../utility';
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
const PrescriptionUpload = () => {
    let documents = [{ name: "atanu" }, { name: "shan" },]
    return (
        <View>
            <View style={prescriptionUploadStyle.borderDeisgn}>
                <View style={prescriptionUploadStyle.directionStyle}>
                    <Rtext fontSize={15} style={{ color: Apptheme }} fontFamily='Ubuntu-Medium'>Upload Your Prescription</Rtext>
                    <>
                        <View style={prescriptionUploadStyle.uploadButton}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                {/* {buttonLoader ? (
                                <ActivityIndicator color="#fff" size={15} />
                            ) : ( */}
                                <>
                                    <Octicons color={White} name={'upload'} size={18} />
                                    <Rtext style={prescriptionUploadStyle.uploadText}>Upload</Rtext>
                                </>
                                {/* )} */}
                            </TouchableOpacity>
                        </View>
                    </>
                </View>
            </View>
            <View style={{marginTop:7}}>
                {documents?.map((item,inx) => <View style={prescriptionUploadStyle.documentCardStyle}>
                    <View style={prescriptionUploadStyle.directionStyle}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AntDesign name='pdffile1' size={normalizeSize(16)} color={Apptheme}/>
                            {/* <Image source={require("../../../../../assets/images/Hepotalogy3.png")} style={{ height: normalizeSize(25), width: normalizeSize(15) }} /> */}
                            <Rtext fontSize={12} style={{ color: "#747474", paddingLeft: 15 }}>My prescription 1.pdf</Rtext>
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#DB4437', borderRadius: 25 }}>
                            <Entypo
                                name={'cross'}
                                color={'white'}
                                size={normalizeSize(18)}

                            />
                        </TouchableOpacity>
                    </View>
                </View>)}
            </View>



        </View>
    )


}

export default PrescriptionUpload;

const prescriptionUploadStyle = StyleSheet.create({
    uploadButton: {
        borderRadius: 6,
        backgroundColor: Apptheme,
        // padding: 10,
        // paddingHorizontal: 5,
        paddingVertical: 8,
        width: '29%',

    },
    uploadText: {
        color: White,
        fontSize: normalizeSize(13.5),
        fontFamily: 'Ubuntu-Medium',
    },
    borderDeisgn: { borderWidth: 1.5, borderColor: Apptheme, borderStyle: "dashed", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
    directionStyle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },documentCardStyle:{ borderWidth: 1, borderColor: "#EEF2F5", borderRadius: 10, padding: 10, marginTop: 10 }
})