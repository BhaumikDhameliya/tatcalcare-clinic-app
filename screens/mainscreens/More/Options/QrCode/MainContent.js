import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Rtext} from '../../../../../components/Rtext';
import {Apptheme, Grey} from '../../../../../config/Colors';
import Qr from '../../../../../assets/icons/Qr.svg';
import {useSelector} from 'react-redux';
import {Image} from 'react-native';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../../config/Constant';

const MainContent = () => {
  const user = useSelector(state => state.common.user);

  return (
    <View style={styles.mainViewStyle}>
      <Rtext fontFamily="Ubuntu-Medium" fontSize={16.5}>
        SCAN QR CODE
      </Rtext>
     
      <View style={{ alignItems: 'center'}}>
        <Image
          source={{
            uri: `${Aws_Base_url}${base_upload_image_folder}${user?.clinic_id?.qr_code}`,
          }}
          style={{height:350,width:260}}
        />
        {/* <Qr width={350} height={260} /> */}
        <Rtext style={{color: Apptheme}} fontFamily="Ubuntu-Bold" fontSize={17}>
          {user?.clinic_id?.name}
        </Rtext>
      </View>
    </View>
  );
};

export default MainContent;

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    padding: 24,
  },
});
