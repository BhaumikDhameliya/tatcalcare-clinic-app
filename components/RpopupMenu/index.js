import {Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';
import {useLayoutEffect} from 'react';
import {Rtext} from '../Rtext';
import {normalizeSize} from '../../utility';
import {Grey, White} from '../../config/Colors';

const RpopupMenu = props => {
  const {
    menuContainerWidth = Platform.OS =='ios' ? normalizeSize(140) : 140,
    onOpen,
    onClose,
    children,
    option = [{lable: 'A', value: 'B'}],
    popUpmenuindex,
    menuContainerHeight=false
  } = props;

  const [value, setValue] = useState(false);

  useLayoutEffect(() => {
    setValue(props.status);
  }, [props.status]);
  return (
    <Menu
      onOpen={() => {
        if (onOpen) onOpen();
      }}
      onClose={() => {
        if (onClose) onClose();
      }}
      onBackdropPress={() => onClose()}
      opened={value}>
      <MenuTrigger style={{width: '100%'}}>{children}</MenuTrigger>
      <MenuOptions
        optionsContainerStyle={[
          styles.optionsContainerStyle,
          {width: menuContainerWidth,
         
          },
          menuContainerHeight && { height:normalizeSize(80)}
        ]}>
        {option.map((item, inx) => (
          <MenuOption key={inx} onSelect={() => props.onSelectValue(item, inx)}>
            <View
              style={[
                styles.selctionItemStyle,
                {backgroundColor: popUpmenuindex == inx ? '#EEF2F5' : 'white'},
              ]}>
              {/* <MaterialIcons
                name={item.icon}
                size={normalizeSize(14)}
                color={item.lable == 'Delete Doctor' ? 'red' : Grey}
                style={{right:5}}
              /> */}
              {item.icon}
              <Rtext style={styles.menuText}>{item.lable}</Rtext>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default RpopupMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
  },
  optionsContainerStyle: {
    // width: 140,
    // padding: 15,
    backgroundColor: White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  menuText: {
    color: Grey,
    fontSize: normalizeSize(13),
    fontWeight: '600',
    lineHeight: 18,
  },
  selctionItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 5,
  },
});
