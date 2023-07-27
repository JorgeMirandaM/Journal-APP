import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers')

describe('Tests in AuthThunks', () => { 

    const dispatch= jest.fn();

    beforeEach(()=>jest.clearAllMocks());
    test('Must invoke the checkingCredentials function', async () => { 
        
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
     })





     test('startGoogleSignIn should call CheckingCredentials and login - Success', async () => { 

        const loginData={ok:true, ...demoUser}
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
      })

      test('startGoogleSignIn should call CheckingCredentials and logout - Error', async () => { 

        const loginData={ok:false, errorMessage:'Un error en google'}
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
      })






      test('startCreatingUserWithEmailPassword must call checkingCredentials and login -- Success', async () => { 

            const data={ok:true,...demoUser};

            const formData={email:demoUser.email, password: '123456', displayName:demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(data)
       
            await startCreatingUserWithEmailPassword(formData)(dispatch);

            expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
            expect(dispatch).toHaveBeenCalledWith(login(data))

        })

        test('startCreatingUserWithEmailPassword must call checkingCredentials and logout -- Error', async () => { 

            const data={ok:false,errorMessage:'Un error en Google'};

            const formData={email:demoUser.email, password: '123456', displayName:demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(data);
       
            await startCreatingUserWithEmailPassword(formData)(dispatch);

            expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
            expect(dispatch).toHaveBeenCalledWith(logout(data.errorMessage))

        })







      test('startLoginWithEmailPassword should call CheckingCredentials and login - Success', async () => { 

        const loginData={ok:true, ...demoUser};

        const formData={email:demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
      })

      test('startLoginWithEmailPassword should call CheckingCredentials and logout - Error', async () => { 

        const loginData={ok:false, errorMessage:'Un error en startLoginWithEmailPassword'};

        const formData={email:demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
      })










      test('startLogout must call logoutFirebase, clearNotesLogout and logout',async  () => { 


        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}));

       })
 })