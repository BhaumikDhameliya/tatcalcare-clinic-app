import React from 'react';
import {View} from 'react-native';
import {normalizeSize, SCREEN_HEIGHT} from '../../utility';
import {Rtext} from '../Rtext';
import LottieView from 'lottie-react-native';
import {Apptheme} from '../../config/Colors';

const NoDataFound = ({bodyText="No Appointments Found",style}) => {
  return (
    <View
      style={[{
        alignItems: 'center',
        height:SCREEN_HEIGHT - normalizeSize(250),
        justifyContent:'center',
        width:'100%',
      },style]}>
      <LottieView
        colorFilters={[
          {
            keypath: 'scroll_up',
            color: '#FFFFFF',
          },
        ]}
        style={{
          height: normalizeSize(200),
          width: normalizeSize(200),
        }}
        source={require('../../assets/animation/lf20_jkbuwuhk.json')}
        autoPlay
      />
      <Rtext fontSize={18} style={{color: Apptheme,bottom:20}}>
        {bodyText}
      </Rtext>
    </View>
  );
};
export default NoDataFound;
