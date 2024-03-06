import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useController } from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSearchDropDown from '../CustomSearchDropDown/index'
import { normalizeSize } from '../../utility';
import { Rtext } from '../Rtext';
import { Grey, TextInputOutLineColor,  } from '../../config/Colors';
import Entypo  from 'react-native-vector-icons/Entypo'
 
const SelectDropDown = ({
  label = 'Select',
  dropDownValue,
  control,
  useControl = true,
  name,
  dropDownList = [],
  dropdownButtonStyle = {
    height:normalizeSize(43),
    width: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: TextInputOutLineColor,
    marginBottom: 10
  },
  labelKey = 'title',
  valueKey = 'value',
  search = true,
  color={Grey},
  fontFamily =  'Ubuntu-Regular',
  setStateChanging = () => {},
}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });
  const styles = getStyles();
  
  useEffect(() => {
    setStateChanging(field.value);
  }, [field.value]);

  const getdropDownValue = value => {
    dropDownValue(value);
  };
  useEffect(() => {
    // dropDownValue(field.value);
  }, [field.value])
  
  return (
    <CustomSearchDropDown
      data={dropDownList}
      onSelect={(selectedItem, index) => {
        useControl
          ? field.onChange(selectedItem[valueKey])
          : getdropDownValue(selectedItem[valueKey]);
      }}
      defaultButtonText={
      <Rtext fontFamily={fontFamily} fontSize={14.5} style={{color:color}}>{ dropDownList.find(x => x[valueKey] == field?.value)?.[labelKey] || label}</Rtext> 
      }
      buttonTextAfterSelection={(selectedItem, index) => {
        return (
          <Rtext fontFamily={fontFamily} style={{fontSize: normalizeSize(15)}}>
            {selectedItem[labelKey]}
          </Rtext>
        );
      }}
      rowTextForSelection={(item, index) => {
        return item[labelKey];
      }}
      buttonStyle={dropdownButtonStyle}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <Entypo
            name={isOpened ? 'chevron-thin-up': 'chevron-thin-down' }
            color={Grey}
            size={normalizeSize(16)}
            style={{left:5}}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
      placeholderStyle={{color: '#999'}}
      searchPlaceHolder={'Search here'}
      searchPlaceHolderColor={'#000000'}
      searchInputTxtColor={'#000000'}
      searchInputStyle={{backgroundColor: '#FFFFFF'}}
      search={search ? 1 : null}
      renderSearchInputLeftIcon={() => {
        return <FontAwesome name={'search'} color={'#000000'} size={18} />;
      }}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    dropdown1BtnTxtStyle: {
      color: '#000000',
      textAlign: 'left',
      fontSize: normalizeSize(13),
    },
    dropdown1DropdownStyle: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
    },
    dropdown1RowStyle: {
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#C5C5C5',
      borderBottomWidth: 0.5,
      paddingHorizontal: 10,
    },
    dropdown1RowTxtStyle: {
      color: '#000000',
      textAlign: 'left',
      fontSize: normalizeSize(14),
    },
  });
export default SelectDropDown;
