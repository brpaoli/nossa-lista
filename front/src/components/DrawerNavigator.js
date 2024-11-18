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
import { signOut } from "firebase/auth";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { authentication } from "../../firebase.config";

const Drawer = createDrawerNavigator();

const handleLogout = async (navigation) => {
  try {
    await signOut(authentication);  // Realiza o logout com Firebase
    navigation.navigate('Login');   // Redireciona para a tela de Login
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

export const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerStyle: {
            backgroundColor: "#343442",
            borderRadius: 0,
          },
          drawerActiveTintColor: theme.colors.purple4,
          drawerInactiveTintColor: "#aaa",
          drawerLabelStyle: {
            fontSize: 18,
            color: theme.colors.gray1,
            borderRadius: 0,
          },
        }}
        drawerPosition="right"
        drawerContent={(props) => (
          <View style={styles.drawerContent}>
            <View style={styles.drawerItems}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                <Text style={styles.drawerItemText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("Criar Lista de Compras")}>
                <Text style={styles.drawerItemText}>Criar Lista de Compras</Text>
              </TouchableOpacity>
            </View>

            {/* Botão de Logout */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout(props.navigation)}
            >
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}
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
const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#13111C",
    flex: 1,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "#13111C",
  },
  drawerItemText: {
    fontSize: 18,
    padding: 16,
    color: "#fff",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#786ec3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});