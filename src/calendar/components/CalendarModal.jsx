
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendrModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [startDate, setStartDate] = useState(new Date());
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValue, setFormValue] = useState({
    title: 'Dario',
    notes: 'Ramirez',
    start: new Date(),
    end: addHours( new Date(), 2)

  });

  const titleClass = useMemo(() => {
    if( !formSubmited ) return '';
    return ( formValue.title.length > 0 )
      ? 'is-valid'
      : 'is-invalid'
    

  }, [ formValue.title, formSubmited ])

  const onCloseModal = () => {
    closeDateModal();
  }

  const onInputChange = ({ target }) => {
    setFormValue({
      ...formValue,
      // cambia el solo el valor del input que haya echio el cambio  
      [target.name]: target.value

    })
  }
  const ondateChange = ( event, changing ) => {

    setFormValue({
      ...formValue,
      [changing]: event  
    })

  }

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const dif = differenceInSeconds(formValue.end, formValue.start);
    if (isNaN(dif) || dif <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }
    if (formValue.title.length <= 0) return;

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={ 200 }
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit }>
 
        <div className="form-group mb-2 ">
          <label className='modal-label'>Fecha y hora inicio</label>
          <DatePicker
            locale='es'
            selected={formValue.start}
            onChange={ (event) => ondateChange( event, 'start' ) }
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            timeIntervals={5}
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label className='modal-label'>Fecha y hora fin</label>
          <DatePicker
            locale='es'
            minDate={ formValue.start }
            selected={formValue.end}
            onChange={ (event) => ondateChange( event, 'end' ) }
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            timeIntervals={5}
            timeCaption='Hora'
          />
        </div>

        <hr />
        
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className= { `form-control ${ titleClass }`} 
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValue.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValue.notes}
            onChange={onInputChange }
          >
          </textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
