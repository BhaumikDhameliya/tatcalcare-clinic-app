import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PaperSelect} from 'react-native-paper-select';
import {useTheme} from '@react-navigation/native';
import {Apptheme, Grey, PlaceholderTextColor, White} from '../../config/Colors';
import {normalizeSize} from '../../utility';

const MultiSelectBox = ({
  la_subjectList,
  defaultValue = '',
  selectedId = [],
  selectedData = () => {},
  selectedParentData = () => {},
  selectedValue = [],
  label = '',
  backgroundColor = '#F6FCFF',
  disabled = false,
  hideSearchBarStatus = false,
}) => {
  let la_data = selectedId || [];
  const {colors, custom} = useTheme();
  const [backgroundcolor, setBackgroundcolor] = useState('#F6FCFF');
  const [la_subjectListForSelectBox, setSubjectListForSelectBox] = useState({
    value: '',
    list: la_subjectList,
    selectedList: [],
    error: '',
  });

  useEffect(() => {
    setBackgroundcolor(backgroundColor);
    let isMounted = true;
    let _getData = async () => {
      if (isMounted) {
        setSubjectListForSelectBox({
          ...la_subjectListForSelectBox,
          value:
            selectedValue.length > 0 ? selectedValue.toString() : defaultValue,
          selectedList: la_data,
        });
      }
    };
    _getData();
    return () => {
      isMounted = false;   
    };  
  }, []);

  const MultiSelectBoxStyles = getStyles(colors, custom);

  useEffect(() => {
    selectedData(la_subjectListForSelectBox.selectedList);
    selectedParentData(la_subjectListForSelectBox.selectedList);
  }, [la_subjectListForSelectBox.selectedList]);

  return (
    <View style={{marginTop: 5}}>
      <PaperSelect
        style={{color: 'red'}}
        disabled={disabled}
        label={label}
        value={la_subjectListForSelectBox.value}
        textInputBackgroundColor={backgroundcolor}
        textInputHeight={normalizeSize(43)}
        onSelection={value => {
          setSubjectListForSelectBox({
            ...la_subjectListForSelectBox,
            value: value?.text,                   
            selectedList: value?.selectedList,    
            error: '',
          });
        }}
        checkboxProps={{
          checkboxColor: Apptheme,
          checkboxLabelStyle: {color: Grey},
        }}
        textInputProps={{
          outlineColor: '#F3F8FE',
          activeOutlineColor: '#F3F8FE',
        }}
        arrayList={[...la_subjectListForSelectBox.list]}
        selectedArrayList={[...la_subjectListForSelectBox.selectedList]}
        errorText={la_subjectListForSelectBox.error}
        multiEnable={true}
        dialogStyle={{backgroundColor: White}}
        searchStyle={MultiSelectBoxStyles.searchStyle}
        textInputStyle={MultiSelectBoxStyles.textInputStyle}
        textInputMode="outlined"
        theme={{
          roundness: 12,
        }}
        // dialogButtonLabelStyle={{color:Apptheme}}
        dialogDoneButtonStyle={{color: Apptheme}}
        dialogCloseButtonStyle={{color: '#c2786b'}}
        dialogCloseButtonText={'Cancel'}
        dialogDoneButtonText={'Submit'}
        hideSearchBox={hideSearchBarStatus}
      />
    </View>
  );
};

export default MultiSelectBox;

const getStyles = (colors, custom) =>
  StyleSheet.create({
    searchStyle: {
      backgroundColor: White,
      borderColor: PlaceholderTextColor,
      borderWidth: 1,
      borderRadius: 6,
      height: normalizeSize(46),
      iconColor: Grey,
      textColor: Grey,
    },
    textInputStyle: {
      fontSize: normalizeSize(13.5),
      elevation: 10,
      shadowColor: '#dbd9d9',
      height: normalizeSize(40),
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.0,
    },
  });
