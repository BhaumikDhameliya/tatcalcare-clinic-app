import {useNavigation} from '@react-navigation/core';
import {debounce} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Animated,
  Platform,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import Abutton from '../../components/Abutton';
import Ainput from '../../components/Ainput';
import Paginator from '../../components/Paginator';
import {Rtext} from '../../components/Rtext';
import {Apptheme} from '../../config/Colors';
import {request} from '../../services';
import {normalizeSize, SCREEN_HEIGHT, showFlashMessage} from '../../utility';
import auth from '@react-native-firebase/auth';

const AuthBody = () => {
  const [ls_fieldValue, setFieldValue] = useState('');
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const fieldValue = value => {
    setFieldValue(value);
  };

  const [images, setimages] = useState([
    require('../../assets/images/authbodyimage.png'),
    require('../../assets/images/authbodyimage.png'),
    require('../../assets/images/authbodyimage.png'),
  ]);
  const scrollx = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThresold: 500}).current;

  return (
    <View style={authBodyStyle.outerView}>
      <View style={{alignItems: 'center', flex: 0}}>
        <FlatList
          data={images}
          keyExtractor={(item, inx) => inx.toString()}
          renderItem={({item, index}) => {
            return (
              <Image
                source={item}
                key={index}
                style={authBodyStyle.imagebackgroundStyle}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          viewabilityConfig={viewConfig}
          pagingEnabled
        />
        <Paginator data={images} scrollX={scrollx} />
      </View>
      <MainContent
        control={control}
        navigation={navigation}
        style={authBodyStyle}
        fieldValue={fieldValue}
        ls_fieldValue={ls_fieldValue}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

const MainContent = ({
  control,
  navigation,
  fieldValue = () => {},
  handleSubmit,
  style,
}) => {
  const [loginLoader, setLoginLoader] = useState(false);
  const [textValidation, setTextValidation] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(null);

  const [mobile, setMobile] = useState(null);

  const [code, setCode] = useState('');

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }
    if (userAuth) {
      console.log(userAuth);
      setUser(userAuth);
    }

    return () => userReference();
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const signOut = async () => {
    auth().signOut();

    setUser(null);

    return () => userReference();
  };

  const signInWithMobileNumber = async mobile => {

  };

  const onChangeNumber = value => {
    let exp = /^[5-9]\d{9}$/;
    if (!exp.test(value?.phNumber)) {
      setTextValidation(true);
      setButtonStatus(true);
    } else {
      setTextValidation(false);
      setButtonStatus(false);
    }
    if (value?.phNumber.length == 0) {
      setTextValidation(false);
      setButtonStatus(true);
    }
  };

  const onLogin = async formInput => {
    setLoginLoader(true);
    let value = {phone_number: formInput?.phNumber};
    try {
      // const data = await request('post', 'clinic-users/login', value);
      // if (data) {
      //   navigation.navigate('OtpVerification', {
      //     phone_number: value?.phone_number,
      //     otpTiming: data.data,
      //   });
      // }
      const confirmation = await auth().signInWithPhoneNumber(`+91${formInput?.phNumber}`);
      setConfirm(confirmation);
      if(confirmation){
        navigation.navigate('OtpVerification', {
          // phone_number: value?.phone_number,
          // otpTiming: data.data,
        });
      }
      setLoginLoader(false);
    } catch (error) {
      console.error("----->", error);
      const {response} = error;
      showFlashMessage(response?.data?.error, '', 'danger');
    } finally {
      setLoginLoader(false);
    }

  };

  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={style.maiViewStyle}>
        <Rtext
          fontSize={Platform.OS == 'ios' && SCREEN_HEIGHT < 800 ? 20 : 24}
          style={{color: Apptheme}}>
          Proceed With Your
        </Rtext>
        <Rtext
          fontSize={Platform.OS == 'ios' && SCREEN_HEIGHT < 800 ? 20 : 24}
          fontFamily="Ubuntu-Medium"
          style={{color: Apptheme}}>
          Login
        </Rtext>
      </View>
      <View
        style={{
          marginTop: Platform.OS == 'ios' && SCREEN_HEIGHT < 800 ? 5 : 15,
        }}>
        <Ainput
          placeholder="Enter phone number"
          name="phNumber"
          roundness={12}
          lview={true}
          control={control}
          autoFocus={true}
          style={authBodyStyle.inputBoxStyle}
          fieldValue={fieldValue}
          has_flag={true}
          fontSize={16.5}
          maxLength={10}
          keyboardType={'number-pad'}
          onChange={debounce(handleSubmit(onChangeNumber), 500)}
        />
        {textValidation && (
          <View style={{marginBottom: 3}}>
            <Rtext fontSize={13} style={{color: '#FF617B'}}>
              * Please enter valid phone number
            </Rtext>
          </View>
        )}
        <Abutton
          style={style.buttonStyle}
          name={'Proceed'}
          size={14.5}
          fontFamily="Ubuntu-Medium"
          disble={!buttonStatus ? false : true}
          onPress={handleSubmit(onLogin)}
          loader={loginLoader}
        />
      </View>
    </View>
  );
};
export default AuthBody;

const authBodyStyle = StyleSheet.create({
  outerView: {
    paddingTop:
      Platform.OS == 'ios' && SCREEN_HEIGHT < 800
        ? normalizeSize(5)
        : normalizeSize(24),
  },
  imagebackgroundStyle: {
    width: normalizeSize(290),
    height: normalizeSize(130),
    resizeMode: 'cover',
  },
  inputBoxStyle: {
    marginBottom: Platform.OS == 'ios' && SCREEN_HEIGHT < 800 ? 5 : 15,
    shadowColor: '#bdbbbb',
    elevation: 10,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    height: Platform.OS == 'ios' && SCREEN_HEIGHT < 800 && normalizeSize(32),
  },
  maiViewStyle: {
    marginTop:
      Platform.OS == 'ios' && SCREEN_HEIGHT < 800
        ? SCREEN_HEIGHT / 45
        : SCREEN_HEIGHT / 22,
  },
  buttonStyle: {
    backgroundColor: Apptheme,
    height:
      Platform.OS == 'ios' && SCREEN_HEIGHT < 800
        ? normalizeSize(34)
        : normalizeSize(43),
  },
});
