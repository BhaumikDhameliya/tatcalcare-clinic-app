import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradientComponent from '../../../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../../../components/HeaderCommon';
import Styles from '../../../../../../Styles';
import {normalizeSize, showFlashMessage} from '../../../../../../utility';
import Ainput from '../../../../../../components/Ainput';
import {useForm} from 'react-hook-form';
import Abutton from '../../../../../../components/Abutton';
import {Apptheme, BoldColor, Grey, White} from '../../../../../../config/Colors';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {request} from '../../../../../../services';
import {useNavigation} from '@react-navigation/core';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ImagePickerModal from './ImagePickerModal';
import {Image} from 'react-native';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../../../config/Constant';
import {useDispatch} from 'react-redux';

const EditProfile = ({route}) => {
  const [profileimage, setProfileImage] = useState('');
  const [profiletempPhoto, setProfileTempPhoto] = useState('');
  const [loader, setLoader] = useState(false);
  const [loaderForImg, setLoaderForImg] = useState(false);
  
  const {control, setValue, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const bottomSheet = useRef();
  const navigation = useNavigation();

  let profile_details = route?.params?.profileDetails;

  useEffect(() => {
    setValue('name', profile_details?.name);
    setValue('doctorEmail', profile_details?.email);
    setValue('mobile', profile_details?.mobile);
    setValue('address', 'Module 905, BN4 Webel, Kolkata, West- Bengal 700091.');
  }, []);

  const updateProfile = async formdata => {
    setLoader(true);
    let formValue = {...formdata};
    profiletempPhoto.length != 0 &&
      (formValue = {...formdata, profile_image: profiletempPhoto});
    try {
      let response = await request('put', 'common/update-profile', formValue);
      if (response) {
        showFlashMessage(response.data.message, '', 'success');
        route?.params?.getuserProfileDetails();
        navigation.goBack();
        setLoader(false);
      }
    } catch (e) {
      console.log('e', e);
      // showFlashMessage('Invalid Otp', '', 'danger');
    }
    setLoader(false);
  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={'Edit Profile'}
          navigateBackto={'Profile'}
          style={{top: 20}}
        />
      </View>
      <View style={[Styles.mainBodyStyle, {top: normalizeSize(20), flex: 1}]}>
        <View style={EditProfileStyle.bodypositionStyle}>
          {loaderForImg ? (
            <View style={{height: normalizeSize(70), width: normalizeSize(70), borderRadius: normalizeSize(65), backgroundColor: Grey, alignItems:'center', justifyContent: 'center'}}>
              <ActivityIndicator
                color={Apptheme}
                style={{}}
                size={normalizeSize(30)}
              />
            </View>
          ) : profileimage || profile_details.profile_image ? (
            <Image
              source={{
                uri:
                  profileimage ||
                  `${Aws_Base_url}${base_upload_image_folder}${profile_details.profile_image}`,
              }}
              height={normalizeSize(70)}
              width={normalizeSize(70)}
              style={{borderRadius: normalizeSize(65)}}
            />
          ) : (
            <View style={EditProfileStyle.imagerView}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 60,
                  backgroundColor: 'grey',
                }}
                source={{
                  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
                }}
              />
            </View>
          )}

          <TouchableOpacity
            style={EditProfileStyle.cameraviewer}
            onPress={() => bottomSheet.current.show()}>
            <Entypo name={'camera'} size={normalizeSize(12)} color={Apptheme} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.8}}>
          <View style={{marginTop: 20}}>
            <Ainput
              placeholder="Name"
              name="name"
              roundness={12}
              control={control}
              style={EditProfileStyle.inputStyle}
              hasavataricon
              fontSize={14.5}
              color={BoldColor}
            />
          </View>
          <Ainput
            placeholder="Doctor Email"
            name="doctorEmail"
            roundness={12}
            control={control}
            style={EditProfileStyle.inputStyle}
            hasemail
            fontSize={14.5}
            editable={false}
          />

          <Ainput
            placeholder="Doctor Phone"
            name="mobile"
            roundness={12}
            control={control}
            style={EditProfileStyle.inputStyle}
            hasphoneicon
            fontSize={14.5}
            editable={false}
          />
          {/* <Ainput
            placeholder="Doctor Address"
            name="address"
            roundness={12}
            control={control}
            multiline={true}
            numberOfLines={3}
            style={[EditProfileStyle.inputStyle, {height: normalizeSize(120)}]}
            hasmapicon
            fontSize={14.5}
          /> */}
        </View>
        <View style={{flex: 0.2}}>
          <Abutton
            style={{backgroundColor: Apptheme}}
            name={'Update'}
            size={16.5}
            fontFamily="Ubuntu-Medium"
            disble={loaderForImg? true : false}
            onPress={handleSubmit(updateProfile)}
            loader={loader}
          />
        </View>
      </View>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={normalizeSize(140)}
        radius={30}
        sheetBackgroundColor={White}
        dragIconStyle={{width: normalizeSize(50), height: 2}}>
        <ImagePickerModal
          setProfileImage={setProfileImage}
          bottomSheet={bottomSheet}
          setProfileTempPhoto={setProfileTempPhoto}
          // loaderForImg={loaderForImg}
          setLoaderForImg={setLoaderForImg}
        />
      </BottomSheet>
    </LinearGradientComponent>
  );
};

export default EditProfile;

const EditProfileStyle = StyleSheet.create({
  bodypositionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -45,
  },
  imagerView: {
    // backgroundColor: '#F3F8FE',
    // paddingHorizontal: normalizeSize(15),
    // paddingTop: normalizeSize(10),
    // borderRadius: normalizeSize(70),
    // overflow: 'hidden',
  },
  cameraviewer: {
    padding: 6,
    backgroundColor: White,
    borderRadius: 20,
    elevation: 4,
    position: 'absolute',
    bottom: normalizeSize(5),
    right: normalizeSize(106),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  inputStyle: {
    marginBottom: 15,
    shadowColor: '#bdbbbb',
    elevation: 10,
    borderRadius: 12,
    backgroundColor: White,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.0,
  },
});
