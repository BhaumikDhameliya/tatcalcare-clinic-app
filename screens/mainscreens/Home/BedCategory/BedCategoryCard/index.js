import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Apptheme, Grey, White} from '../../../../../config/Colors';
import {Rtext} from '../../../../../components/Rtext';
import HospitalIconn from '../../../../../assets/icons/HospitalIconn.svg';
import {currency} from '../../../../../config/Constant';
import {normalizeSize} from '../../../../../utility';

const BedCategoryComponenet = ({
  item,
  index,
  options,
  chooseItemIndex,
  setChooseItemIndex,
  getItemFees = () => {}
}) => {
  //   const [chooseItemIndex, setChooseItemIndex] = useState(0);
  // console.log('chooseItemIndex', chooseItemIndex);

  return (
    <TouchableOpacity
      onPress={() => {
        item?.availableBeds !== '00' && (
          setChooseItemIndex(index),
          getItemFees(item?.price)
        )
      }}
      style={[
        BedCategoryComponenetStyle.cardOuterView,
        index == 0 && {marginTop: 15},
        {marginBottom: index !== options?.length - 1 ? 20 : 10},
        index == chooseItemIndex && item?.availableBeds !== '00' && {
          borderStyle: 'dashed',
          borderColor: Apptheme,
          borderWidth: 1.5,
        },
      ]}
      activeOpacity={item?.availableBeds !== '00' ? 0.2 : 1}
      >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={BedCategoryComponenetStyle.leftViewStyleListItem}>
          <View style={BedCategoryComponenetStyle.hospitalIconViewStyle}>
            <HospitalIconn
              height={normalizeSize(11)}
              width={normalizeSize(11)}
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <Rtext
              fontFamily="Ubuntu-Medium"
              fontSize={14}
              style={{color: '#212129'}}>
              {item?.name}
            </Rtext>
            <View
              style={BedCategoryComponenetStyle.availableBedsOuterViewStyle}>
              <View
                style={[
                  BedCategoryComponenetStyle.availableBedsViewStyle,
                  {
                    backgroundColor:
                      item?.availableBeds == '00' ? '#FFD8DB' : '#E5F9FA',
                  },
                ]}>
                <Rtext
                  style={{
                    color: item?.availableBeds == '00' ? '#DB4437' : Apptheme,
                  }}
                  fontSize={11}>
                  Available Beds:
                </Rtext>
                <Rtext
                  fontSize={11}
                  fontFamily="Ubuntu-Medium"
                  style={{
                    paddingLeft: 3,
                    color: item?.availableBeds == '00' ? '#DB4437' : Apptheme,
                  }}>
                  {item?.availableBeds}
                </Rtext>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Rtext style={{color: Apptheme}} fontSize={11}>
                {currency}
              </Rtext>
              <Rtext
                fontFamily="Ubuntu-Medium"
                style={{paddingLeft: 3}}
                fontSize={14}>
                {item?.price}
              </Rtext>
              <Rtext
                style={BedCategoryComponenetStyle.middleRupeesTextStyle}
                fontSize={12}>
                {currency} 503
              </Rtext>
              <Rtext
                style={{paddingLeft: 6, color: Apptheme}}
                fontFamily="Ubuntu-Medium"
                fontSize={12}>
                57% off
              </Rtext>
            </View>
          </View>
        </View>
        <View style={BedCategoryComponenetStyle.rightViewStyleListItem}>
          <Rtext style={{color: Grey, marginLeft: 'auto'}} fontSize={11}>
            Total Beds: {item?.totalBeds}
          </Rtext>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BedCategoryComponenet;

const BedCategoryComponenetStyle = StyleSheet.create({
  cardOuterView: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: White,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.8,
    elevation: 5,
    marginHorizontal: 15,
    borderRadius: 14,
  },
  middleRupeesTextStyle: {
    paddingLeft: 6,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Apptheme,
  },
  hospitalIconViewStyle: {
    height: normalizeSize(20),
    width: normalizeSize(20),
    borderRadius: 6,
    backgroundColor: Apptheme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftViewStyleListItem: {
    flexDirection: 'row',
    flex: 0.6,
  },
  rightViewStyleListItem: {
    flex: 0.4,
  },
  availableBedsViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
  availableBedsOuterViewStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 8,
  },
});
