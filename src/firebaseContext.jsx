import React, { createContext, useContext } from 'react';
//@ts-ignore
import { appFirebase, auth } from './firebaseconfig.js';

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={{ appFirebase, auth }}>
    {children}
  </FirebaseContext.Provider>
);