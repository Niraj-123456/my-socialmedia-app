import React, { useState, useEffect, createContext } from "react";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext)
// }

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    return auth
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const registerUserWithEmailAndPwd = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.User);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const loginUserWithEmailAndPwd = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
        history.push("/login");
      });
  };

  const logOut = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    signInWithGoogle,
    registerUserWithEmailAndPwd,
    loginUserWithEmailAndPwd,
    logOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
