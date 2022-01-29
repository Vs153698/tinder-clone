import { createContext, useContext, useEffect, useState } from "react";
import * as Google from 'expo-google-app-auth'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext({});
const config = {
    androidClientId: '234162125222-8sm563ngcihea9p9m5lo3rpnra7gsoct.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]

}
export const AuthProvider = ({ children }) => {
    const [Currentuser, setCurrentUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() =>  onAuthStateChanged(auth,user => {
        if (user) {
            setCurrentUser(user)
        }else{
            setCurrentUser(null)
        }
            setLoadingInitial(false)
        }))
    const signInwithGoogle = async () => {
        await Google.logInAsync(config).then(async (loginResult) => {
            setLoading(true)
            console.log("entered in google");
            if (loginResult.type === "success") {
                const { idToken, accessToken } = loginResult
                const credentials = GoogleAuthProvider.credential(idToken, accessToken)
                await signInWithCredential(auth, credentials)
            }
            return Promise.reject()
        }).catch(err => { setError(err) }).finally(() =>setLoading(false))
    }
    const logout = () => {
        setLoading(true)
        signOut(auth).catch((error) => setError(error)).finally(() => setLoading(false))
        setLoading(false)
    }
    
    return (
        <AuthContext.Provider value={{ Currentuser, signInwithGoogle, loading, setLoading, error, setError, logout }}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext)
}
