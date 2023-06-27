import React, { useState, createContext } from "react";
import { loginRequest } from "./authentication.service";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    });

  const onLogin = (email, password) => {
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };
 
  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if(password !== repeatedPassword) {
      setError("Error: Passwords Do Not Match")
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  }

    const onLogout = () => {
       
            signOut(auth)
            .then(() => {
                setUser(null);
                setError(null);
            });
    
    
    };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};