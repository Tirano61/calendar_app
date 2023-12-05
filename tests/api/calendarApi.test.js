import calendarApi from "../../src/api/calendarApi";




describe('Pruebas en CalendarApi', () => { 
  test('debe tener la configuración por defecto', () => { 
    
    expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL )

  });
  test('debe tener el x-token en todas las peticiones', async() => { 

    try {
      const token = '123';
      localStorage.setItem('token', token );

   
      const res = await calendarApi.post('/auth', {
          email: 'test@gmail.com',
          password: '123456',
      });

      expect(res.config.headers['x-token']).toBe(token);

      } catch (error) {
          console.log(error);
      };

  });
});