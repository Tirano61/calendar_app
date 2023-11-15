import { createSlice } from "@reduxjs/toolkit";





export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpendateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    }
  }
});


export const { onOpendateModal, onCloseDateModal } = uiSlice.actions;