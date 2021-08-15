import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import InputTodo from "../screens/InputScreen";
import DetailTodo from "../screens/DetailScreen";
import EditTodo from "../screens/EditScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Input"
          component={InputTodo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailTodo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit"
          component={EditTodo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
