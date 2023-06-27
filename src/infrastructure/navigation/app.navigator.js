import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import { MapScreen } from "../../features/restaurants/map/screens/map.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
// import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { SettingsNavigator } from "./settings.navigator";
import { RestaurantsNavigator } from "./restaurants.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
}

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="logout" onPress={() => onLogout()} />
  </SafeArea>
  )
};


//THINK RETURN { } BASICALLY AN OBJECT
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};




export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
  
);

/*At the top level, they aren't anymore because now we have 2 navigator's.So what we want to do is any time our App Navigator mounts, that's 
when we want these contexts to mount.Now, this is a problem, right, because all of these context providers are basically at the top level
and they never, ever, ever get unmounted.Now, are they all our favorites, location and restaurant? Absolutely necessary.At the top level,
they aren't anymore because now we have 2 navigator's.So what we want to do is any time our App Navigator mounts, that's when we want 
these contexts to mount.Any time the App Navigator is mounted right over here so that around the tab navigation, that's where we want to 
add these.So we'll go ahead, we'll copy these and I'll just take these and then we'll save here and we'll go over here and at the bottom 
will place these, make sure that all the navigators are there.And what we'll do now is we'll grab all three of these, which need to be 
added at a lower level.Now, they can't be at the app level anymore and we're going to put them at the App Navigator level right over here.
And what we're going to do is we're going to make sure that they're imported from the right spot, so that's about that and we'll make sure 
that that's true for all of these and this one as well.

And once we do that.Now, all of these should be imported correctly.And if we go over here to our load function, OK, now we see that we're 
loading the correct ones for the user, but now when we log out, we should see when we register a new account.So for instance, NMO plus one
twenty one, two, three @Bini audio test one, two, three.If we register that account, what we should see now is 
that it shouldn't be rendering the favorites of mo one.And that's because the context is getting unmounted.It's cleaning itself up.
Previously, when the context was at the app level, we were unable to clear the app context.We were unable to clear the favorites context 
because it was an app level consideration.So navigation was rendering after all of the context.So the context never got unmounted.The 
favorite context never got cleared between sessions.So every session the favorite context would stay the same and the favorite context 
would say the same.And so what we learned here is that navigation plays a vital role in where we should load specific contexts.
So at the App Navigator level, once we're logged in, that's when we should start mounting the favorites,the locations and the restaurants,
because that's where we need that information.When we render our tab navigation, when we render our main app, when we log out, they should
be cleared.And when they're cleared and we go back to the account screen so we load up a different navigator.All of these are unmounted 
and thus their memory is cleaned.When they were at the app level, they stayed in memory.*/

