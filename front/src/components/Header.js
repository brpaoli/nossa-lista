import React from "react";
import { HeaderContainer } from "../components/HeaderContainer";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "styled-components/native";

export const Header = ({ navigation, canGoBack }) => {
  const theme = useTheme();
  return (
    <HeaderContainer>
      {canGoBack && (
        <Icon
          name="chevron-back-sharp" // Ícone de seta para voltar
          size={30}
          color={theme.colors.white}
          style={{ position: "absolute", left: 16, top: 16 }}
          onPress={() => navigation.goBack()} // Função para voltar à tela anterior // Espaço entre os ícones
        />
      )}
      <Icon
        name="menu" // Ícone de menu para abrir o drawer
        size={30}
        color={theme.colors.white}
        style={{ position: "absolute", right: 16, top: 16 }}
        onPress={() => navigation.openDrawer()} // Função para abrir o drawer
      />
    </HeaderContainer>
  );
};
