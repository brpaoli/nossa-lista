import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Container } from "../components/Container";
import { Title } from "../components/Title";
import { InputText } from "../components/InputText";
import { ButtonPrimary, ButtonText } from "../components/ButtonPrimary";
import Logo from "../assets/Logo.svg";
import { useTheme } from "styled-components/native";
import { authentication } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "../components/Toast";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const auth = authentication;
  const theme = useTheme();

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000); // Desaparece após 3 segundos
  };

  // Função para lidar com o login
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (email === "" || password === "") {
        //Alert.alert("Erro", "Por favor, preencha todos os campos");
        showToast("Por favor, preencha todos os campos");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Home");
      }
    } catch (error) {
      //console.error(error);
      showToast("Erro ao efetuar login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o cadastro
  const handleRegister = () => {
    navigation.navigate("Register"); // Navega para a tela de cadastro
  };

  const styles = StyleSheet.create({
    registerText: {
      textAlign: "center",
      marginTop: 24,
      color: theme.colors.gray1,
    },
    link: {
      color: theme.colors.purple2,
      textDecorationLine: "underline",
      marginTop: 24,
    },
  });

  return (
    <Container justify="center" style={{ alignItems: "center", justifyContent: "center" }}>

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
      <Logo
        style={{
          width: 280,
          height: 77,
          resizeMode: "contain",
          marginBottom: 24,
        }}
        width={280}
        height={77}
      />
        <Title
          fontSize={theme.size.md}
          fontWeight={theme.weight.bold}
          color={theme.colors.dark1}
          marginBottom={60}
        >
          Acesse sua conta
        </Title>

        {/* Campo de Usuário */}
        <InputText
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={theme.colors.gray2}
          autoCapitalize="none"
        />

        {/* Campo de Senha */}
        <InputText
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.colors.gray2}
          autoCapitalize="none"
        />

        <ButtonPrimary
          marginTop={theme.spacing.xs}
          backgroundColor={theme.colors.purple3}
          onPress={handleLogin}
        >
          <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
            Login
          </ButtonText>
        </ButtonPrimary>

        {/* Botão de Cadastro */}
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.link} onPress={handleRegister}>
            Cadastre-se
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <Toast
        visible={toast.visible}
        message={toast.message}
        backgroundColor={theme.colors.error}
      />
    </Container>
  );
};

export default LoginScreen;
