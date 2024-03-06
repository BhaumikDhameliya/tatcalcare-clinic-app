import { StyleSheet,View } from 'react-native'
import React from 'react'

const LineSeparator = ({style}) => {
  const LineSeparatorStyle = getStyles();

  return (
    <View style={[LineSeparatorStyle.lineSeparatorStyle,style]}> 
    </View>
  )
}

export default LineSeparator

const getStyles = (colors, custom) => StyleSheet.create({
    lineSeparatorStyle:{
        backgroundColor: '#EEF2F5',
        height: 1,
        marginVertical: 13,
        width:'100%'
    }
})