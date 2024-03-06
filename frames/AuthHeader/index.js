import {StyleSheet, View, Image, Platform} from 'react-native';
import React from 'react';
import {normalizeSize, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility';
import LoinLogo from '../../assets/icons/LoinLogo.svg';

const AuthHeader = () => {
  return (
    <View>
        <Image
          style={authHeaderStyle.imagebackgroundStyle}
          source={require('../../assets/images/BackGroundTopImage.png')}
        />
        <View style={authHeaderStyle.bodypart}>
            <LoinLogo width={normalizeSize(200)}/>
        </View>
    </View>
  );
};

export default AuthHeader;

const authHeaderStyle = StyleSheet.create({
  imagebackgroundStyle: {
    width: SCREEN_WIDTH,
    height: Platform.OS =='ios' && SCREEN_HEIGHT < 800 ?
            normalizeSize(172) :  normalizeSize(162),
    resizeMode: 'cover',
    zIndex: 5,
  },
  bodypart: {
    width: '100%',
    height: '100%',
    top: normalizeSize(14),
    left:normalizeSize(60),
    paddingBottom: normalizeSize(60),
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 15,
  }
});
