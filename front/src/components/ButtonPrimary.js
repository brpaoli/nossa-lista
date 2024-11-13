import styled from 'styled-components/native';

export const ButtonPrimary = styled.TouchableOpacity`
    width: 100%;
    max-width: 280px;
    height: 50px;
    justify-content: center;
    background-color: ${(props) => props.backgroundColor};
    border-radius: ${(props) => props.borderRadius || '4px'};
    border-color: ${(props) => props.borderColor || '#eaeaea'};
`;

export const ButtonText = styled.Text`
    text-transform: uppercase;
    text-align: center;
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
`;