import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { normalizeSize } from '../../utility';
import { Rtext } from '../Rtext';
import Entypo from 'react-native-vector-icons/Entypo';
import FullPageOptionsModal from './FullPageOptionsModal';
import { BoldColor, Grey, TextInputOutLineColor } from '../../config/Colors';

const GestureDropDown = ({
  dropDownHeader,
  la_options = [],
  nameKey,
  valueKey,
  defaultName = '',
  name,
  iconStyle,
  textStyle,
  control,
  style = {},
  fontSize = 13,
  search = false,
  setChangeState = () => { },
  onSearch = () => { },
  editable = true,
  multiselection = false
}) => {
  const [ls_slelectFiledName, setslelectFiledName] = useState(defaultName);
  const [ls_data, setData] = useState([]);
  const [lb_showOptionsModal, setShowOptionsModal] = useState(false);
  const lb_conditionForLabel = ls_slelectFiledName != defaultName
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  useEffect(() => {
    try {
      const ls_name = (field && field?.value && la_options?.find(x => x[valueKey] == field?.value)[nameKey]) || defaultName;
      setslelectFiledName(ls_name)
    }
    catch (e) {
      setslelectFiledName(defaultName)
    }
  }, [field?.value, JSON.stringify(la_options)])

  const onDropDownClick = () => {
    setShowOptionsModal(true);
  };

  const handleOptionPress = (name, value) => {
    { multiselection ? setChangeState(name) : setChangeState(value) }
    { multiselection ? field.onChange(name) : field.onChange(value) }
    console.log('name........', name);
    setData(name)
    {
      !multiselection && setTimeout(() => {
        setShowOptionsModal(false)
      }, 300)
    }
  };

  return (
    <View style={{ opacity: editable ? 1 : 0.5 }}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.mainViewStyle,
        {
          borderTopWidth: lb_conditionForLabel ? 0 : 1,
        }, style,
        ]}
        onPress={onDropDownClick}>
        {lb_conditionForLabel &&
          <View style={styles.firstViewStyle}>
            <View style={styles.labelLeftViewStyle}></View>
            <View style={styles.labelViewStyle}>
              <Rtext style={{ color: BoldColor }} fontSize={13} numberOfLines={1}>
                {/* {defaultName} */}
              </Rtext>
            </View>
            <View style={styles.labelRightViewStyle}></View>
          </View>
        }
        <View style={[styles.mainContentViewStyle,
        {
          bottom: lb_conditionForLabel ? 9 : 0,
          top: lb_conditionForLabel ? null : 10,
        }]}>
          {!multiselection && <Rtext
            style={[
              { color: !field?.value ? 'grey' : 'white' },
              textStyle,
            ]}
            fontSize={fontSize}>
            {ls_slelectFiledName}
          </Rtext>}

          {multiselection &&
            <FlatList
              data={ls_data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => <Rtext>{ls_slelectFiledName}</Rtext>}
              renderItem={({ item, index }) => {
                setslelectFiledName(item.value)
                return <TouchableOpacity activeOpacity={1}>
                  <Rtext
                    style={[
                      { color: !field?.value ? 'grey' : 'white' },
                      textStyle,
                    ]}
                    fontSize={fontSize}
                  >
                    {`${item.value} ${index != ls_data.length - 1 ? ', ' : ''}`}
                  </Rtext>
                </TouchableOpacity>
              }} />}

          <Entypo
            name={'chevron-down'}
            color={Grey}
            style={[{ marginRight: 10, marginStart: 5 }, iconStyle]}
            size={normalizeSize(19)}
          />
        </View>
      </TouchableOpacity>

      {/* <FullPageOptionsModal
        search={search}
        nameKey={nameKey}
        dropDownHeader={dropDownHeader}
        valueKey={valueKey}
        selectedValue={field?.value}
        la_options={la_options}
        visible={editable ? lb_showOptionsModal : false}
        onCancel={() => setShowOptionsModal(false)}
        onOptionsPress={handleOptionPress}
        onSearch={onSearch}
        multiselection={multiselection}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainViewStyle: {
    height: normalizeSize(43),
    borderRadius: 10,
    borderColor: TextInputOutLineColor,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingLeft: normalizeSize(10),
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
    // bottom: 24
  },
  firstViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 11
  },
  labelLeftViewStyle: {
    // backgroundColor: TextInputOutLineColor,
    // height: 1,
    // width: "1.5%"
  },
  labelViewStyle: {
    // position: 'relative',
    // bottom: 10,
    // left: 5
  },
  labelRightViewStyle: {
    // backgroundColor: 'black',
    // height: 1,
    // left: 11,
    // flex: 1
  },
  mainContentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  }
})

export default React.memo(GestureDropDown);
