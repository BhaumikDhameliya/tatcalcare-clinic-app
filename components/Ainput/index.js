import React, {useEffect} from 'react';
import {useController} from 'react-hook-form';
import {Platform, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  Apptheme,
  PlaceholderTextColor,
  TextInputOutLineColor,
  White,
  BoldColor,
  Grey
} from '../../config/Colors';
import {normalizeSize, SCREEN_HEIGHT} from '../../utility';
import IndiaLogo from '../../assets/icons/IndiaLogo.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Ainput = ({
  label = '',
  placeholder = '',
  mode = 'outlined',
  style = {},
  name = '',
  control,
  keyboardType = 'default',
  editable = true,
  fontSize = 13,
  color = PlaceholderTextColor,
  onChange,
  multiline = false,
  roundness = 12,
  fieldValue = () => {},
  has_flag = false,
  search = false,
  numberOfLines = 1,
  hasavataricon = false,
  hasphoneicon = false,
  hasemail = false,
  hasmapicon = false,
  onChangeText = val => {},
  activeOutlineColor=TextInputOutLineColor,
  textColor="#516F94",
  outlineColor=TextInputOutLineColor,
  maxLength=100
}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  useEffect(() => {
    fieldValue(field.value);
  }, [field.value]);

  return (
    <View style={{opacity: editable ? 1 : 1}}>
      {hasavataricon && (
        <View style={[styles.circleDesign, {top:normalizeSize(15)}, styles.logoStyle]}>
          <AntDesign name={'user'} size={normalizeSize(13) } color={Apptheme}/>
        </View>
      )}
      {hasphoneicon && (
        <View style={[styles.circleDesign, {top:normalizeSize(15)}, styles.logoStyle]}>
          <Feather name={'phone-call'} size={normalizeSize(13)} color={Apptheme} />
        </View>
      )}
      {hasemail && (
        <View style={[styles.circleDesign, {top:normalizeSize(15)}, styles.logoStyle]}>
          <Fontisto name={'email'} color={Apptheme} size={normalizeSize(13)}/>
        </View>
      )}
      {hasmapicon && (
        <View style={[styles.circleDesign, {top:normalizeSize(23)}, styles.logoStyle]}>
          <SimpleLineIcons name={'location-pin'} color={Apptheme} size={normalizeSize(13)}/>
        </View>
      )}
      {/* hasmapicon */}
      {has_flag && (
        <View style={[styles.logoStyle, 
          {top:Platform.OS =='ios' && SCREEN_HEIGHT < 800 ? normalizeSize(43) / 3.8 : Platform.OS == 'ios' ? normalizeSize(43) / 2.9 : normalizeSize(43) / 3}]}>
          <IndiaLogo />
        </View>
      )}

      <TextInput
        selectionColor={color}
        textColor={textColor}
        maxLength={maxLength}
        
        style={[
          {
            backgroundColor: editable ? White :'#F8F8FF',
            fontSize: normalizeSize(fontSize),
              paddingLeft:
              has_flag ||
              hasavataricon ||
              hasphoneicon ||
              hasemail ||
              hasmapicon
                ? 40
                : 0,
            // fontFamily: 'Ubuntu-Medium',
          },
          styles.inputStyle,
          style,
        ]}
        label={label}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        mode={mode}
        theme={{
          roundness: roundness,
          colors: {
            onSurfaceVariant: Grey
          },

        }}
        contentStyle={{ fontFamily: 'Ubuntu-Regular' }}
        autoCapitalize="none"
        value={field.value}
        onChange={onChange}
        onChangeText={field.onChange}
        activeOutlineColor={activeOutlineColor}
        outlineColor={outlineColor}
        // secureTextEntry={lcSecureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        placeholderTextColor={color}
        right={
          search && (
            <TextInput.Icon
              size={normalizeSize(20)}
              style={{marginTop: 15}}
              icon={'magnify'}
              // onPress={() => passwordEyeChange()}
              color={'red'}
            />
          )
        }
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    paddingBottom:3,
    // padding:5,
    // height: normalizeSize(43),
    borderColor: '#D7DDE9',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    
  },
    logoStyle: {
      position: 'absolute',
      zIndex: 10,
      left: 18,
    },
  circleDesign: {
    padding:7,
    borderRadius: 25,
    backgroundColor: '#E5F9FA',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Ainput;
