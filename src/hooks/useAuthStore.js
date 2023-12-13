import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogOut, onLogin } from "../store/auth/authSlice";
import { onLogOutCalendar } from "../store/calendar/calendarSlice";



export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch( onChecking() );
    try {

      const {data} = await calendarApi.post('/auth', { email, password });

      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch( onLogOut( 'Credenciales incorrectas' ));
  
      setTimeout(()=>{
        dispatch(clearErrorMessage());
      },10);
    }
  }
  const startRegister = async({name, email, password}) =>{
    
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      
      
      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch(onLogin({ name: data.name, uid: data.uid }));
       
    } catch (error) {

      if (error.response.data?.msg !== undefined) {
        dispatch( onLogOut( error.response.data?.msg ));
      }else if(error.response.data?.errors){
        const err = error.response.data?.errors;
        if(err.password){
          dispatch( onLogOut( err.password.msg ));

        }else if(err.name){
          dispatch( onLogOut( err.name.msg ));

        }
      }
      
      setTimeout(()=>{
        dispatch(clearErrorMessage());
      },10);
    }

  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if( !token ) return dispatch( onLogOut() ); 
    try {
      const { data } = await calendarApi.get( '/auth/renew' );
      localStorage.setItem( 'token-init-date', new Date().getTime() );
      localStorage.setItem('token', data.token);
      dispatch( onLogin({ name: data.name, uid: data.uid }) )
    } catch (err) {
      console.log(err);
      localStorage.clear();
      dispatch( onLogOut() );

    }
  }

  const startLogOut = () => {
    localStorage.clear();
    dispatch( onLogOutCalendar());
    dispatch(onLogOut());
  }

  return {
    //* Propiedades
    errorMessage,
    status,
    user,
    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogOut,
   
  }
}
