import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/styles/theme";
import { DrawerNavigator } from "./src/components/DrawerNavigator";
import { StatusBar } from "react-native";
import { AuthProvider } from "./src/utils/AuthContext";

const Stack = createStackNavigator();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1e192d"
      />
      <DrawerNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
