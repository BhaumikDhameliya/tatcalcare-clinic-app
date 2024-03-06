import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {normalizeSize} from '../../../../../utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Apptheme, Grey, White } from '../../../../../config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ImagePickerModal from '../../../More/Options/Profile/EditProfile/ImagePickerModal';
import { Image } from 'react-native';
import { Aws_Base_url, base_upload_image_folder } from '../../../../../config/Constant';

const DoctorFormAvatar = ({imagePath = ()=>{},profile_image='',updateStatus, editStatus= true}) => {
  const [profileimage, setProfileImage] = useState('');
  const [profiletempPhoto, setProfileTempPhoto] = useState('');
  const [loaderForImg, setLoaderForImg] = useState(false);

  const bottomSheet = useRef();
    useEffect(() => {
      imagePath(profiletempPhoto)
    }, [profiletempPhoto])

  return (
    <View style={styles.mainViewStyle}> 
        <View>
          {/* {profileimage ? (
            <Image
              source={{
                uri:profileimage
              }}
              height={normalizeSize(70)}
              width={normalizeSize(70)}
              style={{borderRadius: normalizeSize(65),marginTop: -38,}}
            />
          ) : (
          <View style={styles.avatarViewStyle}>
            <FontAwesome5
                  name={'user-alt'}
                  size={normalizeSize(37)}
                  color={'#747474'}
                />
            </View>
          )} */}
           {loaderForImg ? (
              <View style={{height: normalizeSize(70), width: normalizeSize(70), borderRadius: normalizeSize(65), backgroundColor: Grey, alignItems:'center', justifyContent: 'center',marginTop: -38,}}>
                <ActivityIndicator
                  color={Apptheme}
                  style={{}}
                  size={normalizeSize(30)}
                />
              </View>
           ) : profileimage || profile_image ? (
            <Image
              source={{
                uri:
                  profileimage ||
                  `${Aws_Base_url}${base_upload_image_folder}${profile_image}`,
              }}
              height={normalizeSize(70)}
              width={normalizeSize(70)}
              style={{borderRadius: normalizeSize(65),marginTop: -38,}}
            />
          ) : (
            <View style={styles.avatarViewStyle}>
            <FontAwesome5
                  name={'user-alt'}
                  size={normalizeSize(37)}
                  color={'#747474'}
                />
            </View>
          )}
          {!editStatus && (
            <TouchableOpacity style={styles.cameraviewer}  onPress={() => updateStatus && bottomSheet.current.show()}>
                    <Entypo name={'camera'} size={normalizeSize(12)} color={Apptheme} />
            </TouchableOpacity>
          ) }
              
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
              title='Add Profile Picture'
              setLoaderForImg={setLoaderForImg}
            />
          </BottomSheet>
    </View>
  );
};
export default DoctorFormAvatar;
const styles = StyleSheet.create({
  mainViewStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15
  },
  avatarViewStyle:{
    padding: 16,
    backgroundColor: '#EEF2F5',
    borderRadius: 40,
    marginTop: -38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraviewer: {
    padding: 4,
    backgroundColor: White,
    borderRadius: 20,
    elevation: 4,
    position: 'absolute',
    bottom: normalizeSize(7),
    right: normalizeSize(0),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  }
});