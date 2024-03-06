import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Apptheme, White } from '../../../../config/Colors';
import { Rtext } from '../../../../components/Rtext';
import { currency } from '../../../../config/Constant';

const RevenueEarned = ({ RevenueEarned }) => {
  let earning_revenue = RevenueEarned;
  let total_revenue_earned = parseFloat(earning_revenue?.total_revenue_earned_offline) + parseFloat(earning_revenue?.total_revenue_earned_online);
  let total_revenue_received = parseFloat(earning_revenue?.total_revenue_received_offline) + parseFloat(earning_revenue?.total_revenue_received_online);
  let outstanding_balance = parseFloat(total_revenue_earned - total_revenue_received);
  return (
    <View style={appoimentStyle.boxOuterView}>
      <View style={appoimentStyle.innerStyle}>
        <View style={appoimentStyle.spaceingStyle}>
          <Rtext  >Total Revenue Earned :</Rtext>
          <Rtext >{currency} {total_revenue_earned ? total_revenue_earned?.toFixed(2) : 0}</Rtext>
        </View>
      </View>
      <View style={appoimentStyle.borderDesign}></View>
      <View style={appoimentStyle.innerStyle}>
        <View style={appoimentStyle.spaceingStyle}>
          <Rtext>Total Revenue Received :</Rtext>
          <Rtext style={{ color: Apptheme }} fontWeight={"bold"}>{currency} {total_revenue_received ? total_revenue_received?.toFixed(2) : 0}</Rtext>
        </View>
      </View>
      <View style={appoimentStyle.borderDesign}></View>
      <View style={appoimentStyle.innerStyle}>
        <View style={appoimentStyle.spaceingStyle}>
          <Rtext>Outstanding balance :</Rtext>
          <Rtext style={{ color: "#DB4437" }} fontWeight={"bold"}>{currency} {outstanding_balance ? outstanding_balance?.toFixed(2) : 0}</Rtext>
        </View>
      </View>
    </View>
  );
};
export default RevenueEarned;

const appoimentStyle = StyleSheet.create({
  boxOuterView: {
    borderRadius: 10,
    backgroundColor: White,
    elevation: 10,
    marginTop: 34,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.0,
  },
  innerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  borderDesign: {
    borderWidth: 0.6,
    borderColor: '#EEF2F5'
  },
  spaceingStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
