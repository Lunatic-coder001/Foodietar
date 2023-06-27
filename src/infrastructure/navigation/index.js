import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native"; 

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator/>:<AccountNavigator/>}
        </NavigationContainer>
    );
};

/* we set up the index file and we set this up with a purpose back then. And that purpose was eventually to extend out the App Navigator, 
to also render out the authentication navigation at some point.*/