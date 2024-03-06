import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { Apptheme } from '../../config/Colors';
import { SCREEN_HEIGHT } from '../../utility';
import { Rtext } from '../Rtext';


const Rloader = ({color = Apptheme, backgroundColor = '#d3d3d3', text=''}) => {
  return (
    <View style={{backgroundColor:backgroundColor,flex:1,height:SCREEN_HEIGHT}}>
    <Spinner color={color} visible={true}></Spinner>
    <Rtext>{text}</Rtext>
    </View>

  );
};
const RloaderStyle = StyleSheet.create({
    container: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Rloader;
