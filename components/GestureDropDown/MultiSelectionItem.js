import {useTheme} from '@react-navigation/native';
import React  from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {SCREEN_WIDTH} from '../../utility';
import { Rtext } from '../Rtext';

const MultiSelectionItem = ({
  item,
  nameKey,
  valueKey,
  onOptionsPress,
  selectedValue,
  checked
}) => {
  const {colors, custom} = useTheme();

  const handleOptionPress = () => {
    onOptionsPress(item[nameKey], item[valueKey]);
  };



  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox.Android
        // status={selectedValue == item[valueKey] ? 'checked' : 'unchecked'}
        status={checked ? 'checked' : 'unchecked'}
        color={colors.primary}
        onPress={()=>onOptionsPress(item, !checked)}
      />
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', width: SCREEN_WIDTH}}
        // onPress={handleOptionPress}
        >
        <Rtext
          style={{
            color: selectedValue == item[valueKey] ? colors.primary : colors.text,
          }}
          fontSize={13}>
          {item[nameKey]}
        </Rtext>
      </TouchableOpacity>
    </View>
  );
};

export default MultiSelectionItem;
