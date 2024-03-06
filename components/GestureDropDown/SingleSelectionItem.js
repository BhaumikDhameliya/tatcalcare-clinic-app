import {useTheme} from '@react-navigation/native';
import React  from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SCREEN_WIDTH} from '../../utility';
import { Rtext } from '../Rtext';

const SingleSelectionItem = ({
  item,
  nameKey,
  valueKey,
  onOptionsPress,
  selectedValue
}) => {
  const {colors, custom} = useTheme();

  const handleOptionPress = () => {
    onOptionsPress(item[nameKey], item[valueKey]);
  };



  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton.Android
        status={selectedValue == item[valueKey] ? 'checked' : 'unchecked'}
        color={colors.primary}
        onPress={handleOptionPress}
      />
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', width: SCREEN_WIDTH}}
        onPress={handleOptionPress}>
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

export default SingleSelectionItem;
