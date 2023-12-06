import { authSlice, clearErrorMessage, onLogOut, onLogin } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authState";
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => { 
  test('Debe regresar el estado inicial', () => { 
    
    expect( authSlice.getInitialState() ).toEqual( initialState );

  });
  test('Debe realizar un login', () => { 

    const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    });
  });
  test('Deberealizar el logOut', () => { 
    const state = authSlice.reducer( authenticatedState, onLogOut() );

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    });
  });
  test('Debe realizar el logOutcon mensaje', () => { 
    const errorMessage = 'credenciales no válidas';
    const state = authSlice.reducer( authenticatedState, onLogOut(errorMessage) );

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage
    });
  });
  test('Debe limpiar el mensaje de error', () => {  
    const errorMessage = 'credenciales no válidas';
    const state = authSlice.reducer( authenticatedState, onLogOut(errorMessage) );
    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe( undefined );

  });
  test('Debe realizar el onChecking', () => { 
    
  });
});