import { StyleSheet, View } from 'react-native';
import React from 'react';
import { normalizeSize } from '../../../../../utility';
import { Apptheme, BoldColor } from '../../../../../config/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { Rtext } from '../../../../../components/Rtext';
import PlusIcon from '../../../../../assets/icons/PlusIcon.svg';
import EveningIcon from '../../../../../assets/icons/EveningIcon.svg'
const CommonSelectSlotHeader = ({time='',icon=''}) => {
    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.textViewStyle}>
            { time == 'Evening' ?
              <EveningIcon/>
               : <Feather name={icon} size={normalizeSize(14)} color={BoldColor} />}
                <Rtext fontFamily='Ubuntu-Medium' fontSize={12.5} style={{ left: 8 }}>{time}</Rtext>
            </View>
            {/* <View style={styles.textViewStyle}>
                <PlusIcon style={{ right: 5 }} height={16} />
                <Rtext fontFamily='Ubuntu-Medium' fontSize={11.5} style={{ color: Apptheme }}>Add slot</Rtext>
            </View> */}
        </View>
    )
}

export default CommonSelectSlotHeader

const styles = StyleSheet.create({
    mainViewStyle: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        top:15 ,
    },
    textViewStyle: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    }
})