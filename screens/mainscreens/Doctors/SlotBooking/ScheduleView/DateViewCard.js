import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Apptheme, BoldColor, Grey, White } from '../../../../../config/Colors';
import { Rtext } from '../../../../../components/Rtext';

const DateViewCard = ({item = {},Appointment=false,selectedDate = () => {},sl_date,flatListRef,index ,setPressOnSelectDate,setSlotId=()=>{}, lb_loader = false}) => {
    // console.log('iremm..',item);

    const pressOnDateViewCard =()=>{
        if(!lb_loader) { 
            setSlotId("")
            setPressOnSelectDate(true)
            selectedDate(item);
            flatListRef.current.scrollToIndex({index: index, animated: true});
        }
    }
      
  
    return (
        <View style={[styles.outerview]}>
        <TouchableOpacity 

        onPress={()=>pressOnDateViewCard()} activeOpacity={1}>
            <View style={[styles.boxStyle,  { backgroundColor: item.dateref == sl_date  ? Apptheme : lb_loader ?  "#eeeeee" : White }]} >
                <View style={{ alignItems: 'center' }}>
                    <Rtext style={{ color: item.dateref == sl_date? White : Grey, bottom: 5 }} fontSize={12}>{item.day}</Rtext>
                    <Rtext style={{ color: item.dateref == sl_date ? White : lb_loader ? Grey : BoldColor }} fontFamily='Ubuntu-Medium'>{item.date}</Rtext>
                       {Appointment &&  <Rtext style={{ color: item.dateref == sl_date ? White : lb_loader ? Grey : '#DB4437',top:5 }} fontSize={11.5}>
                    B {item.BookingSlots}
                     </Rtext>}
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}
export default DateViewCard

const styles = StyleSheet.create({
    outerview: {
        flex: 0.25,
        // marginEnd: 0,
        paddingVertical:15,
        // paddingEnd:10,
        shadowColor: '#828282',
        elevation: 10,
        paddingHorizontal:8,
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
    },
    boxStyle: {
        width: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        paddingVertical: 20,
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6.0,
    },
})