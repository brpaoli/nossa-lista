import styled from 'styled-components/native';

export const LabelText = styled.Text`
    color: ${(props) => props.theme.colors.gray1};
    margin-bottom: ${(props) => props.theme.spacing.sm};
    font-size: ${(props) => props.theme.size.sm }px;
    text-align: left;
    width: 100%;
    max-width: 280px;
`;