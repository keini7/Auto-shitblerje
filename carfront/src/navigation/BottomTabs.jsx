import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Stacks & Screens
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
        tabBarStyle: {
          backgroundColor: "#0f0f0f",
          borderTopColor: "#222",
          height: 58,
        },
        tabBarActiveTintColor: "#00aaff",
        tabBarInactiveTintColor: "#777",

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "HomeTab":
              iconName = "home";
              break;

            case "SearchTab":
              iconName = "search";
              break;

            case "FavoritesTab":
              iconName = "heart";
              break;

            case "AccountTab":
              iconName = "person";
              break;

            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      {/* HOME */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />

      {/* SEARCH */}
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: "Search" }}
      />

      {/* FAVORITES */}
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />

      {/* ACCOUNT */}
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}
