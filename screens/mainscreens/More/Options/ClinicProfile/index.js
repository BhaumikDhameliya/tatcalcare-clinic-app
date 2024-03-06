import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import Styles from '../../../../../Styles';
import HeaderCommon from '../../../../../components/HeaderCommon';
import EditIcon from '../../../../../assets/icons/EditIcon.svg';
import {Apptheme, White} from '../../../../../config/Colors';
import {Rtext} from '../../../../../components/Rtext';
import Zocial from 'react-native-vector-icons/Zocial';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {normalizeSize} from '../../../../../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from '../../../../../services';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Aws_Base_url,base_upload_image_folder} from '../../../../../config/Constant'

const ClicnicProfile = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.common.user);
  let clinic_details = user?.clinic_id;
  let phone_numbers = clinic_details?.contact_number.join(' | ');
  console.log('user',clinic_details.clinic_logo);

  const la_profileData = [
    // {
    //   Name: 'Email Address',
    //   icon: <Zocial size={normalizeSize(20)} name={'email'} color={Apptheme} />,
    //   details: user?.email,
    // },
    {
      Name: 'Phone Number',
      icon: (
        <Ionicons size={normalizeSize(20)} name={'call'} color={Apptheme} />
      ),
      details: phone_numbers,
    },
    {
      Name: 'Location',
      icon: <MaterialIcons
        size={normalizeSize(20)}
        name={'location-pin'}
        color={Apptheme}
      />,
      details: clinic_details?.address?.geo_address,
    }
  ];

  return (
    <View style={{flex: 1}}>
      <LinearGradientComponent>
        <View style={{flexDirection: 'row'}}>
          <HeaderCommon
            headerName={'Clinic Profile'}
            navigateBackto={'More'}
            style={{top: 20}}
          />
        </View>
        <View style={[Styles.mainBodyStyle, {top: normalizeSize(20)}]}>
          <View style={{alignItems: 'center', bottom: 45}}>
          {clinic_details.clinic_logo ? 
                      <Image
                          source={{
                            uri: `${Aws_Base_url}${base_upload_image_folder}${clinic_details.clinic_logo}`,
                          }}
                          style={styles.imageView}
                      /> :
                      <Image  style={styles.imageView}  source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC"}} />
                    }
            {/* <TouchableOpacity
              style={styles.editIconStyle}
                onPress={() =>
              navigation.navigate('EditProfile', {
                  profileDetails: profileDetails,
                })
              }
            >
              <EditIcon height={16} width={16} />
            </TouchableOpacity> */}
            <Rtext style={{top: 10}} fontSize={16} fontFamily="Ubuntu-Bold">
              {clinic_details?.name}
            </Rtext>
          </View>
          {la_profileData.map((item, inx) => {
            return <DetailsCard styles={styles} item={item} key={inx} />;
          })}
        </View>
      </LinearGradientComponent>
    </View>
  );
};

const DetailsCard = ({styles, item = {}, profileDetails}) => {
  return (
    <View style={styles.cardViewStyle}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconStyle}>{item.icon}</View>
        <View style={styles.textViewStyle}>
          <Rtext fontSize={14.5}>{item.Name}</Rtext>
          <Rtext style={{color: Apptheme, top: 3}} fontSize={13}>
            {item.details}
          </Rtext>
        </View>
      </View>
    </View>
  );
};
export default ClicnicProfile;

const styles = StyleSheet.create({
  editIconStyle: {
    backgroundColor: '#F3F8FE',
    padding: 8,
    borderRadius: 55,
    position: 'absolute',
    left: normalizeSize(259),
    bottom: normalizeSize(19),
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  iconStyle: {
    height: normalizeSize(35),
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5F9FA',
  },
  cardViewStyle: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: White,
    elevation: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  textViewStyle: {
    left: 15,
    paddingEnd: 3,
    flex: 1,
  },
  profileImageViewStyle: {
    // backgroundColor:'#F3F8FE',
    // paddingHorizontal:15,
    // paddingTop:10,
    // borderRadius:70,
    // position:'relative',
    // overflow:'hidden'
  },
  imageView: {
    borderRadius: 60,
    height:normalizeSize(70),
    width:normalizeSize(70)
  },
});
