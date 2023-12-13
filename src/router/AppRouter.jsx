
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {

  //const auth_status = 'not-authenticated'; //'authenticated' 'not-authenticated'
  //const auth_status = 'not-authenticated'// 'not-authenticated'

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if( status === 'checking'){
    return (
      <div style={{ display: "flex", 
        alignItems: "center",
        justifyContent: 'center',
        height: "100vh",
        width: "100dw"
        
      }}>
        <h3  style={{ display: "flex", justifyContent: "center"}}>Cargando...</h3>
      </div>
    )
  }


  return (
    <Routes>
      {
        ( status === 'not-authenticated')
          ? (
              <>
                <Route path='/auth/*' element={<LoginPage />} />
                <Route path='/*' element={ <Navigate to={ '/auth/login'} /> } />
              </>
            )
          :(
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={ <Navigate to={ '/'} /> } />
            </>
          ) 
      }
      
    </Routes>
  )
}
