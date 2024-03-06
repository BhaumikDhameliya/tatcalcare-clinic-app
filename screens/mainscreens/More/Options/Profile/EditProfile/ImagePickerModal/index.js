import {View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Rtext} from '../../../../../../../components/Rtext';
import {Apptheme} from '../../../../../../../config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LineSeparator from '../../../../../../../components/LineSeparator';
import {normalizeSize} from '../../../../../../../utility';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {request} from '../../../../../../../services';
const ImagePickerModal = ({
  setProfileImage,
  bottomSheet,
  setProfileTempPhoto,
  // loaderForImg,
  setLoaderForImg=()=>{},
  title='Change Profile Picture'
}) => {

  const imageUpload_Fun = async image => {
    setLoaderForImg(true);
    let temp_path = image.path.split('/')
    let ls_filename = temp_path[temp_path.length - 1]

    let formData = {
      fileName: ls_filename,
      type: image.mime,
      size: image.size,
      uri: image.path,
    };

    try {
      console.log('formData',formData);
      let jsonData = await request(
        'upload',
        'common/temp-file-upload',
        formData,
      );
      const dataObject = JSON.parse(jsonData.data);
      const message = dataObject.message;
      if (dataObject.message == 'Successfully Uploaded') {
        console.log("dataObject",dataObject);
        setProfileImage(image.path);
        setProfileTempPhoto(dataObject.data);
        setLoaderForImg(false);
      }
    } catch (e) {
      console.log('e', e);
    }
    setLoaderForImg(false);
  };
  const takePhoto = type => {
    ImagePicker[type]({
      // compressImageMaxWidth: 300,
      // compressImageMaxHeight: 300,
      // //   cropping: true,
      // compressImageQuality: 0.7,
    }).then(async image => {
      // setProfileImage(image.path);
      imageUpload_Fun(image);
    });
    bottomSheet.current.close();

    // setModal(false);
  };

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Rtext
          fontFamily={'Ubuntu-Bold'}
          style={{color: Apptheme}}
          fontSize={15.5}>
          {title}
        </Rtext>
        <View
          style={{backgroundColor: '#F4A0AE', borderRadius: 25, padding: 2}}>
          <Entypo
            name={'cross'}
            color={'white'}
            size={normalizeSize(14)}
            onPress={() => bottomSheet.current.close()}
          />
        </View>
      </View>
      <LineSeparator style={{marginVertical: 15}} />
      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => takePhoto('openCamera')}>
          <View
            style={{backgroundColor: Apptheme, padding: 4, borderRadius: 15}}>
            <Feather name="camera" size={12} color={'white'} style={{}} />
          </View>

          <Rtext style={{paddingHorizontal: 8}} fontFamily={'Ubuntu-Regular'}>
            Take A Photo
          </Rtext>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takePhoto('openPicker')}
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 23}}>
          <View
            style={{backgroundColor: Apptheme, padding: 4, borderRadius: 15}}>
            <Feather name="folder" size={12} color={'white'} style={{}} />
          </View>

          <Rtext style={{paddingHorizontal: 8}}>Choose From Gallery</Rtext>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ImagePickerModal;
