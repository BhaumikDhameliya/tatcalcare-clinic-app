import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Rtext} from '../../../../../components/Rtext';
import {BoldColor, Grey, White} from '../../../../../config/Colors';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../../config/Constant';
import {TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const SpecialityCard = ({item = {}}) => {
  const navigation = useNavigation();

  const handlePressOnCard = () => {
    navigation.navigate('Doctors', {departmentdata: item, navigationStatus: 'Department'});
  };

  return (
    <View style={styles.innerStyle}>
      <TouchableOpacity
        style={[styles.boxinnerview]}
        onPress={() => handlePressOnCard()}>
        <View style={styles.boxContainViewStyle}>
          <View style={styles.imageView}>
            <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${item?.image}`,
              }}
              style={{height: 20, width: 20}}
            />
          </View>
          <Rtext style={{color: BoldColor, top: 1}}>{item.name}</Rtext>
          <Rtext fontSize={11} style={{color: Grey, top: 3}}>
            {`${item.doctorCount} specialists`}
          </Rtext>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpecialityCard;

const styles = StyleSheet.create({
  innerStyle: {
    marginTop: 13,
    maxWidth: '48%',
    minWidth: '48%',
    paddingHorizontal: 2,
    // marginHorizontal: 1,
  },
  boxinnerview: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
    elevation: 3,
    backgroundColor: White,
   
  },
  imageView: {
    backgroundColor: '#E5F9FA',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  boxContainViewStyle: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
