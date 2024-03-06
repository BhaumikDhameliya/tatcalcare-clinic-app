import {useTheme} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {useController} from 'react-hook-form';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import { Apptheme, Grey } from '../../config/Colors';
import {Rtext} from '../Rtext';
const RadioGroup = ({
  la_radioList,
  titleKey,
  valueKey,
  control,
  name,
  style = style,
  fontSize = 13.5,
  setShowAddClass=()=>{},
  Edit=false,
  defaultValue,
  disabled=false
}) => {
  const {colors, custom} = useTheme();
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  const handleRadioButton = newValue => {
    field.onChange(newValue);
    setShowAddClass(newValue)
    //  handleRadioButtonClick(newValue);
  };
 
  return (
    <RadioButton.Group
      onValueChange={newValue => handleRadioButton(newValue)}
      value={ Edit?defaultValue: field.value}>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        {la_radioList.map((item, inx) => (
          <View
            key={inx}
            style={[
              style,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginEnd: 10,
              },
            ]}>
            <RadioButton.Android
              disabled={disabled}
              color={Apptheme}
              value={item[valueKey]}
              
            />
            <Rtext fontSize={fontSize} style={{color:Grey}}>
              {item[titleKey]}
            </Rtext>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

export default RadioGroup;
