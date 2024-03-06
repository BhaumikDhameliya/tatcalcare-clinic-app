import { Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import React, { useState } from 'react';
import { normalizeSize } from '../../../../utility';
import { Rtext } from '../../../../components/Rtext';
import { Apptheme, White } from '../../../../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../config/Constant';
import Rloader from '../../../../components/Rloader';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ScrollView } from 'react-native-gesture-handler';

const SlotBookingHeader = ({
  confirmSlot = false,
  doctorbookingDetails = {},
  lb_loader = false,
}) => {
  const [toolTitStatus, setToolTipStatus] = useState(false)

  // console.log('doctorbookingDetails..', doctorbookingDetails?.doctor_clinic_map_details[0]?.clinic_details);
  // console.log('doctorbookingDetails..', doctorbookingDetails);
  const { name, experience_years, address, profile_image, departments } =
    doctorbookingDetails;

  let clinic_address =
    doctorbookingDetails?.doctor_clinic_map_details &&
    doctorbookingDetails?.doctor_clinic_map_details[0]?.clinic_details?.address
      ?.geo_address;
  const LocationComponenet = ({ }) => {

    return (
      <View style={BookingHeaderStyle.container}>

        <View style={[BookingHeaderStyle.tooltip, { backgroundColor: '#E5F9FA' }, style]}>
          <Rtext style={{ color: White }} fontSize={11.5}>
            {clinic_address}
          </Rtext>
        </View>
      </View>
    )
  }

  if (lb_loader) return <Rloader />;


  // backgroundColor = 'rgba(17, 17, 17, 0.3)'
  return (
    <View style={{}}>
      <View style={BookingHeaderStyle.imagerViewer}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ width: '25%' }}>
            {profile_image ? (
              <Image
                source={{
                  uri: `${Aws_Base_url}${base_upload_image_folder}${profile_image}`,
                }}
                style={BookingHeaderStyle.imagetagStyle}
              />
            ) : (
              <Image
                style={BookingHeaderStyle.imagetagStyle}
                source={{
                  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAB0CAMAAADXYtJfAAAAYFBMVEX9/f2OkJ+KjJz///2HiZn19fb4+Pn7+vyKi52DhJXv7vCNj6CHiJqWl6XAwMiurriioq/b29/l5unT09m6usPHxs3g4OKho6yoqLPOz9KpqrGUlKbOzdSztL6Ji5eAgperWazNAAADvUlEQVR4nO2byXKjMBBA0UYQQkhiCxmD5///csAmXrGNBKiZKt4phxxetbobLe0g2NnZ2dnZ2dnZ2dnZ6SEjf20PEmamLJRSbZpn7Its0ZUEcaMQTxLcQznHOq22F9bQaBxhdAfGqIyhxW4hgdE0QiMkKA23E9Lsm4sxy5Np1GxDlJDyccHvEImKt2AaquRlMIc8RRm0ZEBi+S6YQ0hpDq85Wj9PIYUVJWxCNE9wA+kZ1pOieaIC9EyTyZpYfoFp5tM1O1EFpUnQxOQ8Q4FSlKTURhMhGYJ4xnaW3Se0BPG0DWeXohCaIf7wuRwJKES3/7EqojM1gGdt7ymE/20zs+mdv9Af754Vd/DEf7x72ld7h0DePWsHTYSOvhM01E6e3ndNsXTS9L5fdvQ8ei54Yv1xH+LZ7J6juOan70b/v9RRqK13SydP33t64tbn/W9Eiukn4htN5P2myeqseUH71gyYy36JAtwxaof9fJR59ySlvSfW/k/GJBb25zj/2/kOZR1QDvJSk9lWfJQCWHYr39oFVEiYRxrCXr9yjMFhrm06fmzOchjikmHgj8XKez/CXSHsMFkT9skjQxNTFC45z5hPj1xDNFtYzT6iE965EpjOeS/68QlJRM0W3uHD9v0WD0uzBc2OXL7+hGIMnppXWEGj0XrCXEO+wz1CAlYe6GOeRhS31UaW/AozSiKKMT6vNhUH3WxiQOAZluWp0rKjbhsTb2/aZmcthpUm/Qljk6t+8goZiwcYCzc0udRzsgm7Emr7GkIC4ygSQkpdt2lThZd/AaUziE1aHzkfWtJNu+/n7CinOjWw/YkE5MsU+kCfOvz9N4lSqYuqywIgW5YrxKedPETEI5UzCElTC2xzMO7/WxnPqqyQEyN5nwKJTP2ZElP/dZAcVLmq/OSp+cYud8kXqPCx1zPaZcEfY1qvOsFIgky/70GTTRMVr9emwtZusuqtKSrXGWQjQR7Zj9i8gcpV0jR2GFz5QJQufw+eL7fkV+jSV6KsnXY/Y2/aLHkXHmuXqZUpCFosV/fZcYU1/yWp2UKi+aJl/gSWy3zym5VS80Z0fjURUro8ZNoh0HzRcq0KuhOVM3OUmPWj2YPlvMNpdVw5Ny+iek4fZW7TKi4k5QzPqb+KWADBnR9uSOk0W+Eq6tydMn/R7HF+u3GZrJgDdzqMEONz1XscX2q/PWt2Ne+ywXcalJ6H009q7Mc/FhC1/yp5bPE3ntY9lFSePpj3noW1p9VMxWKe2vpMXwCkJ0L2W3vLoZ+leOn5D4WkMNZ/lYECAAAAAElFTkSuQmCC',
                }}
              />
            )}
          </View>
          <View style={{ paddingLeft: 25, top: 3, width: "75%" }}>
            <Rtext
              fontSize={24}
              fontFamily="Ubuntu-Medium"
              style={{ color: White, width: normalizeSize(180) }}>
              {name}
            </Rtext>
            <Rtext style={{ color: White, top: 5 }} fontSize={14.5}>
              {departments?.map(department => department.name).join(',')}
            </Rtext>
            <View style={BookingHeaderStyle.calenderViewer}>
              {experience_years && <View style={BookingHeaderStyle.footerElementView}>
                <View style={BookingHeaderStyle.calenderInner}>
                  <FontAwesome
                    name={'stethoscope'}
                    size={normalizeSize(14)}
                    color={White}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <View>
                    <Rtext style={{ color: White }} fontSize={11.5}>
                      {experience_years} years
                    </Rtext>
                    <Rtext style={{ color: White }} fontSize={11.5}>
                      Experience
                    </Rtext>
                  </View>
                </View>
              </View>}

              {clinic_address &&
                <View style={BookingHeaderStyle.container}>
                  <TouchableOpacity onPress={() => setToolTipStatus(!toolTitStatus)}>
                    <View style={[BookingHeaderStyle.footerElementView, { marginLeft: 20 }]}>
                      <View style={BookingHeaderStyle.calenderInner}>
                        <SimpleLineIcons
                          name={'location-pin'}
                          size={normalizeSize(14)}
                          color={White}
                        />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Rtext style={{ color: White }} fontSize={11.5}>
                          {clinic_address?.length > 35
                            ? `${clinic_address?.slice(0, 35)} ...`
                            : clinic_address}
                        </Rtext>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {toolTitStatus &&
                    <View style={[BookingHeaderStyle.tooltip, { backgroundColor: White, width: normalizeSize(185) }]}>
                      <Rtext style={{ color: Apptheme }} fontFamily='Ubuntu-Medium' fontSize={11.5}>
                        {clinic_address}
                      </Rtext>
                    </View>}
                </View>
              }

            </View>
          </View>
        </View>
      </View >
    </View >
  );
};
export default SlotBookingHeader;

const BookingHeaderStyle = StyleSheet.create({
  imagerViewer: { paddingHorizontal: 25, paddingTop: 40, flexDirection: 'row' },
  imagetagStyle: {
    height: normalizeSize(110),
    width: normalizeSize(80),
    borderRadius: 12,
    backgroundColor: 'grey',
  },
  calenderViewer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    width: '76%',
  },
  calenderInner: {
    // height: normalizeSize(23),
    // width: normalizeSize(23),
    padding: 5,
    backgroundColor: '#19E7D2',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onTimeStyle: {
    paddingVertical: 8,
    backgroundColor: '#19E7D2',
    marginTop: 10,
    borderRadius: 5,
  },
  innerViewTime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerElementView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%',
  },
  container: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    width: Platform.OS == 'ios' ? normalizeSize(120) : normalizeSize(95),
    padding: 8,
    // paddingHorizontal: 10,
    // paddingVertical: 6,
    borderRadius: 5,
    bottom: 30,
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    marginLeft: normalizeSize(-80),
    zIndex: 1,

  },
});
