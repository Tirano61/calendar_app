

const tempEvent = {
  _id: new  Date().getTime(),
  title: 'Cumpleños',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Alfredo'
  }
};


import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
      events: [
        tempEvent,
      ],
      activeEvent: null,
  },
  reducers: {
      onEvents: ( state ) => {
        //state.events = state.events;
      },
      onSetActiveEvent: ( state, { payload } ) => {
        console.log(payload)
        state.activeEvent = payload;
      },
  },
});


// Action creators are generated for each case reducer function
export const { onEvents, onSetActiveEvent } = calendarSlice.actions;
