import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

// Screens
import AccountHome from "../screens/Account/AccountHome";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import MyCarsScreen from "../screens/Account/MyCarsScreen";
import AddCarScreen from "../screens/Account/AddCarScreen";

import ProtectedScreen from "./ProtectedScreen";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const { isLogged } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      {isLogged ? (
        <>
          <Stack.Screen name="AccountHome">
            {(props) => (
              <ProtectedScreen navigation={props.navigation}>
                <AccountHome {...props} />
              </ProtectedScreen>
            )}
          </Stack.Screen>

          <Stack.Screen name="MyCars">
            {(props) => (
              <ProtectedScreen navigation={props.navigation}>
                <MyCarsScreen {...props} />
              </ProtectedScreen>
            )}
          </Stack.Screen>

          <Stack.Screen name="AddCar">
            {(props) => (
              <ProtectedScreen navigation={props.navigation}>
                <AddCarScreen {...props} />
              </ProtectedScreen>
            )}
          </Stack.Screen>
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
