import React, {useState, useEffect, createContext} from 'react'
import { auth, provider } from '../firebase'

export const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext)
// }

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const signInWithGoogle = () => {
        return auth.signInWithPopup(provider)
        .then((res) => {
            setUser(res.user)
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const logOut = () => {
        return auth.signOut()
        .then(() => {
            setUser(null);
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsAuthenticating(false);
        })

        // cleanup subscription on unmount
        return () => unsubscribe();
    }, [])

    const values = {
        user,
        isAuthenticating,
        signInWithGoogle,
        logOut
    }

    return (
        <AuthContext.Provider value={values}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}
