import React, { useCallback, useMemo, useState } from 'react';
import MonthPicker from 'react-native-month-year-picker';

const RMonthPicker = ({onSelectMonth = ()=>{},ls_month}) => {
    const [date, setDate] = useState(ls_month ? ls_month :new Date());
    const [showPicker, setShowPicker] = useState(true);

    const onValueChange = useCallback(
      (event, newDate) => {
        const selectedDate = newDate || date;
        setDate(ls_month);
        onSelectMonth(false,selectedDate)
        setShowPicker(false)
      },
      [date, showPicker],
    );
  
    return useMemo(() => showPicker && 
           <MonthPicker
            onChange={onValueChange}
            value={date}
            // minimumDate={new Date()}
            locale="en" 
            mode='short'
          /> , [showPicker])
  };
  
  export default RMonthPicker;
  