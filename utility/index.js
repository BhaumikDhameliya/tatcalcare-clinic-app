import {Dimensions, PixelRatio,Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import store from '../store';
import {logoutSuccess} from '../store/common';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

  const scale = SCREEN_WIDTH / 320;

export const normalizeSize = (size, lgSize = 0, smSize = 0) => {
  if (SCREEN_WIDTH >= 600) size = (lgSize != 0 ? lgSize : size) - 2;
  else if (SCREEN_WIDTH <= 330) size = (smSize != 0 ? smSize : size) - 1;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const showYupFormValidationError = errors => {
  let errorMessage = '';
  for (const [key, value] of Object.entries(errors)) {
    errorMessage += '* ' + value.message + '\n';
  }
  errorMessage = errorMessage.replace(/\n+$/, '');
  if (errorMessage != '') showFlashMessage(errorMessage, '', 'danger');
};

export const showFlashMessage = (
  message = '',
  description = '',
  type = 'success',
  onPress = () => {},
  duration = 2000,
  style = {marginHorizontal: 20, top: 10, borderRadius: 5},
) => {
  if (typeof description != 'string') return;
  showMessage({
    message: message,
    description: description,
    type: type,
    onPress,
    duration,
    style: style,
  });
};

export const removeArrayElement = (arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
export const logout = () => {
  store.dispatch(logoutSuccess());
};
 
//local sumit
// export const baseUrl = 'http://192.168.0.231:3000/api/';

//Aunsu da URL
// export const baseUrl = 'http://192.168.0.155:3000/api/'

// dev
export const baseUrl = 'https://tatcalcare.idiosysdev.com/api/';
