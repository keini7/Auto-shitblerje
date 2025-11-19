import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";

import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { loading, isLogged } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00aaff" />
        <Text className="text-gray-400 mt-3">Duke ngarkuar...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogged ? (
          // USER IS LOGGED → GO TO THE APP
          <Stack.Screen name="Main" component={BottomTabs} />
        ) : (
          // USER NOT LOGGED → AUTH PAGES
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
