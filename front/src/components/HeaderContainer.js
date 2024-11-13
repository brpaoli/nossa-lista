import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  align-self: center;
  width: 100%;
  padding: 48px 24px 24px 24px;
  background-color:  ${(props) => props.theme.colors.dark4};
  border-bottom-width: 1px;
  border-bottom-color:  ${(props) => props.theme.colors.dark3};
  border-bottom-style: solid;
  margin-bottom: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;