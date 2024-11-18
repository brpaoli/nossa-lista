import styled from 'styled-components/native';

export const ContainerFull = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${(props) => props.background};
    flex-direction: column;
    justify-content: ${(props) => props.justify || 'space-between'};
    align-items: center;
`;      