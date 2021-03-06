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

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
      // console.log(decodedToken.claims.stripeRole);

      createUser(user.uid, userWithoutToken);
      setUser(user);

      Cookies.set('fast-feedback-auth', true, { expires: 1 });

      return user;
    } else {
      setUser(false);
      Cookies.remove('fast-feedback-auth');

      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    router.push('/sites');

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        handleUser(res.user);
      });
  };

  const signinWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    router.push('/sites');

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => handleUser(res.user));
  };

  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    router.push('/sites');

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => handleUser(res.user));
  };

  const signout = () => {
    router.push('/');

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
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
  return decodedToken.claims.stripeRole;
};

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    stripeRole: await getStripeRole(),
  };
};
