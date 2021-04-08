import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log(user);

  const signinWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        return res.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }

      return () => unsubscribe();
    });
  }, []);

  return {
    user,
    signinWithGitHub,
    signout,
  };
}
