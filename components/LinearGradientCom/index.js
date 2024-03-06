import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComponent = ({children}) => {
  return (
        <LinearGradient
            style={{flex: 4}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              'rgba(9, 174, 180, 1)',
              'rgba(9, 174, 180, 0.9)',
              'rgba(23, 222, 201, 1)',
            ]}>
              {children}
              </LinearGradient>
  );
};
export default LinearGradientComponent;
