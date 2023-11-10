import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import { localizer, getMessagesES } from '../../helpers'
import { NavBar, CalendarEvent, CalendrModal } from "../"
import { useState } from 'react'

const events = [{
  title: 'Cumpleños',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Dario'
  }

}]

const eventStyleGetter = (event, start, end, isSelected) => {
 
  const style = {
    backgroundColor: '#34D0F7',
    borderRadius: '0px',
    color: 'withe'
  }
  return {
    style
  }
}



export const CalendarPage = () => {
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });

  }
  const onSelect = (event) => {
    console.log({ click: event });
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

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
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={ onViewChanged }
      />
      <CalendrModal />
      
    </>
  )
}
