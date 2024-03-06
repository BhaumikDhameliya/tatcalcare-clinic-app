import { StyleSheet, View } from 'react-native'
import React from 'react'
import Styles from '../../../../../Styles'
import LinearGradientComponent from '../../../../../components/LinearGradientCom'
import HeaderCommon from '../../../../../components/HeaderCommon'
import { Apptheme, White } from '../../../../../config/Colors'
import MainContent from './MainContent'
import Abutton from '../../../../../components/Abutton'
import { useSelector } from 'react-redux'
import { Aws_Base_url, base_upload_image_folder } from '../../../../../config/Constant'
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const QrCode = () => {
  const user = useSelector(state => state.common.user);

  const shareSingleImage = async () => {
    const imageUrl = `${Aws_Base_url}${base_upload_image_folder}${user?.clinic_id?.qr_code}`;
    try {
      const response = await RNFetchBlob.fetch('GET', imageUrl);
      const imageData = response.data;
      const base64Data = `data:image/png;base64,${imageData}`;
      const shareOptions = {
        message: 'Check out this QR Code!',
        url: base64Data,
        failOnCancel: false,
      };
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error:', error);
    }
  };



  return (
    // <View style={{height: '100%'}}>
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon headerName={'QR Code'} style={{ top: 15 }} navigateBackto={'More'} />
      </View>
      <View style={[Styles.mainBodyStyle, { marginTop: 35, paddingTop: 24, flex: 1}]}>
        <View style={styles.boxViewStyle}>
          <MainContent />
        </View>
        
        <View style={{flex: 0.25, justifyContent: 'flex-end', paddingBottom: 20}}>
          <Abutton
              style={{ backgroundColor: Apptheme }}
              name={'Share Qr Code'}
              size={15}
              icon={true}
              onPress={() => shareSingleImage()}
            />
        </View>

      </View>
    </LinearGradientComponent>
    // </View>
  )
}

export default QrCode

const styles = StyleSheet.create({
  boxViewStyle: {
    justifyContent: 'center',
    backgroundColor: White,
    elevation: 4,
    borderRadius: 15,
    // height: '70%',
    flex: 0.75,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  }
})