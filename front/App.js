import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen'; // Tela de Splash com a animação
import HomeScreen from './src/screens/HomeScreen'; 
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/styles/theme';	


const Stack = createStackNavigator();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}
