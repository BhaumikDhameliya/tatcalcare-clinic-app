import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Apptheme, White} from '../../config/Colors';
import {normalizeSize} from '../../utility';
import Abutton from '../Abutton';
import {Rtext} from '../Rtext';
import {currency} from '../../config/Constant';

const FooterButton = ({
  slotId,
  lb_headerLoader,
  lo_doctorDetails,
  fees,
  getAvailabiltyAndSlots,
  setSlotId,
  setBedStatusTaken
}) => {
  const navigation=useNavigation()
  //   const handlePressOnConfirmSlot = () => {
  //     if (slotId == '') {
  //       showFlashMessage('Please select your slot', '', 'danger');
  //     } else {
  //       navigation.navigate('ConfirmSlot', {
  //         slotId: slotId,
  //         lo_doctorDetails: lo_doctorDetails,
  //         lb_headerLoader: lb_headerLoader,
  //         getAvailabiltyAndSlots: getAvailabiltyAndSlots,
  //         setSlotId: setSlotId,
  //       });
  //     }
  //   };
  //   const navigation = useNavigation();
  return (
    <View style={[styles.boxViewStyle, {marginHorizontal: 13, }]}>
      <Rtext
        fontSize={14.5}
        style={{color: White}}
        fontFamily="Ubuntu-Medium">{`Fee: ${currency} ${Math.round(
        fees,
      )}`}</Rtext>
      <Abutton
        name="Confirm Now"
        size={14}
        textColor={Apptheme}
        style={styles.buttonStyle}
        fontFamily="Ubuntu-Bold"
        onPress={()=>{setBedStatusTaken(true),navigation?.goBack()}}
      />
    </View>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  boxViewStyle: {
    backgroundColor: Apptheme,
    elevation: 4,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  buttonStyle: {
    width: '50%',
    height: 35,
    marginBottom: normalizeSize(12),
    backgroundColor: White,
  },
});
