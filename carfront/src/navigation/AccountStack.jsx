import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

// Screens
import AccountHome from "../screens/Account/AccountHome";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import MyCarsScreen from "../screens/Account/MyCarsScreen";
import AddCarScreen from "../screens/Account/AddCarScreen";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const { isLogged } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {isLogged ? (
        <>
          <Stack.Screen name="AccountHome" component={AccountHome} />
          <Stack.Screen name="MyCars" component={MyCarsScreen} />
          <Stack.Screen name="AddCar" component={AddCarScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
