import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  align-self: center;
  width: 100%;
  padding: 48px 24px 24px 24px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.purple4};
`;