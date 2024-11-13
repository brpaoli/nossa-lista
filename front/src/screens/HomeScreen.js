import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderContainer } from '../components/HeaderContainer';
import { Container } from '../components/Container';
import { Avatar } from '../components/Avatar';
import { Box } from '../components/Box';
import { IconContainer } from '../components/IconContainer';
import { useTheme } from 'styled-components/native';
import { Title } from '../components/Title';
import { Header } from '../components/Header';


const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  
  return (
    <Container>
      <Header />

      <Title
        fontSize={theme.size.lg}
        fontWeight={theme.weight.bold}
        color={theme.colors.dark1}
        marginBottom={theme.spacing.lg}
      >Bem-vindo, usurário!</Title>
      <Box onPress={() => navigation.navigate('CreateList')}>
        <IconContainer>
          <Icon name="add-circle" size={30} />
        </IconContainer>
        <Text>Criar Lista de Compras</Text>
      </Box>
      <Box onPress={() => navigation.navigate('FindMarkets')}>
        <IconContainer>
          <Icon name="search" color={theme.colors.purple4} size={30} />
        </IconContainer>
        <Text>Encontrar Mercados</Text>
      </Box>
    </Container>
  );
};

export default HomeScreen;