
import React, { useState, useContext, createContext, useEffect, useMemo } from "react";
import {  restaurantsRequest, restaurantsTransform,  } from "./restaurants.service";
import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();
//restaurants context provider, and that's going to be the thing that wraps the app and provides it certain state.
export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(LocationContext);

    const retrieveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurants([])
        setTimeout(() => {
            restaurantsRequest(loc)
                .then(restaurantsTransform)
                .then((results) => {
                    setIsLoading(false);
                    setRestaurants(results);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err);
                });
        }, 2000);
    };
    useEffect(() => {
        if (location) {
            const locationString = `${location.lat},${location.lng}`;
            retrieveRestaurants(locationString);
        }
    }, [location]);
    
    return (
        <RestaurantsContext.Provider
            value={{
                restaurants,
                isLoading,
                error

            }}
        >
            {children}
        </RestaurantsContext.Provider >
    );
};

/* restaurantContextProvider We want it to provide the request So it's going to do the request.It's going to do the transform and it's 
going to provide any state that happens to that request.So the end output of this request should be this array, but it's also going to 
control the interface with the API.*/

/*So this is the provider of this context and it returns the restaurant context, the provider, and it gives it an initial value of 
restaurants.One, two, three.So this is basically a component that's going to do the majority of the heavy lifting and then telling
the context what it's going to contain as a value.And that value can be passed around along the tree below app.js We can then go and say, 
OK, we'll use context, the restaurant context, anything below App.js now can use context of restaurant context.

/*So we're going to use context to basically allow us to, first of all, fetch the information that we need to fetch.Right, getting the 
information we need to get, but then also giving the ability for any level of the application to consume that information.And in this case,
 the information we're going to retrieve are the restaurants from these specific cities.And then we're going to be able to pass it around 
 through context, so you have to think of it this way, right?*/