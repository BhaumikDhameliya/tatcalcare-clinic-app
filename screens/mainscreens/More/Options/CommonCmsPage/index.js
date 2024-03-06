import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../../components/HeaderCommon';
import Styles from '../../../../../Styles';
import {useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {SCREEN_WIDTH} from '../../../../../utility';
import FooterLoader from '../../../../../components/FooterLoader';

const CommonCmsPage = () => {
  const cmspagename = useSelector(state => state.common.cms_dynamic_page);
  const cms_arr = useSelector(state => state.common.cms_arr);
  const cmsPageObj = cms_arr?.find(item => item.title === cmspagename);
  console.log("cmsPageObj",cmsPageObj);

  const baseStyle = { 
    color: 'black', // Set the text color to green for all text elements.
  };
  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={cmspagename}
          style={{top: 15}}
          navigateBackto={'More'}
        />
      </View>
      <View
        style={[Styles.mainBodyStyle, {marginTop: 35, paddingVertical: 15}]}>
        <ScrollView>
          <RenderHtml
            contentWidth={SCREEN_WIDTH}
            source={{html: cmsPageObj?.description}}
            baseStyle={baseStyle}
          />
        </ScrollView>

        {/* )} */}
        {/* <RenderHtml contentWidth={SCREEN_WIDTH} source={cmsPageObj?.description} baseStyle={baseStyle}/> */}
      </View>
    </LinearGradientComponent>
  );
};
export default CommonCmsPage;
