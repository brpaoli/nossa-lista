import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-top: ${(props) => props.paddingTop || '0'};
    background-color: ${(props) => props.theme.colors.purple4};
    flex-direction: column;
    justify-content: ${(props) => props.justify || 'space-between'};
    align-items: center;
`;      