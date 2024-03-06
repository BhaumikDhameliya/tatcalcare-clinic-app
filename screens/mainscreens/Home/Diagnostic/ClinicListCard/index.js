import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useRef } from 'react';
import {Rtext} from '../../../../../components/Rtext';
import LineSeparator from '../../../../../components/LineSeparator';
import {Apptheme, White} from '../../../../../config/Colors';
import {normalizeSize} from '../../../../../utility';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ClinicDetailsByBottomSheet from '../../../../../components/ClinicDetailsByBottomSheet';

const ClinicListCard = ({item, index,pageName}) => {
  const bottomSheet = useRef();
  const navigation =useNavigation()
  console.log("pageNamecoming",pageName);
  return (
    <View key={index} style={{bottom: 10, paddingHorizontal: 19}}>
      <View>
        <View style={styles.clinicListStyle}>
          <TouchableOpacity style={styles.clinicLeftViewStyle} onPress={() => bottomSheet.current.show()}>
            <Image
              style={styles.imgStyle}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
              }}
            />
            <Rtext
              fontFamily="Ubuntu-Medium"
              style={{color: '#101010', paddingLeft: 10}}>
              {/* Centre 1 */}
              {item?.name}
            </Rtext>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clinicRightViewStyle}  onPress={()=>navigation.navigate("DiagnosisAppointment",{pageName:pageName})}
>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.bookingNumber}>
                <Rtext fontSize={12} style={{color: White}}>
                  {/* 06 */}
                  {item?.bookingNumber}
                </Rtext>
              </View>
              <Rtext style={{color: Apptheme, paddingLeft: 6}} fontSize={11}>
                Bookings
              </Rtext>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <LineSeparator style={{marginVertical: 0}} />

      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={normalizeSize(230)}
        radius={30}
        sheetBackgroundColor={White}
        dragIconStyle={{width: normalizeSize(50), height: 2}}>
        <ClinicDetailsByBottomSheet bottomSheet={bottomSheet} />
      </BottomSheet>
    </View>
  );
};

export default ClinicListCard;

const styles = StyleSheet.create({
  bookingNumber: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: Apptheme,
  },
  imgStyle: {
    height: normalizeSize(40),
    width: normalizeSize(28),
    borderRadius: 6,
    borderWidth: 1.2,
    borderColor: Apptheme,
    resizeMode: 'center',
  },
  clinicListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
  },
  clinicLeftViewStyle: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicRightViewStyle: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
});
