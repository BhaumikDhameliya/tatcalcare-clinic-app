import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import { Apptheme } from '../../config/Colors';
import { SCREEN_WIDTH } from '../../utility';

const Paginator = ({data, scrollX,marginTop=15}) => {

  return (
    <View style={{flexDirection: 'row', marginTop: marginTop}}>
      {data?.map((_, i) => {
        const inputRange = [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH];
        
        const dotwidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 14, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.styledot,
              { width: dotwidth, 
                opacity
              },
            ]}
            key={i}/>
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  styledot: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 7,
    width: 15,
    backgroundColor : Apptheme
  },
});
