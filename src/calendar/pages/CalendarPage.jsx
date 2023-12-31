import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer, getMessagesES } from '../../helpers'
import { NavBar, CalendarEvent, CalendrModal } from "../"
import { useEffect, useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks';




export const CalendarPage = () => {
  const { user } = useAuthStore();

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id ) || ( user.uid === event.user.uid );
 
    const style = {
      backgroundColor: isMyEvent ? '#34D0F7' : '#A7A7B4',
      borderRadius: '0px',
      color: 'withe'
    }
    return {
      style
    }
  }

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  
  const { onOpendateModal, onCloseDateModal } = useSelector(state => state.ui);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const dispatch = useDispatch();
  
  const onDoubleClick = (event) => {
    openDateModal();
  }
  const onSelect = (event) => {
    setActiveEvent( event );
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <NavBar />
      <Calendar 
        culture='es'
        defaultView={ lastView }
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendrModal />
      <FabAddNew />
      <FabDelete />
      
    </>
  )
}
