
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

  //const auth_status = 'not-authenticated'; //'authenticated' 'not-authenticated'
  const auth_status = 'authenticated'// 'not-authenticated'

  return (
    <Routes>
      {
        (auth_status === 'not-authenticated')
          ? <Route path='/auth/*' element={<LoginPage />} />
          : <Route path='/*' element={<CalendarPage />} />
      }
      
      <Route path='/*' element={ <Navigate to={ '/auth/login'} /> } />
    </Routes>
  )
}
