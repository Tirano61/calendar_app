import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";




export const useUiStore = () =>{

  const dispach = useDispatch();
  const { isDateModalOpen } = useSelector( state => state.ui ); 

  const openDateModal = () =>{
    dispach( onOpenDateModal())
  }
  const closeDateModal = () => {
    dispach( onCloseDateModal());
  }
  return {
    //Propiedades
    isDateModalOpen,
    // Métodos
    openDateModal,
    closeDateModal,
  }
}