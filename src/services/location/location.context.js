import React, { createContext, useEffect, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("San Francisco");
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword = "Antwerp") => {
        console.log(searchKeyword);
        setIsLoading(true);
        setKeyword(searchKeyword);
        if (!searchKeyword.length) {
            //Now, there's a difference between doing it on the on change text versus in the location context.And I wanted to show that because you can inadvertently cause bugs by doing this.
            return;
        }
        locationRequest(searchKeyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                setLocation(result);
                
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.log(err);
            });
    };


   

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword,
        }}
        >
            {children}
        </LocationContext.Provider>
    )

}
/*Here's the question, do we only ever manually want to trigger the search function or do we want to trigger it?OnLoad.This is a good 
question.Well, let's trigger an onload to start with. So onload is a useEffect of an empty array.The dependency keyword either include it or remove the dependency error.
If we remove the dependency array, though, what's going to happen is it's going to trigger on every render and we don't want it to trigger on every single render that would cause an issue.*/