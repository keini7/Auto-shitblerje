import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import SearchScreen from "../screens/Search/SearchScreen";
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarStyle: {
          backgroundColor: "#0f0f0f",
          borderTopColor: "#222",
          height: 58,
        },
        tabBarActiveTintColor: "#00aaff",
        tabBarInactiveTintColor: "#777",

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "HomeTab") iconName = "home";
          else if (route.name === "SearchTab") iconName = "search";
          else if (route.name === "FavoritesTab") iconName = "heart";
          else if (route.name === "AccountTab") iconName = "person";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: "Search" }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />

      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}
