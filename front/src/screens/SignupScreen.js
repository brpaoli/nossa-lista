import React, { useState } from "react";
import { Alert, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { InputText } from "../components/InputText";
import { LabelText } from "../components/LabelText";
import { ButtonContainer } from "../components/ButtonContainer";
import { Container } from "../components/Container";
import { ButtonPrimary, ButtonText } from "../components/ButtonPrimary";
import RNPickerSelect from "react-native-picker-select";
import { Title } from "../components/Title";
import { FormContainer } from "../components/FormContainer";
import firestore from "@react-native-firebase/firestore";
import { authentication, db } from "../../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "../components/Toast";

const SignupScreen = ({ navigation }) => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const theme = useTheme();

  // Lista de estados
  const estados = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000); // Desaparece após 3 segundos
  };

  // Função para validar e enviar o formulário
  const handleSubmit = async () => {
    if (
      !nome ||
      !usuario ||
      !email ||
      !senha ||
      !celular ||
      !cep ||
      !rua ||
      !numero ||
      !cidade ||
      !estado
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      // Criação do usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        email,
        senha
      );
      const user = userCredential.user;

      // Salvar informações adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        usuario,
        email,
        celular,
        endereco: {
          cep,
          rua,
          numero,
          complemento,
          cidade,
          estado,
        },
        criadoEm: new Date().toISOString(),
      });
      showToast("Sucesso", `Usuário ${nome} cadastrado com sucesso!`);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      showToast("Erro", "Não foi possível realizar o cadastro.");
    }
  };
  // Função para avançar para a próxima etapa
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Função para voltar para a etapa anterior
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Estilos
const pickerSelectStyles = {
  inputAndroid: {
    height: 56,
    width: "80%",
    maxWidth: 280,
    borderColor: theme.colors.dark2,
    backgroundColor: theme.colors.dark4,
    color: theme.colors.white,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  inputIOS: {
    height: 56,
    maxWidth: 280,
    width: "80%",
    borderColor: theme.colors.dark2,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
};


  return (
    <Container justify="center">
      <Title
        fontSize={theme.size.lg}
        fontWeight={theme.weight.bold}
        color={theme.colors.dark1}
      >
        Crie sua conta
      </Title>

      <Text
        style={{
          textAlign: "center",
          color: theme.colors.gray1,
          marginBottom: 0,
          width: "100%",
          maxWidth: 280,
        }}
      >
        Preencha os campos abaixo corrretamente para criar sua conta.
      </Text>

      {currentStep === 1 && (
        <FormContainer>
          <LabelText>Nome:</LabelText>
          <InputText
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome completo"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />

          <LabelText>Usuário:</LabelText>
          <InputText
            value={usuario}
            onChangeText={setUsuario}
            placeholder="Digite seu usuário"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />

          <LabelText>E-mail:</LabelText>
          <InputText
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />

          <LabelText>Senha:</LabelText>
          <InputText
            value={senha}
            onChangeText={setSenha}
            placeholder="Crie uma senha"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
            secureTextEntry
          />

          <LabelText>Celular:</LabelText>
          <InputText
            value={celular}
            onChangeText={setCelular}
            placeholder="Digite seu celular"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
            keyboardType="phone-pad"
          />
        </FormContainer>
      )}

      {currentStep === 2 && (
        <FormContainer>
          <LabelText>CEP:</LabelText>
          <InputText
            value={cep}
            onChangeText={setCep}
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
            keyboardType="numeric"
          />

          <LabelText>Rua:</LabelText>
          <InputText
            value={rua}
            onChangeText={setRua}
            placeholder="Digite sua rua"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />

          <LabelText>Número:</LabelText>
          <InputText
            value={numero}
            onChangeText={setNumero}
            placeholder="Digite o número"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
            keyboardType="numeric"
          />
          <LabelText>Complemento:</LabelText>
          <InputText
            value={complemento}
            onChangeText={setComplemento}
            placeholder="Digite o complemento (opcional)"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />
          <LabelText>Cidade:</LabelText>
          <InputText
            value={cidade}
            onChangeText={setCidade}
            placeholder="Digite sua cidade"
            placeholderTextColor={theme.colors.gray2}
            style={{ marginBottom: 16 }}
          />

          <LabelText>Estado:</LabelText>
          <RNPickerSelect
            onValueChange={setEstado}
            items={estados}
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione seu estado", value: null }}
            placeholderTextColor={theme.colors.gray2}
          />
        </FormContainer>
      )}

      {currentStep === 2 && (
        <ButtonPrimary
          marginTop={8}
          backgroundColor={theme.colors.purple3}
          onPress={handleSubmit}
        >
          <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
            Cadastrar
          </ButtonText>
        </ButtonPrimary>
      )}

      <ButtonContainer>
        {currentStep > 1 && (
          <ButtonPrimary
            marginTop={8}
            backgroundColor={theme.colors.purple3}
            onPress={handleBack}
          >
            <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
              Voltar
            </ButtonText>
          </ButtonPrimary>
        )}

        {currentStep < 2 && (
          <ButtonPrimary
            marginTop={8}
            backgroundColor={theme.colors.purple3}
            onPress={handleNext}
          >
            <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
              Próximo
            </ButtonText>
          </ButtonPrimary>
        )}
        {currentStep === 1 && (
          <Text style={{ color: theme.colors.white }}>
            Já possui conta?{" "}
            <Text style={{ color: theme.colors.purple2, textDecorationLine: "underline", }} onPress={handleLogin}>
              Faça o Login
            </Text>
          </Text>
        )}
      </ButtonContainer>
      <Toast
        visible={toast.visible}
        message={toast.message}
        backgroundColor={theme.colors.error}
      />
    </Container>
  );
};


export default SignupScreen;
