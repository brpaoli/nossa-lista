import styled from 'styled-components/native';

export const InputText = styled.TextInput`
    height: 48px;
    width: 100%;
    max-width: 280px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 8px;
    padding-left: 12px;
    font-size: 16px;
    background-color: ${(props) => props.theme.colors.dark4};
    border-color: ${(props) => props.theme.colors.dark3};
    font-size: ${(props) => props.fontSize || '16px'};
    color: ${(props) => props.theme.colors.gray1};
    border-radius: 4px;
    ::placeholder {
        color: #fff;
        opacity: 1;
    }
`;