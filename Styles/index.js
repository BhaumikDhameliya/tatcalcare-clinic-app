
import {StyleSheet} from 'react-native';
import { White } from '../config/Colors';
import { normalizeSize, SCREEN_HEIGHT } from '../utility';

export default StyleSheet.create({

    globalContainer: {
      padding: 15
    },
    mainBodyStyle: {
      backgroundColor: White,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      height: SCREEN_HEIGHT,
      marginTop: 63,
      paddingHorizontal: 24,
    },
    
  });