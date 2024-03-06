import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {White} from '../../../../config/Colors';
import {SCREEN_HEIGHT, showFlashMessage} from '../../../../utility';
import NotiFicationCard from './NotificationCard';
import HeaderCommon from '../../../../components/HeaderCommon';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import {request} from '../../../../services';
import NoDataFound from '../../../../components/NoDataFound';
import FooterLoader from '../../../../components/FooterLoader';

let lb_noMoreFetachData = false;

const Notification = ({route}) => {
  const [notification_list, setNotification_list] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lb_loadMore, setLoadMore] = useState(false);
  const [lb_loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNotificationList(currentPage);
  }, [currentPage]);

  const getNotificationList = async (page = 1) => {
    if (page == 1) lb_noMoreFetachData = false;
    setLoadMore(true);
    setLoader(true);
    if (lb_noMoreFetachData || page == 0) return;
    try {
      let res = await request('get', `notifications?page=${page}&limit=10`);
      const notificList = res?.data?.data?.notifications || [];
      setNotification_list(
        page == 1 ? notificList : [...notification_list, ...notificList],
      );
      if (notificList.length == 0) lb_noMoreFetachData = true;
    } catch ({response}) {
      showFlashMessage(response?.data?.error, '', 'danger');
    }
    setLoader(false);
    setLoadMore(false);
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getNotificationList();
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradientComponent>
        <View style={{flexDirection: 'row'}}>
          <HeaderCommon
            headerName="Notification"
            style={{top: 15}}
            navigateBackto={route?.params?.navigateBackTo}
          />
        </View>
        {/* <View style={styles.BodyStyle}> */}
        <View style={[styles.BodyStyle, {paddingHorizontal: 0, zIndex: 2}]}>
          {/* <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingBottom: 100}}>
              {la_data.map((item, inx) => (
                <NotiFicationCard item={item} key={inx} />
              ))}
            </View>
          </ScrollView> */}
          <View style={{height: '92%'}}>
          <FlatList
            data={notification_list}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!lb_noMoreFetachData && lb_loadMore == false) {
                setCurrentPage(currentPage + 1);
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={lb_loadMore && <FooterLoader />}
            ListEmptyComponent={
              !lb_loader && <NoDataFound bodyText={'No record found'} />
            }
            renderItem={({item, index}) => {
              return (
                <NotiFicationCard
                  item={item}
                  getNotificationList={getNotificationList}
                  setLoader={setLoader}
                  getNotificationCount={route?.params?.getNotificationCount}
                />
              );
            }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
          </View>
        </View>
      </LinearGradientComponent>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  BodyStyle: {
    backgroundColor: White,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: SCREEN_HEIGHT,
    top: 35,
    overflow: 'hidden',
  },
});
