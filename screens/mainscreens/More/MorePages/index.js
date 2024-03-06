import {StyleSheet,View} from 'react-native';
import React from 'react';
import MorePageComponenet from './MorePageComponent';
import {page_list_arr} from '../PageList';

const MorePage = () => {
  return (
    <View style={{marginBottom:70}}>
      {page_list_arr.map((item, index) => {
        return (
          <View style={morepagesStyle.outerView} key={index}>
            <MorePageComponenet page_arr={item} />
          </View>
        );
      })}
    </View>
  );
};
export default MorePage;

const morepagesStyle = StyleSheet.create({
  outerView: {
    marginBottom: 20,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  }
});
