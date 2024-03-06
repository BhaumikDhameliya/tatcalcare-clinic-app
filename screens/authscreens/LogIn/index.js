import {View} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from '../../../frames/AuthHeader';
import {normalizeSize, SCREEN_HEIGHT} from '../../../utility';
import AuthBody from '../../../frames/AuthBodyImage';
import AuthFooter from '../../../frames/AuthFooter';
import {White} from '../../../config/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LogIn = () => {
  const [scroll, setScroll] = useState(false);

  return (
    <View style={{backgroundColor: White, flex: 1}}>
        <KeyboardAwareScrollView
          onKeyboardDidHide={() => setScroll(false)}
          onKeyboardDidShow={() => setScroll(true)}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scroll}
        >
            <AuthHeader />
            <View style={{height: SCREEN_HEIGHT - normalizeSize(162)}}>
                <View style={{paddingHorizontal: 20,}}>
                    <AuthBody />
                </View>
                <AuthFooter />
            </View>
        </KeyboardAwareScrollView>
    </View>
  );
};

export default LogIn;
