import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderDoctorDetails from './HeaderDoctorDetails';
import MorePage from './MorePages';
import HeaderCommon from '../../../components/HeaderCommon';
import LinearGradientComponent from '../../../components/LinearGradientCom';
import Styles from '../../../Styles';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import {setCmsPage, setPageOffSetValue} from '../../../store/common';
import {request} from '../../../services';

const More = () => {
  const dispatch = useDispatch();
  const cms_arr = useSelector(state => state.common.cms_arr);
  const [la_cms, set_lacms] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setPageOffSetValue('More'));
    }, []),
  );
  // console.log("la_cms",la_cms);

  let page_arr = [
    {name: 'about-us'},
    {name: 'privacy-policy'},
    {name: 'terms-and-condition'},
    {name: 'contact-us'},
    {name: 'refund-policy'},
    {name: 'faq'},

  ];
  useEffect(() => {
    // if(cms_arr?.length==0){
      gettingCmsPage();
    // }
     
  }, []);

  const gettingCmsPage = async () => {
    const tempArr = []; 
    for (let index = 0; index < page_arr.length; index++) {
      const element = page_arr[index];
      try {
        let res = await request(
          'get',
          'cms-pages/name/' + page_arr[index].name,
        );
        tempArr.push(res.data.data)
      } catch (e) {
        console.log('e', e);
      } 
    }
    dispatch(setCmsPage(tempArr));

  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={'More'}
          navigateBackto={'Home'}
          style={{top: 20}}
        />
      </View>
      <View
        style={[Styles.mainBodyStyle, {marginTop: 90, paddingHorizontal: 0}]}>
        <HeaderDoctorDetails />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.morePageViewStyle}>
            <MorePage />
          </View>
        </ScrollView>
      </View>
    </LinearGradientComponent>
  );
};

export default More;
const styles = StyleSheet.create({
  morePageViewStyle: {
    paddingHorizontal: 24,
    paddingBottom:200,
    top: 5,
  },
});
