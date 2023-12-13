import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";




const getMockStore = ( initialState ) =>{
  return configureStore ({
    reducer:{
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState }
    }
  });
}

describe('Pruebas en useAuthStore', () => {

  beforeEach(() =>  localStorage.clear());

  test('Debe regresar los valores por defecto', () => { 
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });
    
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogOut: expect.any(Function)
    });
  });

  test('startLogin debe hacer login correctamente', async() => { 

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;
    
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        uid: '656f1614b89010da1545ff7f',
        name: 'Test'
      }
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

  });

  test('startLogin debe fallar la autentificacion', async() => { 

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startLogin({ email: 'algo@gmail.com', password: '123456' });
    });

    const { errorMessage, status, user } = result.current;

    expect( { errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: {}
    });
    
    expect(localStorage.getItem('token')).toBe(null);

    //React testing librery espera un momento para ver si limpia el mensaje llamando a clearErrorMessage
    waitFor(
      () => expect(result.current.errorMessage).toBe(undefined)
    );
  });

  test('startRegister debe crear un usuario', async() => { 
    
    const newUser = { email: 'algo@gmail.com', password: '123456', name: 'Test User' };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });


    const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
      data:{
        "ok": true,
        "uid": "656f1614b89010da1545ff7f",
        "name": "Test User",
        "token": "algun-token"
      }
    });

    await act( async() => {
      await result.current.startRegister( newUser );
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
        errorMessage: undefined,
        status: 'authenticated',
        user: { name: 'Test User', uid: '656f1614b89010da1545ff7f' 
      }
    });

    spy.mockRestore();

  });

  test('startRegister debe fallar el registro', async() => { 
    
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
        "errorMessage": "El usuario ya existe",
        "status": "not-authenticated",
        "user": {},
    });

  });

  test('checkAuhthToken debe fallar si no hay token', async() => { 
    
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    });

  });
  test('checkAuthToken debe autenticar el usuario si hay un token', async() => { 
    
    const { data } = await calendarApi.post('/auth', testUserCredentials);

    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook( () => useAuthStore(),{
      wrapper:({ children }) => <Provider store ={ mockStore }>{ children }</Provider>
    });

    await act( async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect( { errorMessage, status, user }).toEqual({
        errorMessage: undefined,
        status: 'authenticated',
        user: { name: 'Test', uid: '656f1614b89010da1545ff7f' }
    })

  });
  
});

