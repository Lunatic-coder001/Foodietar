import React, { createContext, useState,useEffect,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";
export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);

    const saveFavourites = async (value,uid) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
            console.log("error storing", e);
        }
    };

    const loadFavourites = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (value !== null) {
                setFavourites(JSON.parse(value));
            }
        } catch (e) {
            console.log("error loading", e)
        }
    };
    const [favourites, setFavourites] = useState([]);
    const add = (restaurant) => {
        setFavourites([  ...favourites, restaurant ]);
    };
    const remove = (restaurant) => {
        const newFavourites = favourites.filter(
            (x) => x.placeId !== restaurant.placeId);
        setFavourites(newFavourites)
    }

    useEffect(() => {
        if (user && user.uid) {
            loadFavourites(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.uid && favourites.length) {
            saveFavourites(favourites, user.uid);
        }
    },[favourites , user])
    return(
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites: add,
                removeFromFavourites:remove,
            }}
        >
            {children}
        </FavouritesContext.Provider>
        )
}

/*use Effect let's put a use effect and let's say that the use effect is,going to listen to any change in favourite's.And any time 
favorites changes, we're going to store the favorites, so we're going to do a save favorites.Of favourite's.And that's going to be what we
want to store., but now we also need to make sure that we load the favorites, which means we're going to load favourite's every time on the
very first mount of our context. We're going to make sure that we load the initial favourite's.*/