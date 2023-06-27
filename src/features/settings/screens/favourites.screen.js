import React, { useContext } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
align-items:center;
justify-content:center;
`;


export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ? (
        <SafeArea>
            <RestaurantList
                data={favourites}
                renderItem={({ item }) => {
                    //console.log(item);
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}>
                            <Spacer position="bottom" size="large">
                                <RestaurantInfoCard restaurant={item} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                }
                }
                keyExtractor={(item) => item.name}
            />
        </SafeArea>
    ) : (
        <NoFavouritesArea>
            <Text variant="label" center>No favourites yet</Text>
        </NoFavouritesArea>
    );
};


/*And what we're going to do is we're actually going to import our restaurant list component.What is that component that actually well, 
let's go look at restaurants and let's go look at the components.And so what we had inside of our restaurant screen was a restaurant list 
that came from the restaurant lists component.That was a flat list.Correct.Like I said, we didn't need to load the restaurant, so we 
actually didn't need the restaurant's context.And this can happen when you copy code.You have to be very aware of what your data sources.
And so now when we swap it out and we go to settings, now we're rendering out our favorites.And if we go back here and we quickly add one,
what we can see over here is it's been added to the list.So always make sure that your data source is correct and that you're pulling the 
correct information into your list*/