import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Rtext} from '../../../../components/Rtext';
import {White} from '../../../../config/Colors';
import {useSelector} from 'react-redux';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../config/Constant';

const ProfileDetails = () => {
  const user = useSelector(state => state.common.user);
  let clinic_details = user?.clinic_id;
  let phone_numbers = clinic_details?.contact_number.join(' | ');
  console.log(
    'image',
    `${Aws_Base_url}${base_upload_image_folder}${clinic_details?.profile_image}`,
  );
  return (
    <View style={styles.mainViewStyle}>
      <View style={{flex: 0.15}}>
        {user?.clinic_id?.clinic_logo ? (
          <Image
            source={{
              uri: `${Aws_Base_url}${base_upload_image_folder}${user?.clinic_id?.clinic_logo}`,
            }}
            style={{height: 36, width: 36, borderRadius: 36}}
          />
        ) : (
          <Image
            source={require('../../../../assets/images/profileImage.png')}
            style={{height: 36, width: 36}}
          />
        )}
      </View>
      <View style={{flex: 0.85}}>
        <Rtext
          fontFamily="Ubuntu-Medium"
          style={{color: White, paddingBottom: 3}}
          fontSize={16}>
          {clinic_details?.name}
        </Rtext>
        <Rtext
          style={{color: White}}
          fontSize={13.5}
          fontFamily="Ubuntu-Medium">
          {user?.email}
        </Rtext>
        {/* <View style={{flexDirection: 'row'}}> */}

        <Rtext
          style={{color: White, marginBottom: 5}}
          fontSize={13.5}
          fontFamily="Ubuntu-Medium">
          {phone_numbers}
        </Rtext>
        {/*  
        </View> */}
        <Rtext
          style={{color: White, bottom: 6}}
          fontSize={13.5}
          fontFamily="Ubuntu-Medium">
          {clinic_details?.address?.geo_address}
        </Rtext>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainViewStyle: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
});
export default ProfileDetails;
