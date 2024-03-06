import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl, logout} from '../utility';

export const request = async (method, url, data = {}) => {
  // console.log("config.baseUrl", config.baseUrl + url);
  let executionTime = 8000;
  let headerObj = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (method == 'upload') {
    headerObj['Content-Type'] = 'multipart/form-data';
  }

  const token = await AsyncStorage.getItem('token');
  // console.log(token);
  // const execution_time_insec= await AsyncStorage.getItem('executionTime');
  // if(execution_time_insec)
  // {
  //   executionTime = parseInt(execution_time_insec) * 1000
  // }
  if (token) {
    headerObj['authorization'] = token;
  }

  // timeout: executionTime,
  let instance = axios.create({
    baseURL: baseUrl,
    headers: headerObj,
    validateStatus: function (status) {
      if (status == 401) {
        logout()
      }
      return status == 200;
    },
  });

  let base;
  if (method === 'post') {
    console.log(url, data);
    base = instance.post(url, data);
  } else if (method === 'put') {
    base = instance.put(url, data);
  } else if (method === 'patch') {
    base = instance.patch(url, data);
  } else if (method === 'delete') {
    base = instance.delete(url);
  } else if (method === 'upload') {
    base = RNFetchBlob.fetch('POST', baseUrl + url, headerObj, [
      {
        name: 'file_data',
        filename: data['fileName'],
        type: data['type'],
        data: RNFetchBlob.wrap(data['uri']),
      },
    ]);
  } else {
    base = instance.get(url, {params: data});
  }

  return base;
};
