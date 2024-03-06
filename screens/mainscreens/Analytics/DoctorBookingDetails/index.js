import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradientComponent from '../../../../components/LinearGradientCom';
import HeaderCommon from '../../../../components/HeaderCommon';
import Styles from '../../../../Styles';
import CompleteAndCancelBookingCard from './CompleteAndCancelBookingCard';
import { request } from '../../../../services';
import Rloader from '../../../../components/Rloader';
import FooterLoader from '../../../../components/FooterLoader';
import { White } from '../../../../config/Colors';
let lb_noMoreFetachDataForCompleted = false;
const DoctorBookingDetails = ({ route }) => {
  const [lb_loaderForCompleted, setLoaderForCompleted] = useState(false);
  const [lb_loaderForCanncelled, setLoaderForCanncelled] = useState(false);
  const [completedList, setCompletedList] = useState([])
  const [cancelledList, setCancelledList] = useState([])
  const day_limit = route?.params?.day_limit
  const selectdate = route?.params?.selectdate
  const doctor_name = route.params?.doctor_name
  const doctor_id = route.params?.doctor_id;

  useEffect(() => {
    getAnalyticsListForCompleted(day_limit, selectdate);
  }, [day_limit, selectdate])

  useEffect(() => {
    getAnalyticsListForCancelled(day_limit, selectdate);
  }, [day_limit, selectdate])




  const getAnalyticsListForCompleted = async (
    daterange,
    selectedDate,
  ) => {
    setLoaderForCompleted(true)
    try {
      let response = await request(
        'get',
        `appointments/clinic-analytics?from_date=${selectedDate?.form_date}&to_date=${selectedDate?.to_date}&days=${daterange}&doctor_id=${doctor_id}&limit=10&status=${"COMPLETED"}`,
      );
      const completedAppointmentList = response?.data?.data["doctors"] || [];
      setCompletedList(completedAppointmentList);
    } catch (e) {
      console.log('response error from health record', e);
    }
    setLoaderForCompleted(false);

  };


  const getAnalyticsListForCancelled = async (

    daterange,
    selectedDate,
  ) => {

    setLoaderForCanncelled(true)

    try {
      let response = await request(
        'get',
        `appointments/clinic-analytics?from_date=${selectedDate?.form_date}&to_date=${selectedDate?.to_date}&days=${daterange}&doctor_id=${doctor_id}&limit=10&status=${"CANCELLED"}`,
      );
      let cancelledappintmentList = response?.data?.data["doctors"];
      setCancelledList(cancelledappintmentList)
    } catch (e) {
      console.log('response error from health record', e);
    }

    setLoaderForCanncelled(false)
  };

  return (
    <LinearGradientComponent>
      <View style={{ flexDirection: 'row' }}>
        <HeaderCommon
          headerName={doctor_name}
          navigateBackto={'Analytics'}
          style={{ top: 20 }}
        />
      </View>
      <>
        {lb_loaderForCompleted || lb_loaderForCanncelled ? <Rloader /> :
          <View style={[Styles.mainBodyStyle, { marginTop: 45, }]}>
            {/* style={{marginTop:"80%"}} */}
            <>
              {completedList[0]?.appointment_details && <CompleteAndCancelBookingCard data={completedList[0]["appointment_details"]}
                title={'Completed Bookings: '} totalcount={completedList[0]?.completed_count}
                totalEaring={completedList[0]?.total_clinic_earning_by_doctor} lb_loaderForCompleted={lb_loaderForCompleted} />}
              {cancelledList[0]?.appointment_details && <CompleteAndCancelBookingCard
                data={cancelledList[0]["appointment_details"]} title={'Cancelled Bookings: '}
                cancel={true} totalcount={cancelledList[0]?.cancelled_count}
                totalEaring={cancelledList[0]?.total_clinic_earning_by_doctor} lb_loaderForCanncelled={lb_loaderForCanncelled} />}
            </>
          </View>
        }
      </>
    </LinearGradientComponent>
  )
}

export default DoctorBookingDetails