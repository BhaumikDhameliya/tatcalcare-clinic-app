import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderCommon from '../../../../../components/HeaderCommon';
import {SCREEN_HEIGHT} from '../../../../../utility';
import Ainput from '../../../../../components/Ainput';
import {useForm} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import {Rtext} from '../../../../../components/Rtext';
import {White, Apptheme} from '../../../../../config/Colors';
import SpecialityCard from './SpecialityCard';
import LinearGradientComponent from '../../../../../components/LinearGradientCom';
import {request} from '../../../../../services';
import Rloader from '../../../../../components/Rloader';
import {debounce} from 'lodash';
import NoDataFound from '../../../../../components/NoDataFound';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FooterLoader from '../../../../../components/FooterLoader';

const Department = () => {
  const {control, handleSubmit} = useForm();
  const [departmentList, setDepartmentList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    get_department_list();
  }, [searchValue]);
  const get_department_list = async () => {
    setLoader(true);
    try {
      let response = await request(
        'get',
        `departments?text=${searchValue}&doctorcount=yes`,
      );
      if (response) {
        setDepartmentList(response.data.data);
        setLoader(false);
      }
    } catch ({e}) {
      console.log('e', e);
    }
    setLoader(false);
  };
  const onSearch = value => {
    console.log('calue', value.search);
    setSearchValue(value.search);
  };

  return (
    <LinearGradientComponent>
      <View style={{flexDirection: 'row'}}>
        <HeaderCommon
          headerName={'Department'}
          navigateBackto={'More'}
          style={{top: 20}}
        />
      </View>

      <View style={departmentStyle.BodyStyle}>
        <Ainput
          placeholder="Find your specialist"
          name="search"
          roundness={12}
          lview={false}
          control={control}
          style={departmentStyle.inputStyle}
          search
          fontSize={14.5}
          onChange={debounce(handleSubmit(onSearch), 1000)}
        />
        <View style={{flex: 1, bottom: 10}}>
          <Rtext
            fontFamily="Ubuntu-Medium"
            style={{color: Apptheme}}
            fontSize={14}>
            Speciality
          </Rtext>
          {loader ? (
            <FooterLoader style={{justifyContent: 'center'}} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {departmentList.length == 0 ? (
                <NoDataFound bodyText={'No Department Found'} />
              ) : (
                <View style={departmentStyle.boxStyle}>
                  {departmentList &&
                    departmentList.map((item, index) => {
                      return <SpecialityCard item={item} key={index} />;
                    })}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </LinearGradientComponent>
  );
};
export default Department;

const departmentStyle = StyleSheet.create({
  BodyStyle: {
    backgroundColor: White,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: SCREEN_HEIGHT,
    marginTop: 65,
    paddingHorizontal: 24,
  },
  boxStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 150,
  },
  inputStyle: {
    elevation: 10,
    borderRadius: 20,
    bottom: 25,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
});
