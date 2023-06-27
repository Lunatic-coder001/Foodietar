import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React , {useState,useEffect} from "react";
import { ThemeProvider } from "styled-components/native";


import { initializeApp } from "firebase/app";

import {useFonts as useOswald, Oswald_400Regular,} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAd3qZNAntb4s5a9UzxgkGRtrItJF6aRaM",
  authDomain: "mealstogo-46765.firebaseapp.com",
  projectId: "mealstogo-46765",
  storageBucket: "mealstogo-46765.appspot.com",
  messagingSenderId: "235672379249",
  appId: "1:235672379249:web:7c128fe30b3f22aa4e60d0"
};
const app = initializeApp(firebaseConfig);

export default function App() {
 
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  // if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation/>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
/*OK, so now that we know that that context is hooked up and the app JS file has now provided the restaurant's array to any component 
below it inside of the tree, now we can go ahead and try to hook up our data, our restaurant request in our restaurant transform.*/

/*tab navigator, we're setting the prop screen options and screen options is returning a function that is returning an object.This is a 
shorthand notation for returning an object.*/