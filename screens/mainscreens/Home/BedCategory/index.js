import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import HeaderCommon from '../../../../components/HeaderCommon';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import Styles from '../../../../Styles';
import DoctorHeaderCard from './DoctorHeaderCard';
import BedCategoryComponenet from './BedCategoryCard';
import FooterButton from '../../../../components/FooterButton';

const BedCategory = ({route}) => {
  const [chooseItemIndex, setChooseItemIndex] = useState(-1);
  const [ls_chooseItemFees, setChooseItemFees] = useState('')
  const options = [
    {
      name: 'General',
      availableBeds: '80',
      totalBeds: '100',
      price: '189',
    },
    {
      name: 'ICU',
      availableBeds: '00',
      totalBeds: '80',
      price: '200',
    },
    {
      name: 'Ventilator',
      availableBeds: '01',
      totalBeds: '20',
      price: '250',
    },
    {
      name: 'Cabin',
      availableBeds: '07',
      totalBeds: '50',
      price: '309',
    },
    {
      name: 'Paediatric',
      availableBeds: '12',
      totalBeds: '60',
      price: '180',
    },
    {
      name: 'Paediatric',
      availableBeds: '12',
      totalBeds: '60',
      price: '180',
    },
    {
      name: 'Paediatric',
      availableBeds: '12',
      totalBeds: '60',
      price: '180',
    },
  ];

  const getItemFees = (fees) => {
    setChooseItemFees(fees)
  }

  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={'Bed Category'}
        //   navigateBackto={'Home'}
          style={{ top: 20 }}
        />
      </View>
      <View
        style={[Styles.mainBodyStyle, { marginTop: 100, paddingHorizontal: 0 }]}>
        <View style={{ marginTop: -45, paddingHorizontal: 15 }}>
          <DoctorHeaderCard />
          <ScrollView showsVerticalScrollIndicator={false} style={{height: chooseItemIndex !== -1 ? '69%' : '75%'}}>
            <FlatList
              data={options}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <BedCategoryComponenet
                    item={item}
                    index={index}
                    chooseItemIndex={chooseItemIndex}
                    setChooseItemIndex={setChooseItemIndex}
                    options={options}
                    getItemFees={getItemFees}
                  />
                );
              }}
            />
          </ScrollView>

          {chooseItemIndex !== -1 && (
            <View style={{height:"31%"}}>
              <FooterButton fees={ls_chooseItemFees} setBedStatusTaken={route?.params?.setBedStatusTaken}/>
            </View>
          )}
        </View>
      </View>
    </LinearGradientComponent>
  );
};

export default BedCategory;
