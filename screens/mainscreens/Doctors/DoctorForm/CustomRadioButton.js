import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Rtext } from '../../../../components/Rtext'
import { Grey, White } from '../../../../config/Colors'
import { normalizeSize } from '../../../../utility'
import RadioGroup from '../../../../components/RadioGroup'

const CustomRadioButton = ({ control, name = '', disabled = false, radioList = [], setShowAddClass = () => { }, title = "" }) => {


  // let la_gender = [
  //   { title: 'Male', value: 'male' },
  //   { title: 'Female', value: 'female' },
  //   { title: 'Others', value: 'others' },
  // ];



  return (
    <View style={[styles.mainViewStyle, { elevation: disabled ? 0.5 : 1 }]}>
      <View style={styles.firstViewStyle}>
        <View style={styles.labelLeftViewStyle}></View>
        <View style={styles.labelViewStyle}>
          <Rtext style={{ color: Grey, start: normalizeSize(7) }} fontSize={12.5} numberOfLines={1}>{title}</Rtext>
        </View>
        <View style={styles.labelRightViewStyle}></View>
      </View>
      <View style={[styles.mainContentViewStyle, { bottom: normalizeSize(7) }]} >
        <RadioGroup
          la_radioList={radioList}
          name={name}
          valueKey={'value'}
          titleKey={'title'}
          control={control}
          style={styles.radiobuttonStyle}
          disabled={disabled}
          setShowAddClass={(e) => setShowAddClass(e)}

        />
      </View>
    </View>
  )
}

export default CustomRadioButton

const styles = StyleSheet.create({
  mainContentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  firstViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 11
  },
  mainViewStyle: {
    height: normalizeSize(43),
    borderRadius: 10,
    borderColor: '#F3F8FE',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingLeft: normalizeSize(10),
    marginVertical: 10,
    backgroundColor: White,

  },
  labelLeftViewStyle: {
    backgroundColor: '#F3F8FE',
    height: 1,
    width: "1.5%",
    position: 'absolute',
    left: 6.5,
    borderRadius: 10,
  },
  labelViewStyle: {
    position: 'relative',
    bottom: 9,
    left: 5
  },
  labelRightViewStyle: {
    backgroundColor: '#F3F8FE',
    height: 1,
    left: 5.5,
    width: '69%',
    borderRadius: 5
  },
  radioButtonStyle: {
    backgroundColor: White,
    padding: 6,
    borderRadius: 10,
    marginVertical: 10,
    height: normalizeSize(50),
    elevation: 4,
    shadowColor: '#a6a4a4',
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
})