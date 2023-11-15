
import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar ); 
  
  const setActiveEvent = ( caelndarEvent )=>{
    dispatch( onSetActiveEvent( caelndarEvent ) );
  }

  return {
    // Propiedades
    events,
    activeEvent,
    // Metodos
    setActiveEvent,
  }
}
