import {StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import {normalizeSize} from '../../../../utility';
import Feather from 'react-native-vector-icons/Feather';
import {BoldColor, Grey, White} from '../../../../config/Colors';
import {Rtext} from '../../../../components/Rtext';
import {useSelector} from 'react-redux';
import {Aws_Base_url,base_upload_image_folder} from '../../../../config/Constant';
import {Image} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableWithoutFeedback } from 'react-native';
import { request } from '../../../../services';

const HeaderDoctorDetails = () => {
  // const profileDetails = useSelector(state => state.common.profileDetails);
  const navigation = useNavigation();
  const [profileDetails,setProfileDetails]=useState({})

  useFocusEffect(
    React.useCallback(() => {
      getprofileDetailsProfileDetails();
    }, []),
);

const getprofileDetailsProfileDetails = async () => {
        try {
          let response = await request('get', 'common/my-profile');
          setProfileDetails(response?.data?.data);
        } catch (e) {
          console.log('e', e)
        }
};





  return (
    <View style={styles.headerOuterView}>
        <TouchableWithoutFeedback  onPress={() =>navigation.navigate('Profile', {navigateBackTo: 'More'})}>
            <View style={styles.mainViewStyle}>
                {profileDetails?.profile_image ?
                    <Image
                          source={{uri: `${Aws_Base_url}${base_upload_image_folder}${profileDetails?.profile_image}`}}
                          height={normalizeSize(65)}
                          width={normalizeSize(65)}
                          style={{borderRadius: normalizeSize(65)}}
                        />
                      : 
                    <Image  style={{height:60,width:60,borderRadius:60,backgroundColor:"grey"}}  source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC"}} />
                }
                    <View style={styles.mainViewStyle}>
                        <View style={styles.textViewStyle}>
                            <Rtext
                              style={{color: BoldColor}}
                              fontSize={16}
                              fontFamily="Ubuntu-Bold">
                              {profileDetails?.name}
                            </Rtext>
                            <View style={styles.innerview}>
                                <Feather
                                  name="phone-call"
                                  color={BoldColor}
                                  size={normalizeSize(12)}
                                />
                                <Rtext style={{paddingLeft: 5}} fontSize={12}>
                                  {profileDetails?.mobile}
                                </Rtext>
                            </View>
                        </View>
                        <View style={styles.iconViewStyle}>
                              <Entypo color={Grey} name={'chevron-thin-right'} />
                        </View>
                    </View>
            </View>
        </TouchableWithoutFeedback>
    </View>
  );
};

export default HeaderDoctorDetails;

const styles = StyleSheet.create({
  headerOuterView: {
    backgroundColor: White,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: -53,
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  innerview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  mainViewStyle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1
  },
  textViewStyle: {
    flex: 0.9, 
    paddingLeft: 15
  },
  iconViewStyle: {
    flex: 0.1, 
    alignItems: 'flex-end', 
    paddingRight: 3
  }
});
