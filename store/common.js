import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userSlice = createSlice({
  name: 'common',
  initialState: {
    pageOffSetValue: 'Home',
    user: null,
    token: '',
    cms_arr: [],
    cms_dynamic_page: '',
  },
  reducers: {
    setPageOffSetValue: (state, {payload}) => {
      state.pageOffSetValue = payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      AsyncStorage.setItem('token', action.payload.token);
    },
    logoutSuccess: state => {
      state.user = null;
      state.token = '';
      // AsyncStorage.clear();
    },
    setCmsPage: (state, action) => {
      state.cms_arr = action.payload;
    },
    setDynamicCmspage: (state, action) => {
      state.cms_dynamic_page = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  setPageOffSetValue,
  loginSuccess,
  logoutSuccess,
  setCmsPage,
  setDynamicCmspage,
} = userSlice.actions;

export default userSlice.reducer;
