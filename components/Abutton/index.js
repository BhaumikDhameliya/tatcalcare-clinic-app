import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Rtext } from '../Rtext';
import { normalizeSize } from '../../utility';
import { Apptheme, White } from '../../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Abutton = ({ name="Submit", onPress = () => { }, textColor = White,fontFamily='Ubuntu-Regular',
loader = false, style = {}, size, disble = false,icon=false }) => {
  const AButtonStyles = getStyles();

  return (
    <TouchableRipple style={[AButtonStyles.default, style, { opacity: disble ? 0.5 : 1 }]} onPress={(e) => !disble && !loader ? onPress(e) : () => { }}>
      <View style={AButtonStyles.iconViewStyle}>
        {icon && <FontAwesome
          name={'share'}
          color={White}
          style={{ top: 3, right: 8 }}
          size={normalizeSize(20)}
        />}
        {loader ? <ActivityIndicator color="#fff" /> : <Rtext
          style={{ color: textColor,left: icon? 8 : 0}}
          fontSize={normalizeSize(size)}
          fontFamily={fontFamily}
          >
          {name}
        </Rtext>}
      </View>
    </TouchableRipple>
  );
};

export default Abutton;

const getStyles = (colors, custom) =>
  StyleSheet.create({
    default: {
      height: normalizeSize(43),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Apptheme,
      marginTop: 12,
      borderRadius: 12,
    },
    iconViewStyle:{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingHorizontal: 15 
      }
  });
