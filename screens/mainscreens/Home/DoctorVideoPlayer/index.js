import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import YouTube from 'react-native-youtube-iframe';
import {normalizeSize} from '../../../../utility';
import YouTube from 'react-native-youtube-iframe';

const DoctorVideoPlayer = () => {
  return (
    <View>
      {/* <Image
        source={require('../../../../assets/images/doctorVideo.png')}
        style={{borderRadius: 15, height: 180, width: '100%'}}
      /> */}
      <YouTube
            videoId={imagePath.link}
            width={normalizeSize(258)}
            height={normalizeSize(115)}
          />
      
      {/* <View style={videoplayer.playView}>
        <TouchableOpacity>
          <FontAwesome
            name={'play'}
            color={'white'}
            size={12}
            style={videoplayer.playIconStyle}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DoctorVideoPlayer;

const videoplayer = StyleSheet.create({
  playView: {
    borderRadius: 15,
    backgroundColor: '#DB4437',
    bottom: 170 / 2,
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  playIconStyle: {alignSelf: 'center', marginTop: 6, marginLeft: 2},
});
