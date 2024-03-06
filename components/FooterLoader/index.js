import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';
import { Apptheme } from '../../config/Colors';

const FooterLoader = ({style}) => {
          return (
            <View style={style}>
            <View style={styles.mainviwStyle}>
              <ActivityIndicator size="small" color={Apptheme} />
            </View>
            </View>
          ) 
};
    

export default FooterLoader

const styles = StyleSheet.create({
    mainviwStyle:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 10,
        backgroundColor:'#edebeb',
        borderRadius:90,
        width:'12%',
        marginBottom:10,
        alignSelf:'center',
        elevation:2,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.0,
        }
})