import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import AuthHeader from '../../../frames/AuthHeader';
import {StyleSheet, View,Platform} from 'react-native';
import {Rtext} from '../../../components/Rtext';
import {normalizeSize, SCREEN_HEIGHT, showFlashMessage} from '../../../utility';
import {TextInput} from 'react-native-paper';
import AuthFooter from '../../../frames/AuthFooter';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Apptheme,
  Grey,
  SecondaryTextColor,
  TextInputOutLineColor,
} from '../../../config/Colors';
import {request} from '../../../services';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../store/common';

const OtpVerification = ({route}) => {
  const input2 = useRef();
  const input1 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  let otp_resding_time = route?.params?.otpTiming?.data?.resend?.time;
  let phone_number = route?.params?.phone_number;
  const [resendtiming, setResendtiming] = useState(otp_resding_time);
  const dispatch = useDispatch();

  setTimeout(() => {
    if (resendtiming >= 1) {
      setResendtiming(resendtiming - 1);
    }
  }, 1000);

 

  useEffect(() => {
    requestAnimationFrame(() => {

      if(Platform.OS=="ios"){
        input1.current.focus();
      }
      else{
        input2.current.focus();
        input1.current.focus();
      }
      
     
    });
  }, []);

  const [PhoneNumbers, setPhoneNumbers] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  const _SetPhoneNumberHandler = (flag, text) => {
    switch (flag) {
      case '1':
        setPhoneNumbers({...PhoneNumbers, input1: text});
        break;
      case '2':
        setPhoneNumbers({...PhoneNumbers, input2: text});
        break;
      case '3':
        setPhoneNumbers({...PhoneNumbers, input3: text});
        break;
      case '4':
        setPhoneNumbers({...PhoneNumbers, input4: text});
        break;
      default:
        break;
    }
    _FoucsCheck();
  };

  const InputArray = [
    {
      value: PhoneNumbers.input1,
      onChangeText: text => _SetPhoneNumberHandler('1', text),
      onKeyPress: _EmptyCheck,
      placeHolder: 'X',
      ref: input1,
    },
    {
      value: PhoneNumbers.input2,
      placeHolder: 'X',
      onChangeText: text => _SetPhoneNumberHandler('2', text),
      onKeyPress: _EmptyCheck,

      ref: input2,
    },
    {
      value: PhoneNumbers.input3,
      placeHolder: 'X',
      onChangeText: text => _SetPhoneNumberHandler('3', text),
      onKeyPress: _EmptyCheck,
      ref: input3,
    },
    {
      value: PhoneNumbers.input4,
      placeHolder: 'X',
      onChangeText: text => _SetPhoneNumberHandler('4', text),
      onKeyPress: _EmptyCheck,
      ref: input4,
    },
  ];
  const _FoucsCheck = () => {
    if (PhoneNumbers.input3.length === 1) {
      return input4.current.focus();
    }
    if (PhoneNumbers.input2.length === 1) {
      return input3.current.focus();
    }
    if (PhoneNumbers.input1.length === 1) {
      return input2.current.focus();
    }
    return input1.current.focus();
  };

  useLayoutEffect(() => {
    let EnterOtp = `${PhoneNumbers.input1}${PhoneNumbers.input2}${PhoneNumbers.input3}${PhoneNumbers.input4}`;
    if (EnterOtp.length == 4) {
      otpVeifictionFunc(EnterOtp);
    }
    _FoucsCheck();
  }, [PhoneNumbers]);
  const otpVeifictionFunc = async EnterOtp => {
    let data = {phone_number: phone_number, otp: EnterOtp};
    try {
      let response = await request('post', 'clinic-users/submit-otp', data);
      dispatch(loginSuccess(response.data.data));
    } catch ({response}) {
      showFlashMessage(response?.data?.error ? response?.data?.error : 'Please Enter valid OTP', '', 'danger');

    }
  };

  const _EmptyCheck = e => {
    if (PhoneNumbers.input2 === '') return _SetPhoneNumberHandler('1', '');
    if (PhoneNumbers.input3 === '') return _SetPhoneNumberHandler('2', '');
    if (PhoneNumbers.input4 === '') return _SetPhoneNumberHandler('3', '');
  };
  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <AuthHeader />
      <View style={{height: SCREEN_HEIGHT - normalizeSize(162)}}>
        <View style={{paddingTop: SCREEN_HEIGHT / 18}}>
          <Rtext
            fontSize={normalizeSize(20)}
            // fontWeight={''}
            fontFamily="Ubuntu-Medium"
            style={{textAlign: 'center', color: '#212129'}}>
            OTP VERIFICATION
          </Rtext>
        </View>
        <View style={{paddingHorizontal: 48, paddingTop: 12}}>
          <Rtext style={{textAlign: 'center', color: SecondaryTextColor}}>
            We have sent the code verification to your phone number
          </Rtext>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 15,
              paddingTop: 37,
            }}>
            {InputArray.map((item, index) => (
              <TextInput
                mode="outlined"
                key={'dsaasdas' + index}
                // editable={true}
                textColor={'#101010'}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    _EmptyCheck();
                  }
                }}
                keyboardType={'phone-pad'}
                onChangeText={item.onChangeText}
                value={item.value}
                ref={item.ref}
                style={styles.inputstyle}
                maxLength={1}
                theme={{
                  roundness: 10,
                  colors: {},
                }}
                outlineColor={TextInputOutLineColor}
                activeOutlineColor={'#EEF2F5'}
                placeholderTextColor={'#747474'}
                placeholder="_"
              />
            ))}
          </View>
          <View
            style={{
              paddingTop: 39,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Rtext style={{textAlign: 'center', color: Grey}}>
              Didn't receive any code?
            </Rtext>
            {resendtiming == 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setResendtiming(otp_resding_time),
                    setPhoneNumbers({
                      input1: '',
                      input2: '',
                      input3: '',
                      input4: '',
                    });
                }}>
                <Rtext
                  style={{
                    color: Apptheme,
                    paddingLeft: 6,
                  }}
                  fontFamily="Ubuntu-Medium">
                  Resend OTP
                </Rtext>
              </TouchableOpacity>
            ) : (
              <Rtext
                style={{
                  color: '#49bfbf',
                  paddingLeft: 6,
                }}
                fontSize={13}>
                {`Resend in ${resendtiming} sec`}
              </Rtext>
            )}
          </View>
        </View>
        <AuthFooter />
      </View>
    </View>
  );
};
export default OtpVerification;

const styles = StyleSheet.create({
  inputstyle: {
    width: 50,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#EEF2F5',
    color: '#101010',
    fontSize: normalizeSize(21),
    borderRadius: 10,

  },
});
