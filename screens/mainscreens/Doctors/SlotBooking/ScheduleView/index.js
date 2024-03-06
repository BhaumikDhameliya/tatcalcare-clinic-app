import { FlatList, StyleSheet, TouchableOpacity, View,SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Rtext } from '../../../../../components/Rtext';
import Entypo from 'react-native-vector-icons/Entypo';
import { Apptheme, Grey } from '../../../../../config/Colors';
import { normalizeSize } from '../../../../../utility';
import DateViewCard from './DateViewCard';
import moment from 'moment-timezone';
import RMonthPicker from '../../../../../components/RMonthPicker';

const ScheduleView = ({
  Appointment = false,
  sel_date = () => { },
  sel_month = () => { },

  bookingSlots = [],
  setSlotId=()=>{},
  lb_loader = false
}) => {
  const flatListRef = useRef(null);
  const currentDate = new Date();
  const options = { month: 'long' };
  const [lb_calenderIsOpen, setCalenderIsOpen] = useState(false);
  const [pressonOnSlectDate, setPressOnSelectDate] = useState(false)
  const [ls_selectedDate, setSelectedDate] = useState(
    moment(currentDate).format('YYYY-MM-DD'),
  );
  const [ls_month, setMonth] = useState(currentDate.getMonth());
  const [ls_monthname, setMonthname] = useState(
    currentDate.toLocaleString('en-US', options),
  );
  const [li_year, setYear] = useState(currentDate.getFullYear());
  const [la_daylist, setDaylist] = useState([]);
  const [ls_selectedMonth, setSelectedMonth] = useState();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleSelectWeek = (status, selectedMonth) => {
    sel_month(selectedMonth);
    setSelectedMonth(selectedMonth);
    setCalenderIsOpen(status);
    const date = new Date(selectedMonth);
    const fullYear = date.getFullYear();
    const options = { month: 'long' };
    const monthName = date.toLocaleString('en-US', options);
    setMonthname(monthName);
    setYear(fullYear);
    setMonth(moment(selectedMonth, 'DD-MM-YYYY').toDate().getMonth());
    if (
      selectedMonth.getFullYear() == new Date().getFullYear() &&
      selectedMonth.getMonth() == new Date().getMonth()
    ) {
      setSelectedDate(moment(new Date()).format('YYYY-MM-DD'));
      sel_date(moment(new Date()).format('YYYY-MM-DD'));
    } else {
      sel_date(moment(selectedMonth).format('YYYY-MM-DD'));

      setSelectedDate(moment(selectedMonth).format('YYYY-MM-DD'));
    }
    setPressOnSelectDate(false)
    // sel_date(moment(selectedMonth).format('YYYY-MM-DD'));
  };

  const selectedDate = date => {
    sel_date(date.dateref);
    setSelectedDate(date.dateref);
  };
  function getDatesInMonth(month, year) {
    let date = new Date(year, month, 1);
    let dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    if (Appointment) {
      getMonth();
    }
  }, [Appointment, ls_month, bookingSlots]);
  useEffect(() => {
    if (!Appointment) {
      getMonth();
    }
  }, [Appointment, ls_month]);

  const getMonth = async () => {
    const selectedMonth = await getDatesInMonth(ls_month, li_year);
    let weekDays = [];
    for (let i = 0; i < selectedMonth.length; i++) {
      const item = selectedMonth[i];
      let eachDate = new Date(item);
      let lo_date = moment(eachDate);
      let lo_todayDate = moment(new Date());
      const dateRef = moment(eachDate).format('YYYY-MM-DD');
      let li_bookingSlotCount = 0;
      if (Appointment) {
        for (let j = 0; j < bookingSlots.length; j++) {
          const slotItem = bookingSlots[j];
          if (moment(slotItem.date).format('YYYY-MM-DD') == dateRef) {
            li_bookingSlotCount = slotItem.countValue;
          }
        }
      }

      if (Appointment) {
        weekDays.push({
          day: days[lo_date.toDate().getDay()],
          date: lo_date.toDate().getDate(),
          dateref: dateRef,
          BookingSlots: li_bookingSlotCount,
        });
      } else {
        if (!lo_date.isBefore(lo_todayDate, 'day'))
          weekDays.push({
            day: days[lo_date.toDate().getDay()],
            date: lo_date.toDate().getDate(),
            dateref: dateRef,
            BookingSlots: li_bookingSlotCount,
          });
      }
    }
    setDaylist(weekDays);
  };

  useEffect(() => {

    // console.log("ls_selectedDate",ls_selectedDate);
    // console.log("new date",moment().format('YYYY-MM-DD'));
    // console.log("pressonOnSlectDate",pressonOnSlectDate);
    // console.log("status",la_daylist?.length > 0);
    // console.log("compare",ls_selectedDate == moment().format('YYYY-MM-DD'));


    // setTimeout(() => {
    if (la_daylist?.length > 0 && !pressonOnSlectDate) {
      if (ls_selectedDate == moment().format('YYYY-MM-DD')) {
        console.log('SCROLLINGINDEX');
        let data = la_daylist.find(
          item => item.dateref == moment().format('YYYY-MM-DD'),
        );
        console.log("data", data);
        let index =
          la_daylist.indexOf(data) == -1 ? 0 : la_daylist.indexOf(data);
        console.log("index", index);
        // console.log("index",la_daylist);
        if (index) {
          flatListRef?.current?.scrollToIndex({ index: index, animated: true });
        }
      }
      else {
        console.log("cpoming here");
        flatListRef?.current?.scrollToIndex({ index: 0, animated: true });
      }
    }

    else {
      console.log("Empty Flatlist");
    }
    // }, 200);

  }, [ls_selectedDate, la_daylist, !pressonOnSlectDate]);

  // useEffect(()=>{
  //   if(la_daylist.length!=0){

  //     console.log("la_daylist",la_daylist);
  //     console.log("data111",moment().format('YYYY-MM-DD'));
  //     // setTimeout(() => {
  //       let data = la_daylist.find(
  //         item => item.dateref == moment().format('YYYY-MM-DD'),
  //       );
  //       let index =
  //         la_daylist.indexOf(data) == -1 ? 1 : la_daylist.indexOf(data);
  //         console.log("data",data);
  //         console.log("index",index);
  //   }
  //           // flatListRef.current.scrollToIndex({index: index , animated: true});


  //   // }, 500);

  // },[])

  return (
    <View style={{ paddingTop: 15 }}>
      <View style={styles.mainBodyHeaderView}>
        <Rtext
          style={{ color: Apptheme }}
          fontSize={14.5}
          fontFamily="Ubuntu-Medium">
          Schedule
        </Rtext>
        {!lb_calenderIsOpen && (
          <TouchableOpacity
            onPress={() => !lb_loader && setCalenderIsOpen(true)}
            style={styles.monthViewStyle}>
            <Rtext
              style={{color: lb_loader ? Grey : Apptheme}}
              fontSize={14.5}
              fontFamily="Ubuntu-Medium">
              {ls_monthname} {li_year}
            </Rtext>
            <Entypo
              name={'chevron-down'}
              color={lb_loader ? Grey : Apptheme}
              size={normalizeSize(20)}
              style={{ start: 5 }}
            />
          </TouchableOpacity>
        ) 
        // : (
        //   // <SafeAreaView>
           
        //   // </SafeAreaView>


        // )
        }
      </View>

      <View style={{ marginLeft: -8, marginRight: -8 }}>
      {lb_calenderIsOpen &&
        <RMonthPicker
              onSelectMonth={handleSelectWeek}
              ls_month={ls_selectedMonth}
            />
           
            }
        <FlatList
          data={la_daylist}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
          renderItem={({ item, index }) => {
            return (
              <DateViewCard
                item={item}
                Appointment={Appointment}
                selectedDate={selectedDate}
                sl_date={ls_selectedDate}
                index={index}
                flatListRef={flatListRef}
                setPressOnSelectDate={setPressOnSelectDate}
                setSlotId={setSlotId}
                lb_loader={lb_loader}
              />
            );
          }}
        />
      </View>
     
    </View>
  );
};

export default ScheduleView;

const styles = StyleSheet.create({
  mainBodyHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
