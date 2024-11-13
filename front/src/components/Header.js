import React from 'react';
import { HeaderContainer } from '../components/HeaderContainer';
import { Avatar } from '../components/Avatar';
import Icon from 'react-native-vector-icons/Ionicons';

export const Header = ({ navigation }) => {
    return (
    <HeaderContainer>    
        <Avatar source={{ uri: '../../assets/avatar.png' }} />
        <Icon name="menu" size={30} color="white" onPress={() => {/* Lógica para abrir o menu */}} />
    </HeaderContainer>     
    );
  };