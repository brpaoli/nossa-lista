import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Container } from "../components/Container";
import { ContainerFull } from "../components/ContainerFull";
import { ButtonPrimary, ButtonText } from "../components/ButtonPrimary";
import { useTheme } from "styled-components/native";
import { Title } from "../components/Title";
import { InputText } from "../components/InputText";
import { Box } from "../components/Box";
import { fetchUserListsName } from "../utils/FetchLists";
import {
  FlatListItens,
  FlatListContainer,
  ListItemName,
} from "../components/ListItens";
import { IconContainer } from "../components/IconContainer";
import Icon from "react-native-vector-icons/Ionicons";
import productsData from "../assets/itens-mercado";

import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../utils/AuthContext';

const AddItemsScreen = ({ route, navigation }) => {
  const [listItems, setListItems] = useState([]); // Lista de compras
  const [searchText, setSearchText] = useState(""); // Texto digitado no campo
  const [filteredProducts, setFilteredProducts] = useState([]); // Itens filtrados para autocomplete
  const theme = useTheme();
  const { listName } = route.params;
  const { listId } = route.params;
  const { user } = useAuth(); 
  const [listHeight, setListHeight] = useState(0);
  const [filteredHeight, setFilteredHeight] = useState(0);
  const [listVisible, setListVisible] = useState(false);

  // Filtra produtos com base no texto digitado
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = productsData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  // Adiciona um item à lista de compras
  const handleAddItem = (itemName) => {
    if (!itemName.trim()) {
      Alert.alert("Erro", "O nome do produto não pode estar vazio.");
      return;
    }

    setListItems((prevList) => {
      // Adiciona o item à lista de compras
      return [...prevList, itemName];
    });

    // Limpa o campo de pesquisa e sugestões
    setSearchText("");
    setFilteredProducts([]);
  };

  // Adiciona o item manualmente se não encontrado nas sugestões
  const handleManualAddItem = () => {
    const itemName = searchText.trim();
    if (itemName) {
      // Verifica se o item já está na lista
      if (!listItems.includes(itemName)) {
        setListItems((prevList) => [...prevList, itemName]); // Adiciona à lista
        setSearchText(""); // Limpa o campo de entrada
        setFilteredProducts([]); // Limpa as sugestões
      } else {
        Alert.alert("Aviso", "Este item já foi adicionado à lista.");
      }
    }
  };

  // Salva a lista de compras
  const saveList = async () => {
    if (listItems.length === 0) {
      Alert.alert("Erro", "A lista de compras está vazia.");
      return;
    }

    Alert.alert("Sucesso", `A lista "${listName}" foi salva com sucesso!`);
    // Lógica para salvar a lista no banco ou enviar para outro lugar
    try {
      // Referência ao Firestore para salvar a lista
      const docRef = await addDoc(collection(db, 'listaItens'), {
        uid: user.uid,
        listName: listName,
        listId: listId,
        listItems: listItems,
        createdAt: serverTimestamp(),
      });
      const listItensId = docRef.id;
      return listItensId;
    } catch (error) {
      console.error('Erro ao salvar a lista:', error);
      Alert.alert('Erro', 'Não foi possível salvar a lista. Tente novamente mais tarde.');
    }
  };


  const ITEM_HEIGHT = 48;
  const maxHeight = 600;

  // Altura calculada com base no número de itens
  const calculateFilteredHeight = (total) => {
    setFilteredHeight(
      Math.min(filteredProducts.length * ITEM_HEIGHT, maxHeight)
    );
  };
  const calculateListHeight = (total) => {
    setListHeight(Math.min(listItems.length * ITEM_HEIGHT, maxHeight));
  };

  useEffect(() => {
    calculateListHeight(filteredProducts.length);
  }, [listItems]);

  useEffect(() => {
    calculateFilteredHeight(filteredProducts.length);
  }, [filteredProducts]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.purple4 }}>
    <Container
      justify="flex-start"
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      {!listVisible && (
        <ContainerFull
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
          justify="flex-start"
        >
          <Title
            fontSize={theme.size.md}
            fontWeight={theme.weight.bold}
            color={theme.colors.dark1}
            marginBottom={theme.spacing.lg}
            marginTop={theme.spacing.md}
          >
            Lista: {listName}
            Id: {listId}
          </Title>

          <Text
            style={{
              color: theme.colors.gray3,
              marginBottom: 8,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            O que você precisa comprar?
          </Text>

          <Text
            style={{
              color: theme.colors.gray2,
              marginBottom: 8,
              fontSize: 16,
              fontWeight: "normal",
            }}
          >
            Clique no "+" para adicionar um itens a sua lista.
          </Text>
        </ContainerFull>
      )}

      {listVisible && (
        <ContainerFull
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignContent: "center",
            alignSelf: "center",
          }}
          justify="space-between"
        >
          <Text
            style={{
              color: theme.colors.gray2,
              maxWidth: "280px",
              marginBottom: 8,
              fontSize: 18,
              fontWeight: "normal",
              marginBottom: 24,
            }}
          >
            Busque pelos produtos que deseja acrescentar a lista.
          </Text>

          <InputText
            placeholder="Digite o nome do produto"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={theme.colors.gray2}
          />

          {/* Lista de sugestões */}
          {filteredProducts.length > 0 && (
            <FlatListContainer
              maxHeight={filteredHeight}
              backgroundColor={theme.colors.dark4}
            >
              <FlatListItens
                data={filteredProducts}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleAddItem(item.name);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 8,
                        paddingHorizontal: 8,
                        backgroundColor: theme.colors.dark4,
                        borderRadius: 0,
                      }}
                      activeOpacity={0.7} // Opacidade no clique
                    >
                      <Icon
                        name="add-circle"
                        color={theme.colors.green3}
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                      <ListItemName>{item.name}</ListItemName>
                    </TouchableOpacity>
                  );
                }}
              />
            </FlatListContainer>
          )}

          {/* Adiciona manualmente o item se não encontrado */}
          {searchText.trim() !== "" && filteredProducts.length === 0 && (
            <TouchableOpacity
              onPress={handleManualAddItem}
              style={{ marginTop: 8, alignItems: "center" }}
            >
              <Text style={{ color: theme.colors.white, fontSize: 16 }}>
                Adicionar "{searchText}" à lista
              </Text>
            </TouchableOpacity>
          )}

          {/* Lista de compras */}
          <FlatListContainer
            maxHeight={336}
            style={{ marginTop: 16, overflowY: "auto" }}
          >
            <FlatListItens
              data={listItems}
              color={theme.colors.white}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <View
                  style={{
                    padding: 10,
                    color: theme.colors.white,
                    marginVertical: 8 - 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: theme.colors.white, fontSize: 16, flex: 1 }}
                  >
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newListItems = listItems.filter((i) => i !== item);
                      setListItems(newListItems);
                    }}
                  >
                    <Icon
                      name="remove-circle"
                      color={theme.colors.red3}
                      size={20}
                      style={{ marginLeft: 16, alignItems: "flex-end" }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              ListHeaderComponent={
                listItems.length > 0 && (
                  <Title
                    fontSize={theme.size.md}
                    fontWeight={theme.weight.bold}
                    color={theme.colors.dark1}
                    style={{ marginTop: 0 }}
                  >
                    Sua lista de compras:
                  </Title>
                )
              }
            />
          </FlatListContainer>

          <ButtonPrimary
            marginTop={theme.spacing.xs}
            backgroundColor={theme.colors.purple3}
            onPress={saveList}
            style={{ alignSelf: "center", marginTop: theme.spacing.lg, position: "absolute", bottom: 24 }}
          >
            <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
              Salvar Lista
            </ButtonText>
          </ButtonPrimary>
        </ContainerFull>
      )}

      {!listVisible && (
        <Box
          onPress={() => setListVisible(true)}
          style={{ position: "absolute", bottom: 24, right: 24 }}
        >
          <IconContainer>
            <Icon name="add-circle" color={theme.colors.purple4} size={30} />
          </IconContainer>
          <Text>Adicionar Itens</Text>
        </Box>
      )}
    </Container>
    </SafeAreaView>
  );
};

export default AddItemsScreen;
