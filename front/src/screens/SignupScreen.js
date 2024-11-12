import React, { useState } from 'react';
import { Text, StyleSheet, Alert, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { InputText } from '../styles/InputText';
import { LabelText } from '../styles/LabelText';
import { ButtonContainer } from '../styles/ButtonContainer';
import { Container } from '../styles/Container';
import SelectField from '../styles/SelectContainer';
import { ButtonPrimary, ButtonText } from '../styles/ButtonPrimary';
import RNPickerSelect from 'react-native-picker-select';
import { Title } from '../styles/Title';
import { FormContainer } from '../styles/FormContainer';

export const SignupScreen = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [currentStep, setCurrentStep] = useState(1);  // Etapa atual
  const theme = useTheme(); 

  // Lista de estados
  const estados = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' }
  ];

  // Função para validar e enviar o formulário
  const handleSubmit = () => {
    // Validações simples
    if (!nome || !email || !senha || !confirmarSenha || !telefone || !cep || !rua || !numero || !cidade || !estado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Aqui você pode enviar os dados para a API ou fazer algo com eles
    Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo, ${nome}!`);
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

  return (
    <Container>
      <Title
        fontSize={theme.size.lg}
        fontWeight={theme.weight.bold}
        color={theme.colors.gray1}
        marginBottom={theme.spacing.lg}
      >
        Crie sua conta
      </Title>

      {currentStep === 1 && (
        <FormContainer>
          <LabelText>Nome:</LabelText>
          <InputText
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome completo"
          />

          <LabelText>E-mail:</LabelText>
          <InputText
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />

          <LabelText>Senha:</LabelText>
          <InputText
            value={senha}
            onChangeText={setSenha}
            placeholder="Crie uma senha"
            secureTextEntry
          />

          <LabelText>Telefone:</LabelText>
          <InputText
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
          />

          <LabelText>Celular:</LabelText>
          <InputText
            value={celular}
            onChangeText={setCelular}
            placeholder="Digite seu celular"
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
            placeholder="Digite seu CEP"
            keyboardType="numeric"
          />

          <LabelText>Rua:</LabelText>
          <InputText
            value={rua}
            onChangeText={setRua}
            placeholder="Digite sua rua"
          />

          <LabelText>Número:</LabelText>
          <InputText
            value={numero}
            onChangeText={setNumero}
            placeholder="Digite o número"
            keyboardType="numeric"
          />
          <LabelText>Complemento:</LabelText>
          <InputText
            value={complemento}
            onChangeText={setComplemento}
            placeholder="Digite o complemento (opcional)"
          />
          <LabelText>Cidade:</LabelText>
          <InputText
            value={cidade}
            onChangeText={setCidade}
            placeholder="Digite sua cidade"
          />

          <LabelText>Estado:</LabelText>
          <RNPickerSelect
            onValueChange={setEstado}
            items={estados}
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione seu estado", value: null }}
          />
        </FormContainer>
      )}

      {currentStep === 3 && (
        <ButtonPrimary
          marginTop={theme.spacing.xs}
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
            marginTop={theme.spacing.xs}
            backgroundColor={theme.colors.purple3}
            onPress={handleBack}
          >
            <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
              Voltar
            </ButtonText>
          </ButtonPrimary>
        )}

        {currentStep < 3 && (
          <ButtonPrimary
            marginTop={theme.spacing.xs}
            backgroundColor={theme.colors.purple3}
            onPress={handleNext}
          >
            <ButtonText color={theme.colors.gray1} fontSize={theme.size.sm}>
              Próximo
            </ButtonText>
          </ButtonPrimary>
        )}
      </ButtonContainer>
    </Container>
  );
};

// Estilos
const pickerSelectStyles = {
  inputAndroid: {
    height: 40,
    width: '80%',
    maxWidth: 280,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    color: '#1e192d',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputIOS: {
    height: 40,
    maxWidth: 280,
    width: '80%',
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center', 
    alignSelf: 'center',
  },
};
