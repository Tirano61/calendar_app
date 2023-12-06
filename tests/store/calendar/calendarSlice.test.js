import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogOutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";




describe('Prueba en clendarSlice', () => { 

  test('Debe regresar el estado por defecto', () => { 
    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( initialState );
  });

  test('onSetActiveEvent debe activar el evento', () => { 
    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onAddNewEvent de agregar un evento', () => { 
    const newEvent = {
      id: '3',
      title: 'Titulo',
      notes: 'Alguna nota nueva',
      start: new Date('2023-11-19 13:00:00'),
      end: new Date('2023-11-19 15:00:00'),
    }
    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));

    expect( state.events ).toEqual( [...events, newEvent] );
  });

  test('onUpdateEvent de actualizar un evento', () => { 
    const updatedEvent = {
      id: '1',
      title: 'Titulo',
      notes: 'Alguna nota actualizada',
      start: new Date('2023-11-19 13:00:00'),
      end: new Date('2023-11-19 15:00:00'),
    }
    const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ));

    expect( state.events ).toContain( updatedEvent );
  });

  test('onDeleteEvent debe borra el evento activo', () => { 
    const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent());
    expect( state.activeEvent ).toBe( null );
    expect( state.events ).toHaveLength(1);
  });

  test('onLoadEvent debe cargar los eventos', () => {
    const state = calendarSlice.reducer( initialState, onLoadEvents( events ));
    expect( state.events ).toEqual( [ ...events ] );
    const newState = calendarSlice.reducer( state, onLoadEvents( events ));
    expect( newState.events.length ).toBe(2);
  });

  test('onLogOutCalendar debe quitar los eventos', () => {   
    const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogOutCalendar());
    expect( state ).toEqual( initialState );
  });

});