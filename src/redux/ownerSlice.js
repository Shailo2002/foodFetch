import { createSlice } from "@reduxjs/toolkit";

export const ownerSlice = createSlice({
  name: "owner",
  initialState: { myShopData: null },
  reducers: {
    setMyShopData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMyShopData } = ownerSlice.actions;

export default ownerSlice.reducer;
