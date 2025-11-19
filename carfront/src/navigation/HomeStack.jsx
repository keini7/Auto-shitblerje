import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/Home/HomeScreen";
import CarDetailsScreen from "../screens/Home/CarDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CarDetails"
        component={CarDetailsScreen}
        options={{
          // Tab bar can be hidden here in future
        }}
      />
    </Stack.Navigator>
  );
}
