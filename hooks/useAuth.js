import { createContext, useContext } from "react";
import * as Google from 'expo-google-app-auth'
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext({});
const config = {
    androidClientId: '234162125222-8sm563ngcihea9p9m5lo3rpnra7gsoct.apps.googleusercontent.com',
    scopes: ["profile","email"],
    permissions: ["public_profile", "email", "gender", "location"]

}
export const AuthProvider = ({ children }) => {
    const signInwithGoogle = async()=>{
        console.log("entered inside google");
       const loginResult = await Google.logInAsync(config)
       if (loginResult.type === 'success') {
           const {idToken, accessToken} = loginResult
           const credentials =  GoogleAuthProvider.credential(idToken,accessToken)
           await signInWithCredential(auth,credentials)
       }
       return Promise.reject()
    }
    return (
        <AuthContext.Provider value={{user:null,signInwithGoogle}}>
            { children }
        </AuthContext.Provider>
    );
};

export default function useAuth(){
    return useContext(AuthContext)
}
