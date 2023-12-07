import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { testUserCredentials } from "../fixtures/testUser";




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
    localStorage.clear();
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
  

});

