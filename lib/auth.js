import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { createUser } from './db';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      Cookies.set('fast-feedback-auth', true, { expires: 1 });

      return user;
    } else {
      setUser(false);
      Cookies.remove('fast-feedback-auth');
      router.push('/');

      return false;
    }
  };

  const signinWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => handleUser(res.user));
  };

  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => handleUser(res.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
