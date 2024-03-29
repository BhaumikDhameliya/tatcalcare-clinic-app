import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rtext} from '../../../../../../components/Rtext';
import {Apptheme, Grey, lightGrey} from '../../../../../../config/Colors';
import {normalizeSize} from '../../../../../../utility';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import {useSelector} from 'react-redux';
import { Aws_Base_url, base_upload_image_folder } from '../../../../../../config/Constant';

const DisabledClinicList = ({item}) => {
  console.log("item",moment(item?.to_date).format('DD/MM/YYYY'));
  const user = useSelector(state => state.common.user);
  return (
    <View>
      <View style={styles.doctorlistStyle}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <View>
          {user?.clinic_id?.profile_image ? (
            <Image
              source={{
                uri: `${Aws_Base_url}${base_upload_image_folder}${user?.clinic_id?.profile_image}`,
              }}
              style={styles.imagerView}
            />
          ) : (
            <Image
              style={styles.imagerView}
              source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC"}}
            />
          )}
          </View>
          <Rtext
            fontFamily="Ubuntu-Medium"
            style={{color: Apptheme,marginLeft:8,width:100}}
            fontSize={14.5}>
            {user?.clinic_id?.name}
          </Rtext>
        </View>
        <View>
          {
            <View style={{alignItems: 'flex-end'}}>
              <View
                style={{
                  backgroundColor:
                    item?.approval_status == 'APPROVED'
                      ? '#E5F9FA'
                      : item?.approval_status == 'CANCELLED'
                      ? '#FFD8DB'
                      : '#EEF2F5',
                  height: normalizeSize(15),
                  width: normalizeSize(75),
                  borderRadius: 5,
                }}>
                <Rtext
                  fontSize={11.5}
                  style={{
                    color:
                      item?.approval_status == 'APPROVED'
                        ? Apptheme
                        : item?.approval_status == 'CANCELLED'
                        ? '#DB4437'
                        : '#747474',
                    textAlign: 'center',
                  }}>
                  {item?.approval_status}
                </Rtext>
              </View>
            </View>
          }

          <View style={styles.dateViewStyle}>
            <Fontisto
              name="calendar"
              size={normalizeSize(11)}
              color={Grey}
              style={{right: 5}}
            />
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={{color: lightGrey}}
              fontSize={11.5}>
              {moment(item?.from_date).format('DD/MM/YYYY')} -&nbsp;
            </Rtext>
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={{color: lightGrey}}
              fontSize={11.5}>
              {moment(item?.to_date).format('DD/MM/YYYY')}
            </Rtext>
          </View>
        </View>
      </View>
      <View
        style={[
          {
            marginHorizontal: 17,
          },
          styles.borderStyle,
        ]}
      />
    </View>
  );
};
export default DisabledClinicList;

const styles = StyleSheet.create({
  borderStyle: {
    borderColor: '#EEF2F5',
    borderWidth: 0.7,
  },
  doctorlistStyle: {
    padding:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    height: normalizeSize(36),
    width: normalizeSize(36),
    borderRadius: 25,
    borderColor: Apptheme,
    borderWidth: 0.8,
  },
  dateViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop:8
  },
  imagerView: {
    borderRadius: 30,
    borderColor: Apptheme,
    borderWidth: 0.8,
    height: normalizeSize(32),
    width: normalizeSize(32),
  },
});
