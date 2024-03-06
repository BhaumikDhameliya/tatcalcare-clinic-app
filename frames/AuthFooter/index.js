import {View, Image, Platform} from 'react-native';
import React from 'react';
import {normalizeSize, SCREEN_HEIGHT} from '../../utility';

const AuthFooter = () => {
  return (
    <View style={{bottom:Platform.OS =='ios' && SCREEN_HEIGHT < 800 ? normalizeSize(27)   : Platform.OS == 'ios' ? normalizeSize(44) :  0, left: 0, position: 'absolute'}}>
      <Image
        source={require('../../assets/images/fotterimage.png')}
        style={{width:Platform.OS =='ios' && SCREEN_HEIGHT < 800 ? normalizeSize(170) : Platform.OS == 'ios' ? normalizeSize(185) : 223, height: normalizeSize(70)}}
      />
    </View>
  );
};
export default AuthFooter;
