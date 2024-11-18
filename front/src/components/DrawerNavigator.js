import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { Header } from "../components/Header";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import CreateListScreen from "../screens/CreateListScreen";
import AddItemsScreen from "../screens/AddItemsScreen";
import PrivateRoute from "./PrivateRoute";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerStyle: {
            backgroundColor: theme.colors.dark4,
            borderRadius: 0,
          },
          drawerActiveTintColor: theme.colors.purple3,
          drawerInactiveTintColor: "#aaa",
          drawerLabelStyle: {
            fontSize: 18,
            color: theme.colors.gray1,
            borderRadius: 0,
          },
        }}
        drawerPosition="right"
      >
        <Drawer.Screen
          name="Home"
          children={(props) => (
            <PrivateRoute {...props}>
              <HomeScreen {...props} />
            </PrivateRoute>
          )}
        />
        <Drawer.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="Register"
          component={SignupScreen}
          options={{
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="Criar Lista de Compras"
          children={(props) => (
            <PrivateRoute {...props}>
              <CreateListScreen {...props} />
            </PrivateRoute>
          )}
          options={({ navigation }) => ({
            header: () => (
              <Header
                navigation={navigation}
                canGoBack={navigation.canGoBack()}
              />
            ),
          })}
        />

        <Drawer.Screen
          name="Adicionar Itens"
          children={(props) => (
            <PrivateRoute {...props}>
              <AddItemsScreen {...props} />
            </PrivateRoute>
          )}
          options={({ navigation }) => ({
            header: () => (
              <Header
                navigation={navigation}
                canGoBack={navigation.canGoBack()}
              />
            ),
            drawerItemStyle: { display: "none" }, // Ocultando o item no Drawer, se necessário
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
