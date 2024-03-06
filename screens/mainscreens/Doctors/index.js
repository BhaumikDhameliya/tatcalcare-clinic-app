import {BackHandler, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderCommon from '../../../components/HeaderCommon';
import Ainput from '../../../components/Ainput';
import { useForm } from 'react-hook-form';
import DoctorHeaderFile from './DoctorHeaderFile';
import LinearGradientComponent from '../../../components/LinearGradientCom';
import Styles from '../../../Styles';
import DoctorDetailsCard from './DoctorDetailsCard';
import { normalizeSize } from '../../../utility';
import { useFocusEffect } from '@react-navigation/core';
import { setPageOffSetValue } from '../../../store/common';
import { useDispatch } from 'react-redux';
import { request } from '../../../services';
import NoDataFound from '../../../components/NoDataFound';
import { debounce } from 'lodash';
import FooterLoader from '../../../components/FooterLoader';
import {useNavigation} from '@react-navigation/core';
  
let lb_noMoreFetachData = false;

const Doctors = ({route}) => {
  const navigation = useNavigation();
  const {control, handleSubmit, setValue} = useForm();
  const [doctor_list, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lb_loader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [lb_loadMore, setLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [la_languageList, setLanguageList] = useState([]);
  const [la_departmntslist, setDepartmntslist] = useState([]);
  const [la_symptomlist, setSymptomslist] = useState([]);

  let routeData = route?.params?.departmentdata?.name;
  const navigationStatus = route?.params?.navigationStatus
  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(1);
      setSearchData(routeData);
      setValue('searchDoctor', routeData);
      return () => {
        routeData = '';
      }
    }, [route?.params?.departmentdata]),
  );

  const dispatch = useDispatch();
  const handleRefresh = () => {
    setRefreshing(true);
    onSearch('');
  };

  useFocusEffect(
    React.useCallback(() => {
      // getDepartmentAndLanguageAndSymptomList();
      dispatch(setPageOffSetValue('Doctors'));
      return () => {
        setValue('searchDoctor', '');
        setSearchData('');
        // setRouteData('');
        routeData = '';
        navigation.setParams({
          navigationStatus: '',
        });
      };
    }, []),
  );

  // useEffect(() => {
  //   const backAction = () => {
  //     // navigationStatus ? navigation.navigate(navigationStatus) : navigation.navigate('Home');
  //     navigation.navigate(navigationStatus ? navigationStatus : 'Home');
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, [navigationStatus]);

  useEffect(() => {
    lb_noMoreFetachData = false;
    setLoader(true);
    // getDepartmentAndLanguageAndSymptomList()
    // if (routeData) {
      // const backAction = () => {
      //   if(routeData) {
      //     console.log("first");
      //     navigation.navigate("Department")
      //   }
      //   else{
      //     console.log("second");
      //     navigation.goBack()
      //   }
      // };
      // const backHandler = BackHandler.addEventListener(
      //   'hardwareBackPress',
      //   backAction,
      // );
      // return () => backHandler.remove();
    // }

  }, []);

  useEffect(() => {
    getDoctorList(currentPage, searchData);
  }, [currentPage, searchData]);

  const getDoctorList = async (page = 1, search = '') => {
    console.log('page', page);
    if (page == 1) lb_noMoreFetachData = false;
    setLoadMore(true);
    if (lb_noMoreFetachData || page == 0) return;
    try {
      let response = await request(
        'get',
        `doctors?page=${page}&limit=10&text=${search}`,
      );
      const la_doctorList = response?.data?.data?.doctors || [];
      setDoctorList(
        page == 1 ? la_doctorList : [...doctor_list, ...la_doctorList],
      );
      if (la_doctorList.length == 0) lb_noMoreFetachData = true;
    } catch (e) {
      console.log('error', e);
    }
    setLoader(false);
    setLoadMore(false);
    setRefreshing(false);
  };


  // const getDepartmentAndLanguageAndSymptomList = async () => {
  //   try {
  //     let tempDepartmentList = [];
  //     let response = await request('get', 'departments');
  //     response.data?.data?.map((item, index) => {
  //       tempDepartmentList.push({
  //         value: item.name,
  //         _id: item._id,
  //       });
  //       setDepartmntslist(tempDepartmentList);
  //     });
  //   } catch (e) {
  //     console.log('e', e?.response?.data?.error);
  //   }

  //   try {
  //     let tempLanguageList = [];
  //     let response = await request('get', 'languages');
  //     response.data?.data?.map((item, index) => {
  //       tempLanguageList.push({
  //         value: item.name,
  //         _id: item._id,
  //       });
  //       setLanguageList(tempLanguageList);
  //     });
  //   } catch (e) {
  //     console.log('e', e?.response?.data?.error);
  //   }

  //   try {
  //     let tempSymptomList = [];
  //     let response = await request('get', 'symptoms?sort_by=name&sort_type=ascend');
  //     // console.log("response...", response?.data?.data);
  //     response?.data?.data?.map((item, index) => {
  //       tempSymptomList.push({
  //         value: item.name,
  //         _id: item._id,
  //       })
  //     });
  //     setSymptomslist(tempSymptomList);
  //   } catch (e) {
  //     console.log('e', e?.response?.data?.error);
  //   }
  // };



  const onSearch = value => {
    console.log('value', value);
    setSearchData(value?.searchDoctor ? value?.searchDoctor : value);
    setDoctorList(0);
    lb_noMoreFetachData = false;
    setCurrentPage(1);
    // setTimeout(() => {
    //   lb_noMoreFetachData = false;
    //   setCurrentPage(1);
    // }, 100);
  };  
  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={'Doctor'}
          // navigateBackto={'Department'}
          navigateBackto={navigationStatus ? navigationStatus : 'Home'}
          style={{top: 20}}
        />
      </View>
      <DoctorHeaderFile getDoctorList={getDoctorList} />
      <View style={[Styles.mainBodyStyle, { marginTop: 110 }]}>
        <View style={{ marginTop: -31, marginBottom: 15 }}>
          <Ainput
            placeholder="Search Doctor"
            name="searchDoctor"
            lview={true}
            control={control}
            style={{ elevation: 10, borderRadius: 20 }}
            search
            onChange={debounce(handleSubmit(onSearch), 1000)}
            fontSize={15}
          />
        </View>
        <View style={{ marginBottom: normalizeSize(187) }}>
          <FlatList
            data={doctor_list}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!lb_noMoreFetachData && lb_loadMore == false) {
                setCurrentPage(currentPage + 1);
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={lb_loadMore && <FooterLoader />}
            ListEmptyComponent={() =>
              !lb_loader && <NoDataFound bodyText={'No Doctors Found'} />
            }
            renderItem={({ item, index }) => (
              <DoctorDetailsCard item={item} getDoctorList={getDoctorList}  />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>
    </LinearGradientComponent>
  );
};

export default Doctors;
