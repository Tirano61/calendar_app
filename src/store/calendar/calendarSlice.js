
import { createSlice } from "@reduxjs/toolkit";


export const calendarSlice = createSlice({
  name: 'ui',
  initialState: {
    cb: 1,
  },
  reducers: {
    incre: (state) => {
      state.cd = 2;
    }
  }
});


export const { incre } = calendarSlice.actions;