import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";



jest.mock("../../../src/hooks/useCalendarStore");

describe('Pruebas en <FabDelete /> ', () => {

  const mockStartDeleteEvent = jest.fn();
  beforeEach(() => jest.clearAllMocks() );
  
  test('Debe mostrar el componente correctamente', () => { 
      
    useCalendarStore.mockReturnValue({
       hasEventSelected: false,
    });
    render( <FabDelete />);;
    
    const btn = screen.getByLabelText('btnDelete');

    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
    expect(btn.style.display).toBe('none');

  });
  test('Debe mostrar el boton si hay un evento activo', () => { 
      
    useCalendarStore.mockReturnValue({
       hasEventSelected: true,
    });
    render( <FabDelete />);
    
    const btn = screen.getByLabelText('btnDelete');

    expect(btn.style.display).toBe('');

  });
  test('Debe mostrar el boton si hay un evento activo', () => { 
      
    useCalendarStore.mockReturnValue({
       hasEventSelected: true,
    });
    render( <FabDelete />);
    
    const btn = screen.getByLabelText('btnDelete');

    expect(btn.style.display).toBe('');

  });
  test('Debe llamar a startDeletingEvent si hay evento acrivo', () => { 
      
    useCalendarStore.mockReturnValue({
       hasEventSelected: true,
       startDeleteEvent: mockStartDeleteEvent
    });
    render( <FabDelete />);
    
    const btn = screen.getByLabelText('btnDelete');

    fireEvent.click( btn );

    expect( mockStartDeleteEvent ).toHaveBeenCalled(); 

  });

});
