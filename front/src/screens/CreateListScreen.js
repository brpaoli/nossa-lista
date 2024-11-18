import React, { useState } from 'react';
import { TextInput, Button, Alert } from 'react-native'; // Importar os componentes necessários do React Native
import { Container } from '../components/Container';
import { ButtonPrimary, ButtonText } from '../components/ButtonPrimary';
import { useTheme } from 'styled-components/native';
import { Title } from '../components/Title';
import { InputText } from '../components/InputText';

import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../utils/AuthContext';




const CreateListScreen = ({ navigation }) => {
  const theme = useTheme();
  const [listName, setListName] = useState('');
  const { user } = useAuth(); 
  const handleCreateList = async () => {
    if (listName.trim() === '') {
      Alert.alert('Erro', 'O nome da lista não pode estar vazio.');
      return;
    }
    try {
      // Referência ao Firestore para salvar a lista
      const docRef = await addDoc(collection(db, 'listas'), {
        uid: user.uid,
        name: listName,
        createdAt: serverTimestamp(),
      });
      const listId = docRef.id;

      // Agora você pode passar o listId para outra função
      console.log("Documento criado com ID:", listId);
      // Redireciona para a próxima tela com o nome da lista
      navigation.navigate('Adicionar Itens', { listName, listId });
      return listId;
    } catch (error) {
      console.error('Erro ao criar a lista:', error);
      Alert.alert('Erro', 'Não foi possível criar a lista. Tente novamente mais tarde.');
    }
  };

  return (
    <Container justify="flex-start">
      <Title
        fontSize={theme.size.md}
        fontWeight={theme.weight.bold}
        color={theme.colors.dark1}
        marginBottom={theme.spacing.md}
        marginTop={theme.spacing.lg}
      >
        Crie sua lista de compras
      </Title>

      <InputText 
        placeholder="Digite o nome da lista"
        value={listName}
        onChangeText={setListName}
        placeholderTextColor={theme.colors.gray2}
      />

    <ButtonPrimary
        marginTop={theme.spacing.xs}
        backgroundColor={theme.colors.purple3}
        onPress={handleCreateList}
        style={{ position: 'absolute', alignSelf: 'center', bottom: 24, }}
      >
        <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
          Criar Lista
        </ButtonText>
      </ButtonPrimary>

    </Container>
  );
};

export default CreateListScreen;