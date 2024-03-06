import {View} from 'react-native';
import React from 'react';
import { Rtext } from '../../../../components/Rtext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Apptheme, BoldColor, Grey } from '../../../../config/Colors';
import LineSeparator from '../../../../components/LineSeparator';

const FewTips = ({footerData}) => {

  return (
    <View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name="bulb-outline" size={20} color={Apptheme} />
                <Rtext style={{ paddingLeft: 10, color: Apptheme }} fontFamily='Ubuntu-Medium'>
                    {"Few Tips"}
                </Rtext>
            </View>
        </View>
      <LineSeparator style={{marginVertical:0}}/>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Rtext style={{ color:BoldColor }} fontFamily='Ubuntu-Medium'>
               {footerData?.title}
            </Rtext>
            <Rtext style={{ paddingTop: 9, color: Grey, lineHeight: 18, bottom:5 }} fontSize={12.5} >
              
                {footerData?.description}
            </Rtext>
        </View>
    </View>
  );
};

export default FewTips;
