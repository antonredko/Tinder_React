import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase } from "../firebase/firebase";
import { useDb } from "../firebase/dbActions";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const db = useDb()

  function setCustomErrorText(err) {
    const error = err;

    switch (error.code) {
      case "auth/user-not-found":
        error.message = "Аккаунт не знайдено!";
        break;
      case "auth/email-already-in-use":
        error.message = "Email вже використовується іншим аккаунтом!";
        break;
      case "auth/wrong-password":
        error.message = "Невірний пароль!";
        break;
      case "auth/weak-password":
        error.message = "Пароль повинен містити щонайменше 6 символів!";
        break;
      default:
    }
    setError(error);
  }

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setError(null);
        setUser(response.user);
        // setUserData(db.getUser(user))
        return response.user;
      })
      .catch((error) => {
        setCustomErrorText(error);
        setUser(null);
        return error;
      });
  };
  
  const signup = (email, password, userD) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setError(null);
        setUser(response.user);
        db.createUser({...userD, uid: response.user.uid})
        // setUserData({...userData, uid: response.user.uid})
        return response.user;
      })
      .catch((error) => {
        setCustomErrorText(error);
        setUser(null);
        return error;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch((error) => {
        setCustomErrorText(error);
        return error;
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    // userData,
    error,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
