import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { Container } from "./Container";
import { useTheme } from "styled-components/native";

const PrivateRoute = ({ children, navigation }) => {
  const { user, loading } = useContext(AuthContext);
  const theme = useTheme();

  if (loading) {
    return (
      <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.dark1} />
      </Container>
    );
  }

  if (!user) {
    navigation.navigate("Login"); // Redireciona para a tela de login
    return null;
  }

  return children;
};

export default PrivateRoute;
