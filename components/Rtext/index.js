import React from 'react';
import {Text, View,Platform} from 'react-native';
import { BoldColor } from '../../config/Colors';
import { normalizeSize } from '../../utility';

const Rtext = ({
  style = {},
  normalizeFontSize = 0,
  fontSize = 14,
  lgFontSize = 0,
  smFontSize = 0,
  fontStyle = 'normal',
  children = '',
  fontWeight = 'normal',
  numberOfLines = 0,
  fontFamily =  'Ubuntu-Regular'
  
}) => {

  const cusStyle = {
    fontStyle,
    color: BoldColor,
    fontSize:
      normalizeFontSize == 0
        ? normalizeSize(Platform.OS=="ios"?fontSize-2:fontSize, lgFontSize, smFontSize)
        : normalizeFontSize,
    fontWeight,
    fontFamily:fontFamily,
  };

  return (
    <View>
      <Text
        style={[cusStyle, style]}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </View>
  );
};

export {Rtext};
