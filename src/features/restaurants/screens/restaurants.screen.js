import React, { useContext ,useState } from "react";
import {  TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator,Colors } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { RestaurantList } from "../components/restaurant-list.styles";

const Loading = styled(ActivityIndicator)`
margin-left: -25px;
`;
const LoadingContainer = styled.View`
position: absolute;
top : 50%;
left:50%;
`;
//navigation because RestaurantScreen is a component of Stack Navigation
export const RestaurantsScreen = ({ navigation } ) => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true}  />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle ={() => setIsToggled(!isToggled)}
      />
      {isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          //console.log(item);
          return (
            <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail",{restaurant:item})}>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )
        }
      }
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

/*our restaurants will come back in and they will load after two seconds.So now that we have the end to end flow set up to get the information 
from the JSON files rendering on the screen and dynamically rendering, we can see how powerful the entire setup we went through step by 
step is.Right, because we set up our restaurant car to take in a certain shape, we set up our context to be able to do the request for us 
to get the restaurants and then transform that information to match the input that the restaurant card expects.And then in our restaurant 
screen, all we needed to do was we needed to use the context.Of the restaurants that already did the API call for us.*/

/* FlatList  it is a wrapper around something called a virtualize list.So it has inherent memory optimizations.It's going to do things out 
of the box that help you better relay information in.And if you have massive lists and data is coming in dynamically and all of these things
are changing often, or it's a very, very large amount of data, a flat list is your main solution because it has these optimization I wanted 
to leave this quick note here to address a minor semantic issue. I misspoke in the next video and referenced `contentContainerStyle` as the styling that is applied to each individual item.
However it is not applied to each item individually rather it is applied to the holistic content inside the container. That is why you 
need to wrap the `Spacer` component around the rendered item.*/