
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar ); 
  
  const setActiveEvent = (calendarEvent )=>{
    dispatch(onSetActiveEvent(calendarEvent ) );
  }

  /**
   * * Si el evento tiene in _id hace el dispatch 
   * ```
   * onUpdateEvent({ ...calendarEvent })
   * ```
   * * Si no tiene _id crea hace el dispatch para crear un nuevo evento
   * ```
   * dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
   * ```

   * @param {any} calendarEvent 
   * ```
   * calendarEvent = {
   *                 title: string;
   *                 notes: string;
   *                 start: Date;
   *                 end: Date;
   *               }
   * 
   * ```
   */
  const startSavingEvent = async ( calendarEvent) => {
    //TODO: llegar al backend

    // Todo bien
    if (calendarEvent._id ) {
      //actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }));
    } else {
      // creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  }

  const startDeleteEvent = () => {
    dispatch( onDeleteEvent() );
  }

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected:  !!activeEvent,
    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  }
}
