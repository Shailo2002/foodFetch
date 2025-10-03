import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopInMyCity: null,
    ItemInMyCity: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setItemInMyCity: (state, action) => {
      state.setItemInMyCity = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.currentAddress = null;
      state.currentState = null;
      state.shopInMyCity = null;
      state.ItemInMyCity = null;
      state.loading = false;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  clearUserData,
  setShopInMyCity,
  setItemInMyCity,
} = userSlice.actions;

export default userSlice.reducer;
