import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, ScrollView, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import SingleSelectionItem from './SingleSelectionItem';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Rtext } from '../Rtext';
import Ainput from '../Ainput';
import { normalizeSize, removeArrayElement } from '../../utility';
import deepGrey from '../../config/Colors'
import MultiSelectionItem from './MultiSelectionItem';

const FullPageOptionsModal = ({
  dropDownHeader,
  nameKey = 'name',
  valueKey = 'value',
  la_options,
  onCancel,
  onOptionsPress,
  selectedValue,
  visible,
  search = false,
  onSearch = () => { },
  multiselection = false
}) => {
  const [la_MultiSelectedStudentIds, setMultiSelectedStudentIds] = useState([])
  const [la_selectedStudentData, setSelectedStudentData] = useState([])

  const [la_itemList, setItemList] = useState([]);
  // const {colors, custom} = useTheme();
  const Styles = getStyles();

  useEffect(() => {
    setItemList(la_options)
  }, [la_options])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchFilter = text => {
    onSearch(text.search || '')
    if (text.search) {
      const newData = la_itemList.filter(function (item) {
        const itemData = item[nameKey]
          ? item[nameKey].toUpperCase()
          : ''.toUpperCase();
        const textData = text.search.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      setItemList(newData);

    } else {
      setItemList(la_options);
    }
  };

  const handleOptionPress = (item, value) => {

    let la_tempMultiSelectedStudentIds = [...la_MultiSelectedStudentIds];
    let la_tempmultiselectedStudentsData = [...la_selectedStudentData]
    if (la_tempMultiSelectedStudentIds.includes(item._id)) {
      setMultiSelectedStudentIds(
        removeArrayElement(la_tempMultiSelectedStudentIds, item._id),
      );
      setSelectedStudentData(
        removeArrayElement(la_tempmultiselectedStudentsData, item),
      )
    }
    else {
      la_tempMultiSelectedStudentIds.push(item._id);
      la_tempmultiselectedStudentsData.push(item);
      setMultiSelectedStudentIds(la_tempMultiSelectedStudentIds);
      setSelectedStudentData(la_tempmultiselectedStudentsData)
    }
    { multiselection ? onOptionsPress(la_tempmultiselectedStudentsData) : onOptionsPress(item, value) }

  }

  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      config={{ gestureIsClickThreshold: 20 }}
      onSwipeDown={() => onCancel()}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => onCancel()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={Styles.container}>
          <Animatable.View
            style={Styles.viewContainer}>

            <Header Styles={Styles} dropDownHeader={dropDownHeader} />

            {search && <Ainput
              placeholder="Search"
              control={control}
              Iconname="magnify"
              name="search"
              size={25}
              style={{ marginVertical: 10, backgroundColor: '#15202B' }}
              fontSize={13}
              color={deepGrey}
              onChange={debounce(handleSubmit(searchFilter), 1000)}
            />}

            {la_itemList.length == 0 ? (
              //   <EmptyComponentFile />
              <></>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {la_itemList.map((item, inx) => (
                  <View key={inx}>
                    {multiselection ?
                      <MultiSelectionItem
                        nameKey={nameKey}
                        selectedValue={selectedValue}
                        valueKey={valueKey}
                        onOptionsPress={handleOptionPress}
                        item={item}
                        checked={la_MultiSelectedStudentIds.includes(item._id)}
                      />
                      : <SingleSelectionItem
                        nameKey={nameKey}
                        selectedValue={selectedValue}
                        valueKey={valueKey}
                        onOptionsPress={handleOptionPress}
                        item={item} />
                    }
                    {inx != la_itemList.length - 1 && (
                      <View
                        style={{
                          height: 0.5,
                          backgroundColor: 'grey',
                          marginVertical: 10,
                        }}></View>
                    )}
                  </View>
                ))}
              </ScrollView>
            )}
          </Animatable.View>
        </KeyboardAvoidingView>
      </Modal>
    </GestureRecognizer>

  );
};


const Header = ({ Styles, colors, dropDownHeader }) => {

  return (
    <View
      style={Styles.header}>
      <Rtext fontSize={15}>{dropDownHeader}</Rtext>
      <LottieView
        colorFilters={[
          {
            keypath: 'scroll_up',
            color: '#FFFFFF',
          },
        ]}
        style={{
          height: normalizeSize(35),
          width: normalizeSize(35),
        }}
        source={require('../../assets/animation/swipeDown.json')}
        autoPlay
      />
    </View>
  )
}

const getStyles = (colors, custom) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'rgba(17, 17, 17, 0.5)',
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      flex: 1,
    },
    viewContainer: {
      backgroundColor: '#22303C',
      padding: 15,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      height: '85%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 20,
      alignItems: 'center',
    }
  });


export default FullPageOptionsModal;
