import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container } from '../components/Container';
import { Box } from '../components/Box';
import { IconContainer } from '../components/IconContainer';
import { useTheme } from 'styled-components/native';
import { Title } from '../components/Title';
import { Text } from 'react-native';
import { useAuth } from '../utils/AuthContext';


const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth(); // Usa o hook para acessar as informações do usuário

  console.log("USER INFO", user); // Verifique o estado do usuário no console
  
  return (
    <Container justify="center">
      <Title
        fontSize={theme.size.md}
        fontWeight={theme.weight.bold}
        color={theme.colors.green3}
        marginBottom={theme.spacing.lg}
      >
        Bem-vindo, {user ? user.nome : 'Usuário'}! {/* Exibe o nome do usuário */}
      </Title>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: theme.colors.white,
          marginBottom: 24,
          maxWidth: 280,
        }}
      >
        Vamos começar a criar sua lista de compras, clique no botão abaixo para dar início e divirta-se.
      </Text>
      <Box onPress={() => navigation.navigate('Criar Lista de Compras')}>
        <IconContainer>
          <Icon name="add-circle" size={30} />
        </IconContainer>
        <Text>Criar Lista de Compras</Text>
      </Box>
    </Container>
  );
};

export default HomeScreen;