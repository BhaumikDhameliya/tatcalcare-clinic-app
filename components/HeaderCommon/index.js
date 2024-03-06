import { StyleSheet, View,Platform} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BoldColor, White } from '../../config/Colors';
import { Rtext } from '../Rtext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { normalizeSize } from '../../utility';
import { useDispatch } from 'react-redux';
import {setPageOffSetValue} from "../../store/common"

const HeaderCommon = ({ headerName='', navigateBackto='', style }) => {
  // console.log("navigateBackto",navigateBackto);
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const navigationFunc =()=>{
    if(navigateBackto != ''){
    navigation.navigate(navigateBackto)}
    else {navigation.goBack()}
    dispatch(setPageOffSetValue(navigateBackto))
  }

  return (
      <View style={[headerCommonStyle.mainViewStyle, style]}>
          <View style={headerCommonStyle.iconViewPositonStyle}>
              <TouchableOpacity onPress={() => navigationFunc()}>
                    <View style={headerCommonStyle.iconViewStyle}>
                    <AntDesign
                        size={normalizeSize(13)}
                        name={'left'}
                        color={BoldColor}
                    />
                  </View>
              </TouchableOpacity>
          </View>
        <View style={headerCommonStyle.headerTextStyle}>
            <Rtext style={headerCommonStyle.headerText} fontFamily='Ubuntu-Medium'>
                {headerName}
            </Rtext>
        </View>
      </View>
  );
};

export default HeaderCommon;

const headerCommonStyle = StyleSheet.create({
  headerText: {
    color: White,
    textAlign: 'center',
    alignItems:'center'
  },
  mainViewStyle: {
    flexDirection: 'row',
    top: 30,
    paddingHorizontal: 31,
    flex: 1,
    padding: Platform.OS=='ios' ? 5 : 0
  },
  iconViewPositonStyle:{ 
    position: 'absolute',
    top: 0, 
    left: 24 
  },
  iconViewStyle: {
    padding: Platform.OS=="ios"? 5:6,
    backgroundColor: White,
    borderRadius:Platform.OS=="ios"? 20: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTextStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  }
});
