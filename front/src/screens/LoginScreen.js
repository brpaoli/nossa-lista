import React, { useState } from 'react';
import { Button, Text, StyleSheet, TextInput, Alert  } from 'react-native';
import { Container } from '../styles/Container';
import { Title } from '../styles/Title';
import { InputText } from '../styles/InputText';
import { ButtonPrimary, ButtonText } from '../styles/ButtonPrimary';
import Logo from "../../assets/Logo.svg";
import { useTheme } from 'styled-components/native';

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme(); 

  // Função para lidar com o login
  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    } else {
      // Aqui você pode adicionar a lógica de autenticação
      console.log('Login realizado com sucesso!');
      navigation.replace('Home'); // Navega para a tela 'Home'
    }
  };

  // Função para lidar com o cadastro
  const handleRegister = () => {
    navigation.navigate('Register'); // Navega para a tela de cadastro
  };

  const styles = StyleSheet.create({
  registerText: {
    textAlign: 'center',
    marginTop: 24,
    color: theme.colors.gray1,
  },
  link: {
    color: theme.colors.purple2,
    textDecorationLine: 'underline',
    marginTop: 24,
  },
});

    return (
      <Container>
        <Logo style={{ width: 280, height: 77, resizeMode: 'contain', marginBottom: 60, display: 'block' }} width={280} height={77} />
        
        <Title
          fontSize={theme.size.lg}
          fontWeight={theme.weight.bold}
          color={theme.colors.gray1}
          marginBottom={theme.spacing.lg}
        >
          Acesse sua conta
        </Title>
        
              {/* Campo de Usuário */}
        <InputText
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />

              {/* Campo de Senha */}
        <InputText
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
                Não tem uma conta?{' '}
                <Text style={styles.link} onPress={handleRegister}>
                  Cadastre-se
                </Text>
              </Text>
        </Container>
  );

}

