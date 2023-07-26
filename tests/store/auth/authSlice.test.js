import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("Tests in authSlice", () => {
  test('Must return the initial state and be called "auth"', () => {
    expect(authSlice.name).toBe("auth");
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Must carry out the authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("Must carry out the logout without arguments", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test('Must carry out the logout and show an error message',()=>{

    const state= authSlice.reducer(authenticatedState,logout({errorMessage:'Credenciales no son correctas'}));

    expect(state).toEqual({
        status: "not-authenticated",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: 'Credenciales no son correctas',
      });
  })

  test('Must change the state to checking ', () => { 

    const state= authSlice.reducer(authenticatedState,checkingCredentials());

    expect(state.status).toBe('checking');
   })
});
