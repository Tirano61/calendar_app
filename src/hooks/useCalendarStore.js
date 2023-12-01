
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventToDateEvent } from '../helpers';

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar ); 
  const { user } = useSelector( state => state.auth ); 
  
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
    try {
      if (calendarEvent.id ) {
        //actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUpdateEvent({ ...calendarEvent, user }));
      } else {
        // creando evento nuevo
        const {data} = await calendarApi.post('/events', calendarEvent );
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log('Error creando o actualizando eventos');
      console.log(error);
      Swal.fire('Error al guardar',error.response.data.msg, 'error');
    }
    
  }

  const startDeleteEvent = async() => {
    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar',error.response.data.msg, 'error');
    }
  }

  const startLoadingEvents = async() =>{
    try {
      const { data } = await calendarApi.get('/events');
      
      const events = convertEventToDateEvent( data.eventos);
      
      dispatch( onLoadEvents( events ));
      
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
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
    startLoadingEvents
  }
}
