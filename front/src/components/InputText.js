import styled from 'styled-components/native';

export const InputText = styled.TextInput`
    height: 48px;
    width: 100%;
    max-width: 280px;
    border-style: solid;
    background-color: #fafafa;
    border-width: ${(props) => props.borderWidth || '1px'};
    margin-bottom: ${(props) => props.marginBottom || '8px'};
    padding-left: ${(props) => props.paddingLeft || '12px'};
    font-size: ${(props) => props.fontSize || '16px'};
    border-color: ${(props) => props.borderColor || '#eaeaea'};
    font-size: ${(props) => props.fontSize || '16px'};
    border-radius: ${(props) => props.borderRadius || '4px'};
`;