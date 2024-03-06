import { View, Image } from 'react-native';
import React from 'react';
import { normalizeSize, SCREEN_WIDTH } from '../../../../utility';
import {
  Aws_Base_url,
  base_upload_image_folder,
} from '../../../../config/Constant';
import YouTube from 'react-native-youtube-iframe';

const NewsVideo = ({ imagePath }) => {
  console.log("imagePath.link", imagePath);
  return (
    <View style={{}}>
      {imagePath?.type == 'IMAGE' ? (
        <Image
          source={{
            uri: `${Aws_Base_url}${base_upload_image_folder}${imagePath.link}`,
          }}
          style={{
            borderRadius: 14,
            width: normalizeSize(260),
            height: normalizeSize(115),
          }}
        />
      ) : (

        imagePath.link && <View
          style={{
            borderRadius: 14,
            overflow: 'hidden',
          }}>
          <YouTube
            videoId={imagePath.link}
            width={normalizeSize(258)}
            height={normalizeSize(115)}
          />
        </View>

      )}
    </View>
  );
};
export default NewsVideo;
